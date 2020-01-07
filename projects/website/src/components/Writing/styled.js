import { Box } from 'rebass'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import * as ℂ from '@styles/colors'

export const Keywords = styled(Box)`
  background-color: ${ℂ.secondary};
`

export const EntityLink = styled(Link)`
  font-size: 2rem;
  line-height: 2rem;
  font-style: italic;
  letter-spacing: 0.01rem;
`
