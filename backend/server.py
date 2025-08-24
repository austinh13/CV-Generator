from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173",
                   "https://cv-generator-two-gules.vercel.app"
                   ])  # your frontend URL

@app.route("/api/rewrite-description", methods=["POST"])
def rewrite_description():
    data = request.get_json()
    description = data.get("description", "")
    try:
        response = openai.responses.create(
            model="gpt-4.1-mini",
            input=f"Rewrite this job description more professionally in under 125 characters:\n{description}"
        )
        return jsonify({"rewritten": response.output_text})
    except Exception as e:
        print(e)
        return jsonify({"error": "OpenAI request failed"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
