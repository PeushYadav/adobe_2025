PDF Structure Extractor using Tiny LLM

Project Overview

This project extracts and restructures the content of a PDF file by identifying headings, subheadings, and
plain text using a lightweight language model (Tiny LLM ~60MB). Due to LLM input token limitations (1024
tokens), large PDFs are broken into manageable chunks before processing. The tool outputs structured
JSON and a final PDF.

Project Structure

pdf-structure-extractor/
pdf-structure-extractor/
├── uploads/ # Stores uploaded PDF files
├── index.js # Main backend entry (Node.js)
├── processpdf.js # Logic to split PDF and manage processing
├── frontend/ # React + Vite frontend
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── ...
├── llm-server/ # FastAPI-based Python LLM handler
│ ├── main.py
│ ├── download_model.py
│ ├── requirements.txt
│ └── ...
Features
- Upload a PDF via UI
- Automatically chunks into ~500-word parts
- Sends to Tiny LLM and extracts structure
- Displays JSON result
- Outputs a structured final PDF
Setup Instructions
1. Clone the Repository:
 git clone https://github.com/your-username/pdf-structure-extractor.git
 cd pdf-structure-extractor
2. Setup Python Environment:
PDF Structure Extractor using Tiny LLM
 cd llm-server
 python -m venv venv
 source venv/bin/activate (Windows: venv\Scripts\activate)
 pip install -r requirements.txt
3. Install Node Dependencies:
 Run 'npm install' in root and 'frontend/' folders.
Running the App
1. Start Node Backend:
 node index.js
2. Start LLM Server:
 cd llm-server
 uvicorn main:app --host 127.0.0.1 --port 8000
3. Start Frontend:
 cd frontend
 npm run dev
How to Use
1. Open the app at http://localhost:5173
2. Upload a PDF
3. Wait for JSON and PDF outputs
4. JSON is displayed; PDF is downloadable
Important Notes
- Tiny LLM has a 1024-token input limit
- We split large PDFs into ~500-word chunks
- Python, pip, and virtualenv are required
- Run 'npm install' in each folder with a package.json
PDF Structure Extractor using Tiny LLM
