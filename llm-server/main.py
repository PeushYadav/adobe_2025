from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM

app = FastAPI()

# Load Tiny LLM
model_name = "weiser/30M-0.4"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

class InputText(BaseModel):
    text: str

@app.post("/generate")
async def generate(input_data: InputText):
    prompt = f"""
Extract headings and subheadings from this document and return JSON like:

{{
  "title": "Document Title",
  "headings": [
    {{
      "heading": "Main Heading",
      "subheadings": ["Sub 1", "Sub 2"]
    }}
  ]
}}

Text:
{input_data.text}

Output:
"""

    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(
        **inputs,
        max_new_tokens=256,
        temperature=0.8,
        do_sample=True,
        pad_token_id=tokenizer.eos_token_id
    )

    decoded = tokenizer.decode(outputs[0], skip_special_tokens=True)

    try:
        json_start = decoded.find("{")
        json_text = decoded[json_start:]
        return {"json": json_text}
    except Exception as e:
        return {"error": "Could not parse JSON", "raw": decoded}
