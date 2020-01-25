const {
  last,
  curry,
  filter,
  map,
  identity: I,
  reject,
  includes,
  mergeRight,
  pipe,
  reduce,
  slice,
  split
} = require('ramda')
const F = require('fluture')
const getStdin = require('get-stdin')
const fork = curry((bad, good, ff) => F.fork(bad)(good)(ff))

const readStdin = () =>
  new F((bad, good) => {
    getStdin()
      .catch(bad)
      .then(good)
    return () => process.exit(1)
  })

const C = { n: '\n', _: ' ' }
const smooth = filter(I)

module.exports = pipe(
  readStdin,
  map(
    pipe(
      split(C.n),
      reject(includes('total')),
      reject(z => pipe(last, last)(z) === '/'),
      reject(includes('node_modules')),
      reject(includes('->')),
      filter(includes('mdx')),
      smooth,
      map(split(C._)),
      map(slice(-6, Infinity)),
      map(([z, m, d, t, y, f]) => {
        const mm = m === '' ? z : m
        return typeof t !== 'string'
          ? {}
          : {
              [f]: { m: mm, d: parseInt(d), t: pipe(split(':'), map(parseInt))(t), y: parseInt(y) }
            }
      }),
      reduce(mergeRight, {})
    )
  ),
  // eslint-disable-next-line
  fork(console.error, console.log)
)(process.argv.slice(2)[0])
