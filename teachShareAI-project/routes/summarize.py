import os
import tempfile
from flask import Blueprint, request, jsonify
from utils.file_ops import download_file, read_file_by_extension
from services.openai_service import summarize_text
from dotenv import load_dotenv
from httpx import Client, Timeout, Limits
from openai import OpenAI

summarize_bp = Blueprint('summarize', __name__)

load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')
http_client = Client(verify=False, timeout=Timeout(10.0), limits=Limits(max_connections=5))
client = OpenAI(api_key=api_key, http_client=http_client)

@summarize_bp.route('/summarize-file', methods=['POST'])
def summarize_file_endpoint():
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
            summary = summarize_text(client, content)
            if summary:
                return jsonify({"summary": summary})
            else:
                return jsonify({"error": "No response from summary API"}), 500
    except Exception as e:
        return jsonify({"error": f"Error processing file: {str(e)}"}), 400
