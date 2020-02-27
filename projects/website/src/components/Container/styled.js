import styled from '@emotion/styled'
import { Box } from 'rebass'
import { mq } from '@styles/media'
import { GAP as __ } from 'bodypaint'

const container = mq({
  padding: ['0 1.5rem', __, '0 2rem']
})

export const StyledContainer = styled(Box)`
  margin: 0 auto;
  padding: 0 0.5rem;
  max-width: ${p => p.maxWidth || 800}px;
  width: 100%;
  ${container}
`

export const StyledContentContainer = styled(Box)`
  margin: 0 auto;
  margin-bottom: 4rem;
  padding: 0 0.5rem;
  width: 100%;
  ${container}
`
