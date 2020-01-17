import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import { Link } from 'gatsby'
import { Box } from 'rebass'
import { join, map, pipe } from 'ramda'

import * as ℂ from '@styles/colors'

import { above } from '@styles/media'
import { Z_INDEX } from '@styles/constants'
import { transition, transitionEaseOut, easeOut } from '@styles/animation'

const { MENU, MENU_CONTENT, MENU_OVER, MENU_UNDER, INTERACTIVE } = Z_INDEX

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
const sixthParts = pipe(
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
)
const sixth = x => `${Math.round(Math.round(x * (100 / 6) * 100) / 100)}%`
export const rotateSlowly = keyframes`
  0% {
    transform: rotate(0deg);
  }

  ${sixthParts([1, 2, 3, 4, 5])}
`

export const FloatingMenuContent = styled.ul`
  z-index: ${MENU_CONTENT};
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${ℂ.AREA.MENU};
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`

export const FloatingMenu = styled(Box)`
  z-index: ${MENU};
  ${transition('ease-in-out', '0.6s', [
    'transform',
    'background',
    'color',
    'top',
    'opacity',
    'height'
  ])};
  position: fixed;
  pointer-events: none;
  margin: 0;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 28rem;
  height: ${p => (p.authenticated ? '80vh' : '50vh')};
  padding: 0;
  top: 0;
  opacity: 0;
  ${above.MID_TABLET(`
    width: 40vw;
    height: 100vh;
    min-height: 100vh;
  `)}
  ${above.DESKTOP(`
    width: 33vw;
  `)}
`

export const inactiveMenu = css`
  transform: translate(0, -100vh);
  width: 100vw;
  left: 0;
  pointer-events: none;
  visibility: hidden;
  ${above.MID_TABLET(`
    transform: translate(76vw, 0);
  `)}
`

export const activeMenu = css`
  visibility: visible;
  pointer-events: auto;
  transform: translate(0, 0);
  background-color: ${ℂ.AREA.MENU};
  box-shadow: -1rem 0 1rem rgba(0, 0, 0, 0.7);
  left: 0;
  top: 0;
  opacity: 1;
  ${above.MID_TABLET(`
     left: 60vw;
  `)}
  ${above.DESKTOP(`
     left: 68vw;
  `)}
`

export const inactiveButtonState = css`
  transform: rotate(0deg);
`
export const activeButtonState = css`
  background-color: rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transform: rotate(10turn);
  animation-play-state: paused;
  svg {
    fill: ${ℂ.tertiary};
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
  background-color: transparent;
  border: 2px solid rgba(255,255,255, 0.3);

  /* the long transition on the transform makes the cog turn */
  transition: ${easeOut('0.3s', [
    'background',
    'border',
    'left',
    'top',
    'right',
    'width',
    'height',
    'margin'
  ])},
    transform 6s ease-in-out;

  svg {
  animation: ${rotate} 15s linear infinite;
  ${transitionEaseOut('0.3s', ['fill', 'top', 'left'])}
  display: inline-block;
  position: relative;
  fill: ${ℂ.secondary};
  width: 2.5rem;
  height: 2.5rem;
  max-width: 2.5rem;
  max-height: 2.5rem;
  top: -1.25rem;
  left: -1.25rem;
  z-index: ${INTERACTIVE};
  margin: 0;
  ${transitionEaseOut('0.3s', ['fill', 'stroke', 'stroke-width'])}
  }

  ${above.MID_TABLET(`
    right: -15rem;
    position: absolute;
    top: 3.25rem;
    width: 9rem;
    height: 9rem;
    z-index: ${MENU_UNDER};
    background-color: transparent;
    border-color: transparent;
    /* background-color: lime; */
    &:hover {
      svg {
        fill: ${ℂ.tertiary};
        stroke-width: 1.2rem;
        stroke: ${ℂ.tertiary};
      }
    }
    svg {

  fill: ${ℂ.primary};
  top: -1.68rem;
  left: -1.6rem;
  width: 9rem;
  min-width: 9rem;
  height: 9rem;
  min-height: 9rem;
  stroke: ${ℂ.primary};
  stroke-width: 0.6rem;
    }
  `)}
  ${above.TABLET_LANDSCAPE(`
     margin-right: -3rem;
  `)}
  ${above.LARGE_TABLET(`
     margin-right: -6rem;
  `)}
  &:hover {
    svg {
      fill: ${ℂ.tertiary};
    }
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
  color: white;
  line-height: 4rem;
  font-size: 10vw;
  font-family: obviously, sans-serif;
  font-weight: 900;
  padding: 0.55rem 0;
  letter-spacing: 0.1rem;
  &:hover {
    color: white;
  }

  ${above.TABLET_PORTRAIT(`
    font-size: 9vw;
  `)}
  ${above.MID_TABLET(`
    font-size: 4vw;
  `)}
`
export const MenuItem = styled.li`
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 4rem;
`

export const cog = css`
  bottom: -6.75rem;
  cursor: pointer;
  display: inline-block;
  margin: 0 10%;
  position: absolute;
  pointer-events: auto;
  text-align: center;
  ${transitionEaseOut('0.3s', ['bottom', 'left', 'margin'])}
  width: 80vw;

  /* stylelint-disable-next-line no-descending-specificity */
  svg {
    fill: ${ℂ.quaternary};
    stroke-width: 0;
    stroke: ${ℂ.quaternary};
    transition: ${easeOut('0.3s', ['fill', 'stroke'])}, ${easeOut('0.6s', ['stroke-width'])};
    animation: ${rotateSlowly} 18s ease-in-out infinite;
    animation-direction: normal;
    animation-play-state: ${p => (p.active ? 'running' : 'paused')};
    ${above.MID_TABLET(`
      fill: ${ℂ.secondary};
      stroke: ${ℂ.secondary};
    `)}
  }
  
  &:hover {
    svg {
      fill: ${ℂ.quaternary};
      stroke: ${ℂ.quaternary};
      stroke-width: 1.6rem;
    }
  }

  ${above.MID_TABLET(`
    width: 10vw;
    position: fixed;
    bottom: calc(4rem + -5vh);
    right: -2.5rem;
    svg {
      fill: ${ℂ.secondary};
    }
    &:hover {
      svg {
        fill: ${ℂ.tertiary};
        stroke: ${ℂ.tertiary};
        stroke-width: 0.75rem;
      }
    }
  `)}
  ${above.LARGE_TABLET(`
     bottom: calc(4rem + -8vh);
  `)}
  ${above.DESKTOP(`
     bottom: calc(4rem + -10vh);
  `)}
`

export const MenuCog = styled(Box)`
  ${cog}
  z-index: ${MENU_UNDER};
  ${above.MID_TABLET(`
    z-index: ${MENU_OVER};
  `)}

`
export const MenuCogTop = styled(Box)`
  ${cog}
  z-index: ${MENU_OVER};
  transform: scale(0.3);
  position: fixed;
  top: -24rem;
  left: -50%;
  margin: 0 14%;
  svg {
    fill: ${ℂ.tertiary};
    stroke: ${ℂ.tertiary};
  }
  &:hover {
    svg {
      fill: ${ℂ.secondary};
      stroke: ${ℂ.primary};
      stroke-width: 0.1rem;
    }
  }
  ${above.SMALL_PHONE(`
    bottom: ${p => (p.authenticated ? '-18rem' : '0')};
  `)}

  ${above.MID_TABLET(`
    transform: scale(0.6);
    left: -69vw;
  `)}
`
