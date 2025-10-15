# Smart Task Planner

**Smart Task Planner** is an AI-powered productivity assistant that helps you break down big goals into actionable, time-bound tasks.  
You simply enter your goal (e.g., "Launch a product in 2 weeks"), and the planner generates a structured task plan with dependencies and deadlines.

---

## Features

- AI-generated task breakdowns  
- Dynamic timeline estimation  
- Phase-wise dependency management  
- Risk and recommendation analysis  
- Beautiful TailwindCSS UI  
- Full offline LLM processing using Ollama (Mistral 7B)  
- Separate frontend (React + Vite) and backend (FastAPI) architecture  

---

## Tech Stack

- **AI/LLM:** Ollama with Mistral 7B  
- **Backend API:** FastAPI (Python 3.10+)  
- **Frontend:** React + Vite + TailwindCSS  
- **Version Control:** Git + GitHub  
- **CORS + JSON Validation:** FastAPI Middleware + Pydantic  

---

## Installation

### 1. Prerequisites

Before getting started, ensure you have the following installed:

- **Python 3.10+**  
  Download from [python.org](https://www.python.org/downloads/)
  
- **Node.js (LTS version)**  
  Download from [nodejs.org](https://nodejs.org/)  
  Verify installation:node -v , npm -v <br>
  Install Ollama<br>
  Ollama runs the Mistral 7B AI model locally (no API key needed).<br>

 ### 2.Download and Setup the Project <br>
 - **Clone the Repository** <br>
      git clone https://github.com/dileesha8/smart-task-planner.git<br>
      cd smart-task-planner<br>
      Backend Setup (FastAPI + Mistral)<br>
      Go to backend folder:<br>
     cd backend<br>
 - **Create a Python virtual environment** <br>
     python -m venv .venv<br>
     
  ### 3️.Activate the environment <br>

On Windows: .venv\Scripts\activate<br>
On Mac/Linux: source .venv/bin/activate<br>

  ### 4️.Install required dependencies <br>
  
pip install fastapi uvicorn pydantic<br>
Pull the Mistral 7B model (first time only):<br>
ollama pull mistral<br>
This downloads the ~4.4 GB Mistral model.<br>

 ### 5.Start the backend server <br>
 
**python -m uvicorn main:app --reload --host 127.0.0.1--port 8000** <br>
✅ Expected output:<br>
Uvicorn running on http://127.0.0.1:8000<br>
Mistral warm-up complete.<br>

### 6.Test the backend health<br>
-curl http://127.0.0.1:8000/health<br>
-Should return:<br>
    {"ok": true, "mistral_warm": true}<br>
    
### 7.Frontend Setup(React+Tailwind+Vite)<br>
- Open a new terminal (keep backend running), then go to: cd frontend<br>
- Install frontend dependencies:<br>
    npm install<br>
    
### 8.Start the React app<br>
-npm run dev<br>
-You’ll see:<br>
   VITE v7.x  ready in 1200 ms<br>
   Local: http://localhost:5173/<br>
   
### 9.Open your browser and visit:<br>
   - http://localhost:5173<br>
   
## Note: I have done This  Assignment in My Friends HP GPU Laptop ( Smaranika Dutta)  Since My configuration is not sufficient to Work on Olama Mistral

# Output Screenshots 
<img width="1600" height="956" alt="image" src="https://github.com/user-attachments/assets/28f47d92-3c8c-4a3d-a45e-b8fc76e48183" />
<img width="1312" height="953" alt="image (1)" src="https://github.com/user-attachments/assets/b357db99-9af0-466b-ace2-06f48c8cf160" />
<img width="1249" height="773" alt="image (2)" src="https://github.com/user-attachments/assets/a7df1d33-cdcb-4bb6-b0ac-aa0c68dc2bec" />
<img width="1040" height="902" alt="image (5)" src="https://github.com/user-attachments/assets/7b88380d-4afe-41aa-b6ae-7f77339d7c3f" />

<img width="1285" height="1003" alt="image (6)" src="https://github.com/user-attachments/assets/62d122ce-df9e-464e-952f-d57d5df4b0b8" />




