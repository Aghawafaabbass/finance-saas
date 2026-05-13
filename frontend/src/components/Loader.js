import React from 'react';

const Loader = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6 animate-bounce">💰</div>
        <h1 className="text-3xl font-bold text-green-400 mb-2">
          FinanceAI
        </h1>
        <p className="text-gray-400 mb-8">
          AI Personal Finance & Expense Intelligence SaaS
        </p>
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
        <p className="text-gray-500 text-xs mt-8">
          Developed by Agha Wafa Abbas — AI-Powered Full Stack Cloud SaaS Developer
        </p>
      </div>
    </div>
  );
};

export default Loader;