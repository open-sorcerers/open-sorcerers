import { filter, identity as I } from "ramda"

export const freeze = Object.freeze

export const j2 = x => JSON.stringify(x, null, 2)

export const smooth = filter(I)

export const box = x => [x]
