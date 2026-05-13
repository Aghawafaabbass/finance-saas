import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Loader from './components/Loader';

const AppContent = () => {
  const { token } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    return <Loader />;
  }

  if (token) {
    return <Dashboard />;
  }

  return showLogin ? (
    <Login
      onSwitch={() => setShowLogin(false)}
      onLoginSuccess={handleLoginSuccess}
    />
  ) : (
    <Register onSwitch={() => setShowLogin(true)} />
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;