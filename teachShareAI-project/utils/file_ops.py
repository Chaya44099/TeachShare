import os
import requests
from docx import Document
import PyPDF2

def download_file(url, local_path):
    response = requests.get(url, stream=True, verify=False)
    response.raise_for_status()
    with open(local_path, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)

def read_txt_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def read_docx_file(file_path):
    doc = Document(file_path)
    return '\\n'.join([para.text for para in doc.paragraphs])

def read_pdf_file(file_path):
    text = ''
    with open(file_path, 'rb') as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            text += page.extract_text() or ''
    return text

def read_file_by_extension(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    if ext == '.txt':
        return read_txt_file(file_path)
    elif ext == '.docx':
        return read_docx_file(file_path)
    elif ext == '.pdf':
        return read_pdf_file(file_path)
    else:
        return read_txt_file(file_path)

def split_questions_to_list(questions_text: str) -> list[str]:
    lines = questions_text.strip().split('\n')
    result = []
    for line in lines:
        line = line.strip()
        if not line:
            continue
        # מסיר מספרים בהתחלה (1. 2. או 1) אם יש
        if line[0].isdigit():
            line = line.lstrip("0123456789. ").strip()
        result.append(line)
    return result
