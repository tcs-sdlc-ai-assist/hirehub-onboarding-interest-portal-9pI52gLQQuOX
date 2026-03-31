import React from 'react';
import { Navigate } from 'react-router-dom';
import { SessionManager } from '../services/SessionManager.js';

/**
 * ProtectedRoute
 * Props:
 *   - children: JSX.Element
 *   - redirectTo: string (default: '/admin')
 * 
 * If not admin, redirects to redirectTo.
 */
function ProtectedRoute({ children, redirectTo = '/admin' }) {
  const isAdmin = SessionManager.isAdmin();

  if (!isAdmin) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export { ProtectedRoute };