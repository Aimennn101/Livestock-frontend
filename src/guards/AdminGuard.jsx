import React from 'react';
import { Navigate } from 'react-router-dom';
import { getRole, isAuthenticated } from '../service/roles';

const AdminGuard = ({ children }) => {

  if (isAuthenticated() && (getRole() == 'user' || getRole() == 'doctor')) {
    return <Navigate to="/error" />;
  }
  else if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AdminGuard;
