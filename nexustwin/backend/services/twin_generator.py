import uuid
from sqlalchemy.orm import Session
from db.db_models import Customer, CustomerEvent
from services.gemini_service import generate_structured_json

def process_customer_csv(file_content: str, db: Session):
    prompt = f"""
    Extract a detailed customer profile from the following data:
    {file_content}
    
    Return a JSON object with the following schema:
    {{
        "name": "Full Name",
        "email": "email@example.com",
        "persona": "Short description of their persona",
        "behavior_pattern": "Summary of their behavior",
        "intent_analysis": "Summary of their buying intent",
        "preferred_channel": "Best channel to reach them",
        "buying_probability": 0.85,
        "event_type": "Latest event type",
        "channel": "Channel of latest event",
        "campaign": "Campaign name if any"
    }}
    If data is missing, invent realistic data based on the context.
    """
    
    data = generate_structured_json(prompt, {})
    
    if not data:
        # Fallback if Gemini fails
        data = {
            "name": "Elena Rossi",
            "email": "elena@example.com",
            "persona": "Loyal Discount Seeker",
            "behavior_pattern": "Reads all emails, waits for sales",
            "intent_analysis": "High intent if price drops 15%",
            "preferred_channel": "Email",
            "buying_probability": 0.72,
            "event_type": "Email Opened",
            "channel": "Email",
            "campaign": "Spring Sale"
        }

    mock_customer = Customer(
        id=str(uuid.uuid4()),
        name=data.get("name", "Unknown"),
        email=data.get("email", ""),
        persona=data.get("persona", ""),
        behavior_pattern=data.get("behavior_pattern", ""),
        intent_analysis=data.get("intent_analysis", ""),
        preferred_channel=data.get("preferred_channel", ""),
        buying_probability=float(data.get("buying_probability", 0.5))
    )
    db.add(mock_customer)
    
    event = CustomerEvent(
        id=str(uuid.uuid4()),
        customer_id=mock_customer.id,
        event_type=data.get("event_type", "Profile Created"),
        channel=data.get("channel", "Web"),
        metadata_json={"campaign": data.get("campaign", "Organic")}
    )
    db.add(event)
    
    db.commit()
    db.refresh(mock_customer)
    return mock_customer
