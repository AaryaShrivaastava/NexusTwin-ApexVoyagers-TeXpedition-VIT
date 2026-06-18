from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from models.schemas import CouncilRunRequest, SimulationResponse
from agents.council_workflow import run_council_workflow
from db.db_models import Simulation

router = APIRouter()

@router.post("/run", response_model=SimulationResponse)
def run_council(req: CouncilRunRequest, db: Session = Depends(get_db)):
    run_council_workflow(req.simulation_id, db)
    sim = db.query(Simulation).filter(Simulation.id == req.simulation_id).first()
    if not sim:
        raise HTTPException(status_code=404, detail="Simulation not found")
    return sim
