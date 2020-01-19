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
  border: 1px solid ${ℂ.area.writing.post.f};
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
  ${above.TABLET_LANDSCAPE(`
     min-width: calc(33% - 1rem);
     max-width: calc(33% - 1rem);
     margin: 0.5rem 0;
     &:nth-of-type(even), &:nth-of-type(odd) {
       margin: 0.5rem 0;
     }
     &:nth-child(3n+2) {
       margin-left: 1rem;
       margin-right: 1rem;
     }
  `)}
`

export const StyledList = styled(Box)`
  display: flex;
  flex-direction: column;
  h2 {
    font-family: obviously, 'Obviously', sans-serif;
    font-weight: 900;
    font-size: 3rem;
    line-height: 3rem;
    margin-bottom: 1.5rem;
  }
`

export const StyledListWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  min-width: 100%;
  min-height: 10vh;
  justify-content: space-evenly;
`

export const PostHeader = styled.header`
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  a {
    display: block;
    color: ${ℂ.area.post.header.link.f};
    &:hover {
      color: ${ℂ.area.post.header.link.a.f};
    }
  }
`

export const PostFooter = styled.footer`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: flex-end;
  width: 100%;
  background-color: ${ℂ.area.post.footer.b};
  color: ${ℂ.area.post.footer.f};
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
  margin: 0.5rem;
  display: inline-block;
  font-style: normal;
  font-size: 2rem;
`

export const StyledReadingTime = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
