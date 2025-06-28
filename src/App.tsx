import { useTheme } from './hooks/useTheme';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';

function App() {
  const { theme } = useTheme();

  // ✅ Get token from localStorage
  const token = localStorage.getItem('token');

  return (
    <div className={theme}>
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-40">
        <ThemeToggle />
      </div>

      {/* ✅ Wrap entire app in Router */}
      <BrowserRouter>
        <Routes>
          {/* Protected Dashboard Route */}
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
