import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../service/roles';

const AuthGuard = ({ children }) => {

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AuthGuard;