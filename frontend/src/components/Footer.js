import React from 'react';

const Footer = ({ isDark }) => {
  const bg = isDark ? 'bg-gray-800' : 'bg-white';
  const text = isDark ? 'text-gray-400' : 'text-gray-500';
  const border = isDark ? 'border-gray-700' : 'border-gray-200';

  return (
    <footer className={`${bg} ${text} border-t ${border} mt-10 py-8 px-6`}>
      <div className="max-w-6xl mx-auto">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Logo + Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">💰</span>
              <h2 className="text-xl font-bold text-green-400">FinanceAI</h2>
            </div>
            <p className={`${text} text-sm leading-relaxed`}>
              AI-Powered Personal Finance & Expense Intelligence SaaS.
              Smart budgeting for everyone.
            </p>
            <div className="flex gap-3 mt-4">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                AI Powered
              </span>
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                Cloud SaaS
              </span>
              <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                Secure
              </span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-green-400 font-bold mb-3">Features</h3>
            <ul className={`${text} text-sm space-y-2`}>
              <li>💰 Balance Tracker</li>
              <li>🤖 AI Financial Analysis</li>
              <li>💬 AI Chat Assistant</li>
              <li>📊 Expense Charts</li>
              <li>📅 Budget Planner</li>
              <li>📄 Export to PDF</li>
              <li>🌙 Dark / Light Mode</li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h3 className="text-green-400 font-bold mb-3">Developer</h3>
            <div className={`${text} text-sm space-y-2`}>
              <p className="font-bold text-white">Agha Wafa Abbas</p>
              <p>AI-Powered Full Stack</p>
              <p>Cloud SaaS Developer</p>
              <div className="mt-3 space-y-1">
                <p>🛠️ Django + React</p>
                <p>🤖 Groq AI (Llama)</p>
                <p>🗄️ PostgreSQL</p>
                <p>☁️ Cloud Ready</p>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className={`border-t ${border} pt-6`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-sm">
              © 2026 <span className="text-green-400 font-bold">FinanceAI</span> — All rights reserved
            </p>
            <p className="text-sm">
              Developed with ❤️ by{' '}
              <span className="text-green-400 font-bold">Agha Wafa Abbas</span>
            </p>
            <div className="flex gap-3">
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                v1.0.0
              </span>
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                Live
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;