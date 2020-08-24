import { readFile } from "torpor";
import { dissoc, __, pipe, map, propEq, prop, ifElse } from "ramda";
import { fork } from "fluture";
import { parseWithConfig } from "./parser";
import { PRIMITIVE_TYPES } from "./constants";
import { validate, typeMatch } from "./validate";

test("validate", (done) => {
  pipe(
    readFile(__, "utf8"),
    map(parseWithConfig({})),
    map(validate),
    fork(done)((outcome) => {
      console.log(outcome);
      expect(outcome).toMatchSnapshot();
      done();
    })
  )("./fixture/unary-string-to-string.js");
});

const typeMatchCases = [
    [PRIMITIVE_TYPES.Boolean, true, true],
    [PRIMITIVE_TYPES.Boolean, false, true],
    [PRIMITIVE_TYPES.Boolean, "false", false],
    [PRIMITIVE_TYPES.String, "string", true],
];

typeMatchCases.forEach(([type, value, expected]) => {
  test(`typeMatch should return "${expected}" for type "${type}" and value "${value}"`, () => {
    expect(typeMatch(type, value)).toBe(expected);
  });
});
