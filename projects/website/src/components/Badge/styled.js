import styled from '@emotion/styled'
import { Box } from 'rebass'

import { pathOr } from 'ramda'

import { Z_INDEX } from '@styles/constants'
const grab = pathOr('lime')

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
const badgeFront = grab(['theme', 'colors', 'cs', 'badge', 'f'])
const badgeBack = grab(['theme', 'colors', 'cs', 'badge', 'b'])
const contributor = grab(['theme', 'colors', 'ui', 'contributor', 'a'])
export const BadgeContent = styled(Box)`
  width: 3.25rem;
  height: 3.25rem;
  position: relative;
  z-index: ${Z_INDEX.CONTENT};
  color: ${badgeFront};
  border: 2px solid ${badgeBack};
  transition: border 0.1s ease-out, color 0.1s ease-out, background 0.1s ease-out;
  border-radius: 100rem;
  vertical-align: middle;
  line-height: 2.75rem;
  a:hover & {
    color: ${contributor};
    border-color: transparent;
    background-color: transparent;
  }
`
