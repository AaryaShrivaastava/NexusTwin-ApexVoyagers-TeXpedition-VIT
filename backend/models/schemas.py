from pydantic import BaseModel
from typing import List, Optional, Any, Dict
from datetime import datetime

class CustomerEventBase(BaseModel):
    event_type: str
    channel: Optional[str] = None
    metadata_json: Optional[Dict[str, Any]] = None

class CustomerEventResponse(CustomerEventBase):
    id: str
    customer_id: str
    event_timestamp: datetime

    class Config:
        from_attributes = True

class ScoreResponse(BaseModel):
    revenue_score: float
    retention_score: float
    engagement_score: float
    response_score: float
    satisfaction_score: float
    unified_score: float

    class Config:
        from_attributes = True

class CustomerResponse(BaseModel):
    id: str
    name: str
    email: str
    persona: str
    behavior_pattern: str
    intent_analysis: str
    preferred_channel: str
    buying_probability: float
    created_at: datetime
    events: List[CustomerEventResponse] = []
    score: Optional[ScoreResponse] = None

    class Config:
        from_attributes = True

class ScenarioResponse(BaseModel):
    id: str
    name: str
    projected_revenue: float
    conversion_rate: float
    retention_impact: float
    confidence_score: float

    class Config:
        from_attributes = True

class AgentDecisionResponse(BaseModel):
    agent_role: str
    message: str
    timestamp: datetime

    class Config:
        from_attributes = True

class SimulationResponse(BaseModel):
    id: str
    customer_id: str
    query: str
    status: str
    recommended_action: Optional[str] = None
    future_confidence_index: Optional[float] = None
    created_at: datetime
    scenarios: List[ScenarioResponse] = []
    agent_decisions: List[AgentDecisionResponse] = []

    class Config:
        from_attributes = True

class SimulationGenerateRequest(BaseModel):
    customer_id: str
    query: str

class CouncilRunRequest(BaseModel):
    simulation_id: str
