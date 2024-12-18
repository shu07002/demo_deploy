import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoute = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    alert('You need to log in');
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
