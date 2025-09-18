import requests
from typing import Optional

OLLAMA_URL = "http://localhost:11434/api/generate"

def generate(prompt: str, model: str = "llama3.2", stream: bool = False, options: Optional[dict]=None) -> str:
    payload = {"model": model, "prompt": prompt, "stream": stream}
    if options:
        payload["options"] = options
    resp = requests.post(OLLAMA_URL, json=payload, timeout=600)
    resp.raise_for_status()
    return resp.json().get("response","").strip()
