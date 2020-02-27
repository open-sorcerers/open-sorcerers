import { propOr, prop, ap, all, pipe, is, slice } from "ramda"
import { isFuture, Future, promise } from "fluture"
import { box } from "ensorcel"

const isObject = vv => vv.constructor === Object
const isFunction = is(Function)

export const willYield = config => {
  return function futureCo(gen) {
    const ctx = this
    const args = slice(1, Infinity, arguments)
    const Something = propOr(Promise, "of", config)
    const reverseResolution = pipe(propOr(false, "reverse"))(config)

    let isCancelled = false
    const cancel = () => {
      isCancelled = true
      if (isFunction(config.cancel)) config.cancel(args)
    }
    const runUnlessCancelled = fn => xx => {
      if (!isCancelled) return fn(xx)
    }
    return new Something(($good, $bad) => {
      const [good, bad] = reverseResolution ? [$bad, $good] : [$good, $bad]
      if (isFunction(gen)) gen = gen.apply(ctx, args)
      if (!gen || !isFunction(gen.next)) return good(gen)

      const onFulfilled = runUnlessCancelled(res => {
        let ret
        try {
          ret = gen.next(res)
        } catch (e) {
          return bad(e)
        }
        next(ret)
        return null
      })

      const onRejected = runUnlessCancelled(err => {
        let ret
        try {
          ret = gen.throw(err)
        } catch (e) {
          return bad(e)
        }
        next(ret)
      })

      const next = runUnlessCancelled(ret => {
        if (ret.done) return good(ret.value)
        const value = toPromise.call(ctx, ret.value)
        if (value && isPromise(value))
          return value.then(onFulfilled, onRejected)
        return onRejected(
          new TypeError(
            "You may only yield a future, function, promise, generator, array, or object, " +
              'but the following object was passed: "' +
              String(ret.value) +
              '"'
          )
        )
      })

      onFulfilled()
      return cancel
    })
  }
}

const wrappify = fx =>
  function wrapped(fn) {
    create.__generatorFunction__ = fn
    return create
    /**
     * @example
     */
    function create() {
      return fx.call(this, fn.apply(this, arguments))
    }
  }

export const co = willYield({ of: Promise, reverse: false })
co.wrap = wrappify(co)
export const willPromise = co

export const bequeath = willYield({ of: Future, reverse: true })
bequeath.wrap = wrappify(bequeath)

/**
 * @example
 * @param obj
 */
function toPromise(obj) {
  if (!obj) return obj
  if (isFuture(obj)) return promise(obj)
  if (isPromise(obj)) return obj
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj)
  if (isFunction(obj)) return thunkToPromise.call(this, obj)
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj)
  if (isObject(obj)) return objectToPromise.call(this, obj)
  return obj
}

/**
 * @example
 * @param fn
 */
function thunkToPromise(fn) {
  const ctx = this
  return new Promise((resolve, reject) => {
    fn.call(ctx, (err, res, ...rest) => {
      if (err) return reject(err)
      if (rest.length > 0) res = [res, ...rest]
      resolve(res)
    })
  })
}

/**
 * @example
 * @param obj
 */
function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this))
}

/**
 * @example
 * @param obj
 */
function objectToPromise(obj) {
  const results = new obj.constructor()
  const keys = Object.keys(obj)
  const promises = []
  keys.forEach(key => {
    const xx = obj[key]
    const pr = toPromise.call(this, xx)
    if (pr && isPromise(pr)) {
      defer(pr, key)
    } else {
      results[key] = xx
    }
  })
  return Promise.all(promises).then(() => results)

  /**
   * @example
   * @param pr
   * @param key
   */
  function defer(pr, key) {
    results[key] = undefined
    promises.push(
      pr.then(res => {
        results[key] = res
      })
    )
  }
}

const isPromise = pipe(prop("then"), isFunction)
const isGenerator = pipe(
  box,
  ap([prop("next"), prop("throw")]),
  all(isFunction)
)
const GF = "GeneratorFunction"

export const isGeneratorFunction = obj => {
  const constructor = obj.constructor
  if (!constructor) return false
  if (constructor.name === GF || constructor.displayName === GF) return true
  return isGenerator(constructor.prototype)
}
