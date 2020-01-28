import { curry, pipe, range, map } from 'ramda'
import { aboveCalc } from '@styles/media'
import { cs } from '@styles/colors'

const sh = curry((cl, xx, yy) => `${xx}px ${yy}px 0 ${cl}`)

const surface = curry((edge, start, end) => pipe(range(start), map(edge))(end))

export const h3D = ({
  color = cs.h3d.f,
  edge = cs.h3dShadow.f,
  shadow: dropShade = cs.h3dShadow.b,
  shadowY: y = -2,
  size = 6,
  and = ''
}) => `
  text-align: center;
  transition: letter-spacing 0.1s ease-out, text-shadow 0.3s ease-out, font-size 0.3s ease-out;
  color: ${color};
  font-weight: 900;
  a {
    color: ${color};
  }
  ${aboveCalc.TINY_PHONE('2rem')(
    `
    letter-spacing: 0.38rem;

    text-shadow: ${[
      `0 0 0 ${color}`,
      ...surface(z => sh(edge, z, z), 0, size),
      ...surface(z => sh(dropShade, -z + (size + y), z + size), 0, size + y)
    ].join(', ')};
    line-height: 3.3rem;
    ${and}
  `
  )}
`
