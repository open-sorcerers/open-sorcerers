import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'rebass'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

export const StyledNavigation = styled(Box)`
  display: flex;
  align-items: center;
  background-color: #409;
  color: #fff;
  overflow: hidden;
  height: 10vh;
  min-height: 5rem;
`

export const Inner = styled(Box)`
  display: flex;
  flex-flow: nowrap row;

  @media (max-width: 648px) {
    flex-flow: nowrap column;
  }
`

export const Brand = styled(Link)`
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

  svg {
    fill: white;
    max-height: 50px;
  }

  @media (max-width: 648px) {
    margin: 8px 0;
    justify-content: center;
  }

  :hover {
    text-decoration: none;
  }
`

export const Nav = styled(Box)`
  display: flex;
  flex-flow: nowrap row;
  flex: 1 1 auto;
  align-items: center;

  @media (max-width: 648px) {
    margin: 0 -24px;
    justify-content: center;
    overflow-x: auto;
  }
`

export const Item = ({ isActive, ...other }) => (
  <Link
    {...other}
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
  />
)
Item.propTypes = { isActive: PropTypes.bool }

export const Social = styled.div`
  margin: 0;
  display: flex;
  flex-flow: nowrap row;
  align-items: center;

  @media (max-width: 648px) {
    display: none;
  }
`
