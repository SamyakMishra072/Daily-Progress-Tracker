import React from 'react';
import { useTheme } from './hooks/useTheme';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';


function App() {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-40">
        <ThemeToggle />
      </div>
      {/* Main Dashboard */}
      <Dashboard />
       <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;