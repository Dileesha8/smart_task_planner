import asyncio
import json
import re
import time
import subprocess
import shutil
import traceback
from datetime import datetime, timedelta
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, Dict

app = FastAPI()

# Allow frontend at localhost:5173 to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Use absolute Ollama path for stability
OLLAMA_EXE = shutil.which("ollama") or r"C:\Users\Smaranika Dutta\AppData\Local\Programs\Ollama\ollama.exe"
print(f"[startup] Using OLLAMA_EXE = {OLLAMA_EXE}")

# -------------------------------
# Data Model
# -------------------------------
class GoalInput(BaseModel):
    goal: str

# -------------------------------
# Prompt builder
# -------------------------------
def build_prompt(goal_text: str) -> str:
    prompt = f"""
You are an expert project manager. Output VALID JSON ONLY (no commentary).
Return an object with keys: goal, totalDuration (days), estimatedCompletion (ISO date), tasks (array),
and analysis (object). Tasks must have: id,title,description,phase,startDay,duration,dependencies,priority,effort.
Goal: \"\"\"{goal_text}\"\"\".
"""
    return prompt.strip()

# -------------------------------
# Helper: Run Ollama asynchronously
# -------------------------------
async def run_ollama_async(prompt: str, timeout: int = 600) -> str:
    proc = await asyncio.create_subprocess_exec(
        OLLAMA_EXE, "run", "mistral",
        stdin=asyncio.subprocess.PIPE,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )

    try:
        out, err = await asyncio.wait_for(proc.communicate(prompt.encode("utf-8")), timeout=timeout)
    except asyncio.TimeoutError:
        proc.kill()
        raise asyncio.TimeoutError("LLM timed out")

    stdout = out.decode("utf-8", errors="ignore")
    stderr = err.decode("utf-8", errors="ignore")

    if proc.returncode != 0:
        raise RuntimeError(
            f"llm rc={proc.returncode}\n---STDOUT---\n{stdout[:2000]}\n---STDERR---\n{stderr[:2000]}"
        )
    return stdout

# -------------------------------
# Helper: Extract JSON safely
# -------------------------------
def extract_json_from_text(text: str) -> Dict[str, Any]:
    start = text.find("{")
    if start == -1:
        raise ValueError("No JSON object found in model output")

    depth = 0
    for i in range(start, len(text)):
        if text[i] == "{":
            depth += 1
        elif text[i] == "}":
            depth -= 1
            if depth == 0:
                json_str = text[start: i + 1]
                try:
                    return json.loads(json_str)
                except json.JSONDecodeError:
                    cleaned = re.sub(r",(\s*[}\]])", r"\1", json_str)
                    return json.loads(cleaned)
    raise ValueError("Could not extract balanced JSON from model output")

# -------------------------------
# Warm-up at startup
# -------------------------------
@app.on_event("startup")
async def warm_mistral():
    """Warm the model at startup and print full diagnostics if it fails."""
    try:
        print(f"[{datetime.utcnow().isoformat()}] warming mistral via {OLLAMA_EXE} ...")

        p = subprocess.run(
            [OLLAMA_EXE, "run", "mistral"],
            input=b"Warmup: reply 'ready' in one word.\n",
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=300,
        )

        print(f"[{datetime.utcnow().isoformat()}] warm-up rc={p.returncode}")
        print("--- WARMUP STDOUT ---")
        print(p.stdout.decode(errors="ignore")[:1000])
        print("--- WARMUP STDERR ---")
        print(p.stderr.decode(errors="ignore")[:1000])

        if p.returncode != 0:
            raise RuntimeError(f"Warmup returned rc={p.returncode}")

        app.state.mistral_warm = True
        print(f"[{datetime.utcnow().isoformat()}] ✅ Mistral warm-up complete.")
    except Exception as e:
        app.state.mistral_warm = False
        print(f"[{datetime.utcnow().isoformat()}] ❌ Mistral warm-up failed: {e}")
        print(traceback.format_exc())

# -------------------------------
# Health check
# -------------------------------
@app.get("/health")
def health():
    return {"ok": True, "mistral_warm": getattr(app.state, "mistral_warm", False)}

# -------------------------------
# Main endpoint
# -------------------------------
@app.post("/api/generate-plan")
async def generate_plan(payload: GoalInput):
    goal_text = payload.goal
    print(f"[{datetime.utcnow().isoformat()}] /api/generate-plan START, goal={goal_text}")

    prompt = build_prompt(goal_text)
    start_t = time.time()

    try:
        output_text = await run_ollama_async(prompt, timeout=600)
    except asyncio.TimeoutError:
        elapsed = time.time() - start_t
        print(f"[{datetime.utcnow().isoformat()}] ❌ LLM timed out after {elapsed:.1f}s")
        raise HTTPException(status_code=504, detail="LLM timed out")
    except Exception as e:
        print(f"[{datetime.utcnow().isoformat()}] ❌ LLM exception: {e}")
        raise HTTPException(status_code=500, detail=f"LLM failed: {e}")

    elapsed = time.time() - start_t
    print(f"[{datetime.utcnow().isoformat()}] ✅ LLM returned in {elapsed:.1f}s; attempting JSON parse...")

    # 🔍 Add detailed output inspection
    print("=== FULL RAW MISTRAL OUTPUT START ===")
    print(output_text[:4000])  # Show first 4K characters for debugging
    print("=== FULL RAW MISTRAL OUTPUT END ===")

    # 🧩 Retry if model didn’t return JSON
    if len(output_text.strip()) < 20 or "{" not in output_text:
        print("[warn] Model returned no JSON; retrying with explicit instruction...")
        retry_prompt = f"""
You must return ONLY valid JSON. Do not explain. Do not add commentary.
Format:
{{
  "goal": "string",
  "totalDuration": number,
  "estimatedCompletion": "YYYY-MM-DD",
  "tasks": [{{"id": number, "title": "string", "description": "string", "phase": "string",
              "startDay": number, "duration": number, "dependencies": [], "priority": "low|medium|high", "effort": "low|medium|high"}}],
  "analysis": {{"complexity": "string", "totalTasks": number, "recommendations": []}}
}}
Goal: "{goal_text}"
"""
        try:
            output_text = await run_ollama_async(retry_prompt, timeout=300)
            print("[retry] Model responded after retry.")
            print(output_text[:2000])
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"LLM failed after retry: {e}")

    try:
        plan = extract_json_from_text(output_text)
    except Exception as e:
        print(f"[{datetime.utcnow().isoformat()}] ❌ JSON parse failed: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Failed to parse JSON from LLM output",
                "parse_error": str(e),
                "raw_output": output_text[:2000],
            },
        )

    # ✅ Normalize and validate
    try:
        plan["totalDuration"] = int(plan.get("totalDuration", 0))

        # ✅ Ensure completion date is valid and in the future
        try:
            comp_date_str = plan.get("estimatedCompletion")
            if comp_date_str:
                comp_date = datetime.fromisoformat(comp_date_str.split("T")[0])
                if comp_date < datetime.utcnow():
                    # If AI gave a past date, fix it
                    comp_date = datetime.utcnow() + timedelta(days=plan["totalDuration"])
            else:
                comp_date = datetime.utcnow() + timedelta(days=plan["totalDuration"])
            plan["estimatedCompletion"] = comp_date.date().isoformat()
        except Exception:
            plan["estimatedCompletion"] = (
                datetime.utcnow() + timedelta(days=plan["totalDuration"])
            ).date().isoformat()

        tasks = plan.get("tasks", [])
        if not isinstance(tasks, list):
            raise ValueError("tasks must be an array")

        # Safe integer conversion for inconsistent types
        def safe_int(value, default=0):
            try:
                return int(value)
            except (ValueError, TypeError):
                return default

        for t in tasks:
            t["id"] = safe_int(t.get("id", 0))
            t["startDay"] = safe_int(t.get("startDay", 0))
            t["duration"] = safe_int(t.get("duration", 1))
            t["dependencies"] = list(t.get("dependencies", []) or [])
            t["priority"] = str(t.get("priority", "medium")).lower()
            t["effort"] = str(t.get("effort", "medium")).lower()

    except Exception as e:
        print("❌ Post-processing error:", e)
        raise HTTPException(status_code=500, detail=f"Post-processing error: {e}")

    print(f"[{datetime.utcnow().isoformat()}] ✅ Plan successfully generated for: {goal_text}")
    return plan
