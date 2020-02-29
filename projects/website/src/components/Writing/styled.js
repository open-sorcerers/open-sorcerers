import { memo } from 'react'
import { Box } from 'rebass'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { mq, __ } from '@styles/media'
import { ifElse, propOr, pathOr } from 'ramda'
const grab = pathOr('lime')

const postGlossary = grab(['theme', 'colors', 'ui', 'postGlossary', 'f'])
const postGlossaryBack = grab(['theme', 'colors', 'ui', 'postGlossary', 'b'])
const postGlossaryActive = grab(['theme', 'colors', 'ui', 'postGlossary', 'a', 'f'])
const postGlossaryActiveBack = grab(['theme', 'colors', 'ui', 'postGlossary', 'a', 'b'])

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
    background-color: ${postGlossaryBack};
    color: ${postGlossary};
    &:hover {
      background-color: ${postGlossaryActiveBack};
      color: ${postGlossaryActive};
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

const post = grab(['theme', 'colors', 'cs', 'post', 'f'])
const postBack = grab(['theme', 'colors', 'cs', 'post', 'b'])

const styledPost = mq({
  margin: [0, __, __, __, __, '0.5rem 0', __, __, '0.5rem'],

  minWidth: [
    '100%',
    __,
    'calc(50% - 0.5rem)',
    __,
    __,
    'calc(33% - 1rem)',
    __,
    __,
    'calc(25% - 1.5rem)'
  ],
  maxWidth: [
    'initial',
    __,
    'calc(50% - 0.5rem)',
    __,
    __,
    'calc(33% - 1rem)',
    __,
    __,
    'calc(25% - 1.5rem)'
  ],
  '&:nth-of-type(even)': {
    marginLeft: ['0', __, '0.5rem', __, __, '0.5rem 0', __, __, '0.5rem']
  },
  '&:nth-of-type(odd)': {
    marginRight: ['0', __, '0.5rem', __, __, '0.5rem 0', __, __, '0.5rem']
  },
  '&:nth-child(3n+2)': {
    marginLeft: ['0', __, __, __, __, '1rem', __, __, '0.5rem'],
    marginRight: ['0', __, __, __, __, '1rem', __, __, '0.5rem']
  }
})
export const StyledPost = memo(styled(Box)`
  margin: 0;
  margin-bottom: 1rem;
  min-width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: space-between;
  background: ${postBack};
  color: ${post};
  border: 1px solid ${post};
  flex-direction: column;
`)
const obviously = pathOr('Comic Sans MS', ['theme', 'fonts', 'obviously'])
export const StyledList = memo(styled(Box)`
  display: flex;
  flex-direction: column;
  h2 {
    ${obviously}
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

const postHeaderLink = grab(['theme', 'colors', 'ui', 'postHeader', 'f'])
const postHeaderActiveLink = grab(['theme', 'colors', 'ui', 'postHeader', 'a', 'f'])
export const PostHeader = memo(styled.header`
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  a {
    display: block;
    color: ${postHeaderLink};
    &:hover {
      color: ${postHeaderActiveLink};
    }
  }
`)

const footerBack = ifElse(
  propOr(false, 'isDraft'),
  grab(['theme', 'colors', 'cs', 'postAltVariant', 'f']),
  ifElse(
    propOr(false, 'isPrivate'),
    grab(['theme', 'colors', 'cs', 'postAltVariant', 'b']),
    grab(['theme', 'colors', 'cs', 'postFooter', 'b'])
  )
)

const footer = grab(['theme', 'colors', 'cs', 'postFooter', 'f'])

export const PostFooter = memo(styled.footer`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: flex-end;
  width: 100%;
  background: ${footerBack};
  color: ${footer};
  border: 1px solid ${footer};
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
