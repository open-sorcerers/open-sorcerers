
const freeze = Object.freeze
const own = z => Object.getOwnPropertyNames(z)

export function deepfreeze(o) {
  if (o === Object(o)) {
    if (!Object.isFrozen(o)) freeze(o)
    own(o).forEach(prop => {
      if (prop !== "constructor") deepfreeze(o[prop])
    })
  }
  return o
}
