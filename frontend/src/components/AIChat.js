import React, { useState } from 'react';
import axios from 'axios';

const AIChat = ({ expenses, currency, isDark }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I am your AI Financial Assistant. Ask me anything about your expenses and budget! 💰'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const card = isDark ? 'bg-gray-800' : 'bg-white';
  const cardInner = isDark ? 'bg-gray-700' : 'bg-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const subtext = isDark ? 'text-gray-400' : 'text-gray-500';

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://127.0.0.1:8000/api/users/ai-chat/',
        {
          message: input,
          expenses: expenses,
          currency: currency,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: res.data.reply }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I could not process your request!' }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className={`${card} p-6 rounded-2xl shadow mb-6`}>
      <h3 className="text-xl font-bold text-green-400 mb-4">
        💬 AI Chat Assistant
      </h3>

      {/* Messages */}
      <div className="h-64 overflow-y-auto mb-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-xl text-sm ${
                msg.role === 'user'
                  ? 'bg-green-500 text-white'
                  : `${cardInner} ${text}`
              }`}
            >
              {msg.role === 'assistant' && (
                <span className="font-bold text-green-400 block mb-1">
                  🤖 AI Assistant
                </span>
              )}
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className={`${cardInner} ${text} p-3 rounded-xl text-sm`}>
              <span className="text-green-400 font-bold block mb-1">🤖 AI Assistant</span>
              Thinking... ⏳
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-3">
        <input
          type="text"
          className={`flex-1 ${cardInner} ${text} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything... e.g. Where am I spending most?"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition"
        >
          Send
        </button>
      </form>

      {/* Quick Questions */}
      <div className="mt-3 flex gap-2 flex-wrap">
        {[
          'Where am I spending most?',
          'How can I save money?',
          'Am I over budget?',
        ].map((q) => (
          <button
            key={q}
            onClick={() => setInput(q)}
            className={`${cardInner} ${subtext} px-3 py-1 rounded-lg text-xs hover:text-green-400 transition`}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIChat;