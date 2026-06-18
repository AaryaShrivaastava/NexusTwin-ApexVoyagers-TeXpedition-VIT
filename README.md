<div align="center">
  <img src="https://img.shields.io/badge/Status-Hackathon_Ready-blueviolet?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Tech-Next.js_15_|_FastAPI_|_LangGraph-black?style=for-the-badge" alt="Tech Stack" />
  <img src="https://img.shields.io/badge/AI-Google_Gemini-orange?style=for-the-badge" alt="AI" />
  
  <br />
  <br />

  <h1>🌌 NexusTwin: RealityOS</h1>
  <p><strong>"One Customer. Infinite Futures. AI Chooses The Best One."</strong></p>
  <br />
</div>

## 🚀 The Vision

RealityOS is not a CRM. RealityOS is not a marketing dashboard.

RealityOS is an **AI-powered Customer Future Simulation and Decision Engine.** 

Instead of asking *"Who is this customer?"*, we help businesses answer: *"What future should we create for this customer?"*

Our system builds a live digital twin of a customer, generates multiple predictive future actions using generative AI, runs autonomous AI-agent debates to critique the outcomes, and recommends the mathematically best path to maximize revenue and retention before you spend a single dollar.

Built to directly solve:
- **Hyper-Personalization At Scale**
- **Seamless Cross-Channel Experiences**

---

## ✨ Core Engines

1. **🧬 Customer Reality Twin Engine**
   Takes raw, unstructured event data (e.g. "Added shoes to cart, abandoned 12 hours ago") and uses **Gemini 2.5 Flash** to extract structured psychological profiles, buying probabilities, and behavioral intent.

2. **🔮 Future Simulator Engine**
   Input an objective (e.g., "Win them back without losing margin"), and our engine generates 4 distinctly unique marketing scenarios complete with predicted conversion rates, projected revenue, and retention impact.

3. **🤖 Autonomous Marketing Council (Powered by LangGraph)**
   A multi-agent orchestrated debate. Instead of a single LLM prompt, we spawn 4 specialized AI personas:
   - **Growth Agent:** Fights for maximum immediate revenue.
   - **Finance Agent:** Fights against margin erosion and discounts.
   - **Customer Experience Agent:** Fights against spam and annoyance.
   - **Brand Safety Agent:** Protects premium brand positioning.
   
   A **Consensus Builder** node synthesizes the live debate to select the ultimate winning scenario.

4. **🎯 Success Score Engine**
   Calculates a unified 0-100 Confidence Index summarizing the predictive success of the chosen future.

---

## 🛠 Tech Stack

**Frontend**
- Next.js 15 (App Router)
- React 19 & TypeScript
- Tailwind CSS v4 & shadcn/ui
- Framer Motion (Heavy use of animations and glassmorphism)
- Zustand (Global State)

**Backend**
- Python 3.10+
- FastAPI
- LangGraph (Agentic state machines)
- Google Gemini API (Generative structured JSON)
- SQLite & SQLAlchemy (Data persistence)

---

## 💻 Running Locally

You'll need two terminal windows to run the frontend and backend simultaneously.

### 1. Setup the Backend API (FastAPI)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install python-multipart
```
**Environment Variables:**
Create a `.env` file in the `backend/` directory with your Gemini Key:
```env
GEMINI_API_KEY="your-gemini-key-here"
```

Start the backend:
```bash
uvicorn main:app --reload
```
*Backend runs on http://localhost:8000*

### 2. Setup the Frontend UI (Next.js)
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on http://localhost:3000*

---

## 🏆 Contributors

Built with ❤️ for the Hackathon by:

- **Aarya Shrivaastava**
- **Tanpreet Singh**
