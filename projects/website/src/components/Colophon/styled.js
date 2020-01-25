import styled from '@emotion/styled'
import { Box } from 'rebass'

import { above } from '@styles/media'
import * as ℂ from '@styles/colors'
import { lighten } from 'polished'

export const StyledColophon = styled(Box)`
  width: 100;
  background-color: ${ℂ.area.colophon.b};
  color: ${ℂ.area.colophon.f};
  text-align: center;
  ${above.SUB_TABLET(`
    margin-bottom: ${p => (p.hasContent ? '1rem' : '0')};
    background-color: ${lighten(1 / 10, ℂ.area.colophon.b)};
  `)}
`

export const LinkAuthor = styled(Box)`
  display: inline-block;
  margin: 0.5rem;
`
export const LinkGithub = styled(Box)`
  display: inline-block;
  margin: 0.5rem;
`
