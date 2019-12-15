import React from 'react';
import { Router } from '@reach/router';
import { PrivateRoute } from '@components/PrivateRoute';
import { Profile } from '@components/Profile';
import { Login } from '@components/Login';
import { Logout } from '@components/Logout';
import { Site } from '@components/Site';
const seo = { title: 'Open Sorcerers' };

const App = ({ ...rest }) => (
  <Site seo={seo} {...rest}>
    <Router>
      <PrivateRoute path="/app/profile" component={Profile} />
      <Login path="/app/login" />
      <Logout path="/app/logout" />
    </Router>
  </Site>
);

export default App;
