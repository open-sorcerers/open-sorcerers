import React from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

export const navigation = css`
  display: flex;
  align-items: center;
  background-color: #663399;
  color: #fff;
  overflow: hidden;
`;

export const inner = css`
  display: flex;
  flex-flow: nowrap row;

  @media (max-width: 648px) {
    flex-flow: nowrap column;
  }
`;

export const Brand = ({ to, children }) => (
  <Link
    css={css`
      margin-right: 24px;
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      color: #fff;
      font-size: 20px;
      line-height: 24px;
      text-decoration: none;
      text-transform: uppercase;
      font-weight: 900;

      @media (max-width: 648px) {
        margin: 8px 0;
        justify-content: center;
      }

      :hover {
        text-decoration: none;
      }
    `}
    to={to}
    onClick={e => console.log(e)}
  >
    {children}
  </Link>
);

export const nav = css`
  display: flex;
  flex-flow: nowrap row;
  flex: 1 1 auto;
  align-items: center;

  @media (max-width: 648px) {
    margin: 0 -24px;
    justify-content: center;
    overflow-x: auto;
  }
`;

export const Item = ({ children, isActive, href, to }) => (
  <Link
    {...(href ? { href } : { to })}
    css={css`
      padding: 16px 8px;
      color: #fff;
      font-weight: 500;
      line-height: 24px;
      opacity: ${isActive ? '1' : '0.6'};
      text-decoration: none;

      :hover {
        opacity: 1;
        text-decoration: none;
      }

      @media (max-width: 648px) {
        padding: 8px;
      }
    `}
  >
    {children || null}
  </Link>
);

export const social = css`
  margin: 0;
  display: flex;
  flex-flow: nowrap row;
  align-items: center;

  @media (max-width: 648px) {
    display: none;
  }
`;
