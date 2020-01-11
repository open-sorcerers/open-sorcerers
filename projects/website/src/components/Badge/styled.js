import styled from '@emotion/styled'
import { Box } from 'rebass'
import { curry, propEq, ifElse, pipe } from 'ramda'

import * as ℂ from '@styles/colors'

import { Z_INDEX } from '@styles/constants'

const vary = curry(([aa, bb], props) =>
  ifElse(
    propEq('variant', 'left'),
    () => bb,
    () => aa
  )(props)
)

export const StyledBadge = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
  margin: 0 auto;
  padding: 0;
  z-index: ${Z_INDEX.CONTENT};
  width: 3rem;
  height: 3rem;
  display: block;
  color: white;
  &::after,
  &::before {
    position: absolute;
    top: -1rem;
    right: 0;
    z-index: ${Z_INDEX.DEFAULT};
    content: '';
    width: 0;
    height: 0;
    border-right: 1.5rem solid transparent;
    border-left: 1.5rem solid transparent;
    border-bottom: 2.8rem solid ${p => p.color || ℂ.primary};
    left: ${vary(['-1rem', '-6.2rem'])};
    transform: ${vary(['rotate(30deg)', 'rotate(-30deg)'])};
    top: -1.8rem;
  }
  &::before {
    transform: ${vary(['rotate(150deg)', 'rotate(-150deg)'])};
    top: -1rem;
  }
  a:hover > & {
    &::before,
    &::after {
      border-bottom: 2.8rem solid ${p => p.hoverColor || ℂ.tertiary};
    }
  }
`

export const BadgeContent = styled(Box)`
  position: relative;
  z-index: ${Z_INDEX.CONTENT};
  top: -0.9rem;
  left: ${vary(['-1.35rem', '-5.95rem'])};
`
