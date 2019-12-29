import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import { Box } from 'rebass'

import { secondary } from '@styles/colors'
import { minBreak } from '@styles/media'
import { Z_INDEX } from '@styles/constants'
import { transitionEaseOut, easeOut } from '@styles/animation'

const { MENU, INTERACTIVE } = Z_INDEX

export const rotate = keyframes`
  98% {
    transform: rotate(0);
  }
  99% {
    transform: rotate(0.5turn); 
  }
  100% {
    transform: rotate(1turn)
  }
`

export const floatingMenu = css`
  z-index: ${Z_INDEX.MENU};
  ${transitionEaseOut('0.4s', ['transform', 'background', 'color'])};
  position: fixed;
  pointer-events: none;
  margin: 0;
  margin-left: 0;
  width: 100vw;
  min-width: 100vw;
  height: 100vh;
  min-height: 100vh;
  display: block;
  padding: 1rem;
  top: translate(0, 100vh) ${minBreak.S(`
  position: absolute;
  top: 0;
  width: 50vw;
  height: 100%;
  min-height: calc(100vh + 4rem);
  padding: 0.75rem 1.6rem;
  `)};
`

export const inactiveMenu = css`
  transform: translate(0, 100vh);
  width: 100vw;
  left: 0;
  ${minBreak.M(`
  transform: translate(24vw);
  `)}
`

export const activeMenu = css`
  opacity: 0.6;
  transform: translate(0, 3rem);
  background-color: yellow;
  left: 0;
  ${minBreak.S(`
  transform: translate(7rem);
  box-shadow: -1rem 0 1rem rgba(0, 0, 0, 0.5);
  `)}
`

export const FloatingMenu = styled(Box)`
  ${floatingMenu}
`
export const inactiveButtonState = css`
  transform: rotate(0deg);
  svg {
    fill: ${secondary};
  }
`
export const activeButtonState = css`
  background-color: rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transform: rotate(10turn);
  animation-play-state: paused;
  svg {
    fill: yellow;
  }
`
export const SettingsButton = styled(Box)`
  z-index: ${MENU};
  cursor: pointer;
  border-radius: 1000rem;
  width: 2rem;
  height: 2rem;
  padding: 1.5rem;
  margin: 0;
  margin-top: 1.25rem;
  position: relative;
  text-align: center;
  display: inline-block;
  background-color: #308;
  border: 2px solid rgba(0, 0, 0, 0.3);
  /* the long transition on the transform makes the cog turn */
  transition: ${easeOut('0.3s', ['background', 'border'])}, transform 6s ease-in-out;
  svg {
    animation: ${rotate} 15s linear infinite;
    ${transitionEaseOut('0.3s', ['fill', 'top', 'left'])}
    display: inline-block;
    position: relative;
    fill: ${secondary};
    width: 2.5rem;
    height: 2.5rem;
    max-width: 2.5rem;
    max-height: 2.5rem;
    top: -1.25rem;
    left: -1.25rem;
    z-index: ${INTERACTIVE};
    margin: 0;
  }
`

export const StyledMenu = styled(Box)`
  position: relative;
  margin: 0 auto;
  text-align: center;
  ${transitionEaseOut('0.3s', ['right', 'padding'])}
`

export const menuWrapper = styled`
  text-align: center;
  margin: 0;
  display: flex;
  flex-flow: nowrap row;
  align-items: center;
`
