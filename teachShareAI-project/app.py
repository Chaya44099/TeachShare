import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

from routes.classify import classify_bp
from routes.summarize import summarize_bp
from routes.questions import questions_bp

app.register_blueprint(classify_bp)
app.register_blueprint(summarize_bp)
app.register_blueprint(questions_bp)

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
