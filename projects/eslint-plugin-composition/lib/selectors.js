const { curry, pipe, reduce, map } = require('ramda');
const { safePathOr, safePathEq, safePathNotEq } = require('./utils');
const C = require('./constants');
const { NAME, OBJECT, PARENT, PROPERTY, PROPS, TYPE } = C;

const seekUp = curry((step, stop, node) => {
  let value = node;
  while (value[step] && stop(value[step])) {
    value = value[step];
  }
  return value;
});
const soakUp = curry((step, stop, node) => {
  let out = [];
  let value = node;
  while (value[step] && stop(value[step])) {
    out.push(value);
    value = value[step];
  }
  return out;
});
const getOldestAncestor = seekUp(PARENT);
const getAllAncestors = soakUp(PARENT);

// by convention, $-prefixed arrays are effectively paths
// for focusing safePathEq / safePathOr upon

const $gPaObjectObjectName = [
  PARENT,
  OBJECT,
  PROPERTY,
  PARENT,
  OBJECT,
  OBJECT,
  NAME
];
const assertPropsX = safePathEq(PROPS, $gPaObjectObjectName);
const $gggPaType = [
  PARENT,
  OBJECT,
  PROPERTY,
  PARENT,
  PROPERTY,
  PARENT,
  OBJECT,
  PROPERTY,
  PARENT,
  OBJECT,
  OBJECT,
  TYPE
];
const assertThisPropsX = safePathEq('ThisExpression', $gggPaType);
const $ggPaName = [
  PARENT,
  OBJECT,
  PROPERTY,
  PARENT,
  PROPERTY,
  PARENT,
  OBJECT,
  PROPERTY,
  PARENT,
  OBJECT,
  PROPERTY,
  NAME
];
const assertThisProps = safePathEq(PROPS, $ggPaName);
const $gPaObjectPropName = [
  PARENT,
  OBJECT,
  PROPERTY,
  PARENT,
  OBJECT,
  PROPERTY,
  NAME
];
const assertThisPropsXIsLiteral = curry((lit, x) =>
  safePathEq(lit, $gPaObjectPropName, x)
);
const $gPaType = [PARENT, PARENT, TYPE];
const assertNonFunction = safePathNotEq('CallExpression', $gPaType);
const $gPaName = [PARENT, OBJECT, PROPERTY, PARENT, OBJECT, NAME];
const assertXIsLiteral = curry((lit, x) => safePathEq(lit, $gPaName, x));
const getLiteral = safePathOr(false, $gPaName);
const getLiteralWithThis = safePathOr(false, $gPaObjectPropName);
const assertInAnd = safePathEq('&&', [PARENT, PARENT, 'operator']);

const $parentIsME = [PARENT, TYPE];
const assertParentIsMemberExpression = safePathEq(
  'MemberExpression',
  $parentIsME
);
const $parentType = [PARENT, PROPERTY, TYPE];
const assertParentIsIdentifier = safePathEq('Identifier', $parentType);
const assertTypeIsMemberExpression = safePathEq('MemberExpression', [TYPE]);
const $gPaPropertyName = [PARENT, OBJECT, PROPERTY, PARENT, PROPERTY, NAME];
const getGPaPropertyName = safePathOr('', $gPaPropertyName);

const foldOr = reduce((a, b) => a || b, false);
const anyOf = curry((fn, lit, n) =>
  pipe(
    map(z => fn(z, n)),
    foldOr
  )(lit)
);

module.exports = {
  assertInAnd,
  assertNonFunction,
  assertParentIsIdentifier,
  assertParentIsMemberExpression,
  assertPropsX,
  assertThisProps,
  assertThisPropsX,
  assertThisPropsXIsLiteral,
  assertTypeIsMemberExpression,
  assertXIsLiteral,
  getGPaPropertyName,
  getOldestAncestor,
  getAllAncestors,
  seekUp,
  soakUp,
  anyOf,
  getLiteral,
  getLiteralWithThis
};
