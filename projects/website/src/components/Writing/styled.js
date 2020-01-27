import { memo } from 'react'
import { Box } from 'rebass'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import * as ℂ from '@styles/colors'
import { above } from '@styles/media'

export const GlossaryLinks = memo(styled(Box)`
  margin: 0;
  padding: 0;
  a {
    /* font-size: 1.4rem; */
    /* line-height: 1.4rem; */
    vertical-align: middle;
    font-family: obviously-narrow, 'Obviously', sans-serif;
    font-style: italic;
    letter-spacing: 0.03rem;
    font-weight: 500;
    margin: 0.25rem;
    margin-bottom: 0.5rem;
    padding: 0.25rem 0.4rem 0.45rem;
    border-radius: 1rem 0.2rem;
    font-size: 0.8em;
    transition: color 0.3s ease-out, background 0.3s ease-out;
    background-color: ${ℂ.ui.post.glossary.link.b};
    color: ${ℂ.ui.post.glossary.link.f};
    &:hover {
      background-color: ${ℂ.ui.post.glossary.link.a.b};
      color: ${ℂ.ui.post.glossary.link.a.f};
    }
    &:first-of-type: {
      margin-top: 0.5rem;
    }
  }
`)

export const EntityLink = memo(styled(Link)`
  font-size: 2rem;
  line-height: 2rem;
  font-style: italic;
  letter-spacing: 0.01rem;
`)

export const StyledPost = memo(styled(Box)`
  margin: 0;
  margin-bottom: 1rem;
  min-width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: space-between;
  background: ${ℂ.area.writing.post.b};
  color: ${ℂ.area.writing.post.f};
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
  ${above.DESKTOP(`
     min-width: calc(25% - 1.5rem);
     max-width: calc(25% - 1.5rem);
     margin: 0.5rem;
     &:nth-of-type(even), &:nth-of-type(odd) {
       margin: 0.5rem;
     }
     &:nth-child(3n+2) {
       margin: 0.5rem;
     }
  `)}
`)

export const StyledList = memo(styled(Box)`
  display: flex;
  flex-direction: column;
  h2 {
    font-family: obviously, 'Obviously', sans-serif;
    font-weight: 900;
    font-size: 3rem;
    line-height: 3rem;
    margin-bottom: 1.5rem;
  }
`)

export const StyledListWrapper = memo(styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  min-width: 100%;
  min-height: 10vh;
  justify-content: center;
`)
export const PostHeader = memo(styled.header`
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  a {
    display: block;
    color: ${ℂ.ui.post.header.link.f};
    &:hover {
      color: ${ℂ.ui.post.header.link.a.f};
    }
  }
`)

export const PostFooter = memo(styled.footer`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: flex-end;
  width: 100%;
  background: ${p =>
    p.isDraft
      ? ℂ.area.post.variant.draft
      : p.isPrivate
      ? ℂ.area.post.variant.private
      : ℂ.area.post.footer.b};
  color: ${ℂ.area.post.footer.f};
  border: 1px solid ${ℂ.area.post.footer.f};
  border-top-width: 0;
  padding: 0.5rem;
  padding-bottom: 0.75rem;
`)

export const FooterFirst = memo(styled(Box)`
  width: 33%;
  display: flex;
  flex-direction: column;
`)

export const FooterLast = memo(styled(Box)`
  width: 66%;
  display: flex;
  flex-direction: column;
  text-align: right;
`)
export const PostContent = memo(styled(Box)`
  padding: 1rem;
  width: 100%;
`)

export const ModuleToken = memo(styled(Box)`
  margin: 0.5rem;
  display: inline-block;
  font-style: normal;
  font-size: 2rem;
`)

export const StyledReadingTime = memo(styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`)
