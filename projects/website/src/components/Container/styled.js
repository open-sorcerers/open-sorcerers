import styled from '@emotion/styled'
import { Box } from 'rebass'

export const StyledContainer = styled(Box)`
  margin: 0 auto;
  max-width: ${p => p.maxWidth || 800}px;
  width: 100%;
`
