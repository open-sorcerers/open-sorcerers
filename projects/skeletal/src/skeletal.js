import {
  chain,
  cond,
  keys,
  pipe,
  prop,
  propEq,
  propOr,
  unless,
  curry
} from "ramda"
import { sideEffect } from "xtrace"
import { mapRej, reject, resolve } from "fluture"
import { registerPartial, registerHelper } from "handlebars"
import { cosmiconfig } from "cosmiconfig"
import { ui } from "inquirer"

import { talker } from "./ui"
import { bakeIn } from "./helpers"
import { render } from "./template"
import { saveKeyed } from "./impure"
import { pattern } from "./pattern"
import { austereStack, deepfreeze } from "./utils"
import { STRINGS } from "./constants"
import { cosmicConfigurate } from "./configure"
import { nameVersion } from "./instance"
import { initialBoneFile } from "./defaults"

const { NO_CONFIG } = STRINGS

const hasNoConfig = propEq(NO_CONFIG, true)

export const getPattern = propOr(false, "pattern")

export const boneDance = curry(
  (config, { patterns }, boneUI, ligament, configF) =>
    pipe(
      chain(
        cond([
          [
            ligament.checkCancelled,
            pipe(boneUI.say("Aborting..."), () => reject("Aborted"))
          ],
          [
            hasNoConfig,
            pipe(boneUI.say("No config found!"), () => {
              const ns = propOr("skeletal", "namespace", config)
              return reject(
                `No config file found for namespace: "${ns}". Try "bone --init ${ns}"?`
              )
            })
          ],
          [
            () => getPattern(config),
            () => {
              const which = getPattern(config)
              return pipe(
                boneUI.say(`Using "${which}" pattern...\n`),
                prop(which),
                chain(render(config, boneUI, ligament))
              )(patterns)
            }
          ],
          [
            () => true,
            () =>
              resolve(
                `🦴 ${nameVersion()} - Available patterns:\n\t- ${keys(
                  patterns
                ).join("\n\t- ")}`
              )
          ]
        ])
      )
    )(configF)
)

export const skeletal = config => {
  const init = propOr(false, "init", config)
  if (init) return initialBoneFile(config)
  // STATE
  const patterns = {}
  const state = { patterns }
  // UI
  const bar = new ui.BottomBar()
  const talk = talker(config, bar)
  const say = x => sideEffect(() => talk(x + "\n"))
  const boneUI = { bar, talk, say }
  const threads = propOr(10, "threads", config)
  // CANCELLATION
  let isCancelled = false
  const cancel = () => {
    isCancelled = true
    process.exit(1)
  }
  // closured, for your safety
  const checkCancelled = () => isCancelled
  // wrap our composition steps with this so we can barf early
  const cancellable = unless(checkCancelled)
  // this is what the consumer sees as "bones" in the config file
  const ligament = {
    threads,
    cancel,
    checkCancelled,
    config: deepfreeze(config),
    registerPartial,
    registerHelper
  }
  // inject ligament consuming functions into ligament
  // js: a wild beast of dynamism
  ligament.pattern = saveKeyed(patterns, pattern(ligament))
  return pipe(
    propOr("skeletal", "namespace"),
    cosmiconfig,
    cancellable(cosmicConfigurate(state, boneUI, ligament)),
    bakeIn,
    boneDance(config, state, boneUI, ligament),
    mapRej(ee => {
      console.warn(`🤕 ${nameVersion()} failed!`)
      return austereStack(ee)
    })
  )(config)
}
