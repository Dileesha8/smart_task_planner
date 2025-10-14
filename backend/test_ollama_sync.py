# backend/test_ollama_sync.py
import subprocess, sys, time

prompt = "Test: reply 'ok' in one sentence.\n"  # NOTE trailing newline
print("Running ollama synchronously... (may cold-start the model)")
try:
    p = subprocess.run(
        ["ollama", "run", "mistral"],
        input=prompt.encode(),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        timeout=600
    )
    print("RETURN CODE:", p.returncode)
    print("--- STDOUT (first 8000 chars) ---")
    print(p.stdout.decode(errors="ignore")[:8000])
    print("--- STDERR (first 8000 chars) ---")
    print(p.stderr.decode(errors="ignore")[:8000])
except subprocess.TimeoutExpired:
    print("TIMEOUT (no response within 600s)")
except Exception as e:
    print("EXCEPTION:", repr(e))
