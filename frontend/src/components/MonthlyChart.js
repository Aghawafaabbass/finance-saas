import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';

const MonthlyChart = ({ expenses, currency, isDark }) => {
  const card = isDark ? 'bg-gray-800' : 'bg-white';
  const subtext = isDark ? 'text-gray-400' : 'text-gray-500';

  // Monthly data prepare karo
  const monthlyData = {};
  expenses.forEach((exp) => {
    const month = exp.date.slice(0, 7);
    if (!monthlyData[month]) {
      monthlyData[month] = { month, total: 0, count: 0 };
    }
    monthlyData[month].total += parseFloat(exp.amount);
    monthlyData[month].count += 1;
  });

  const chartData = Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6);

  if (chartData.length === 0) return null;

  return (
    <div className={`${card} p-6 rounded-2xl shadow mb-6`}>
      <h3 className="text-xl font-bold text-green-400 mb-6">
        📊 Monthly Expense Comparison
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Bar Chart */}
        <div>
          <p className={`${subtext} text-sm mb-3`}>Monthly Spending</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fontSize: 11 }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value) => [`${currency} ${value.toFixed(0)}`, 'Total']}
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="total" fill="#00C49F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div>
          <p className={`${subtext} text-sm mb-3`}>Spending Trend</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fontSize: 11 }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value) => [`${currency} ${value.toFixed(0)}`, 'Total']}
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#FF6384"
                strokeWidth={3}
                dot={{ fill: '#FF6384', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Monthly Summary Table */}
      <div className="mt-6">
        <p className={`${subtext} text-sm mb-3`}>Monthly Summary</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-green-400">Month</th>
                <th className="text-right py-2 text-green-400">Transactions</th>
                <th className="text-right py-2 text-green-400">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((row) => (
                <tr key={row.month} className="border-b border-gray-700">
                  <td className={`py-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {row.month}
                  </td>
                  <td className={`py-2 text-right ${subtext}`}>
                    {row.count}
                  </td>
                  <td className="py-2 text-right text-red-400 font-bold">
                    {currency} {row.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default MonthlyChart;