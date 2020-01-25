import styled from '@emotion/styled'

import * as ℂ from '@styles/colors'

export const StyledModuleLink = styled.a`
  font-family: obviously-narrow, 'Obviously', sans-serif;
  font-weight: 500;
  display: inline-block;
  padding: 0.1rem 1rem 0.3rem;
  border-radius: 100rem;
  margin: 1rem 0.5rem 0 0;
  background-color: ${ℂ.ui.post.module.link.b};
  color: ${ℂ.ui.post.module.link.f};
  border: 1px solid ${ℂ.ui.post.module.link.f};
  &:hover {
    background-color: ${ℂ.ui.post.module.link.a.b};
    color: ${ℂ.ui.post.module.link.a.f};
    border: 1px solid ${ℂ.ui.post.module.link.a.f};
  }
`
