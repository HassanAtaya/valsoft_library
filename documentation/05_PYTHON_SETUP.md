# Python AI Service - Local Setup Guide

## Prerequisites

1. **Python 3.11.9** - Download from [python.org](https://www.python.org/downloads/)
   - Verify: `python --version` should show `Python 3.11.9`
2. **pip** - Comes bundled with Python

## Installation Steps

1. Open a terminal and navigate to the Python folder:
   ```
   cd ai_python
   ```

2. (Recommended) Create a virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate    (Windows)
   source venv/bin/activate  (Linux/Mac)
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the service:
   ```
   python main.py
   ```

5. The service will be available at: `http://localhost:5000`

## API Endpoints

- `POST /api/ai/ask` - Send AI prompt and receive recommendation
  - Body: `{ "prompt_ai_books": "...", "key_ai": "openai_api_key" }`
- `GET /api/health` - Health check

## Notes

- This service is ONLY used for the OpenAI integration
- You need a valid OpenAI API key configured in the application's AI Keys settings
- The service uses the `gpt-4.1-mini` model via OpenAI's Responses API
