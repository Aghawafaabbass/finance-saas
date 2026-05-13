import React, { useState, useEffect } from 'react';
import { getBudgets, addBudget } from '../services/api';

const Budget = ({ currency }) => {
  const [budgets, setBudgets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const res = await getBudgets();
      setBudgets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddBudget = async (e) => {
    e.preventDefault();
    try {
      await addBudget({
        amount,
        month: month + '-01',
        category: null,
      });
      setAmount('');
      setMonth('');
      setShowForm(false);
      fetchBudgets();
    } catch (err) {
      setError('Failed to add budget!');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-green-400">
          📅 Budget Planner
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          {showForm ? 'Cancel' : '+ Add Budget'}
        </button>
      </div>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleAddBudget} className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm">
                Budget Amount ({currency})
              </label>
              <input
                type="number"
                className="w-full bg-gray-700 text-white p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter budget amount"
                required
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm">Month</label>
              <input
                type="month"
                className="w-full bg-gray-700 text-white p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            Save Budget
          </button>
        </form>
      )}

      {budgets.length === 0 ? (
        <p className="text-gray-400 text-center py-4">
          No budgets yet. Add your first budget!
        </p>
      ) : (
        <div className="space-y-3">
          {budgets.map((budget) => (
            <div
              key={budget.id}
              className="flex justify-between items-center bg-gray-700 p-4 rounded-xl"
            >
              <div>
                <p className="font-bold text-white">
                  {budget.month?.slice(0, 7)}
                </p>
                <p className="text-gray-400 text-sm">Monthly Budget</p>
              </div>
              <span className="text-green-400 font-bold text-lg">
                {currency} {budget.amount}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Budget;