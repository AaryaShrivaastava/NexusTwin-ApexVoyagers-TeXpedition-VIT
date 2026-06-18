from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import engine, Base
import db.db_models

from api.routes import customers, simulations, council, scores, dashboard

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="NexusTwin RealityOS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For hackathon MVP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(customers.router, prefix="/api/customers", tags=["Customers"])
app.include_router(simulations.router, prefix="/api/simulations", tags=["Simulations"])
app.include_router(council.router, prefix="/api/council", tags=["Council"])
app.include_router(scores.router, prefix="/api/scores", tags=["Scores"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])

@app.get("/")
def read_root():
    return {"status": "RealityOS Backend is running"}
