from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from models.schemas import SimulationGenerateRequest, SimulationResponse
from services.future_simulator import generate_scenarios
from db.db_models import Simulation

router = APIRouter()

@router.post("/generate", response_model=SimulationResponse)
def generate_simulation(req: SimulationGenerateRequest, db: Session = Depends(get_db)):
    sim, scenarios = generate_scenarios(req.customer_id, req.query, db)
    db.refresh(sim)
    return sim

@router.get("/{simulation_id}", response_model=SimulationResponse)
def get_simulation(simulation_id: str, db: Session = Depends(get_db)):
    sim = db.query(Simulation).filter(Simulation.id == simulation_id).first()
    if not sim:
        raise HTTPException(status_code=404, detail="Simulation not found")
    return sim
