import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import { Link } from 'gatsby'
import { Box } from 'rebass'
import { join, map, pipe } from 'ramda'

import { tertiary, secondary } from '@styles/colors'
import { above } from '@styles/media'
import { Z_INDEX } from '@styles/constants'
import { transition, transitionEaseOut, easeOut } from '@styles/animation'

const { MENU, MENU_UNDER, INTERACTIVE } = Z_INDEX

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

const sixth = x => `${Math.round(Math.round(x * (100 / 6) * 100) / 100)}%`
export const rotateSlowly = keyframes`
  0% {

    transform: rotate(0deg);
  }
  ${pipe(
    map(
      xx => `${sixth(xx)} {
    transform: rotate(${xx * 60}deg);
  }`
    ),
    join('\n'),
    aa => `${aa}
  100% {
    transform: rotate(360deg);
  }
    `
  )([1, 2, 3, 4, 5])}
`

export const FloatingMenuContent = styled.ul`
  z-index: ${MENU};
  position: relative;
  width: 100%;
  height: 100%;
`

export const FloatingMenu = styled(Box)`
  z-index: ${Z_INDEX.MENU};
  ${transition('ease-in-out', '0.6s', ['transform', 'background', 'color', 'top', 'opacity'])};
  position: fixed;
  pointer-events: none;
  margin: 0;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 28rem;
  max-height: 32rem;
  height: 55vh;
  padding: 0;
  top: 0;
  opacity: 0;
  ${above.TABLET_PORTRAIT(`
  position: absolute;
  top: 0;
  width: 50vw;
  height: 100%;
  min-height: calc(100vh + 4rem);
  padding: 0.75rem 1.6rem;
  `)};
`

export const inactiveMenu = css`
  transform: translate(0, -100vh);
  width: 100vw;
  left: 0;
  ${above.TABLET_PORTRAIT(`
  transform: translate(24vw);
  `)}
`

export const activeMenu = css`
  transform: translate(0, 0);
  background-color: #222;
  box-shadow: -1rem 0 1rem rgba(0, 0, 0, 0.7);
  left: 0;
  top: 0;
  opacity: 1;
  ${above.TABLET_PORTRAIT(`
    transform: translate(7rem);
  `)}
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

export const MenuLink = styled(Link)`
  display: flex;
  pointer-events: auto;
  flex-direction: column;
  width: 100%;
  height: 4rem;
  display: block;
  color: white;
  line-height: 4rem;
  font-size: 10vw;
  padding: 0.55rem 0;
  letter-spacing: 0.2rem;
  &:hover {
    color: white;
  }
`
export const MenuItem = styled.li`
  list-style: none;
  width: 100%;
  height: 4rem;
  margin: 0 auto;
  padding: 0;
`

export const menuCog = css`
  animation-direction: normal;
  animation: ${rotateSlowly} 18s ease-in-out infinite;
  bottom: -6.75rem;
  cursor: pointer;
  display: inline-block;
  fill: #222;
  margin: 0 10%;
  position: absolute;
  pointer-events: auto;
  stroke-width: 0;
  stroke: #222;
  text-align: center;
  transition: fill 0.3s ease-out, stroke 0.3s ease-out, stroke-width 0.6s ease-out;
  width: 80vw;
  z-index: ${MENU_UNDER};
  &:hover {
    fill: #222;
    stroke: #222;
    stroke-width: 1.6rem;
  }
`
