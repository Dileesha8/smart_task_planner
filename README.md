#  Smart Task Planner

**Smart Task Planner** is an AI-powered productivity assistant that helps you break down big goals into actionable, time-bound tasks.  
You simply enter your goal (e.g., “Launch a product in 2 weeks”), and the planner generates a structured task plan with dependencies and deadlines.

---
## Features

 AI-generated task breakdowns
 Dynamic timeline estimation
 Phase-wise dependency management
 Risk and recommendation analysis
 Beautiful TailwindCSS UI
 Full offline LLM processing using Ollama (Mistral 7B)
 Separate frontend (React + Vite) and backend (FastAPI) architecture
---

## Tech Stack
 AI/LLM	-Ollama with Mistral 7B
 Backend API	-FastAPI (Python 3.10+)
 Frontend	-React + Vite + TailwindCSS
 Version Control-	Git + GitHub
 CORS + JSON Validation-	FastAPI Middleware + Pydantic
---
## ⚙️ Installation
 1️. Prerequisites — Install these first
    Install Python 3.10+
    Install Node.js (LTS version)
       Verify installation: node -v , npm -v
    Install Ollama
      Ollama runs the Mistral 7B AI model locally (no API key needed).

  2.  Download and Setup the Project
    Clone the Repository:
      git clone https://github.com/dileesha8/smart-task-planner.git
    cd smart-task-planner
    Backend Setup (FastAPI + Mistral)
--> Go to backend folder:
     cd backend
--> Create a Python virtual environment:
     python -m venv .venv

  3️. Activate the environment:

On Windows: .venv\Scripts\activate
On Mac/Linux: source .venv/bin/activate

  4️. Install required dependencies:
pip install fastapi uvicorn pydantic
Pull the Mistral 7B model (first time only):

ollama pull mistral
This downloads the ~4.4 GB Mistral model.

6️⃣ Start the backend server:

python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
✅ Expected output:

Uvicorn running on http://127.0.0.1:8000
Mistral warm-up complete.
7️⃣ Test the backend health:

curl http://127.0.0.1:8000/health
Should return:

{"ok": true, "mistral_warm": true}
💻 4️⃣ Frontend Setup (React + Tailwind + Vite)
1️⃣ Open a new terminal (keep backend running), then go to:

cd frontend
2️⃣ Install frontend dependencies:

npm install
3️⃣ Start the React app:

npm run dev
✅ You’ll see:

VITE v7.x  ready in 1200 ms
Local: http://localhost:5173/
4️⃣ Open your browser and visit:
👉 http://localhost:5173



