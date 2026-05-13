import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = ({ onSwitch }) => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      setSuccess('Account created successfully! Please login.');
      setError('');
    } catch (err) {
      setError('Registration failed! Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-400 mb-2 text-center">
          💰 FinanceAI
        </h1>
        <p className="text-gray-400 text-center mb-2">
          AI Personal Finance & Expense Intelligence SaaS
        </p>
        <p className="text-gray-500 text-center text-xs mb-6">
          Developed by Agha Wafa Abbas — AI-Powered Full Stack Cloud SaaS Developer
        </p>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500 text-white p-3 rounded-lg mb-4 text-center">
            {success}
          </div>
        )}
        <form onSubmit={handleRegister}>
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
          <div className="mb-4">
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              className="w-full bg-gray-700 text-white p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded-lg transition"
          >
            Create Account
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{' '}
          <span
            onClick={onSwitch}
            className="text-green-400 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;