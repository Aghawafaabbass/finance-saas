import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = ({ onSwitch, onLoginSuccess }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      onLoginSuccess();
    } catch (err) {
      setError('Invalid username or password!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">💰</div>
          <h1 className="text-3xl font-bold text-green-400 mb-1">
            FinanceAI
          </h1>
          <p className="text-gray-400 text-sm">
            AI Personal Finance & Expense Intelligence SaaS
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Developed by Agha Wafa Abbas — AI-Powered Full Stack Cloud SaaS Developer
          </p>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-gray-400 text-sm">Username</label>
            <input
              type="text"
              className="w-full bg-gray-700 text-white p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="off"
            />
          </div>
          <div className="mb-6">
            <label className="text-gray-400 text-sm">Password</label>
            <input
              type="password"
              className="w-full bg-gray-700 text-white p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded-lg transition"
          >
            {loading ? '⏳ Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{' '}
          <span
            onClick={onSwitch}
            className="text-green-400 cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;