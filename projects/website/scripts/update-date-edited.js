const {
  equals,
  cond,
  last,
  curry,
  filter,
  map,
  T,
  always: K,
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

const readableMonth = cond([
  [equals('Jan'), K('01')],
  [equals('Feb'), K('02')],
  [equals('Mar'), K('03')],
  [equals('Apr'), K('04')],
  [equals('May'), K('05')],
  [equals('Jun'), K('06')],
  [equals('Jul'), K('07')],
  [equals('Aug'), K('08')],
  [equals('Sep'), K('09')],
  [equals('Oct'), K('10')],
  [equals('Nov'), K('11')],
  [equals('Dec'), K('12')],
  [T, K('???')]
])

const readableDay = z => (z < 10 ? '0' + z : '' + z)

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
        const ff = {
          m: mm,
          d: parseInt(d),
          t,
          y: parseInt(y)
        }
        const formatted = `${ff.y}-${readableMonth(ff.m)}-${readableDay(ff.d)}T${t}.000Z`
        return typeof t !== 'string'
          ? {}
          : {
              [f]: `dateEdited: ` + formatted
            }
      }),
      reduce(mergeRight, {})
    )
  ),
  // eslint-disable-next-line
  fork(console.error, console.log)
)(process.argv.slice(2)[0])
