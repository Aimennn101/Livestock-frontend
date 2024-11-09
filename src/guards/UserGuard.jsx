import React from 'react';
import { Navigate } from 'react-router-dom';
import { getRole, isAuthenticated } from '../service/roles';

const UserGuard = ({ children }) => {

  if (isAuthenticated() && (getRole() == 'admin' || getRole() == 'doctor')) {
    return <Navigate to="/error" />;
  }
  else if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default UserGuard;
