import React, { createContext, useState, useContext } from 'react';
import { loginUser, registerUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = async (username, password) => {
        const res = await loginUser({ username, password });
        const accessToken = res.data.access;
        const refreshToken = res.data.refresh;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        setToken(accessToken);
        setUser(username);
        return res;
    };

    const register = async (username, email, password) => {
        const res = await registerUser({ username, email, password });
        return res;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);