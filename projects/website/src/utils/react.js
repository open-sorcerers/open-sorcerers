import React from 'react'
import { __, prop, curry, pipe, map, assoc } from 'ramda'

// jam data into ostensibly children
export const inject = curry((injectables, els) =>
  map(el => React.cloneElement(el, injectables))(els)
)

// jam data into for sure an Array of children or nothing
export const injectChildren = curry((injectables, kids) =>
  pipe(React.Children.toArray, inject(injectables))(kids)
)

// jam data into 'children', given props, and return modified children
export const injectProps = curry((injectables, props) =>
  pipe(prop('children'), injectChildren(injectables))(props)
)

// jam data into 'children', given props, and return props where children = modified children
export const innoculate = curry((injectables, props) =>
  pipe(pipe(injectProps(injectables), kids => assoc('children', kids, props)))(props)
)

// grab data from props, inject into children, and return props where children = modified children
export const immunize = curry((injectableLookup, props) =>
  pipe(injectableLookup, innoculate(__, props))(props)
)
