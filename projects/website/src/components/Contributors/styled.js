import styled from '@emotion/styled'
import { Box } from 'rebass'
import { above } from '@styles/media'

import * as ℂ from '@styles/colors'

export const StyledContributors = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-wrap: column;
  text-align: center;
  h1 {
    margin-top: 0;
    width: 100%;
  }
  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 100%;
    li {
      list-style: none;
    }
    justify-content: center;
    ${above.TABLET_PORTRAIT(`
    flex-direction: row;
      flex-wrap: wrap;
    `)}
  }
`
export const Li = styled(Box)`
  display: flex;
  min-width: 10rem;
  flex-direction: column;
  margin: 0 0 3rem;
  width: 100%;
  &:first-of-type {
    margin-top: 4rem;
  }
  ${above.TABLET_PORTRAIT(`
    margin: 2rem 0 1rem;
    width: calc(50% - 1.5rem);
    &:nth-child(even) {
      margin-left: 1.5rem;
    }
    &:nth-child(odd) {
      margin-right: 1.5rem;
    }
    &:first-of-type {
      margin-top: 2rem;
    }
  `)}
  ${above.DESKTOP(`
    margin: 2rem 0 1rem;
    width: calc(33.333333333333333% - 2rem);
    &:nth-child(even) {
      margin-left: initial;
    }
    &:nth-child(odd) {
      margin-right: initial;
    }
    &:nth-child(3n + 2) {
      color: lime !important;
      margin: 2rem 3rem 1rem;
    }
    &:first-of-type {
      margin-top: 2rem;
    }
  `)}
`
export const StyledContributor = styled(Box)`
  min-width: 10rem;
  display: inline-block;
  position: relative;
  text-align: center;
  border: 2px solid ${ℂ.area.contributor.f};
  color: ${ℂ.ui.contributor.link.f};
  transition: border 0.1s ease-in, box-shadow 0.3s ease-out;
  background-clip: content-box;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.7);
  width: 100%;
  padding: 2rem 0;

  a {
    color: ${ℂ.ui.contributor.link.f};
  }
  img {
    border-radius: 100rem;
    border: 0 solid ${ℂ.area.contributor.img.f};
    transition: border 0.1s ease-out;
    background-color: ${ℂ.area.contributor.img.b} !important;
  }
  strong {
    font-family: obviously-narrow, 'Obviously', sans-serif;
    font-style: italic;
    font-weight: 500;
    font-size: 1.6rem;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    background-repeat: repeat;
    background-position: center;
    background-color: ${ℂ.area.contributor.b};
    top: -1rem;
    bottom: -1rem;
    left: -1rem;
    right: -1rem;
    z-index: -1;
  }
  &::after {
    transition: background-size 0.1s ease-in;
    background-image: url(/nebula.png);
    background-blend-mode: color-dodge;
    background-size: 110%;
    background-color: ${ℂ.named.transparent};
    /* opacity: 0.9; */
  }
  &:hover {
    border: 2px solid transparent;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.9), 0 1rem 1.5rem rgba(0, 0, 0, 0.6);
    strong {
      color: ${ℂ.ui.contributor.link.a.f};
    }
    img {
      border-width: 0.75rem;
    }
    &::after {
      background-size: 95%;
    }
  }
`
