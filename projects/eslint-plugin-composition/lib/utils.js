const { curry, reduce, pipe, equals } = require('ramda');
const NO_MATCH = 'CAMPER_NO_MATCH';
const unfound = equals(NO_MATCH);
const safePathWalk = reduce((last, next) =>
  last && last[next] ? last[next] : NO_MATCH
);
// eslint-disable-next-line
const typeIs = y => x => typeof x === y;
const isFunction = typeIs('function');
const safePathOr = curry((alt, steps, x) =>
  pipe(
    safePathWalk(x),
    y => (unfound(y) ? alt : y)
  )(steps)
);
const fromSchema = curry((or, key, x) =>
  safePathOr(or, ['options', 0, key], x)
);

const safePathEq = curry((compare, steps, x) =>
  pipe(
    safePathWalk(x),
    y => (unfound(y) ? false : isFunction(compare) ? compare(y) : y === compare)
  )(steps)
);
const safePathNotEq = curry((compare, steps, x) =>
  pipe(
    safePathWalk(x),
    y =>
      unfound(y) ? false : isFunction(compare) ? !compare(y) : y !== compare
  )(steps)
);

module.exports = {
  NO_MATCH,
  fromSchema,
  safePathEq,
  safePathNotEq,
  safePathOr
};
