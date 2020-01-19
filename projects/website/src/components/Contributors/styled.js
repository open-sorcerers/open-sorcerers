import styled from '@emotion/styled'
import { Box } from 'rebass'

import * as ℂ from '@styles/colors'

export const StyledContributors = styled(Box)`
  padding: 1rem;
  margin: 1rem;
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
    flex-direction: row;
    padding: 0;
    width: 100%;
    li {
      list-style: none;
    }
  }
`

export const StyledContributor = styled(Box)`
  display: inline-block;
  position: relative;
  text-align: center;
  border: 2px solid ${ℂ.area.contributor.f};
  transition: border 0.1s ease-in, box-shadow 0.3s ease-out;
  background-clip: content-box;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.7);
  height: 14rem;
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
  &:first-of-type {
    margin-top: 4rem;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: ${ℂ.area.contributor.b};
    background-repeat: repeat;
    background-position: center;
    top: -1rem;
    bottom: -1rem;
    left: -1rem;
    right: -1rem;
    z-index: -1;
  }
  &::after {
    transition: background-size 0.1s ease-in;
    background-color: transparent;
    background-image: url(/nebula.png);
    background-size: 70%;
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
