import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

const COLORS = ['#00C49F', '#FF6384', '#FFCE56', '#36A2EB', '#9966FF', '#FF9F40'];

const ExpenseChart = ({ expenses, currency }) => {
  if (!expenses || expenses.length === 0) {
    return null;
  }

  const pieData = expenses.map((exp) => ({
    name: exp.title,
    value: parseFloat(exp.amount),
  }));

  const barData = expenses.map((exp) => ({
    name: exp.title,
    amount: parseFloat(exp.amount),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

      {/* Pie Chart */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow">
        <h3 className="text-xl font-bold text-green-400 mb-4">
          📊 Expense Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${currency} ${value}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow">
        <h3 className="text-xl font-bold text-green-400 mb-4">
          📈 Expense Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              formatter={(value) => `${currency} ${value}`}
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Bar dataKey="amount" fill="#00C49F" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default ExpenseChart;