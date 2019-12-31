import { css } from '@emotion/core'
import { Box } from 'rebass'
import styled from '@emotion/styled'

import * as ℂ from '@styles/colors'

export const StyledDiff = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`

export const StyledFrame = styled(Box)`
  width: ${p => (p.variant === 'full' ? 100 : 50)}%;
  min-height: 100%;
  display: inline-block;
  padding: 0.5rem;
  pre {
    display: block;
    height: 100%;
  }
`

export const Frames = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  textarea {
    min-height: 20rem;
    width: calc(50% - 2rem);
    margin: 1rem;
    height: 100%;
    font-family: 'Fira Code', sans-serif;
  }
`

export const StyledDiffLine = styled(Box)`
  display: flex;
  flex-direction: row;
  min-height: 1.4rem;
  line-height: 1.4rem;
  width: 100%;
  justify-content: space-between;
`

const diffColumn = css`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 96%;
  display: flex;
  flex-direction: column;
`
export const Old = styled(Box)`
  ${diffColumn}
  background-color: rgba(255,0,0,0.6);
`
export const Edited = styled(Box)`
  ${diffColumn}
  background-color: rgba(255,255,0,0.6);
`
export const New = styled(Box)`
  ${diffColumn}
  background-color: rgba(0, 255, 0, 0.6);
`
export const NoChange = styled(Box)`
  ${diffColumn}
  background-color: rgba(255, 255, 255, 0.1);
`
export const Gutter = styled(Box)`
  ${diffColumn}
  width: 4%;
  align-self: flex-start;
`
