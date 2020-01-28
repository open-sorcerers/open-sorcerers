import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { Box } from 'rebass'
import { Z_INDEX } from '@styles/constants'
import { transitionEaseOut } from '@styles/animation'

import * as ℂ from '@styles/colors'
import { pathOr } from 'ramda'
const grab = pathOr('lime')

const HEX = 100

export const ProfilePage = styled(Box)`
  text-align: center;
  display: block;
  margin-top: 10vh;
`

const pseudo = css`
  border-left: ${HEX / 2}px solid ${ℂ.named.transparent};
  border-right: ${HEX / 2}px solid ${ℂ.named.transparent};
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
  background-color: ${grab(['theme', 'colors', 'cs', 'menuProfile', 'b'])};
`
const placeholderB = grab(['theme', 'colors', 'cs', 'profile', 'b'])
export const placeholder = css`
  display: block;
  position: relative;
  margin: 4rem auto;
  background-color: ${placeholderB};
  width: ${HEX}px;
  height: ${HEX * 0.55}px;
  ${rainbowShadows} 
  &::before {
    ${pseudo}
    top: -${hexHeight}px;
    border-bottom: ${hexHeight}px solid ${placeholderB};
  }
  &::after {
    ${pseudo}
    bottom: -${hexHeight}px;
    border-top: ${hexHeight}px solid ${placeholderB};
  }
`

const profileImgBack = grab(['theme', 'colors', 'cs', 'profileImg', 'b'])
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
    min-width: 8rem;
    min-height: 8rem;
    background: ${profileImgBack};
    clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
    display: inline;
    margin: 0 auto;
    position: relative;
  }
`

const logoutB = grab(['theme', 'colors', 'ui', 'logout', 'b'])
const logoutAB = grab(['theme', 'colors', 'ui', 'logout', 'b'])
const logoutAF = grab(['theme', 'colors', 'ui', 'logout', 'a', 'f'])
const logoutF = grab(['theme', 'colors', 'ui', 'logout', 'f'])
export const StyledLogoutButton = styled(Link)`
  float: right;
  z-index: ${Z_INDEX.INTERACTIVE};
  height: 3.25rem;
  background-color: ${logoutB};
  border: 4px solid ${logoutB};
  ${transitionEaseOut(`0.3s`, ['background', 'border'])}
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  margin-right: 1rem;
  text-decoration: none;
  color: ${logoutF};
  font-family: obviously-narrow, 'Obviously', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  font-style: italic;

  &:hover {
    background-color: ${logoutAB};
    border-color: ${logoutAB};
    color: ${logoutAF};
  }
`
