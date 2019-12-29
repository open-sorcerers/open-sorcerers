import styled from '@emotion/styled'
import { Box } from 'rebass'
import { above } from '@styles/media'

export const StyledContainer = styled(Box)`
  margin: 0 auto;
  padding: 0 0.5rem;
  max-width: ${p => p.maxWidth || 800}px;
  width: 100%;
  ${above.TINY_PHONE(`
    padding: 0 1rem;
  `)}
  ${above.TABLET_PORTRAIT(`
    padding: 0;
  `)}
`
