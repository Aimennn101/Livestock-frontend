/* eslint-disable */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getRole, isAuthenticated } from '../service/roles';

const DoctorGuard = ({ children }) => {

  if (isAuthenticated() && (getRole() == 'admin' || getRole() == 'user')) {
    return <Navigate to="/error" />;
  }
  else if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default DoctorGuard;
