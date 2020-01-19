import styled from '@emotion/styled'
import { Box } from 'rebass'
import { curry, propEq, ifElse } from 'ramda'

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
  z-index: ${Z_INDEX.CONTENT};
  font-size: 1.25rem;
  display: block;
  padding: 0.25rem;
  margin-left: -1rem;
`

export const BadgeContent = styled(Box)`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
  z-index: ${Z_INDEX.CONTENT};
  color: ${ℂ.area.badge.f};
  background-color: ${ℂ.area.badge.b};
  transition: color 0.1s ease-out, background 0.1s ease-out;
  border-radius: 100rem;
  vertical-align: middle;
  line-height: 2.25rem;
  a:hover & {
    color: #fc0;
    background-color: transparent;
  }
`
