import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getExpenses, addExpense, deleteExpense, getAIAnalysis, getIncome, updateIncome, sendEmailReport } from '../services/api';
import ExpenseChart from '../components/ExpenseChart';
import MonthlyChart from '../components/MonthlyChart';
import Budget from './Budget';
import Profile from './Profile';
import AIChat from '../components/AIChat';
import SearchFilter from '../components/SearchFilter';
import Categories from '../components/Categories';
import SavingGoals from '../components/SavingGoals';
import Footer from '../components/Footer';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Dashboard = () => {
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [error, setError] = useState('');
  const [currency, setCurrency] = useState('PKR');
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [incomeInput, setIncomeInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMsg, setEmailMsg] = useState('');

  useEffect(() => {
    fetchExpenses();
    fetchIncome();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchIncome = async () => {
    try {
      const res = await getIncome();
      setMonthlyIncome(parseFloat(res.data.monthly_income) || 0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateIncome = async (e) => {
    e.preventDefault();
    try {
      await updateIncome({ monthly_income: incomeInput });
      setMonthlyIncome(parseFloat(incomeInput));
      setIncomeInput('');
      setShowIncomeForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await fetch(`http://127.0.0.1:8000/api/expenses/expenses/${editId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            title, amount, date,
            category: expenseCategory || null,
          }),
        });
        setEditId(null);
      } else {
        await addExpense({
          title, amount, date,
          category: expenseCategory || null,
        });
      }
      setTitle('');
      setAmount('');
      setDate('');
      setExpenseCategory('');
      setShowForm(false);
      setError('');
      fetchExpenses();
    } catch (err) {
      setError('Failed to save expense!');
    }
  };

  const handleEdit = (exp) => {
    setEditId(exp.id);
    setTitle(exp.title);
    setAmount(exp.amount);
    setDate(exp.date);
    setExpenseCategory(exp.category || '');
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAIAnalysis = async () => {
    setAiLoading(true);
    try {
      const res = await getAIAnalysis();
      setAiAnalysis(res.data.analysis);
    } catch (err) {
      setAiAnalysis('Failed to get AI analysis!');
    }
    setAiLoading(false);
  };

  const handleSendEmail = async () => {
    setEmailLoading(true);
    setEmailMsg('');
    try {
      const res = await sendEmailReport();
      setEmailMsg(res.data.message);
    } catch (err) {
      setEmailMsg('Failed to send email! Make sure your email is set in profile.');
    }
    setEmailLoading(false);
    setTimeout(() => setEmailMsg(''), 4000);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(34, 197, 94);
    doc.text('FinanceAI Expense Report', 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Developed by Agha Wafa Abbas — AI-Powered Full Stack Cloud SaaS Developer', 14, 28);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 34);
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Monthly Income: ${currency} ${monthlyIncome.toFixed(2)}`, 14, 45);
    doc.text(`Total Expenses: ${currency} ${totalExpenses.toFixed(2)}`, 14, 53);
    doc.text(`Remaining Balance: ${currency} ${remainingBalance.toFixed(2)}`, 14, 61);
    autoTable(doc, {
      startY: 75,
      head: [['#', 'Title', 'Amount', 'Date']],
      body: filteredExpenses.map((exp, index) => [
        index + 1, exp.title,
        `${currency} ${exp.amount}`, exp.date,
      ]),
      headStyles: { fillColor: [34, 197, 94] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });
    doc.save('FinanceAI-Report.pdf');
  };

  const filteredExpenses = expenses.filter((exp) => {
    const matchSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase());
    const today = new Date().toISOString().split('T')[0];
    const expDate = new Date(exp.date);
    const now = new Date();
    let matchDate = true;
    if (filterType === 'today') {
      matchDate = exp.date === today;
    } else if (filterType === 'week') {
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      matchDate = expDate >= weekAgo;
    } else if (filterType === 'month') {
      matchDate = expDate.getMonth() === new Date().getMonth() &&
        expDate.getFullYear() === new Date().getFullYear();
    } else if (filterType === 'custom' && filterDate) {
      matchDate = exp.date === filterDate;
    }
    const matchCategory = selectedCategory === '' || exp.category === selectedCategory;
    return matchSearch && matchDate && matchCategory;
  });

  const totalExpenses = expenses.reduce(
    (sum, exp) => sum + parseFloat(exp.amount), 0
  );
  const remainingBalance = monthlyIncome - totalExpenses;
  const spentPercentage = monthlyIncome > 0
    ? Math.min((totalExpenses / monthlyIncome) * 100, 100) : 0;

  const bg = isDark ? 'bg-gray-900' : 'bg-gray-100';
  const card = isDark ? 'bg-gray-800' : 'bg-white';
  const cardInner = isDark ? 'bg-gray-700' : 'bg-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const subtext = isDark ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`min-h-screen ${bg} ${text}`}>

      {showProfile && <Profile onClose={() => setShowProfile(false)} />}

      {/* Header */}
      <div className={`${card} p-4 flex justify-between items-center shadow-lg flex-wrap gap-3`}>
        <div>
          <h1 className="text-2xl font-bold text-green-400">💰 FinanceAI</h1>
          <p className={`${subtext} text-xs`}>
            Developed by Agha Wafa Abbas — AI-Powered Full Stack Cloud SaaS Developer
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className={`${cardInner} ${text} px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400`}
          >
            <option value="PKR">🇵🇰 PKR</option>
            <option value="CAD">🇨🇦 CAD</option>
            <option value="USD">🇺🇸 USD</option>
            <option value="GBP">🇬🇧 GBP</option>
            <option value="EUR">🇪🇺 EUR</option>
            <option value="AED">🇦🇪 AED</option>
            <option value="SAR">🇸🇦 SAR</option>
            <option value="AUD">🇦🇺 AUD</option>
          </select>
          <button onClick={toggleTheme} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition">
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button onClick={() => setShowProfile(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
            👤 Profile
          </button>
          <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
            Logout
          </button>
        </div>
      </div>

      <div className="p-6">

        {/* Balance Tracker */}
        <div className={`${card} p-6 rounded-2xl shadow mb-6`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-green-400">💰 Balance Tracker</h3>
            <button
              onClick={() => setShowIncomeForm(!showIncomeForm)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              {showIncomeForm ? 'Cancel' : 'Set Income'}
            </button>
          </div>

          {showIncomeForm && (
            <form onSubmit={handleUpdateIncome} className="mb-4 flex gap-3">
              <input
                type="number"
                className={`flex-1 ${cardInner} ${text} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400`}
                value={incomeInput}
                onChange={(e) => setIncomeInput(e.target.value)}
                placeholder={`Enter monthly income (${currency})`}
                required
              />
              <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition">
                Save
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className={`${cardInner} p-4 rounded-xl text-center`}>
              <p className={`${subtext} text-sm`}>Monthly Income</p>
              <p className="text-green-400 font-bold text-2xl">{currency} {monthlyIncome.toFixed(2)}</p>
            </div>
            <div className={`${cardInner} p-4 rounded-xl text-center`}>
              <p className={`${subtext} text-sm`}>Total Spent</p>
              <p className="text-red-400 font-bold text-2xl">{currency} {totalExpenses.toFixed(2)}</p>
            </div>
            <div className={`${cardInner} p-4 rounded-xl text-center`}>
              <p className={`${subtext} text-sm`}>Remaining</p>
              <p className={`font-bold text-2xl ${remainingBalance >= 0 ? 'text-green-400' : 'text-red-500'}`}>
                {currency} {remainingBalance.toFixed(2)}
              </p>
            </div>
          </div>

          {monthlyIncome > 0 && (
            <div>
              <div className="flex justify-between mb-1">
                <span className={`${subtext} text-sm`}>Budget Used</span>
                <span className={`text-sm font-bold ${spentPercentage >= 90 ? 'text-red-400' : spentPercentage >= 70 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {spentPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all ${spentPercentage >= 90 ? 'bg-red-500' : spentPercentage >= 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${spentPercentage}%` }}
                />
              </div>
              {spentPercentage >= 90 && (
                <div className="mt-3 bg-red-500 text-white p-3 rounded-lg">
                  🚨 Warning! You have spent {spentPercentage.toFixed(1)}% of your budget!
                </div>
              )}
              {spentPercentage >= 70 && spentPercentage < 90 && (
                <div className="mt-3 bg-yellow-500 text-white p-3 rounded-lg">
                  ⚠️ Caution! You have used {spentPercentage.toFixed(1)}% of your budget!
                </div>
              )}
              {remainingBalance < 0 && (
                <div className="mt-3 bg-red-700 text-white p-3 rounded-lg">
                  💸 Budget Exceeded! You are {currency} {Math.abs(remainingBalance).toFixed(2)} over budget!
                </div>
              )}
              {spentPercentage < 50 && monthlyIncome > 0 && (
                <div className="mt-3 bg-green-500 text-white p-3 rounded-lg">
                  ✅ Great job! You are managing your budget well!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`${card} p-6 rounded-2xl shadow`}>
            <p className={`${subtext} text-sm`}>Total Expenses</p>
            <h2 className="text-3xl font-bold text-red-400">{currency} {totalExpenses.toFixed(2)}</h2>
          </div>
          <div className={`${card} p-6 rounded-2xl shadow`}>
            <p className={`${subtext} text-sm`}>Total Transactions</p>
            <h2 className="text-3xl font-bold text-blue-400">{expenses.length}</h2>
          </div>
          <div className={`${card} p-6 rounded-2xl shadow`}>
            <p className={`${subtext} text-sm`}>Average Expense</p>
            <h2 className="text-3xl font-bold text-yellow-400">
              {currency} {expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : '0.00'}
            </h2>
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex gap-4 mb-4 flex-wrap">
          <button
            onClick={() => { setShowForm(!showForm); setEditId(null); setTitle(''); setAmount(''); setDate(''); setExpenseCategory(''); }}
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            {showForm && !editId ? 'Cancel' : '+ Add Expense'}
          </button>
          <button
            onClick={handleAIAnalysis}
            disabled={aiLoading}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            {aiLoading ? 'Analyzing...' : '🤖 AI Analysis'}
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            📄 Export PDF
          </button>
          <button
            onClick={handleSendEmail}
            disabled={emailLoading}
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            {emailLoading ? 'Sending...' : '📧 Email Report'}
          </button>
        </div>

        {/* Email Message */}
        {emailMsg && (
          <div className={`p-3 rounded-lg mb-4 text-white text-center ${emailMsg.includes('Failed') ? 'bg-red-500' : 'bg-green-500'}`}>
            {emailMsg}
          </div>
        )}

        {/* AI Analysis Result */}
        {aiAnalysis && (
          <div className={`${card} p-6 rounded-2xl shadow mb-6 border border-purple-500`}>
            <h3 className="text-xl font-bold text-purple-400 mb-4">🤖 AI Financial Analysis</h3>
            <p className={`${subtext} whitespace-pre-line`}>{aiAnalysis}</p>
          </div>
        )}

        {/* AI Chat */}
        <AIChat expenses={expenses} currency={currency} isDark={isDark} />

        {/* Charts */}
        {expenses.length > 0 && (
          <ExpenseChart expenses={expenses} currency={currency} />
        )}

        {/* Monthly Chart */}
        {expenses.length > 0 && (
          <MonthlyChart expenses={expenses} currency={currency} isDark={isDark} />
        )}

        {/* Categories */}
        <Categories
          isDark={isDark}
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* Saving Goals */}
        <SavingGoals
          isDark={isDark}
          currency={currency}
          monthlyIncome={monthlyIncome}
          totalExpenses={totalExpenses}
        />

        {/* Budget Planner */}
        <Budget currency={currency} />

        {/* Search Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterDate={filterDate}
          setFilterDate={setFilterDate}
          filterType={filterType}
          setFilterType={setFilterType}
          isDark={isDark}
        />

        {/* Add/Edit Expense Form */}
        {showForm && (
          <div className={`${card} p-6 rounded-2xl shadow mb-6`}>
            <h3 className="text-xl font-bold text-green-400 mb-4">
              {editId ? '✏️ Edit Expense' : '➕ Add New Expense'}
            </h3>
            {error && (
              <div className="bg-red-500 text-white p-3 rounded-lg mb-4">{error}</div>
            )}
            <form onSubmit={handleAddExpense}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`${subtext} text-sm`}>Title</label>
                  <input
                    type="text"
                    className={`w-full ${cardInner} ${text} p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Expense title"
                    required
                  />
                </div>
                <div>
                  <label className={`${subtext} text-sm`}>Amount ({currency})</label>
                  <input
                    type="number"
                    className={`w-full ${cardInner} ${text} p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <div>
                  <label className={`${subtext} text-sm`}>Date</label>
                  <input
                    type="date"
                    className={`w-full ${cardInner} ${text} p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400`}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition">
                  {editId ? 'Update Expense' : 'Save Expense'}
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditId(null); setTitle(''); setAmount(''); setDate(''); setExpenseCategory(''); }}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-lg transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Expenses List */}
        <div className={`${card} p-6 rounded-2xl shadow`}>
          <h3 className="text-xl font-bold text-green-400 mb-4">
            Recent Expenses
            {filteredExpenses.length !== expenses.length && (
              <span className="text-sm text-gray-400 ml-2">
                ({filteredExpenses.length} of {expenses.length})
              </span>
            )}
          </h3>
          {filteredExpenses.length === 0 ? (
            <p className={`${subtext} text-center py-8`}>No expenses found!</p>
          ) : (
            <div className="space-y-3">
              {filteredExpenses.map((exp) => (
                <div
                  key={exp.id}
                  className={`flex justify-between items-center ${cardInner} p-4 rounded-xl`}
                >
                  <div>
                    <p className={`font-bold ${text}`}>{exp.title}</p>
                    <p className={`${subtext} text-sm`}>{exp.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-red-400 font-bold text-lg">
                      {currency} {exp.amount}
                    </span>
                    <button
                      onClick={() => handleEdit(exp)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <Footer isDark={isDark} />

    </div>
  );
};

export default Dashboard;