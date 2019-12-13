/**
 * @fileoverview Prefer safe property-accessor functions instead of literal dot notation
 * @author brekk
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/use-selector-for-nested-property');
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();

const error = {
  message:
    'Use a selector function instead of "stateData" with nested property access.',
  type: 'Identifier'
};
const errorPlus = {
  message: error.message.replace('stateData', 'stateData|xxx'),
  type: 'Identifier'
};
const errorStar = {
  message: error.message.replace('stateData', '*'),
  type: 'Identifier'
};
const optsCheckProps = [{ checkProps: true }];
const optsLiteralAsArray = [{ literal: ['stateData', 'xxx'] }];
const optsLiteralStar = [{ literal: '*' }];
const mergeOpts = (x, y) => [Object.assign({}, x[0], y[0])];

ruleTester.run('use-selector-for-nested-property', rule, {
  valid: [
    "const x = pathOr(false, ['nested', 'values', 'are', 'safe'], stateData)",
    'state.data.not.that.specific.literal',
    'stateData.oneLevelPropertyAccessIsFine',
    'stateData.property.func(100)',
    { code: 'props.stateData.x', options: optsCheckProps },
    { code: 'this.props.stateData.x', options: optsCheckProps },
    { code: 'this.props.whatever.x.y', options: optsCheckProps },
    { code: 'props.stateData.x.fn(110)', options: optsCheckProps },
    { code: 'this.props.stateData.x.fn(110)', options: optsCheckProps },
    { code: 'this.props.xxx.x.fn(110)', options: optsLiteralAsArray },
    { code: 'yah.a', options: optsLiteralStar },
    'stateData && stateData.a && stateData.a.ampersand'
  ],

  invalid: [
    {
      code: 'stateData.nested.values.are.unsafe',
      errors: [error]
    },
    {
      code: 'stateData.a.b',
      errors: [error]
    },
    {
      code: 'stateData.a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z',
      errors: [error]
    },
    {
      code: 'props.stateData.c.d',
      options: optsCheckProps,
      errors: [error]
    },
    {
      code: 'this.props.stateData.e.f',
      options: optsCheckProps,
      errors: [error]
    },
    {
      code: 'xxx.a.b',
      options: optsLiteralAsArray,
      errors: [errorPlus]
    },
    {
      code: 'props.xxx.a.b',
      options: mergeOpts(optsCheckProps, optsLiteralAsArray),
      errors: [errorPlus]
    },
    {
      code: 'this.props.xxx.a.b',
      options: mergeOpts(optsCheckProps, optsLiteralAsArray),
      errors: [errorPlus]
    },
    { code: 'nah.a.b', options: optsLiteralStar, errors: [errorStar] },
    { code: 'props.nah.a', options: optsLiteralStar, errors: [errorStar] },
    {
      code: 'props.nah.x',
      options: mergeOpts(optsLiteralStar, optsCheckProps),
      errors: [errorStar]
    },
    {
      code: 'this.props.nah.a.b',
      options: mergeOpts(optsLiteralStar, optsCheckProps),
      errors: [errorStar]
    }
    // technically this should this be an error
    // but it's hard to test for
    // {
    //   code: 'stateData.one && stateData.two && stateData.three.nested',
    //   errors: [error]
    // }
  ]
});
