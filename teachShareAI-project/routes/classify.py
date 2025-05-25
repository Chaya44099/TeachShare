import os
import tempfile
from flask import Blueprint, request, jsonify
from utils.file_ops import download_file, read_file_by_extension
from services.openai_service import classify_text
from dotenv import load_dotenv
from httpx import Client, Timeout, Limits
from openai import OpenAI

classify_bp = Blueprint('classify', __name__)

load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')
http_client = Client(verify=False, timeout=Timeout(10.0), limits=Limits(max_connections=5))
client = OpenAI(api_key=api_key, http_client=http_client)

categories = [
    "אנגלית", "ביאורי תפילה", "גדולי ישראל", "דקדוק", "הגיל הרך",
    "הבית היהודי", "היסטוריה", "חגים ומועדים", "חינוך וחברה", "זה\"ב",
    "זמרה", "כישורי חיים", "מולדת", "מחשבים", "מתמטיקה", "נביא",
    "עברית ספרות והבעה", "עיתון בית ספרי", "פרקי אבות", "פרשת שבוע",
    "תורה", "שמונה פרקים לרמב\"ם", "אירועים בית ספריים",
]

@classify_bp.route('/classify-file', methods=['POST'])
def classify_file_endpoint():
    try:
        data = request.get_json()
        if not data or 'presigned_url' not in data:
            return jsonify({"error": "Missing 'presigned_url' in JSON body"}), 400
        presigned_url = data['presigned_url']
        filename = presigned_url.split('?')[0].split('/')[-1]
        with tempfile.TemporaryDirectory() as tmpdirname:
            tmp_path = os.path.join(tmpdirname, filename)
            download_file(presigned_url, tmp_path)
            content = read_file_by_extension(tmp_path)
            category = classify_text(client, content, categories)
            if category:
                return jsonify({"category": category})
            else:
                return jsonify({"error": "No response from classification API"}), 500
    except Exception as e:
        return jsonify({"error": f"Error processing file: {str(e)}"}), 400
