import styled from '@emotion/styled'
import { Box } from 'rebass'

export const StyledContainer = styled(Box)`
  margin: 0 auto;
  padding: 0 24px;
  max-width: ${p => p.maxWidth || 800}px;
  width: 100%;
`
