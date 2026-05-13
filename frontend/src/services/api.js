import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

// Har request mein token automatically add karo
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Token expire hone par auto refresh karo
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const res = await axios.post(
                        'http://127.0.0.1:8000/api/users/token/refresh/',
                        { refresh: refreshToken }
                    );
                    const newToken = res.data.access;
                    localStorage.setItem('token', newToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return API(originalRequest);
                }
            } catch (err) {
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
                window.location.reload();
            }
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const registerUser = (data) => API.post('/users/register/', data);
export const loginUser = (data) => API.post('/users/login/', data);
export const getProfile = () => API.get('/users/profile/');

// Expense APIs
export const getExpenses = () => API.get('/expenses/expenses/');
export const addExpense = (data) => API.post('/expenses/expenses/', data);
export const deleteExpense = (id) => API.delete(`/expenses/expenses/${id}/`);

// Category APIs
export const getCategories = () => API.get('/expenses/categories/');
export const addCategory = (data) => API.post('/expenses/categories/', data);

// Budget APIs
export const getBudgets = () => API.get('/expenses/budgets/');
export const addBudget = (data) => API.post('/expenses/budgets/', data);

// AI Analysis
export const getAIAnalysis = () => API.get('/users/ai-analysis/');

// Income APIs
export const getIncome = () => API.get('/users/income/');
export const updateIncome = (data) => API.post('/users/income/', data);

// Avatar Upload
export const uploadAvatar = (formData) => API.post('/users/upload-avatar/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
});

// Email Report
export const sendEmailReport = () => API.post('/users/send-report/');