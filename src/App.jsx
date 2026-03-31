import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FeedbackProvider } from './components/FeedbackContext.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { Header } from './components/Header.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { InterestFormPage } from './pages/InterestFormPage.jsx';
import { AdminLoginPage } from './pages/AdminLoginPage.jsx';
import { AdminDashboardPage } from './pages/AdminDashboardPage.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import './App.css';

function App() {
  // Track admin session for header
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    // SessionManager is imported inside Header, so just listen to storage changes
    function handleSessionChange() {
      setIsAdmin(sessionStorage.getItem('hirehub_admin_auth') === 'true');
    }
    handleSessionChange();
    window.addEventListener('storage', handleSessionChange);
    return () => window.removeEventListener('storage', handleSessionChange);
  }, []);

  // Logout handler for header
  function handleLogout() {
    setIsAdmin(false);
  }

  return (
    <FeedbackProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Header isAdmin={isAdmin} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/apply" element={<InterestFormPage />} />
            <Route path="/admin" element={
              isAdmin ? (
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              ) : (
                <AdminLoginPage />
              )
            } />
            {/* Fallback: redirect to home */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </FeedbackProvider>
  );
}

export { App };