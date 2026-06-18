from sqlalchemy.orm import Session
from db.db_models import Simulation, Scenario, Customer
import uuid
from services.gemini_service import generate_structured_json

def generate_scenarios(customer_id: str, query: str, db: Session):
    sim = Simulation(customer_id=customer_id, query=query, status="pending")
    db.add(sim)
    db.commit()
    db.refresh(sim)
    
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    cust_data = f"Name: {customer.name}, Persona: {customer.persona}" if customer else "Unknown"

    prompt = f"""
    You are the Future Simulator Engine.
    Customer Context: {cust_data}
    Goal/Query from user: "{query}"
    
    Generate 4 distinct marketing future scenarios based EXACTLY on the goal.
    Return a JSON object with a single key "scenarios" containing a list of 4 objects.
    Each object must have:
    {{
        "name": "Scenario A: [Action]",
        "projected_revenue": 100.0,
        "conversion_rate": 0.15,
        "retention_impact": 0.05,
        "confidence_score": 0.85
    }}
    If the goal is crazy (e.g., "send a physical cake"), make the scenarios reflect that exactly!
    """

    data = generate_structured_json(prompt, {})
    scen_list = data.get("scenarios", [])
    
    # Fallback
    if not scen_list or len(scen_list) < 4:
        scen_list = [
            {"name": "Scenario A: Default Action 1", "projected_revenue": 120.0, "conversion_rate": 0.15, "retention_impact": 0.05, "confidence_score": 0.85},
            {"name": "Scenario B: Default Action 2", "projected_revenue": 80.0, "conversion_rate": 0.08, "retention_impact": 0.02, "confidence_score": 0.92},
            {"name": "Scenario C: Default Action 3", "projected_revenue": 95.0, "conversion_rate": 0.25, "retention_impact": 0.10, "confidence_score": 0.78},
            {"name": "Scenario D: Default Action 4", "projected_revenue": 0.0, "conversion_rate": 0.0, "retention_impact": -0.05, "confidence_score": 0.95},
        ]

    scenarios = []
    for s in scen_list[:4]:
        scen = Scenario(
            simulation_id=sim.id,
            name=s.get("name", "Unknown"),
            projected_revenue=float(s.get("projected_revenue", 0.0)),
            conversion_rate=float(s.get("conversion_rate", 0.0)),
            retention_impact=float(s.get("retention_impact", 0.0)),
            confidence_score=float(s.get("confidence_score", 0.0))
        )
        scenarios.append(scen)
        
    db.add_all(scenarios)
    db.commit()
    
    return sim, scenarios
