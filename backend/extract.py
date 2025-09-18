from typing import List, Tuple
from io import BytesIO
from pypdf import PdfReader
from docx import Document as DocxDocument
import re

RISK_KEYWORDS = ["penalty","arbitration","auto-renewal","late fee","indemnity","liability","termination","non-compete","confidentiality","jurisdiction","governing law","assignment","renewal","fees"]

def extract_text(file_bytes: bytes, filename: str) -> str:
    name = filename.lower()
    if name.endswith(".pdf"):
        reader = PdfReader(BytesIO(file_bytes))
        pages = []
        for p in reader.pages:
            pages.append(p.extract_text() or "")
        return "\n\n".join(pages)
    if name.endswith(".docx"):
        doc = DocxDocument(BytesIO(file_bytes))
        return "\n".join([p.text for p in doc.paragraphs])
    if name.endswith(".txt"):
        return file_bytes.decode("utf-8", errors="ignore")
    raise ValueError("Unsupported file type. Use PDF, DOCX, or TXT.")

def split_sections(text: str) -> List[Tuple[str,str]]:
    lines = text.splitlines()
    sections: List[Tuple[str,str]] = []
    current_title = "Preamble"
    buf = []
    heading_re = re.compile(r"^(\d+(\.\d+)*)[.)\s-]+(.{3,})$|^(SECTION\s+\d+[:.\s-]+.*)$|^[A-Z][A-Z \-]{4,}$")
    for line in lines:
        s = line.strip()
        if heading_re.match(s):
            if buf:
                sections.append((current_title, "\n".join(buf).strip()))
                buf = []
            current_title = s
        else:
            buf.append(line)
    if buf:
        sections.append((current_title, "\n".join(buf).strip()))
    return sections

def highlight_risks(text: str):
    hits = []
    lower = text.lower()
    for kw in RISK_KEYWORDS:
        idx = lower.find(kw)
        if idx != -1:
            hits.append((kw, idx))
    return hits
