import React from 'react';
import { Link } from 'gatsby';
import { map } from 'ramda';

import { Container } from '../ui/Container';
import { footer, inner, left, right } from './styled';

const soSoSocial = [
  ['Github', '//github.com/open-sorcerers'],
  ['Twitter', '//twitter.com/osorcerers'],
  ['Slack', '//open-sorcerers.slack.com'],
];

const Colophon = () => (
  <ul>
    {map(
      ([what, where]) => (
        <li key={what}>
          <a href={where}>{what}</a>
        </li>
      ),
      soSoSocial,
    )}
  </ul>
);

const Footer = () => (
  <footer css={footer}>
    <Container maxWidth={1200}>
      <div css={inner}>
        <div css={left}>
          <Colophon />
        </div>
        <div css={right}>
          Built with ❤️ in Berlin by <a href="/contributors">open sorcerers</a>
        </div>
      </div>
    </Container>
  </footer>
);

export { Footer };
