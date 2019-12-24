import { Button, Box } from 'rebass'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { maxBreak } from '@styles/media'
import { primary, secondary } from '@styles/colors'
import { hexagon } from '@styles/pseudo'

export const StyledNavigation = styled(Box)`
  display: flex;
  align-items: center;
  background-color: #409;
  color: #fff;
  height: 10vh;
  min-height: 5rem;
`

export const Inner = styled(Box)`
  display: flex;
  flex-flow: nowrap row;

  ${maxBreak.S(`
    flex-flow: nowrap column;
  `)}
`

export const Brand = styled(Link)`
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
    width: 100%;
    fill: white;
    max-height: 50px;
  }

  ${maxBreak.S(`
    margin: 8px 0;
    justify-content: center;
  `)}

  :hover {
    text-decoration: none;
  }
`

export const Nav = styled(Box)`
  display: flex;
  flex-flow: nowrap row;
  flex: 1 1 auto;
  align-items: center;

  ${maxBreak.S(`
    margin: 0 -24px;
    justify-content: center;
    overflow-x: auto;
  `)}
`

export const Item = styled(Link)`
  padding: 16px 8px;
  color: #fff;
  font-weight: 500;
  line-height: 24px;
  opacity: ${p => (p.isActive ? '1' : '0.6')};
  text-decoration: none;

  :hover {
    opacity: 1;
    text-decoration: none;
  }
  ${maxBreak.S(`
    padding: 8px;
  `)}
`

export const Social = styled.div`
  margin: 0;
  display: flex;
  flex-flow: nowrap row;
  align-items: center;

  @media ${maxBreak.S(`
    display: none;
  `)};
`

export const StyledDropMenu = styled(Box)`
  position: relative;
  transition: right 0.3s ease-out, padding 0.3s ease-out;
`

const dropMenuWrapper = css`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 33vw;
  padding: 0;
  margin: 0;
  min-height: calc(100vh + 4rem);
  background-color: lime;
  transition: background 0.3s ease-out, opacity 0.3s ease-out, right 0.3s ease-out;
  pointer-events: none;
`

export const inactiveDropMenu = css`
  ${dropMenuWrapper}
  visibility: hidden;
  opacity: 0;
`
export const activeDropMenu = css`
  ${dropMenuWrapper}
  opacity: 0.3;
  pointer-events: auto;
`

export const inactiveState = css`
  transform: rotate(0deg);
  svg {
    fill: ${secondary};
  }
`
export const activeState = css`
  background-color: ${secondary};
  transform: rotate(10turn);
  border: 2px solid ${primary};
  svg {
    fill: ${primary};
  }
`
export const SettingsButton = styled(Box)`
  border-radius: 1000rem;
  width: 2rem;
  height: 2rem;
  padding: 1.5rem;
  position: relative;
  text-align: center;
  display: block;
  border: 2px solid ${secondary};
  /* the long transition on the transform makes the cog turn */
  transition: background 0.3s ease-out, transform 4s ease-in-out, border 0.3s ease-out;
  svg {
    transition: fill 0.3s ease-out, top 0.3s ease-out, left 0.3s ease-out;
    display: inline-block;
    position: relative;
    fill: ${secondary};
    width: 2.5rem;
    height: 2.5rem;
    max-width: 2.5rem;
    max-height: 2.5rem;
    top: -1.25rem;
    left: -1.25rem;
    z-index: 5;
  }
`
