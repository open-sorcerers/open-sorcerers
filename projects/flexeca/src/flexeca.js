import { Future } from "fluture"
import { either, curry, ifElse, pipe, propOr } from "ramda"
import execa from "execa"
/* import { trace } from "xtrace" */

const orFalse = propOr(false)
const then = curry((fn, P) => P.then(fn))
const snag = curry((fn, P) => P.catch(fn))

export const flexeca = curry(
  (opts, cmd, args) =>
    new Future((bad, good) => {
      let ref = null

      const canceller = () => {
        ref && ref.cancel()
      }
      pipe(
        () => execa(cmd, args, opts),
        x => {
          ref = x
          return x
        },
        then(
          pipe(
            ifElse(
              either(orFalse("stderr"), orFalse("isCancelled")),
              ifElse(orFalse("stderr"), orFalse("stderr"), canceller),
              propOr("", "stdout")
            ),
            good
          )
        ),
        snag(bad)
      )()
      return canceller
    })
)
