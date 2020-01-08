import { Box } from 'rebass'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import * as ℂ from '@styles/colors'
import { above } from '@styles/media'

export const GlossaryLinks = styled(Box)`
  margin: 0;
  padding: 0;
  a {
    font-family: obviously-narrow, 'Obviously', sans-serif;
    font-weight: 500;
    margin: 0;
    margin-left: 0.5rem;
    &:hover {
      color: white;
      text-shadow: none;
    }
  }
`

export const EntityLink = styled(Link)`
  font-size: 2rem;
  line-height: 2rem;
  font-style: italic;
  letter-spacing: 0.01rem;
`

export const StyledPost = styled(Box)`
  margin: 0;
  margin-bottom: 1rem;
  min-width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  border: 1px solid ${ℂ.primary};
  flex-direction: column;
  ${above.TABLET_PORTRAIT(`
     min-width: calc(50% - 0.5rem);
     max-width: calc(50% - 0.5rem);
     margin: 0;
     margin-bottom: 1rem;
     &:nth-of-type(even) {
margin-left: 0.5rem;
     }
     &:nth-of-type(odd) {
margin-right: 0.5rem;
     }
  `)}
`

export const StyledList = styled(Box)`
  display: flex;
  flex-direction: column;
`

export const StyledListWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  min-width: 100%;
  min-height: 10vh;
`

export const PostHeader = styled.header`
  padding: 0.5rem;
  a {
    display: block;
    letter-spacing: 0.08rem;
    &:hover {
      text-shadow: none;
    }
  }
`

export const PostFooter = styled.footer`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: flex-end;
  width: 100%;
  background-color: ${ℂ.primary};
  color: ${ℂ.secondary};
  padding: 0.5rem;
  padding-bottom: 0.75rem;
`

export const FooterFirst = styled(Box)`
  width: 33%;
  display: flex;
  flex-direction: column;
`

export const FooterLast = styled(Box)`
  width: 66%;
  display: flex;
  flex-direction: column;
  text-align: right;
`
export const PostContent = styled(Box)`
  padding: 1rem;
  height: 100%;
  width: 100%;
  overflow: auto;
`

export const ModuleToken = styled(Box)`
  margin: 0;
  margin-right: 0.5rem;
  display: inline-block;
  font-style: normal;
`

export const StyledReadingTime = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
