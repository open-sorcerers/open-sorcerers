import React from 'react';
import { Router } from '@reach/router';
import { Site } from '../components/Site';
import { Container } from '../components/ui/Container';

const Home = () => <span>cool</span>;
const Login = () => <span>login</span>;

import Readme from '../../README.md';

const seo = {
  title: 'Home',
};

const IndexPage = ({ ...other }) => {
  return (
    <Site seo={seo} {...other}>
      <Container>
        <Router>
          <Home path="app/home" />
          <Login path="app/login" />
        </Router>
      </Container>
    </Site>
  );
};

export default IndexPage;
