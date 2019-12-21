import React from 'react';
import { navigate } from 'gatsby';
import { logout } from '@services/auth';

export const Logout = () => {
  logout(() => navigate('/app/login'));
  return null;
};

export default Logout;
