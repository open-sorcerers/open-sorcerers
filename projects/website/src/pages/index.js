import React from 'react';
import { Router } from '@reach/router';
import { Site } from '@components/Site';
import { Container } from '@components/ui/Container';
import { Login } from '@components/Login';
import { PrivateRoute } from '@components/PrivateRoute';
import { Profile } from '@components/Profile';

const Home = () => <span>cool</span>;

import Readme from '../../README.md';

const seo = {
  title: 'Home',
};

const IndexPage = ({ ...other }) => {
  return (
    <Site seo={seo} {...other}>
      <Container>
        <Readme />
      </Container>
    </Site>
  );
};

export default IndexPage;
