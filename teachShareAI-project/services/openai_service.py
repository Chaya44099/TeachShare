from openai import OpenAI

def build_prompt_classification(text, categories):
    category_list = '\"' + '\", \"'.join(categories) + '\"'
    return f'''
Classify the following Hebrew educational text into exactly ONE of the following categories.
Respond with only the name of the selected category in Hebrew, no explanation.

Available categories: [{category_list}]

Text:
---
{text}
'''.strip()

def build_prompt_summary(text):
    return f'''
Summarize the following Hebrew educational text into 5ג€“7 concise sentences. Use clear and fluent Hebrew.

Text:
---
{text}
'''.strip()

def build_prompt_questions(text):
    return f'''
Generate 3 educational and thought-provoking questions in Hebrew based on the following text.
The questions should be clear, relevant, and suitable for classroom discussion.

Text:
---
{text}
'''.strip()

def classify_text(client, text, categories):
    prompt = build_prompt_classification(text, categories)
    messages = [
        { "role": "system", "content": "You are a precise and helpful educational text classifier." },
        { "role": "user", "content": prompt }
    ]
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        temperature=0
    )
    return response.choices[0].message.content.strip()

def summarize_text(client, text):
    prompt = build_prompt_summary(text)
    messages = [
        { "role": "system", "content": "You are a Hebrew educational text summarizer." },
        { "role": "user", "content": prompt }
    ]
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        temperature=0.3
    )
    return response.choices[0].message.content.strip()

def generate_questions(client, text):
    prompt = build_prompt_questions(text)
    messages = [
        { "role": "system", "content": "You are an expert Hebrew teacher generating comprehension questions." },
        { "role": "user", "content": prompt }
    ]
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        temperature=0.7
    )
    return response.choices[0].message.content.strip()
