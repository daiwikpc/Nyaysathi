from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Literal
from .extract import extract_text, split_sections, highlight_risks
from .prompts import SUMMARIZE_PROMPT, SIMPLIFY_PROMPT, QA_PROMPT
from .ollama_client import generate

app = FastAPI(title="Local Legal Assistant API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"ok": True}

class AnalyzeBody(BaseModel):
    mode: Literal["summarize","simplify","qa"]
    text: Optional[str] = None
    question: Optional[str] = None
    model: Optional[str] = "llama3.2"

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    raw = await file.read()
    text = extract_text(raw, file.filename)
    sections = split_sections(text)
    risks = highlight_risks(text)
    return {"text": text, "sections": sections, "risks": risks}

@app.post("/analyze")
async def analyze(body: AnalyzeBody):
    if not body.text:
        return {"error":"text required"}
    if body.mode == "summarize":
        prompt = SUMMARIZE_PROMPT.format(content=body.text[:120000])
        out = generate(prompt, model=body.model, options={"temperature":0.3, "num_predict":512})
        return {"result": out}
    if body.mode == "simplify":
        prompt = SIMPLIFY_PROMPT.format(content=body.text[:16000])
        out = generate(prompt, model=body.model, options={"temperature":0.3, "num_predict":400})
        return {"result": out}
    if body.mode == "qa":
        q = body.question or ""
        prompt = QA_PROMPT.format(content=body.text[:120000], question=q)
        out = generate(prompt, model=body.model, options={"temperature":0.2, "num_predict":384})
        return {"result": out}
    return {"error":"unsupported mode"}
