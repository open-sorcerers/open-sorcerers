import React from 'react';
import PropTypes from 'prop-types';

import { Theme } from '../ui/Theme';
import { Navigation } from '../Navigation';
import { Footer } from '../Footer';
import { SEO } from './SEO';
import { main } from './styled';

const Site = ({ children, seo, ...other }) => (
  <Theme>
    <SEO seo={seo} {...other} />
    <Navigation {...other} />
    <div css={main}>{children}</div>
    <Footer {...other} />
  </Theme>
);

Site.propTypes = {
  children: PropTypes.node,
  seo: SEO.propTypes.seo,
};

Site.defaultProps = {
  children: null,
  seo: {},
};

export { Site };
