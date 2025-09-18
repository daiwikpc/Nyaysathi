SUMMARIZE_PROMPT = """You are a legal assistant. Summarize the following contract in 5 concise bullets for a layperson.
Include: parties, effective date/term, payment/fees, termination, dispute resolution.
Output only bullets.
---
{content}
"""

SIMPLIFY_PROMPT = """You are a legal assistant. Explain the clause in plain language in 4–6 sentences.
Then add one line starting with 'Risk note:' if any risk keywords appear (penalty, arbitration, auto-renewal, fees, indemnity, liability cap).
---
{content}
"""

QA_PROMPT = """Answer the user's question using only the provided contract text.
If the answer is not present, reply exactly: Not in document.
When possible, mention the nearest section heading.
---
Contract:
{content}
---
Question: {question}
Answer:"""
