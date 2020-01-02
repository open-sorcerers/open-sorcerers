import kleur from "kleur"
import { fork as _fork, encaseP } from "fluture"
import { curry, pipe, map, chain } from "ramda"

import getStdin from "get-stdin"
/* import { testTheEnvironment } from "./grep" */
/* import { trace } from "xtrace" */

import { fightPollution, useMagicRings } from "./take-pollution-down-to-zero"
import { CAPTAIN_PLANET_CONFIG } from "./config"
import { captainPlanet } from "./captain-planet"

const fork = curry((bad, good, eff) => _fork(bad)(good)(eff))

// USAGE:
// $ rg "process.env" --type js | node scripts/the-planeteers.js

// See also: cat README.md | grep 'Environment Variables' -a9

const readStdin = encaseP(getStdin)

export default pipe(
  /* testTheEnvironment, */
  readStdin,
  map(captainPlanet),
  chain(fightPollution),
  chain(useMagicRings),
  fork(
    e => {
      console.error(e)
      process.exit(1)
    },
    () =>
      console.log(
        `No new polluters! ${kleur.green("Updated " + CAPTAIN_PLANET_CONFIG)}`
      )
  )
)
