import { pipe } from "ramda"

// take pollution and you know, uh, trace it back to its source
// and maybe slap a fine on them
const takePollutionDownToZero = getter => (acc, [envVar, file]) => {
  const clone = merge(acc, {})
  const keys = getter(envVar)
  forEach(k => {
    const item = clone[k]
    const manyToMany = isArray(item.env)
    clone[k].files = !manyToMany
      ? traceSingularPolluter(file, item)
      : traceMultiPolluter(envVar, file, item)
  }, keys)
  return clone
}
// we're doing work even while failures might exist
const segmentByKnownPolluters = ({ file, newPollution, pollution }) => {
  const isKnown = newPollution.length > 0
  const addFileToStuff = map(appendFile(file))
  return isKnown
    ? [false, addFileToStuff(newPollution)]
    : [true, addFileToStuff(pollution)]
}

// a polluter can be like: {XXX: {env: 'BLAH'}} or {XXX: {env: ['BLAH', 'BLAH2']}}
// singular polluters are the former
const traceSingularPolluter = curry((file, item) => {
  const { files = [] } = item
  return uniq(files.concat(file))
})

// multi polluters are the latter
const traceMultiPolluter = curry((envVar, file, item) => {
  const { files = {} } = item
  return merge(files, {
    [file]: uniq((files[file] || []).concat(envVar))
  })
})

// take data and make it [data, [].concat(data.env)]
const structureConfigData = pipe(
  box,
  ap([I, map(pipe(prop("env"), unless(isArray, box)))])
)

// this is definitely not as efficient a lookup as it could be, as we're doing a separate reduce
// inside a reduce
const foldData = curry((raw, actual) => {
  const getter = getKeysFromEnvVar(raw)
  return reduce(
    ([bad, outcome], [valid, mapping]) => {
      if (!valid) {
        return [bad.concat(mapping), outcome]
      }
      const mapped = reduce(takePollutionDownToZero(getter), raw, mapping)
      return [bad, merge(outcome, mapped)]
    },
    [[], {}],
    actual
  )
})

// relate data to itself
const dealWithPollution = data => ([raw, knownPollution]) =>
  pipe(
    getAllKnownPolluters,
    getPollutionMap(toPairs(data)),
    map(segmentByKnownPolluters),
    foldData(raw)
  )(knownPollution)

export const fightPollution = data =>
  read(CAPTAIN_PLANET_RELATIVE_TO_YOUR_HEART)
    .map(safeJSONParse)
    .map(structureConfigData)
    .map(dealWithPollution(data))
const getProblems = nth(0)
const getSolutions = nth(1)

export const useMagicRings = ifElse(
  // problems?
  pipe(getProblems, length, lt(0)),
  // tell captain planet
  pipe(getProblems, lootingAndPollutingIsNotTheWay, F.reject),
  // update the captain planet config
  pipe(getSolutions, j2, write(CAPTAIN_PLANET_RELATIVE_TO_YOUR_HEART))
)
