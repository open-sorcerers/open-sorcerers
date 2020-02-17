import styled from '@emotion/styled'
import { Box } from 'rebass'
import { mq } from '@styles/media'
import { GAP as __ } from 'bodypaint'

import { pathOr } from 'ramda'
const grab = pathOr('lime')

const contribUl = mq({
  flexDirection: ['column', __, 'row']
})

export const StyledContributors = styled(Box)`
  display: flex;
  flex-direction: column;
  text-align: center;
  h1 {
    margin-top: 0;
    width: 100%;
  }
  ul {
    ${contribUl}
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 100%;
    li {
      list-style: none;
    }
    justify-content: center;
  }
`

const contribLi = mq({
  margin: ['0 0 3rem', __, '2rem 0 1rem'],
  width: ['100%', __, 'calc(50% - 1.5rem)', __, __, __, __, 'calc(33.33333% - 2rem)'],
  '&:nth-of-type(even)': {
    marginLeft: ['0', __, `1.5rem`, __, __, __, __, 'initial']
  },
  '&:nth-of-type(odd)': {
    marginRight: ['0', __, `1.5rem`, __, __, __, __, 'initial']
  },
  '&:first-of-type': {
    marginTop: ['4rem', __, '2rem']
  },
  '&:nth-of-type(3n + 2)': {
    margin: ['initial', __, __, __, __, __, __, '2rem 3rem 1rem']
  }
})

export const Li = styled(Box)`
  display: flex;
  min-width: 10rem;
  flex-direction: column;
  ${contribLi}
`

const contributor = grab(['theme', 'colors', 'cs', 'contributor', 'f'])
const contributorBack = grab(['theme', 'colors', 'cs', 'contributor', 'b'])
const contributorImg = grab(['theme', 'colors', 'cs', 'contributorImg', 'f'])
const contributorLink = grab(['theme', 'colors', 'ui', 'contributor', 'f'])
const contributorActiveLink = grab(['theme', 'colors', 'ui', 'contributor', 'a', 'f'])
const narrow = pathOr('Comic Sans', ['theme', 'fonts', 'obviouslyNarrow'])
export const StyledContributor = styled(Box)`
  min-width: 10rem;
  display: inline-block;
  position: relative;
  text-align: center;
  border: 2px solid ${contributor};
  color: ${contributorLink};
  transition: border 0.1s ease-in, box-shadow 0.3s ease-out;
  background-clip: content-box;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.7);
  width: 100%;
  padding: 2rem 0;

  a {
    color: ${contributorLink};
  }
  img {
    border-radius: 100rem;
    border: 0 solid ${contributorImg};
    transition: border 0.1s ease-out;
    background-color: ${contributorImg} !important;
  }
  strong {
    ${narrow}
    font-style: italic;
    font-size: 1.6rem;
    color: ${contributorLink};
    text-shadow: 0 0 1rem black;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    background-repeat: repeat;
    background-position: center;
    background-color: ${contributorBack};
    top: -1rem;
    bottom: -1rem;
    left: -1rem;
    right: -1rem;
    z-index: -1;
  }
  &::after {
    transition: background-size 0.1s ease-in;
    background-image: url(/nebula.png);
    background-blend-mode: color-dodge;
    background-size: 110%;
    background-color: transparent;
  }
  &:hover {
    border: 2px solid transparent;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.9), 0 1rem 1.5rem rgba(0, 0, 0, 0.6);
    strong {
      color: ${contributorActiveLink};
    }
    img {
      border-width: 0.75rem;
    }
    &::after {
      background-size: 95%;
    }
  }
`
