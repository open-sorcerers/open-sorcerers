import React, { Component } from 'react';
import { navigate } from 'gatsby';
import { isLoggedIn } from '@services/auth';

export const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/login`) {
    navigate('/app/login');
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
