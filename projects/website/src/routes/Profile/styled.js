import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Box } from 'rebass'
import { Z_INDEX } from '@styles/constants'

import { tertiary } from '@styles/colors'

const PLACEHOLDER_SIZE = 100

export const ProfilePage = styled(Box)`
  text-align: center;
  display: block;
  margin-top: 10vh;
`

export const pseudo = css`
  border-left: ${PLACEHOLDER_SIZE / 2}px solid transparent;
  border-right: ${PLACEHOLDER_SIZE / 2}px solid transparent;
  content: '';
  height: 0;
  left: 0;
  position: absolute;
  width: 0;
`

export const pseudoHeight = 28
export const red = '#c00'
export const placeholderColor = 'white'
export const rainbowShadows = css`
  box-shadow: 0 0 6rem rgba(255, 0, 0, 0.75), -3rem -3rem 6rem rgba(0, 255, 0, 0.75),
    3rem 3rem 6rem rgba(0, 0, 255, 0.75);
`
export const menuPlaceholder = css`
  display: block;
  width: 3.5rem;
  height: 3.5rem;
  text-align: center;
  vertical-align: middle;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 9999rem;
  background-color: ${tertiary};
`
export const placeholder = css`
  display: block;
  position: relative;
  margin: 4rem auto;
  background-color: ${placeholderColor};
  width: ${PLACEHOLDER_SIZE}px;
  height: ${PLACEHOLDER_SIZE * 0.55}px;
  ${rainbowShadows} 
  &:before {
    ${pseudo}
    top: -${pseudoHeight}px;
    border-bottom: ${pseudoHeight}px solid ${placeholderColor};
  }
  &:after {
    ${pseudo}
    bottom: -${pseudoHeight}px;
    border-top: ${pseudoHeight}px solid ${placeholderColor};
  }
`

export const Img = styled(Box)`
  display: block;
  margin: 0 auto;
  padding: 0;
  width: 10rem;
  position: relative;
  text-align: center;
  img {
    max-width: 8rem;
    max-height: 8rem;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    display: inline;
    margin: 0 auto;
    position: relative;
  }
`

export const logoutButton = css`
  float: right;
  z-index: ${Z_INDEX.INTERACTIVE};
  height: 46px;
  background-color: #c00;
  border: 4px solid #c00;
  transition: background 0.3s ease-out, border 0.3s ease-out;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  margin-right: 1rem;
  text-decoration: none;
  color: white;

  &:hover {
    background-color: white;
    border-color: #c00;
    color: #c00;
  }
`
