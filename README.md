# LLM Response Comparative Study

A web application that compares responses from LLM with and without system prompts using the Groq API.

## Features

- **Dual Comparison**: Compare responses from:
  - (A) User Prompt + LLM only
  - (B) User Prompt + System Prompt + LLM
- **Interactive UI**: Clean, modern interface with real-time comparison
- **Groq API Integration**: Uses Llama-3.1-70b-versatile model
- **Side-by-side Results**: Easy visualization of differences

## Prerequisites

- Python 3.8 or higher
- Groq API key (already included in the code)

## Installation

1. Install the required packages:
```bash
pip install -r requirements.txt
```

## Usage

1. Run the Flask application:
```bash
python app.py
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

3. Enter your prompts:
   - **User Prompt**: Your question or request to the LLM
   - **System Prompt** (Optional): Instructions to guide the LLM's behavior

4. Click "Compare Responses" to see the differences

## Example Prompts

### Example 1: Technical Explanation
- **User Prompt**: "Explain what machine learning is"
- **System Prompt**: "You are a teacher explaining to 10-year-old students. Use simple language and fun examples."

### Example 2: Creative Writing
- **User Prompt**: "Write a short story about a robot"
- **System Prompt**: "You are a professional sci-fi author. Write in a suspenseful, dramatic style."

### Example 3: Code Generation
- **User Prompt**: "Create a Python function to calculate factorial"
- **System Prompt**: "You are an expert programmer. Include comments and follow PEP 8 style guidelines."

## Project Structure

```
Task_2/
├── app.py                 # Flask backend application
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── style.css         # CSS styling
    └── script.js         # JavaScript for frontend interaction
```

## How It Works

1. **Without System Prompt**: The LLM receives only the user's question and generates a response based on its default behavior
2. **With System Prompt**: The LLM receives contextual instructions (system prompt) that shape its response style, tone, and approach

## API Information

- **Model**: llama-3.1-70b-versatile
- **Provider**: Groq
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 1024

## Notes

- The Groq API key is embedded in the code for convenience
- System prompts significantly influence the LLM's response style and content
- Compare both responses to understand the impact of system prompts
