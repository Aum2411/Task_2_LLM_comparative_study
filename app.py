from flask import Flask, render_template, request, jsonify
import os
from groq import Groq

app = Flask(__name__)

# Initialize Groq client
client = Groq(api_key="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")

def get_llm_response_without_system(user_prompt):
    """Get response from LLM with only user prompt"""
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": user_prompt,
                }
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=1024,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"

def get_llm_response_with_system(user_prompt, system_prompt):
    """Get response from LLM with system prompt + user prompt"""
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": user_prompt,
                }
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=1024,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/compare', methods=['POST'])
def compare():
    data = request.json
    user_prompt = data.get('user_prompt', '')
    system_prompt = data.get('system_prompt', '')
    
    if not user_prompt:
        return jsonify({'error': 'User prompt is required'}), 400
    
    # Get response without system prompt
    response_without_system = get_llm_response_without_system(user_prompt)
    
    # Get response with system prompt (only if system prompt is provided)
    if system_prompt:
        response_with_system = get_llm_response_with_system(user_prompt, system_prompt)
    else:
        response_with_system = "No system prompt provided"
    
    return jsonify({
        'response_without_system': response_without_system,
        'response_with_system': response_with_system,
        'user_prompt': user_prompt,
        'system_prompt': system_prompt
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
