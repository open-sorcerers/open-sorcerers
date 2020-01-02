import kleur from "kleur"
import { pipe, map, readStdin, chain, fork } from "snang/script"

import {
  captainPlanet,
  fightPollution,
  useMagicRings,
  CAPTAIN_PLANET_CONFIG
} from "./captain-planet"

// USAGE:
// $ rg "process.env" --type js | node scripts/the-planeteers.js

// See also: cat README.md | grep 'Environment Variables' -a9

module.exports = pipe(
  readStdin,
  map(captainPlanet),
  chain(fightPollution),
  chain(useMagicRings),
  fork(
    e => {
      console.error(e)
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1)
    },
    () =>
      console.log(
        `No new polluters! ${kleur.green("Updated " + CAPTAIN_PLANET_CONFIG)}`
      )
  )
)(process.argv.slice(2)[0])
