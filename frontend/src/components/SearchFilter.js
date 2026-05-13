import React from 'react';

const SearchFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  filterDate, 
  setFilterDate,
  filterType,
  setFilterType,
  isDark 
}) => {
  const cardInner = isDark ? 'bg-gray-700' : 'bg-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const subtext = isDark ? 'text-gray-400' : 'text-gray-500';
  const card = isDark ? 'bg-gray-800' : 'bg-white';

  return (
    <div className={`${card} p-4 rounded-2xl shadow mb-6`}>
      <h3 className="text-lg font-bold text-green-400 mb-3">
        🔍 Search & Filter
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {/* Search */}
        <div>
          <label className={`${subtext} text-xs`}>Search Expense</label>
          <input
            type="text"
            className={`w-full ${cardInner} ${text} p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title..."
          />
        </div>

        {/* Date Filter */}
        <div>
          <label className={`${subtext} text-xs`}>Filter by Period</label>
          <select
            className={`w-full ${cardInner} ${text} p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400`}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Date</option>
          </select>
        </div>

        {/* Custom Date */}
        {filterType === 'custom' && (
          <div>
            <label className={`${subtext} text-xs`}>Select Date</label>
            <input
              type="date"
              className={`w-full ${cardInner} ${text} p-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-green-400`}
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
        )}

        {/* Clear Filter */}
        <div className="flex items-end">
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterDate('');
              setFilterType('all');
            }}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition text-sm"
          >
            Clear Filters
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchFilter;