from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from models.schemas import ScoreResponse
from services.score_engine import generate_unified_score

router = APIRouter()

@router.post("/generate/{customer_id}", response_model=ScoreResponse)
def generate_score(customer_id: str, db: Session = Depends(get_db)):
    score = generate_unified_score(customer_id, db)
    return score
