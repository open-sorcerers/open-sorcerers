import styled from '@emotion/styled'

import { pathOr } from 'ramda'
const grab = pathOr('lime')

const link = grab(['theme', 'colors', 'ui', 'postModule', 'f'])
const linkBack = grab(['theme', 'colors', 'ui', 'postModule', 'b'])
const activeLink = grab(['theme', 'colors', 'ui', 'postModule', 'a', 'f'])
const activeLinkBack = grab(['theme', 'colors', 'ui', 'postModule', 'a', 'b'])

export const StyledModuleLink = styled.a`
  font-family: obviously-narrow, 'Obviously', sans-serif;
  font-weight: 500;
  display: inline-block;
  padding: 0.1rem 1rem 0.3rem;
  border-radius: 100rem;
  margin: 1rem 0.5rem 0 0;
  background-color: ${linkBack};
  color: ${link};
  border: 1px solid ${link};
  &:hover {
    background-color: ${activeLinkBack};
    color: ${activeLink};
    border: 1px solid ${activeLink};
  }
`
