import { map } from 'ramda'
import { mix, lighten } from 'polished'

import { colorable } from '@styles/utils'

export const el = ({ primary, secondary, tertiary, quaternary }) => {
  const jsCode = map(mix(2 / 5, lighten(0.1, mix(2 / 5, secondary, quaternary))))({
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
      body: [primary, `linear-gradient(35deg, ${lighten(0.05, secondary)}, ${secondary})`],
      blockquote: [tertiary],
      code: [primary, mix(1 / 5, secondary, quaternary)],
      codeBefore: [primary, tertiary],
      codeJSConstant: [jsCode.constant],
      codeJSComment: [jsCode.comment],
      codeJSOperator: [jsCode.operator],
      codeJSProperty: [jsCode.property],
      codeJSString: [jsCode.string],
      codeJSEntity: [jsCode.entity],
      codeJSLineNumber: [jsCode.lineNumber],
      codeJSParameter: [jsCode.parameter],
      pre: [primary, mix(1 / 5, secondary, quaternary)]
    })
  )
}

export default el
