import { readFile } from "torpor"
import { dissoc, __, pipe, map, propEq, prop, ifElse } from "ramda"
import { fork } from "fluture"
import { parseWithConfig } from "./parser"
import { TYPES } from "./constants"

test("basic", done => {
  pipe(
    readFile(__, "utf8"),
    map(parseWithConfig({})),
    fork(done)(outcome => {
      expect(
        map(
          ifElse(
            propEq("type", TYPES.HM_SIGNATURE),
            prop("signature"),
            dissoc("ast")
          ),
          outcome
        )
      ).toMatchSnapshot()
      done()
    })
  )("./fixture/example.js")
})
