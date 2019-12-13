/**
 * @fileoverview Prefer safe property-accessor functions instead of literal dot notation
 * @author brekk
 */
'use strict';
// const { reduce, pipe, curry, map } = require('ramda');
// const { trace } = require('xtrace');
const {
  fromSchema,
  safePathOr
  // safePathEq
  // safePathNotEq,
  // safePathOr
} = require('../utils');
const { preferNamedSelector } = require('../errors');
const {
  getLiteral,
  getLiteralWithThis,
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
  anyOf
} = require('../selectors');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
const importOnceFor = (
  vars,
  mark,
  selector,
  library,
  defaultName,
  defaultExpression
) => {
  const imported = vars.indexOf(selector) > -1;
  // console.log(vars, 'vars');
  // console.log('imported', imported);
  if (!imported) {
    mark(selector);
    return `import { ${selector} } from "${library}"\n${
      defaultName && defaultExpression ? defaultExpression : ''
    }\n`;
  }
  return false;
};

module.exports = {
  meta: {
    docs: {
      description:
        'Prefer safe property-accessor functions instead of literal dot notation',
      category: 'safety',
      recommended: true
    },
    fixable: 'code',
    /*
     "use-selector-for-nested-property": ["error", {
       "es6": true,
       "literal": "stateData",
       "library": "ramda",
       "selector": "pathOr",
       "checkProps" false
     }]
     // using something like pathOr instead
     "use-selector-for-nested-property": ["error", {
       "selector": "pathOr",
       "defaultExpression": "const UNKNOWN = '???'",
       "defaultExpression": "import {UNKNOWN} from './constants'",
       "defaultName": "UNKNOWN",
     }]
    */
    schema: [
      {
        properties: {
          literal: {
            type: ['string', 'array'],
            items: { type: 'string' },
            description:
              'The name of the object literal. (default: "stateData")'
          },
          library: {
            type: 'string',
            description: 'The name of the accessor library (default: "ramda")'
          },
          selector: {
            type: 'string',
            description: 'The function name for selecting (default: "path")'
          },
          defaultExpression: {
            type: 'string',
            description: 'A constant / reference to a re-usable default value'
          },
          defaultName: {
            type: 'string',
            description: 'a default value to pass to selector (default: false)'
          },
          checkProps: {
            type: 'boolean',
            description:
              'Check this.props.stateData | props.stateData as well as stateData.'
          }
        }
      }
    ]
  },

  create: function create(context) {
    const getter = {
      selector: fromSchema('path', 'selector'),
      literalName: fromSchema('stateData', 'literal'),
      library: fromSchema('ramda', 'library'),
      defaultExpression: fromSchema(null, 'defaultExpression'),
      defaultName: fromSchema(null, 'defaultName'),
      checkProps: fromSchema(false, 'checkProps')
    };
    const reorderAccessor = ({
      prefix,
      selector,
      defaultName,
      literalName,
      node
    }) => {
      const top = getOldestAncestor(assertTypeIsMemberExpression, node);
      const x = getAllAncestors(assertTypeIsMemberExpression, node);
      const lastAncestorName = top && top.property && top.property.name;
      const firstAncestorName = getGPaPropertyName(node);
      const start = safePathOr(
        node.start,
        ['parent', 'object', 'property', 'parent', 'object', 'start'],
        node
      );
      const ancestors = x
        .slice(1)
        .map(z => z.name || (z.property && z.property.name));

      const allAncestors = [firstAncestorName]
        .concat(ancestors)
        .concat(lastAncestorName);

      const peeps = !prefix
        ? allAncestors
        : [...prefix.slice(1), literalName, ...allAncestors];
      if (prefix) {
        literalName = prefix[0];
      }
      const defValue = defaultName ? `${defaultName}, ` : ``;
      return {
        range: [start, top.property.end],
        fixed: `${selector}(${defValue}["${peeps.join(
          '", "'
        )}"], ${literalName})`
      };
    };
    const fixable = ({ config, literalName, node, prefix }) => fixer => {
      const { library, selector, defaultName, defaultExpression } = config;
      if (
        assertParentIsMemberExpression(node) &&
        assertParentIsIdentifier(node)
      ) {
        const { range, fixed } = reorderAccessor({
          prefix,
          selector,
          defaultName,
          literalName,
          node
        });
        // console.log('fixing...', fixed, range);
        // const importStatement = `import { ${selector} } from "${library}"\n${
        //   defaultName && defaultExpression ? defaultExpression : ''
        // }\n`;
        const importStatement = importOnceFor(
          context.getDeclaredVariables(node),
          context.markVariableAsUsed,
          selector,
          library,
          defaultName,
          defaultExpression
        );
        // console.log('import', importStatement);
        return importStatement
          ? [
              fixer.insertTextBeforeRange([0, 1], importStatement),
              fixer.replaceTextRange(range, fixed)
            ]
          : fixer.replaceTextRange(range, fixed);
      }
    };
    return {
      Identifier(node) {
        // config
        const config = {
          literalName: getter.literalName(context),
          library: getter.library(context),
          selector: getter.selector(context),
          defaultName: getter.defaultName(context),
          defaultExpression: getter.defaultExpression(context),
          checkProps: getter.checkProps(context)
        };
        const { literalName, checkProps } = config;

        // derived config
        const isLiteralAList = Array.isArray(literalName);
        const isLiteralStar = literalName === '*';

        const fail = fix => {
          const message = preferNamedSelector(
            isLiteralAList ? literalName.join('|') : literalName
          );
          const { loc } = node;
          context.report(
            fix ? { node, message, loc, fix } : { node, message, loc }
          );
        };
        if (assertNonFunction(node)) {
          if (isLiteralStar) {
            // *.a.b
            if (assertXIsLiteral(() => true, node)) {
              return fail(
                fixable({
                  config,
                  literalName: getLiteral(node),
                  node,
                  prefix: false
                })
              );
            }
            if (checkProps) {
              // props.*.a
              if (assertPropsX(node)) {
                return fail(
                  fixable({
                    config,
                    literalName,
                    node,
                    prefix: ['props']
                  })
                );
              }
              // this.props.*.a
              if (assertThisProps(node) && assertThisPropsX(node)) {
                return fail(
                  fixable({
                    config,
                    literalName: getLiteralWithThis(node),
                    node,
                    prefix: ['this', 'props']
                  })
                );
              }
            }
          }
          // for now, split on list, later, rectify
          if (isLiteralAList) {
            const assertXIsAnyLiteral = anyOf(assertXIsLiteral);
            const assertThisPropsXIsAnyLiteral = anyOf(
              assertThisPropsXIsLiteral
            );
            // (stateData|xxx).a.b
            if (assertXIsAnyLiteral(literalName, node)) {
              return fail(
                fixable({
                  config,
                  literalName: getLiteral(node),
                  node,
                  prefix: false
                })
              );
            }
            if (checkProps) {
              // props.(stateData|xxx).a.b
              if (assertPropsX(node)) {
                return fail(
                  fixable({
                    config,
                    literalName: getLiteralWithThis(node),
                    node,
                    prefix: ['props']
                  })
                );
              }
              // this.props.(stateData|xxx).a.b
              if (
                assertThisProps(node) &&
                assertThisPropsX(node) &&
                assertThisPropsXIsAnyLiteral(literalName, node)
              ) {
                return fail(
                  fixable({
                    config,
                    literalName: getLiteralWithThis(node),
                    node,
                    prefix: ['this', 'props']
                  })
                );
              }
            }
          } else {
            if (checkProps) {
              // check props.stateData.a.b && this.props.stateData.a.b cases
              // props.stateData.a.b
              if (assertPropsX(node)) {
                // return fail();
                return fail(
                  fixable({
                    config,
                    literalName,
                    node,
                    prefix: [`props`]
                  })
                );
              }
              // this.props.stateData.a.b
              if (
                assertThisProps(node) &&
                assertThisPropsX(node) &&
                assertThisPropsXIsLiteral(literalName, node)
              ) {
                return fail(
                  fixable({
                    config,
                    literalName,
                    node,
                    prefix: [`this`, `props`]
                  })
                );
              }
            }
            // stateData.a.b
            if (assertXIsLiteral(literalName, node)) {
              // && stateData.a.b
              // (assumes the left of the operator is stateData.a right now)
              // TODO: make this more robust?
              if (assertInAnd(node)) {
                return;
              }
              return fail(
                fixable({
                  config,
                  prefix: false,
                  literalName: config.literalName,
                  node
                })
              );
            }
          }
        }
      }
    };
  }
};
