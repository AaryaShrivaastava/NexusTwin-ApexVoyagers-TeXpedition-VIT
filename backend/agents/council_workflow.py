from langgraph.graph import StateGraph, END
from typing import TypedDict, List
from db.db_models import AgentDecision, Simulation, Scenario
from sqlalchemy.orm import Session
from datetime import datetime, timezone
import json
from services.gemini_service import generate_structured_json

class CouncilState(TypedDict):
    simulation_id: str
    customer_context: str
    scenarios: List[dict]
    messages: List[dict]
    final_decision: str
    confidence_index: float

def agent_node(role_name: str, objective: str, state: CouncilState):
    history = "\n".join([f"{m['agent_role']}: {m['message']}" for m in state["messages"]])
    scen_str = json.dumps(state["scenarios"])
    
    prompt = f"""
    You are the {role_name}. Your objective: {objective}
    Customer Context: {state['customer_context']}
    Available Scenarios: {scen_str}
    Previous Debate:
    {history}
    
    Write a 2-sentence argument evaluating the scenarios based purely on your objective. Pick a favorite or critique others.
    Return JSON: {{"message": "your argument"}}
    """
    
    res = generate_structured_json(prompt, {})
    msg = res.get("message", f"I support the scenario that aligns with {objective}.")
    
    state["messages"].append({
        "agent_role": role_name,
        "message": msg
    })
    return state

def growth_agent(state: CouncilState):
    return agent_node("Growth Agent", "Maximize conversion rate and immediate upside.", state)

def finance_agent(state: CouncilState):
    return agent_node("Finance Agent", "Protect profit margins and prioritize high revenue with low costs.", state)

def customer_agent(state: CouncilState):
    return agent_node("Customer Experience Agent", "Ensure the user isn't annoyed. Protect long-term retention.", state)

def brand_agent(state: CouncilState):
    return agent_node("Brand Safety Agent", "Protect premium brand positioning. Avoid cheap discounts or spam.", state)

def consensus_builder(state: CouncilState):
    history = "\n".join([f"{m['agent_role']}: {m['message']}" for m in state["messages"]])
    scen_str = json.dumps(state["scenarios"])
    
    prompt = f"""
    You are the Consensus Builder.
    Debate so far:
    {history}
    Scenarios:
    {scen_str}
    
    Synthesize the debate and pick the ultimate winning scenario.
    Return JSON: 
    {{
        "message": "your final summary",
        "final_decision": "The exact name of the winning scenario",
        "confidence_index": 0.88
    }}
    """
    res = generate_structured_json(prompt, {})
    
    state["messages"].append({
        "agent_role": "Consensus Builder",
        "message": res.get("message", "We will go with the safest bet.")
    })
    
    # Safely extract values with fallbacks
    final_decision = res.get("final_decision", "")
    if not final_decision and state["scenarios"]:
        final_decision = state["scenarios"][0]["name"]
        
    conf_index = res.get("confidence_index", 0.85)
    try:
        conf_index = float(conf_index)
    except:
        conf_index = 0.85

    state["final_decision"] = final_decision
    state["confidence_index"] = conf_index
    return state

def build_council_graph():
    workflow = StateGraph(CouncilState)
    
    workflow.add_node("GrowthAgent", growth_agent)
    workflow.add_node("FinanceAgent", finance_agent)
    workflow.add_node("CustomerAgent", customer_agent)
    workflow.add_node("BrandAgent", brand_agent)
    workflow.add_node("ConsensusBuilder", consensus_builder)
    
    workflow.set_entry_point("GrowthAgent")
    workflow.add_edge("GrowthAgent", "FinanceAgent")
    workflow.add_edge("FinanceAgent", "CustomerAgent")
    workflow.add_edge("CustomerAgent", "BrandAgent")
    workflow.add_edge("BrandAgent", "ConsensusBuilder")
    workflow.add_edge("ConsensusBuilder", END)
    
    return workflow.compile()

def run_council_workflow(simulation_id: str, db: Session):
    sim = db.query(Simulation).filter(Simulation.id == simulation_id).first()
    scenarios = db.query(Scenario).filter(Scenario.simulation_id == simulation_id).all()
    
    scen_dicts = [{"name": s.name, "rev": s.projected_revenue, "conv": s.conversion_rate, "ret": s.retention_impact} for s in scenarios]
    
    initial_state = CouncilState(
        simulation_id=simulation_id,
        customer_context=sim.query if sim.query else "Loyal customer",
        scenarios=scen_dicts,
        messages=[],
        final_decision="",
        confidence_index=0.0
    )
    
    graph = build_council_graph()
    result = graph.invoke(initial_state)
    
    for msg in result["messages"]:
        decision = AgentDecision(
            simulation_id=simulation_id,
            agent_role=msg["agent_role"],
            message=msg["message"],
            timestamp=datetime.now(timezone.utc)
        )
        db.add(decision)
    
    sim.status = "completed"
    sim.recommended_action = result["final_decision"]
    
    idx = result["confidence_index"]
    if idx <= 1.0:
        idx = idx * 100
    sim.future_confidence_index = int(idx)
    
    db.commit()
    
    return result["messages"]
