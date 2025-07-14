import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/api';

/**
 * Composant pour protéger les routes nécessitant une authentification
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const isAuthenticated = authService.isAuthenticated();
  const isAdmin = authService.isAdmin();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;