// src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import ThemeToggle from './components/ThemeToggle';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const { theme } = useTheme();
  const token = localStorage.getItem('token');

  return (
    <div className={theme}>
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-40">
        <ThemeToggle />
      </div>

      <BrowserRouter>
        <Routes>
          {/* Protected Dashboard at /dashboard */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" replace />}
          />

          {/* Public Login */}
          <Route path="/login" element={<Login />} />

          {/* Root redirects to dashboard if logged in, else to login */}
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Catch‑all: redirect unknown routes to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
