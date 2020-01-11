import styled from '@emotion/styled'
import { Box } from 'rebass'

import { Img } from '@routes/Profile/styled'
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
  &:first-of-type {
    margin-top: 4rem;
  }
  a {
    color: ${ℂ.primary};
  }
  img {
    background: ${ℂ.primary} !important;
    border-radius: 100rem;
    border: 0 solid ${ℂ.primary};
    transition: border 0.3s ease-out;
  }
  a:hover {
    color: ${ℂ.tertiary};
    img {
      border-width: 0.75rem;
      background: ${ℂ.tertiary} !important;
    }
  }
  strong {
    font-family: obviously-narrow, 'Obviously', sans-serif;
    font-style: italic;
    font-weight: 500;
    font-size: 1.5rem;
  }
`
