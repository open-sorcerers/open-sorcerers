const {
  C,
  any,
  either,
  fork,
  groupBy,
  includes,
  map,
  nth,
  pipe,
  readStdin,
  reject,
  slice,
  smooth,
  split,
  trim
} = require('snang/script')

module.exports = pipe(
  readStdin,
  map(
    pipe(
      split(C.n),
      smooth,
      reject(either(includes('Modernizr'), includes('modernizr'))),
      map(split(':')),
      map(map(trim)),
      reject(any(includes('ℂ'))),
      reject(any(includes('src/styles/colors.js'))),
      reject(any(either(includes('transition'), includes('transform')))),
      groupBy(nth(0)),
      map(map(slice(1, Infinity))),
      map(groupBy(nth(0))),
      map(map(map(slice(1, Infinity))))
    )
  ),
  // eslint-disable-next-line
  fork(console.error, console.log)
)(process.argv.slice(2)[0])
