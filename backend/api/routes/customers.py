from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from db.database import get_db
from db.db_models import Customer
from models.schemas import CustomerResponse
from services.twin_generator import process_customer_csv

router = APIRouter()

@router.post("/upload", response_model=CustomerResponse)
async def upload_customer(file: UploadFile = File(...), db: Session = Depends(get_db)):
    content = await file.read()
    customer = process_customer_csv(content.decode("utf-8"), db)
    return customer

@router.get("/{customer_id}", response_model=CustomerResponse)
def get_customer(customer_id: str, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.get("/", response_model=list[CustomerResponse])
def get_all_customers(db: Session = Depends(get_db)):
    return db.query(Customer).all()
