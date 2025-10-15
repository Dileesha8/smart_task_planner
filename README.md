#  Smart Task Planner

**Smart Task Planner** is an AI-powered productivity assistant that helps you break down big goals into actionable, time-bound tasks.  
You simply enter your goal (e.g., “Launch a product in 2 weeks”), and the planner generates a structured task plan with dependencies and deadlines.

---
# Features

<small> AI-generated task breakdowns</small><BR>
<small> Dynamic timeline estimation</small><br>
 <small>Phase-wise dependency management</small><br>
 <small>Risk and recommendation analysis</small><br>
<smart> Beautiful TailwindCSS UI</small><br>
<smart> Full offline LLM processing using Ollama (Mistral 7B)</smart><br>
 <smart>Separate frontend (React + Vite) and backend (FastAPI) architecture</smart><br>
---

# Tech Stack

 AI/LLM	-Ollama with Mistral 7B<br>
 Backend API	-FastAPI (Python 3.10+)<br>
 Frontend	-React + Vite + TailwindCSS<br>
 Version Control-	Git + GitHub<br>
 CORS + JSON Validation-	FastAPI Middleware + Pydantic<br>
---
# Installation
 **1️.Prerequisites**<br>
    Install Python 3.10+<br>
    Install Node.js (LTS version)<br>
       Verify installation: node -v , npm -v<br>
    Install Ollama<br>
      Ollama runs the Mistral 7B AI model locally (no API key needed).<br>

  **2.Download and Setup the Project**<br>
 --> Clone the Repository:<br>
      git clone https://github.com/dileesha8/smart-task-planner.git<br>
      cd smart-task-planner<br>
      Backend Setup (FastAPI + Mistral)<br>
--> Go to backend folder:<br>
     cd backend<br>
--> Create a Python virtual environment:<br>
     python -m venv .venv<br>

  **3️.Activate the environment**<br>

On Windows: .venv\Scripts\activate<br>
On Mac/Linux: source .venv/bin/activate<br>

  **4️.Install required dependencies**<br>
pip install fastapi uvicorn pydantic<br>
Pull the Mistral 7B model (first time only):<br>
ollama pull mistral<br>
This downloads the ~4.4 GB Mistral model.<br>

 **5.Start the backend server**<br>
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000<br>
✅ Expected output:<br>
Uvicorn running on http://127.0.0.1:8000<br>
Mistral warm-up complete.<br>

**6.Test the backend health**<br>
-->curl http://127.0.0.1:8000/health<br>
-->Should return:<br>
    {"ok": true, "mistral_warm": true}<br>
    
**7.Frontend Setup(React+Tailwind+Vite)** <br>
--> Open a new terminal (keep backend running), then go to: cd frontend<br>
--> Install frontend dependencies:<br>
    npm install<br>
    
**8.Start the React app**<br>
-->npm run dev<br>
--> You’ll see:<br>
   VITE v7.x  ready in 1200 ms<br>
   Local: http://localhost:5173/<br>
   
**9.Open your browser and visit:** <br>
    http://localhost:5173<br>



