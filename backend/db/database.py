import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# For hackathon MVP, use a local SQLite DB
SQLITE_URL = "sqlite:///./realityos.db"

engine = create_engine(SQLITE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
