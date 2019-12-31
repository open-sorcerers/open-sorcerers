import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import { Link } from 'gatsby'
import { Box } from 'rebass'
import { join, map, pipe } from 'ramda'

import { primary, secondary } from '@styles/colors'
import { above } from '@styles/media'
import { Z_INDEX } from '@styles/constants'
import { transition, transitionEaseOut, easeOut } from '@styles/animation'

const { MENU, MENU_OVER, MENU_UNDER, INTERACTIVE } = Z_INDEX

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
  max-height: 32rem;
  height: 55vh;
  padding: 0;
  top: 0;
  opacity: 0;
  ${above.MID_TABLET(`
    width: 66vw;
    height: 100vh;
    min-height: 100vh;
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
  background-color: #222;
  box-shadow: -1rem 0 1rem rgba(0, 0, 0, 0.7);
  left: 0;
  top: 0;
  opacity: 1;
  ${above.MID_TABLET(`
     width: 66vw;
     height: 100vh;
     min-height: 100vh;
     left: 34vw;
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
  transition: ${easeOut('0.3s', [
      'background',
      'border',
      'left',
      'top',
      'right',
      'width',
      'height'
    ])},
    transform 6s ease-in-out;
  &:hover {
    svg {
      fill: yellow;
    }
  }
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
    ${transitionEaseOut('0.3s', ['fill', 'stroke', 'stroke-width'])}
  }
  ${above.MID_TABLET(`
    right: -15rem;
    position: absolute;
    top: 0.5rem;
    width: 9rem;
    height: 9rem;
    z-index: ${MENU_UNDER};
    background-color: transparent;
    border-color: transparent;
    /* background-color: lime; */
    &:hover {
      svg { fill: yellow; stroke-width: 1.2rem; stroke: yellow; }
    }
    svg {
      fill: ${primary};
      top: -1.6rem;
      left: -1.6rem;
      width: 9rem;
      min-width: 9rem;
      height: 9rem;
      min-height: 9rem;
      stroke: ${primary};
      stroke-width: 0.6rem;
    }
  `)}
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
  height: 4rem;
  margin: 0 auto;
  padding: 0;
`

export const MenuCog = styled(Box)`
  bottom: -6.75rem;
  cursor: pointer;
  display: inline-block;
  margin: 0 10%;
  position: absolute;
  pointer-events: auto;
  text-align: center;
  ${transitionEaseOut('0.3s', ['bottom', 'left', 'margin'])}
  width: 80vw;
  z-index: ${MENU_UNDER};
  svg {
    fill: #222;
    stroke-width: 0;
    stroke: #222;
    transition: fill 0.3s ease-out, stroke 0.3s ease-out, stroke-width 0.6s ease-out;

    animation-direction: normal;
    animation: ${rotateSlowly} 18s ease-in-out infinite;
    animation-play-state: ${p => (p.active ? 'running' : 'paused')};
  }
  &:hover {
    svg {
      fill: #222;
      stroke: #222;
      stroke-width: 1.6rem;
    }
  }
  ${above.MID_TABLET(`
     width: 10vw;
     position: fixed;
     bottom: calc(4rem + -5vh);
     right: -2.5rem;
     z-index: ${MENU_OVER};
     svg {
       fill: ${secondary};
     }
     &:hover {
       svg {
         fill: yellow;
         stroke: yellow;
         stroke-width: 10px;
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
