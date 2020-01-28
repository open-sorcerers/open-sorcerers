import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import { Link } from 'gatsby'
import { Box } from 'rebass'
import { pathOr, join, map, pipe } from 'ramda'

import { above } from '@styles/media'
import { Z_INDEX } from '@styles/constants'
import { transition, transitionEaseOut, easeOut } from '@styles/animation'

const grab = pathOr('lime')

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

const menuB = grab(['theme', 'colors', 'cs', 'menu', 'b'])
export const FloatingMenuContent = styled.ul`
  z-index: ${MENU_CONTENT};
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${menuB};
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
  background-color: ${menuB};
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

const activeMenuButton = grab(['theme', 'colors', 'ui', 'menuButton', 'a', 'f'])
const menuButton = grab(['theme', 'colors', 'ui', 'menuButton', 'f'])
export const activeButtonState = css`
  background-color: rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transform: rotate(10turn);
  animation-play-state: paused;
  svg {
    fill: ${activeMenuButton};
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
    fill: ${menuButton};
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
    width: 6rem;
    height: 6rem;
    z-index: ${MENU_UNDER};
    background-color: transparent;
    border-color: transparent;
    &:hover {
      svg {
        fill: ${activeMenuButton};
        stroke-width: 1.2rem;
        stroke: ${activeMenuButton};
      }
    }
    svg {
      fill: ${menuButton};
      top: -1.64rem;
      left: -1.64rem;
      width: 6rem;
      min-width: 6rem;
      height: 6rem;
      min-height: 6rem;
      stroke: ${menuButton};
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
      fill: ${activeMenuButton};
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
const narrow = pathOr('Comic Sans', ['theme', 'fonts', 'obviouslyNarrow'])
export const MenuLink = styled(Link)`
  display: flex;
  pointer-events: auto;
  flex-direction: column;
  width: 100%;
  color: ${grab(['theme', 'colors', 'ui', 'menu', 'f'])};
  line-height: 4rem;
  font-size: 10vw;
  font-family: obviously, sans-serif;
  font-weight: 900;
  padding: 0.55rem 0;
  letter-spacing: 0.1rem;
  &:hover {
  color: ${grab(['theme', 'colors', 'ui', 'menu', 'a', 'f'])};
  }

  ${above.TABLET_PORTRAIT(`
    font-size: 8vw;
  `)}
  ${above.SUB_TABLET(`
    font-size: 5.5vw;
  `)}
  ${above.MID_TABLET(`
    font-size: 4vw;
  `)}
  &.coming-soon {
    &::after {
      font-size: 0.8rem;
      line-height: 1.2rem;
      top: 1.35rem;
      right: -20rem;
      ${above.TINY_PHONE(`
        right: 4rem;
      `)}
      ${above.SMALL_PHONE(`
        right: 7rem;
      `)}
      ${above.TABLET_PORTRAIT(`
        right: 10rem;
      `)}
      ${above.MID_TABLET(`
        right: 4rem;
      `)}
      ${above.LARGE_TABLET(`
        right: 7rem;
      `)}
      ${above.DESKTOP(`
        right: 6rem;
      `)}
    }
  }
  &.log {
    margin-top: 0.5rem;
    font-size: 8vw;
    ${above.TABLET_PORTRAIT(`
      font-size: 7vw;
    `)}
    ${above.SUB_TABLET(`
      font-size: 4vw;
    `)}
    ${above.MID_TABLET(`
      font-size: 2vw;
    `)}
  }
  &.profile {
    ${narrow}
    font-style: italic;
    font-size: 1.25rem;
  }
`
export const ProfileImg = styled(Box)`
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  text-align: center;
  img {
    margin-right: 2vw;
    max-width: 10vw;
    max-height: 10vw;
    min-width: 10vw;
    min-height: 10vw;
    background: ${grab(['theme', 'colors', 'cs', 'profileImg', 'b'])};
    clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
    display: inline;
    margin: 0;
    position: relative;
  }
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

const cogColor = grab(['theme', 'colors', 'ui', 'cog', 'f'])
const cogActive = grab(['theme', 'colors', 'ui', 'cog', 'a', 'f'])
const cogOverMidTablet = grab(['theme', 'colors', 'ui', 'cogOverMidTablet', 'f'])
const cogOverMidTabletActive = grab(['theme', 'colors', 'ui', 'cogOverMidTablet', 'a', 'f'])

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
    fill: ${cogColor};
    stroke-width: 0;
    stroke: ${cogColor};
    transition: ${easeOut('0.3s', ['fill', 'stroke'])}, ${easeOut('0.6s', ['stroke-width'])};
    animation: ${rotateSlowly} 18s ease-in-out infinite;
    animation-direction: normal;
    animation-play-state: ${p => (p.active ? 'running' : 'paused')};
    ${above.MID_TABLET(`
      fill: ${cogOverMidTablet};
      stroke: ${cogOverMidTablet};
    `)}
  }
  
  &:hover {
    svg {
      fill: ${cogActive};
      stroke: ${cogActive};
      stroke-width: 1.6rem;
    }
  }

  ${above.MID_TABLET(`
    width: 10vw;
    position: fixed;
    bottom: calc(2rem + -5vh);
    right: -2.5rem;
    svg {
      fill: ${cogOverMidTablet};
    }
    &:hover {
      svg {
        fill: ${cogOverMidTabletActive};
        stroke: ${cogOverMidTabletActive};
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

const cog2 = grab(['theme', 'colors', 'ui', 'cog2', 'f'])
const cog2Active = grab(['theme', 'colors', 'ui', 'cog2', 'a', 'f'])
const cog2Stroke = grab(['theme', 'colors', 'ui', 'cog2Stroke', 'a', 'f'])

export const MenuCogTop = styled(Box)`
  ${cog}
  z-index: ${MENU_OVER};
  transform: scale(0.3);
  position: fixed;
  top: -24rem;
  left: -50%;
  margin: 0 14%;
  svg {
    fill: ${cog2};
    stroke: ${cog2};
  }
  &:hover {
    svg {
      fill: ${cog2Active};
      stroke: ${cog2Stroke};
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
