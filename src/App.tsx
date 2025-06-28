import React from 'react';
import { useTheme } from './hooks/useTheme';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';

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
    </div>
  );
}

export default App;