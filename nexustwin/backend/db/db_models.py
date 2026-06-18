import uuid
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from .database import Base

def generate_uuid():
    return str(uuid.uuid4())

class Customer(Base):
    __tablename__ = "customers"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    persona = Column(String, nullable=False)
    behavior_pattern = Column(String, nullable=False)
    intent_analysis = Column(String, nullable=False)
    preferred_channel = Column(String, nullable=False)
    buying_probability = Column(Float, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    events = relationship("CustomerEvent", back_populates="customer")
    simulations = relationship("Simulation", back_populates="customer")
    score = relationship("Score", back_populates="customer", uselist=False)

class CustomerEvent(Base):
    __tablename__ = "customer_events"

    id = Column(String, primary_key=True, default=generate_uuid)
    customer_id = Column(String, ForeignKey("customers.id"))
    event_type = Column(String, nullable=False)
    channel = Column(String)
    event_timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    metadata_json = Column(JSON)

    customer = relationship("Customer", back_populates="events")

class Simulation(Base):
    __tablename__ = "simulations"

    id = Column(String, primary_key=True, default=generate_uuid)
    customer_id = Column(String, ForeignKey("customers.id"))
    query = Column(String, nullable=False)
    status = Column(String, default="pending")
    recommended_action = Column(String)
    future_confidence_index = Column(Float)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    customer = relationship("Customer", back_populates="simulations")
    scenarios = relationship("Scenario", back_populates="simulation")
    agent_decisions = relationship("AgentDecision", back_populates="simulation")

class Scenario(Base):
    __tablename__ = "scenarios"

    id = Column(String, primary_key=True, default=generate_uuid)
    simulation_id = Column(String, ForeignKey("simulations.id"))
    name = Column(String, nullable=False) # e.g., "Scenario A: Email Campaign"
    projected_revenue = Column(Float, nullable=False)
    conversion_rate = Column(Float, nullable=False)
    retention_impact = Column(Float, nullable=False)
    confidence_score = Column(Float, nullable=False)

    simulation = relationship("Simulation", back_populates="scenarios")

class AgentDecision(Base):
    __tablename__ = "agent_decisions"

    id = Column(String, primary_key=True, default=generate_uuid)
    simulation_id = Column(String, ForeignKey("simulations.id"))
    agent_role = Column(String, nullable=False) # Growth, Finance, Customer, Brand
    message = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    simulation = relationship("Simulation", back_populates="agent_decisions")

class Score(Base):
    __tablename__ = "scores"

    id = Column(String, primary_key=True, default=generate_uuid)
    customer_id = Column(String, ForeignKey("customers.id"), unique=True)
    revenue_score = Column(Float, default=0.0)
    retention_score = Column(Float, default=0.0)
    engagement_score = Column(Float, default=0.0)
    response_score = Column(Float, default=0.0)
    satisfaction_score = Column(Float, default=0.0)
    unified_score = Column(Float, default=0.0)

    customer = relationship("Customer", back_populates="score")
