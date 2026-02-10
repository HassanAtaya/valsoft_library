from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)


@app.route('/api/ai/ask', methods=['POST'])
def ask_ai():
    """
    Receives AIDTO from Angular frontend:
    {
        "prompt_ai_books": "PREFERENCES: ... ____ BOOKS: ... ___ prompt",
        "key_ai": "openai_api_key"
    }
    Calls OpenAI and returns the response.
    """
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    prompt = data.get('prompt_ai_books', '')
    key = data.get('key_ai', '')

    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    if not key or key == 'No_key':
        return jsonify({'error': 'Please configure a valid OpenAI API key in the AI Keys settings.'}), 400

    try:
        client = OpenAI(api_key=key)

        response = client.responses.create(
            model="gpt-4.1-mini",
            input=prompt
        )

        return jsonify({'response': response.output_text})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'UP'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
