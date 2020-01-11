const fs = require('fs')
const nodePath = require('path')
const R = require('ramda')
const F = require('fluture')
const ff = require('follow-redirect-url')
const { trace } = require('xtrace')

const x = require('./rss.json')

const {
  curry,
  anyPass,
  includes,
  ifElse,
  identity,
  prop,
  propOr,
  replace,
  pipe,
  split,
  chain,
  map,
  filter,
  pathOr,
  last,
  ap
} = R

const writeTo = curry(
  (pp, what) =>
    new F((bad, good) => {
      fs.writeFile(pp, what, 'utf8', (e, xxx) => (e ? bad(e) : good(xxx)))
      return () => {}
    })
)

const follow = url =>
  new F((bad, good) => {
    ff.startFollowing('https://' + url)
      .catch(bad)
      .then(good)
    return () => {}
  })
const rLink = new RegExp('"https?://(.*)"', 'gm')

const findLinks = pipe(
  split('\n'),
  chain(split('><')),
  map(zz => {
    const aa = rLink.exec(zz)
    return aa && aa.index ? aa[1].slice(0, aa[1].indexOf('"')) : false
  }),
  filter(identity)
)

const WHITELIST = ['javascriptweekly.com']

const followLink = ifElse(anyPass(map(includes, WHITELIST)), follow, F.of)

const stripNewlines = replace(/\n/g, '')
const j2 = jj => JSON.stringify(jj, null, 2)

const processRSS = pipe(
  pathOr([], ['data', 'allRssFeedItem', 'nodes']),
  map(
    pipe(
      zz => [zz],
      ap([
        pipe(prop('id'), stripNewlines),
        pipe(propOr('', 'title'), stripNewlines),
        propOr('', 'content')
      ])
    )
  ),
  map(([ii, tt, cc]) => {
    const foundLinks = findLinks(cc)
    const pathing = F.parallel(10)(foundLinks.map(followLink))
    const linksOrRaw = foundLinks.length > 0 ? pathing : F.of(cc)
    return map(zz => [ii, tt, zz])(linksOrRaw)
  }),
  F.parallel(10),
  map(j2),
  chain(writeTo(nodePath.resolve(process.cwd(), 'processed.rss.json'))),
  F.fork(trace('bad'))(trace('good'))
)

processRSS(x)
