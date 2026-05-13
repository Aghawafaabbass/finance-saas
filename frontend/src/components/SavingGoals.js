import React, { useState } from 'react';

const SavingGoals = ({ isDark, currency, monthlyIncome, totalExpenses }) => {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [savedAmount, setSavedAmount] = useState('');

  const card = isDark ? 'bg-gray-800' : 'bg-white';
  const cardInner = isDark ? 'bg-gray-700' : 'bg-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const subtext = isDark ? 'text-gray-400' : 'text-gray-500';

  const remainingBalance = monthlyIncome - totalExpenses;

  const handleAddGoal = (e) => {
    e.preventDefault();
    const newGoal = {
      id: Date.now(),
      name: goalName,
      targetAmount: parseFloat(goalAmount),
      savedAmount: parseFloat(savedAmount) || 0,
    };
    setGoals([...goals, newGoal]);
    setGoalName('');
    setGoalAmount('');
    setSavedAmount('');
    setShowForm(false);
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const handleAddSaving = (id, amount) => {
    setGoals(goals.map((g) => {
      if (g.id === id) {
        const newSaved = Math.min(g.savedAmount + parseFloat(amount), g.targetAmount);
        return { ...g, savedAmount: newSaved };
      }
      return g;
    }));
  };

  return (
    <div className={`${card} p-6 rounded-2xl shadow mb-6`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-green-400">
          🎯 Saving Goals
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          {showForm ? 'Cancel' : '+ Add Goal'}
        </button>
      </div>

      {/* Available to Save */}
      <div className={`${cardInner} p-4 rounded-xl mb-4 flex justify-between items-center`}>
        <div>
          <p className={`${subtext} text-sm`}>Available to Save This Month</p>
          <p className={`font-bold text-2xl ${remainingBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {currency} {remainingBalance.toFixed(2)}
          </p>
        </div>
        <span className="text-4xl">💰</span>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <form onSubmit={handleAddGoal} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className={`${subtext} text-xs`}>Goal Name</label>
              <input
                type="text"
                className={`w-full ${cardInner} ${text} p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400`}
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="e.g. New Phone"
                required
              />
            </div>
            <div>
              <label className={`${subtext} text-xs`}>Target Amount ({currency})</label>
              <input
                type="number"
                className={`w-full ${cardInner} ${text} p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400`}
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                placeholder="50000"
                required
              />
            </div>
            <div>
              <label className={`${subtext} text-xs`}>Already Saved ({currency})</label>
              <input
                type="number"
                className={`w-full ${cardInner} ${text} p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400`}
                value={savedAmount}
                onChange={(e) => setSavedAmount(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-3 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            Save Goal
          </button>
        </form>
      )}

      {/* Goals List */}
      {goals.length === 0 ? (
        <p className={`${subtext} text-center py-4 text-sm`}>
          No saving goals yet. Add your first goal!
        </p>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => {
            const percentage = Math.min(
              (goal.savedAmount / goal.targetAmount) * 100, 100
            );
            const remaining = goal.targetAmount - goal.savedAmount;
            const isComplete = percentage >= 100;

            return (
              <div key={goal.id} className={`${cardInner} p-4 rounded-xl`}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className={`font-bold ${text}`}>
                      {isComplete ? '✅' : '🎯'} {goal.name}
                    </p>
                    <p className={`${subtext} text-sm`}>
                      {currency} {goal.savedAmount.toFixed(0)} / {currency} {goal.targetAmount.toFixed(0)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${isComplete ? 'text-green-400' : 'text-yellow-400'}`}>
                      {percentage.toFixed(0)}%
                    </span>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-600 rounded-full h-3 mb-2">
                  <div
                    className={`h-3 rounded-full transition-all ${isComplete ? 'bg-green-500' : 'bg-yellow-500'}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {!isComplete && (
                  <div className="flex justify-between items-center">
                    <p className={`${subtext} text-xs`}>
                      Still needed: {currency} {remaining.toFixed(0)}
                    </p>
                    <AddSavingButton
                      onAdd={(amount) => handleAddSaving(goal.id, amount)}
                      currency={currency}
                      isDark={isDark}
                    />
                  </div>
                )}

                {isComplete && (
                  <p className="text-green-400 text-sm font-bold text-center">
                    🎉 Goal Achieved!
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const AddSavingButton = ({ onAdd, currency, isDark }) => {
  const [showInput, setShowInput] = useState(false);
  const [amount, setAmount] = useState('');
  const cardInner = isDark ? 'bg-gray-600' : 'bg-gray-300';
  const text = isDark ? 'text-white' : 'text-gray-900';

  const handleAdd = () => {
    if (amount) {
      onAdd(amount);
      setAmount('');
      setShowInput(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {showInput ? (
        <>
          <input
            type="number"
            className={`w-24 ${cardInner} ${text} p-1 rounded text-xs focus:outline-none`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-2 py-1 rounded text-xs"
          >
            Add
          </button>
          <button
            onClick={() => setShowInput(false)}
            className="bg-gray-500 text-white px-2 py-1 rounded text-xs"
          >
            ✕
          </button>
        </>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition"
        >
          + Add Saving
        </button>
      )}
    </div>
  );
};

export default SavingGoals;