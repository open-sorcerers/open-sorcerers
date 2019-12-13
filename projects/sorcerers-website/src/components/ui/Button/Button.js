import React from 'react';
import PropTypes from 'prop-types';

import { button } from './styled';

const Button = ({ children, ...other }) =>
  (
    <div css={button} {...other}>
      {children}
    </div>
  );

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {};

export { Button };
