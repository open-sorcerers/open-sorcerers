import { curry, pipe, map, join } from 'ramda'

export const transitionable = curry((easing, speed, props) =>
  pipe(
    map(z => `${z} ${speed} ${easing}`),
    join(`,`)
  )(props)
)
export const easeIn = transitionable('ease-in')
export const easeOut = transitionable('ease-out')

export const transition = curry((easing, speed, props) =>
  pipe(transitionable(easing, speed), z => `transition: ${z};`)(props)
)

export const transitionEaseOut = transition('ease-out')
export const transitionEaseIn = transition('ease-in')
