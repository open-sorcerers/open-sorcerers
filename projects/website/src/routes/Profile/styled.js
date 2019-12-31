import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Box } from 'rebass'
import { Z_INDEX } from '@styles/constants'
import { transitionEaseOut } from '@styles/animation'

import * as ℂ from '@styles/colors'

const HEX = 100

export const ProfilePage = styled(Box)`
  text-align: center;
  display: block;
  margin-top: 10vh;
`

const pseudo = css`
  border-left: ${HEX / 2}px solid ${ℂ.transparent};
  border-right: ${HEX / 2}px solid ${ℂ.transparent};
  content: '';
  height: 0;
  left: 0;
  position: absolute;
  width: 0;
`

const hexHeight = 28
const rainbowShadows = css`
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
  background-color: ${ℂ.tertiary};
`
export const placeholder = css`
  display: block;
  position: relative;
  margin: 4rem auto;
  background-color: ${ℂ.placeholder};
  width: ${HEX}px;
  height: ${HEX * 0.55}px;
  ${rainbowShadows} 
  &:before {
    ${pseudo}
    top: -${hexHeight}px;
    border-bottom: ${hexHeight}px solid ${ℂ.placeholder};
  }
  &:after {
    ${pseudo}
    bottom: -${hexHeight}px;
    border-top: ${hexHeight}px solid ${ℂ.placeholder};
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
  background-color: ${ℂ.red};
  border: 4px solid ${ℂ.red};
  ${transitionEaseOut(`0.3s`, ['background', 'border'])}
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  margin-right: 1rem;
  text-decoration: none;
  color: ${ℂ.white};

  &:hover {
    background-color: ${ℂ.white};
    border-color: ${ℂ.red};
    color: ${ℂ.red};
  }
`
