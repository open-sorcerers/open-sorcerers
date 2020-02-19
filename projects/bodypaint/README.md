# bodypaint

_`facepaint` on steroids_

Already using `emotion` and `facepaint` for media-queries? Lazy? Frustrated with the syntax?

Use `bodypaint`!

`bodypaint` uses `facepaint` under the hood, but allows for two expressive syntaxes which build upon `facepaint`, either the default "implicit mode":

```js
import {css} from '@emotion/core'
// use custom breakpoints
import {makePainter} from 'bodypaint'

// custom points

// expressed in px
const points = { SMALL: 100, MEDIUM: 200, LARGE: 300 }

const mq = makePainter({
  // use min-width or max-width?
  useMin: true,
  // how big is 1rem? 1rem === body { font-size: 16px } 
  baseFontSize: 16,
  // what points should we pass to `facepaint`?
  points,
  // use implicit object-style declarations, or more `facepaint` style arrays?
  implicit: true
})

const mediaQueryStyle = mq({
  background: {
    // these keys come from "points"
    SMALL: 'lime',
    LARGE: 'blue'
  },
  '&:hover': {
    background: { SMALL: 'yellow', LARGE: 'red'}
  }
}) === css`
  background: lime;
  &:hover {
    background: yellow;
  }
  @media(min-width: 30rem) {
    background: blue;
    &:hover {
      background: red;
    }
  }
`
```

You can also avoid any configuration and use the default `bodypaint` export:

```js
// use our breakpoints if you want
import bodypaint from 'bodypaint'
import {DEFAULT_BREAKPOINTS, makePainter} from 'bodypaint'

// equivalent to the default bodypaint export
bodypaint === makePainter({
  useMin: true,
  baseFontSize: 16,
  points: DEFAULT_BREAKPOINTS,
  implicit: true
})
```

## Explicit Mode

You can also use "explicit mode" (`{implicit: false}`), to use a declarative array-style which is closer to what you may be used to if you've been using `facepaint` for a while &mdash; it's the same as `facepaint` except you can express "gaps" in the responsive styles and `bodypaint` will take care of the rest:

```js
import {makePainter, GAP} from 'bodypaint'
import facepaint from 'facepaint'

const points = { A: 100, B: 200, C: 300}

const mq = makePainter({
  useMin: true,
  baseFontSize: 16,
  points,
  implicit: false
})

const mediaQueryStyle = mq({
  background: ['lime', GAP, 'blue'],
  '&:hover': {
    background: ['yellow', GAP, 'red']
  }
}) === facepaint([
  '@media(min-width: 100px)',
  '@media(min-width: 200px)',
  '@media(min-width: 300px)'
])({
  background: ['lime', 'lime', 'blue'],
  '&:hover': {
    background: ['yellow', 'yellow', 'red']
  }
})
```

