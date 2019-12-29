import styled from '@emotion/styled'
import { Box } from 'rebass'
import { minBreak } from '@styles/media'

export const StyledContainer = styled(Box)`
  margin: 0 auto;
  padding: 0 3rem;
  max-width: ${p => p.maxWidth || 800}px;
  width: 100%;
  ${minBreak.M(`
    padding: 0;
  `)}
`
