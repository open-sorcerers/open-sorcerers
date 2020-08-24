import { readFile } from "torpor";
import { dissoc, __, pipe, map, propEq, prop, ifElse } from "ramda";
import { fork } from "fluture";
import { parseWithConfig } from "./parser";
import { TYPES } from "./constants";
import { validate } from "./validate";

test("validate", (done) => {
  pipe(
    readFile(__, "utf8"),
    map(parseWithConfig({})),
    map(validate),
    fork(done)((outcome) => {
        console.log(outcome)
      expect(outcome).toMatchSnapshot();
      done();
    })
  )("./fixture/unary-string-to-string.js");
});
