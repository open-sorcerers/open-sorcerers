import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

export const StyledContainer = props => {
  const { maxWidth, children, ...rest } = props;
  return (
    <div
      css={css`
        margin: 0 auto;
        padding: 0 24px;
        max-width: ${maxWidth || 800}px;
        width: 100%;
        pre {
          background-color: #111;
          color: #ddd;
          margin: 0;
          padding: 0.5rem;
          width: calc(100% - 0.5rem);
        }
      `}
      {...rest}
    >
      {children || null}
    </div>
  );
};

StyledContainer.propTypes = {
  maxWidth: PropTypes.number,
  children: PropTypes.node,
};
StyledContainer.defaultProps = {
  maxWidth: 800,
  children: null,
};
