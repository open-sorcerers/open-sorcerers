import React from 'react';

import { Container } from '../ui/Container';
import { footer, inner, left, right } from './styled';

const Footer = () => (
  <footer css={footer}>
    <Container maxWidth={1200}>
      <div css={inner}>
        <div css={left}>
          <div>
            Contribute on <a href="https://github.com/South-Paw/awesome-gatsby-starter">Github</a>.
          </div>
          <div>
            Created with{' '}
            <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">
              Gatsby
            </a>
            .
          </div>
        </div>
        <div css={right}>
          <div>
            Copyright ©{' '}
            <a href="https://southpaw.co.nz" target="_blank" rel="noopener noreferrer">
              Alex Gabites
            </a>
            , 2019.
          </div>
          <div>
            <a href="https://github.com/South-Paw/awesome-gatsby-starter/blob/master/LICENSE">MIT</a> Licensed.
          </div>
        </div>
      </div>
    </Container>
  </footer>
);

export { Footer };
