📝 README.md
# 🧠 Smart Task Planner

**Smart Task Planner** is an AI-powered productivity assistant that helps you break down big goals into actionable, time-bound tasks.  
You simply enter your goal (e.g., “Launch a product in 2 weeks”), and the planner generates a structured task plan with dependencies and deadlines.

---

## 🚀 Features

- 🧩 AI-based task breakdown and timeline generation  
- 📅 Intelligent scheduling and dependency management  
- 🗂️ Optional database for saving and retrieving plans  
- 💬 REST API for easy integration with any frontend  
- ⚡ Fast and simple Flask backend  

---

## 🏗️ Tech Stack

- **Backend:** Python (Flask)
- **Database:** SQLite / PostgreSQL (optional)
- **Frontend:** (Optional) React / HTML + JS
- **AI Engine:** LLM-based reasoning for task generation

---

## ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dileesha8/smart_task_planner.git
   cd smart_task_planner


Create a virtual environment (recommended):

python -m venv venv
venv\Scripts\activate       # On Windows
# or
source venv/bin/activate    # On Mac/Linux


Install dependencies:

pip install -r requirements.txt


Run the Flask app:

python app.py


The app will start at:
🔗 http://127.0.0.1:5000

🧭 API Endpoints (Example)
Method	Endpoint	Description
POST	/api/plan	Generate a task plan from goal text
GET	/api/tasks	Retrieve all tasks
DELETE	/api/tasks/<id>	Delete a specific task
💡 Example Usage

POST Request:

{
  "goal": "Launch a mobile app in 2 weeks"
}


Response:

{
  "goal": "Launch a mobile app in 2 weeks",
  "tasks": [
    {"task": "Define app requirements", "duration": "2 days"},
    {"task": "Design UI/UX", "duration": "3 days"},
    {"task": "Develop backend APIs", "duration": "4 days"},
    {"task": "Testing and bug fixes", "duration": "3 days"},
    {"task": "App store deployment", "duration": "2 days"}
  ]
}
