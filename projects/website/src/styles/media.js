import { renderBreakpoints } from '@open-sorcerers/breakpoints'
import { asRem, useDefaultPainter, DEFAULT_BREAKPOINTS } from 'bodypaint'
import { pipe } from 'ramda'

export const mq = useDefaultPainter

export const Breakpoints = pipe(asRem(16), renderBreakpoints)(DEFAULT_BREAKPOINTS)
