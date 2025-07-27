from transformers import AutoModelForCausalLM, AutoTokenizer

model_id = "weiser/30M-0.4"

print("🔄 Downloading model and tokenizer...")

tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)

print("✅ Done! Model is cached locally.")
