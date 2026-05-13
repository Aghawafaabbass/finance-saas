import os
from groq import Groq

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def analyze_expenses(expenses):
    if not expenses:
        return "No expenses found to analyze."

    expense_text = "\n".join([
        f"- {exp['title']}: {exp['amount']} on {exp['date']}"
        for exp in expenses
    ])

    prompt = f"""
    You are a personal finance advisor. Analyze these expenses and give smart advice:

    {expense_text}

    Please provide:
    1. Total spending analysis
    2. Biggest expense category
    3. 3 specific saving tips
    4. Budget recommendation
    
    Keep it concise and helpful.
    """

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="llama-3.3-70b-versatile",
    )

    return chat_completion.choices[0].message.content