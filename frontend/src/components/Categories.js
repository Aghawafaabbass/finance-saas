import React, { useState, useEffect } from 'react';
import { getCategories, addCategory } from '../services/api';

const CATEGORY_ICONS = {
  'Food': '🍔',
  'Rent': '🏠',
  'Transport': '🚗',
  'Shopping': '🛍️',
  'Health': '💊',
  'Education': '📚',
  'Entertainment': '🎬',
  'Utilities': '💡',
  'Other': '📦',
};

const Categories = ({ isDark, onSelectCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');

  const card = isDark ? 'bg-gray-800' : 'bg-white';
  const cardInner = isDark ? 'bg-gray-700' : 'bg-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';
  const subtext = isDark ? 'text-gray-400' : 'text-gray-500';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await addCategory({
        name,
        icon: CATEGORY_ICONS[name] || '📦',
      });
      setName('');
      setShowForm(false);
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const defaultCategories = [
    'Food', 'Rent', 'Transport',
    'Shopping', 'Health', 'Education',
    'Entertainment', 'Utilities', 'Other'
  ];

  return (
    <div className={`${card} p-6 rounded-2xl shadow mb-6`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-green-400">
          🏷️ Categories
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          {showForm ? 'Cancel' : '+ Add Category'}
        </button>
      </div>

      {/* Add Category Form */}
      {showForm && (
        <form onSubmit={handleAddCategory} className="mb-4">
          <div className="flex gap-3">
            <select
              className={`flex-1 ${cardInner} ${text} p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {defaultCategories.map((cat) => (
                <option key={cat} value={cat}>{CATEGORY_ICONS[cat]} {cat}</option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition"
            >
              Add
            </button>
          </div>
        </form>
      )}

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory('')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
            selectedCategory === ''
              ? 'bg-green-500 text-white'
              : `${cardInner} ${subtext} hover:text-green-400`
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
              selectedCategory === cat.id
                ? 'bg-green-500 text-white'
                : `${cardInner} ${subtext} hover:text-green-400`
            }`}
          >
            {CATEGORY_ICONS[cat.name] || '📦'} {cat.name}
          </button>
        ))}
      </div>

      {categories.length === 0 && (
        <p className={`${subtext} text-center py-4 text-sm`}>
          No categories yet. Add your first category!
        </p>
      )}
    </div>
  );
};

export default Categories;