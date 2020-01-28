import { css } from '@emotion/core'
import { newui } from '@styles/colors'
import { easeOut } from '@styles/animation'

export const link = css`
  text-decoration: none;
  font-family: obviously-narrow, 'Obviously', 'Helvetica Neue', Helvetica, sans-serif;
  text-transform: uppercase;
  font-weight: 500;
  color: ${newui.link.f};
  display: inline-block;
  padding: 0 0.1em;
  vertical-align: baseline;
  transition: ${easeOut('0.3s', ['color'])};
  &:hover {
    color: ${newui.link.a.f};
  }
`
