import os
import json
from google import genai
from google.genai import types

def get_gemini_client():
    api_key = os.getenv("GEMINI_API_KEY", "mock_key_for_hackathon")
    return genai.Client(api_key=api_key)

def generate_structured_json(prompt: str, schema: dict) -> dict:
    client = get_gemini_client()
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
            ),
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Gemini error: {e}")
        return {}
