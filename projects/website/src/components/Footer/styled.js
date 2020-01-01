import styled from '@emotion/styled'
import { Box } from 'rebass'
import * as ℂ from '@styles/colors'
import { above } from '@styles/media'

export const StyledFooter = styled(Box)`
  padding: 1.5rem 0;
  background-color: ${ℂ.quaternary};
  border-top: 1px solid rgba(0, 0, 0, 0.38);
  color: ${ℂ.secondary};
  font-size: 0.75rem;
  line-height: 1.5rem;

  a {
    color: ${ℂ.secondary};
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`

export const Inner = styled(Box)`
  display: flex;
  flex-flow: nowrap row;
  ${above.TABLET_PORTRAIT(`
    flex-flow: nowrap column;`)}
`

export const Left = styled(Box)`
  margin-right: auto;
  ${above.TABLET_PORTRAIT(`
    margin: 0;
    display: flex;
    flex-flow: nowrap row;
    justify-content: center;
    text-align: center;

    > *:first-child {
      margin-right: 8px;
    }
  `)}
`

export const Right = styled(Box)`
  margin-left: auto;
  text-align: right;
  ${above.TABLET_PORTRAIT(`
    margin: 0;
    display: flex;
    flex-flow: nowrap row;
    justify-content: center;
    text-align: center;

    > *:first-child {
      margin-right: 8px;
    }
`)}
`
