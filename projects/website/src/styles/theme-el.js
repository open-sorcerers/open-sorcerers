import { map, memoizeWith, identity as I } from 'ramda'
import { mix, lighten } from 'polished'
import { colorable } from '@styles/utils'

/* const lighten = memoizeWith(I, ll) */
/* const mix = memoizeWith(I, mm) */

export const el = memoizeWith(I, (c1, c2, c3, c4) => {
  const jsCode = map(mix(2 / 5, lighten(0.1, mix(2 / 5, c2, c4))))({
    constant: '#fc0',
    comment: '#328e93',
    operator: '#c00',
    property: '#0ff',
    string: '#01ec7e',
    entity: '#ba55d3',
    lineNumber: '#a699b4',
    parameter: '#5987b7'
  })

  return Object.freeze(
    map(colorable)({
      body: [c1, `linear-gradient(35deg, ${lighten(0.05, c2)}, ${c2})`],
      blockquote: [c3],
      code: [c1, mix(1 / 5, c2, c4)],
      codeBefore: [c1, c3],
      codeJSConstant: [jsCode.constant],
      codeJSComment: [jsCode.comment],
      codeJSOperator: [jsCode.operator],
      codeJSProperty: [jsCode.property],
      codeJSString: [jsCode.string],
      codeJSEntity: [jsCode.entity],
      codeJSLineNumber: [jsCode.lineNumber],
      codeJSParameter: [jsCode.parameter],
      pre: [c1, mix(1 / 5, c2, c4)]
    })
  )
})

export default el
