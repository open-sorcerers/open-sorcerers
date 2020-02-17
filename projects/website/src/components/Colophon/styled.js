import styled from '@emotion/styled'
import { Box } from 'rebass'
import { pipe, pathOr, always as K, ifElse, prop } from 'ramda'
import { GAP as __ } from 'bodypaint'

import { mq } from '@styles/media'
import { lighten } from 'polished'
const contentOrNot = ifElse(prop('hasContent'))
const grab = pathOr('lime')

const colophon = grab(['theme', 'colors', 'cs', 'colophon', 'f'])
const colophonB = grab(['theme', 'colors', 'cs', 'colophon', 'b'])
const colophonSubTabletB = pipe(colophonB, lighten(1 / 10))

const colophonic = mq({
  flexDirection: ['column', 'row'],
  flexWrap: ['initial', 'wrap'],
  justifyContent: ['initial', 'center'],
  padding: ['initial', '0.5rem 0'],
  marginBottom: ['initial', __, __, contentOrNot(K('1rem'), K('0'))],
  backgroundColor: ['initial', __, __, contentOrNot(colophonSubTabletB, K('transparent'))]
})

export const StyledColophon = styled(Box)`
  width: 100%;
  background-color: ${colophonB};
  color: ${colophon};
  text-align: center;
  display: flex;
  flex-direction: column;
  a {
    svg {
      margin-top: 0.25rem;
    }
  }
  ${colophonic}
`

const colophonAlt = grab(['theme', 'colors', 'cs', 'colophonAlt', 'f'])
const colophonAltB = grab(['theme', 'colors', 'cs', 'colophonAlt', 'b'])

const altColophon = mq({
  a: { svg: { padding: ['0.1rem 0', '0.4rem 0'] } },
  flexDirection: ['column', 'row'],
  height: ['initial', '2rem', __, '2.5rem'],
  opacity: ['1'],
  lineHeight: ['initial', '2rem', __, '2.35rem'],
  justifyContent: ['space-around', __, 'center', 'space-around'],
  paddingTop: [p => (p.hasContent ? '0.5rem' : '0'), __, __, '0'],
  margin: ['initial', __, __, '1rem auto'],
  width: ['100%', __, __, '50%'],
  minWidth: ['initial', __, __, '40rem'],
  maxWidth: ['initial', __, __, '50rem'],
  borderTop: [`1px solid ${p => (p.hasContent ? colophonAlt(p) : 'transparent')};`],
  border: ['initial', __, __, pipe(colophonAlt, z => '1px solid  ' + z)],
  borderRadius: ['0', __, __, '10rem']
})

export const AltColophon = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 2rem;
  border-top: 1px solid ${p => (p.hasContent ? colophonAlt(p) : 'transparent')};
  background-color: ${colophonAltB};
  color: ${colophonAlt};
  justify-content: space-around;
  text-align: center;
  transition: width 0.3s ease-out, height 0.3s ease-out, opacity 0.3s ease-out;
  ${altColophon}
`
const colophonLink = grab(['theme', 'colors', 'ui', 'colophon', 'f'])
const colophonLinkActive = grab(['theme', 'colors', 'ui', 'colophon', 'a', 'f'])
export const AltWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.8rem;
  margin: 0 0.5rem;
  svg {
    transition: fill 0.3s ease-out;
    fill: ${colophonLink};
  }
  a:hover {
    svg {
      fill: ${colophonLinkActive};
    }
  }
  &.author {
    a {
      margin-left: 0.25rem;
    }
  }
  &.source {
    align-self: center;
  }
`

const linkWrapper = mq({
  width: ['100%', 'calc(50% - 4rem)', 'auto']
})

export const LinkWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  font-size: 0.8rem;
  margin: 0 0.5rem;
  align-items: baseline;
  svg {
    transition: fill 0.3s ease-out;
    fill: ${colophonLink};
  }
  strong {
    margin-right: 0.5rem;
  }
  a:hover {
    svg {
      fill: ${colophonLinkActive};
    }
  }
  &.author,
  &.source {
    a {
      margin-left: 0.25rem;
    }
  }
`
