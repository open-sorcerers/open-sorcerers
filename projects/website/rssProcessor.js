const R = require('ramda')
const x = require('./rss.json')

const rLink = new RegExp('"https?://(.*)"', 'gm')

const logType = tag => whatever => {
  console.log(tag, typeof whatever, whatever)
  return whatever
}
const logOnce = R.once(console.log)

const findLinks = R.pipe(
  R.split('\n'),
  R.chain(R.split('><')),
  R.map(zz => {
    const aa = rLink.exec(zz)
    return aa && aa.index ? aa[1].slice(0, aa[1].indexOf('"')) : false
  }),
  R.filter(R.identity)
)

const processRSS = R.pipe(
  R.pathOr([], ['data', 'allRssFeedItem', 'nodes']),
  R.map(
    R.pipe(
      zz => [zz],
      R.ap([
        R.pipe(R.prop('id'), R.replace(/\n/, '')),
        R.propOr('', 'title'),
        R.pipe(R.propOr('', 'content'))
      ])
    )
  ),
  R.map(
    R.ifElse(
      R.pipe(R.nth(2), R.length, R.lt(200)),
      ([ii, tt, cc]) => [ii, tt, findLinks(cc)],
      ([ii, tt, cc]) => [ii, tt, cc]
    )
  )
)

console.log('>>>>', processRSS(x))
