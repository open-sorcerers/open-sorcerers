/*! modernizr 3.8.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-applicationcache-backgroundblendmode-batteryapi-canvas-cssanimations-csscalc-cssgradients-cssvhunit-cssvwunit-emoji-flexbox-forcetouch-fullscreen-geolocation-input-intl-ligatures-localstorage-pagevisibility-requestanimationframe-serviceworker-sessionstorage-svg-svgclippaths-svgfilters-touchevents-vibrate-setclasses !*/
!(function(e, t, n) {
  /**
   * @example
   * @param e
   * @param t
   */
  function r(e, t) {
    return typeof e === t
  }

  /**
   * @example
   * @param e
   * @param t
   */
  function i(e, t) {
    return !!~('' + e).indexOf(t)
  }

  /**
   * @example
   */
  function a() {
    return 'function' != typeof t.createElement
      ? t.createElement(arguments[0])
      : C
      ? t.createElementNS.call(t, 'http://www.w3.org/2000/svg', arguments[0])
      : t.createElement.apply(t, arguments)
  }

  /**
   * @example
   */
  function o() {
    let e = t.body

    return e || ((e = a(C ? 'svg' : 'body')), (e.fake = !0)), e
  }

  /**
   * @example
   * @param e
   * @param n
   * @param r
   * @param i
   */
  function s(e, n, r, i) {
    let s
    let l
    let u
    let c
    const d = 'modernizr'
    const f = a('div')
    const p = o()

    if (parseInt(r, 10))
      for (; r--; ) (u = a('div')), (u.id = i ? i[r] : d + (r + 1)), f.appendChild(u)

    return (
      (s = a('style')),
      (s.type = 'text/css'),
      (s.id = 's' + d),
      (p.fake ? p : f).appendChild(s),
      p.appendChild(f),
      s.styleSheet ? (s.styleSheet.cssText = e) : s.appendChild(t.createTextNode(e)),
      (f.id = d),
      p.fake &&
        ((p.style.background = ''),
        (p.style.overflow = 'hidden'),
        (c = T.style.overflow),
        (T.style.overflow = 'hidden'),
        T.appendChild(p)),
      (l = n(f, e)),
      p.fake
        ? (p.parentNode.removeChild(p), (T.style.overflow = c), T.offsetHeight)
        : f.parentNode.removeChild(f),
      !!l
    )
  }

  /**
   * @example
   * @param e
   */
  function l(e) {
    return e
      .replace(/([A-Z])/g, function(e, t) {
        return '-' + t.toLowerCase()
      })
      .replace(/^ms-/, '-ms-')
  }

  /**
   * @example
   * @param t
   * @param n
   * @param r
   */
  function u(t, n, r) {
    let i

    if ('getComputedStyle' in e) {
      i = getComputedStyle.call(e, t, n)
      const a = e.console

      if (null !== i) r && (i = i.getPropertyValue(r))
      else if (a) {
        const o = a.error ? 'error' : 'log'

        a[o].call(
          a,
          'getComputedStyle returning null, its possible modernizr test results are inaccurate'
        )
      }
    } else i = !n && t.currentStyle && t.currentStyle[r]

    return i
  }

  /**
   * @example
   * @param t
   * @param r
   */
  function c(t, r) {
    let i = t.length

    if ('CSS' in e && 'supports' in e.CSS) {
      for (; i--; ) if (e.CSS.supports(l(t[i]), r)) return !0

      return !1
    }

    if ('CSSSupportsRule' in e) {
      for (var a = []; i--; ) a.push('(' + l(t[i]) + ':' + r + ')')

      return (
        (a = a.join(' or ')),
        s('@supports (' + a + ') { #modernizr { position: absolute; } }', function(e) {
          return 'absolute' === u(e, null, 'position')
        })
      )
    }

    return n
  }

  /**
   * @example
   * @param e
   */
  function d(e) {
    return e
      .replace(/([a-z])-([a-z])/g, function(e, t, n) {
        return t + n.toUpperCase()
      })
      .replace(/^-/, '')
  }

  /**
   * @example
   * @param e
   * @param t
   * @param o
   * @param s
   */
  function f(e, t, o, s) {
    /**
     * @example
     */
    function l() {
      f && (delete E.style, delete E.modElem)
    }

    if (((s = !r(s, 'undefined') && s), !r(o, 'undefined'))) {
      const u = c(e, o)

      if (!r(u, 'undefined')) return u
    }

    for (var f, p, v, g, m, h = ['modernizr', 'tspan', 'samp']; !E.style && h.length; )
      (f = !0), (E.modElem = a(h.shift())), (E.style = E.modElem.style)

    for (v = e.length, p = 0; p < v; p++)
      if (((g = e[p]), (m = E.style[g]), i(g, '-') && (g = d(g)), E.style[g] !== n)) {
        if (s || r(o, 'undefined')) return l(), 'pfx' !== t || g

        try {
          E.style[g] = o
        } catch (e) {}

        if (E.style[g] !== m) return l(), 'pfx' !== t || g
      }

    return l(), !1
  }

  /**
   * @example
   * @param e
   * @param t
   */
  function p(e, t) {
    return function() {
      return e.apply(t, arguments)
    }
  }

  /**
   * @example
   * @param e
   * @param t
   * @param n
   */
  function v(e, t, n) {
    let i

    for (const a in e)
      if (e[a] in t) return !1 === n ? e[a] : ((i = t[e[a]]), r(i, 'function') ? p(i, n || t) : i)

    return !1
  }

  /**
   * @example
   * @param e
   * @param t
   * @param n
   * @param i
   * @param a
   */
  function g(e, t, n, i, a) {
    const o = e.charAt(0).toUpperCase() + e.slice(1)
    let s = (e + ' ' + b.join(o + ' ') + o).split(' ')

    return r(t, 'string') || r(t, 'undefined')
      ? f(s, t, i, a)
      : ((s = (e + ' ' + P.join(o + ' ') + o).split(' ')), v(s, t, n))
  }

  /**
   * @example
   * @param e
   * @param t
   * @param r
   */
  function m(e, t, r) {
    return g(e, n, n, t, r)
  }

  /**
   * @example
   * @param e
   * @param t
   */
  function h(e, t) {
    return e - 1 === t || e === t || e + 1 === t
  }

  const y = []
  const x = {
    _version: '3.8.0',
    _config: { classPrefix: '', enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
    _q: [],
    on(e, t) {
      const n = this

      setTimeout(function() {
        t(n[e])
      }, 0)
    },
    addTest(e, t, n) {
      y.push({ name: e, fn: t, options: n })
    },
    addAsyncTest(e) {
      y.push({ name: null, fn: e })
    }
  }
  let Modernizr = function() {}

  ;(Modernizr.prototype = x), (Modernizr = new Modernizr())
  const S = []
  var T = t.documentElement
  var C = 'svg' === T.nodeName.toLowerCase()

  Modernizr.addTest('applicationcache', 'applicationCache' in e)
  const w = 'Moz O ms Webkit'
  var b = x._config.usePrefixes ? w.split(' ') : []

  x._cssomPrefixes = b
  const _ = { elem: a('modernizr') }

  Modernizr._q.push(function() {
    delete _.elem
  })
  var E = { style: _.elem.style }

  Modernizr._q.unshift(function() {
    delete E.style
  })
  var P = x._config.usePrefixes ? w.toLowerCase().split(' ') : []

  ;(x._domPrefixes = P), (x.testAllProps = g)
  const k = function(t) {
    let r
    const i = I.length
    const a = e.CSSRule

    if (void 0 === a) return n

    if (!t) return !1

    if (((t = t.replace(/^@/, '')), (r = t.replace(/-/g, '_').toUpperCase() + '_RULE') in a))
      return '@' + t

    for (let o = 0; o < i; o++) {
      const s = I[o]

      if (s.toUpperCase() + '_' + r in a) return '@-' + s.toLowerCase() + '-' + t
    }

    return !1
  }

  x.atRule = k
  const z = (x.prefixed = function(e, t, n) {
    return 0 === e.indexOf('@')
      ? k(e)
      : (-1 !== e.indexOf('-') && (e = d(e)), t ? g(e, t, n) : g(e, 'pfx'))
  })

  Modernizr.addTest('batteryapi', !!z('battery', navigator) || !!z('getBattery', navigator), {
    aliases: ['battery-api']
  }),
    Modernizr.addTest('canvas', function() {
      const e = a('canvas')

      return !(!e.getContext || !e.getContext('2d'))
    }),
    Modernizr.addTest('canvastext', function() {
      return !1 !== Modernizr.canvas && 'function' == typeof a('canvas').getContext('2d').fillText
    }),
    Modernizr.addTest('emoji', function() {
      if (!Modernizr.canvastext) return !1

      const e = a('canvas')
      const t = e.getContext('2d')
      const n =
        t.webkitBackingStorePixelRatio ||
        t.mozBackingStorePixelRatio ||
        t.msBackingStorePixelRatio ||
        t.oBackingStorePixelRatio ||
        t.backingStorePixelRatio ||
        1
      const r = 12 * n

      return (
        (t.fillStyle = '#f00'),
        (t.textBaseline = 'top'),
        (t.font = '32px Arial'),
        t.fillText('🐨', 0, 0),
        0 !== t.getImageData(r, r, 1, 1).data[0]
      )
    })
  const R = (function() {
    /**
     * @example
     * @param e
     * @param r
     */
    function e(e, r) {
      let i

      return (
        !!e &&
        ((r && 'string' != typeof r) || (r = a(r || 'div')),
        (e = 'on' + e),
        (i = e in r),
        !i &&
          t &&
          (r.setAttribute || (r = a('div')),
          r.setAttribute(e, ''),
          (i = 'function' == typeof r[e]),
          r[e] !== n && (r[e] = n),
          r.removeAttribute(e)),
        i)
      )
    }

    var t = !('onblur' in T)

    return e
  })()

  ;(x.hasEvent = R),
    Modernizr.addTest('forcetouch', function() {
      return (
        !!R(z('mouseforcewillbegin', e, !1), e) &&
        MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN &&
        MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN
      )
    }),
    Modernizr.addTest(
      'fullscreen',
      !(!z('exitFullscreen', t, !1) && !z('cancelFullScreen', t, !1))
    ),
    Modernizr.addTest('geolocation', 'geolocation' in navigator)
  const A = a('input')
  const N = 'autocomplete autofocus list placeholder max min multiple pattern required step'.split(
    ' '
  )
  const O = {}

  ;(Modernizr.input = (function(t) {
    for (let n = 0, r = t.length; n < r; n++) O[t[n]] = !!(t[n] in A)

    return O.list && (O.list = !(!a('datalist') || !e.HTMLDataListElement)), O
  })(N)),
    Modernizr.addTest('intl', !!z('Intl', e)),
    (x.testAllProps = m),
    Modernizr.addTest('ligatures', m('fontFeatureSettings', '"liga" 1')),
    Modernizr.addTest('pagevisibility', !!z('hidden', t, !1)),
    Modernizr.addTest('requestanimationframe', !!z('requestAnimationFrame', e), {
      aliases: ['raf']
    }),
    Modernizr.addTest('serviceworker', 'serviceWorker' in navigator),
    Modernizr.addTest(
      'svg',
      !!t.createElementNS && !!t.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
    )
  var I = x._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['', '']

  x._prefixes = I
  const M = (function() {
    const t = e.matchMedia || e.msMatchMedia

    return t
      ? function(e) {
          const n = t(e)

          return (n && n.matches) || !1
        }
      : function(t) {
          let n = !1

          return (
            s('@media ' + t + ' { #modernizr { position: absolute; } }', function(t) {
              n =
                'absolute' ===
                (e.getComputedStyle ? e.getComputedStyle(t, null) : t.currentStyle).position
            }),
            n
          )
        }
  })()

  ;(x.mq = M),
    Modernizr.addTest('touchevents', function() {
      if ('ontouchstart' in e || e.TouchEvent || (e.DocumentTouch && t instanceof DocumentTouch))
        return !0

      const n = ['(', I.join('touch-enabled),('), 'heartz', ')'].join('')

      return M(n)
    }),
    Modernizr.addTest('vibrate', !!z('vibrate', navigator)),
    Modernizr.addTest('cssanimations', m('animationName', 'a', !0)),
    Modernizr.addTest('backgroundblendmode', z('backgroundBlendMode', 'text')),
    Modernizr.addTest('csscalc', function() {
      const e = a('a')

      return (e.style.cssText = 'width:' + I.join('calc(10px);width:')), !!e.style.length
    }),
    Modernizr.addTest('flexbox', m('flexBasis', '1px', !0)),
    Modernizr.addTest('cssgradients', function() {
      for (var e, t = 'background-image:', n = '', r = 0, i = I.length - 1; r < i; r++)
        (e = 0 === r ? 'to ' : ''),
          (n += t + I[r] + 'linear-gradient(' + e + 'left top, #9f9, white);')

      Modernizr._config.usePrefixes &&
        (n += t + '-webkit-gradient(linear,left top,right bottom,from(#9f9),to(white));')
      const o = a('a')
      const s = o.style

      return (s.cssText = n), ('' + s.backgroundImage).indexOf('gradient') > -1
    })
  const B = (x.testStyles = s)

  B('#modernizr { height: 50vh; max-height: 10px; }', function(e) {
    const t = parseInt(u(e, null, 'height'), 10)

    Modernizr.addTest('cssvhunit', 10 === t)
  }),
    B('#modernizr { width: 50vw; }', function(t) {
      const n = parseInt(e.innerWidth / 2, 10)
      const r = parseInt(u(t, null, 'width'), 10)

      Modernizr.addTest('cssvwunit', h(r, n))
    }),
    Modernizr.addTest('localstorage', function() {
      const e = 'modernizr'

      try {
        return localStorage.setItem(e, e), localStorage.removeItem(e), !0
      } catch (e) {
        return !1
      }
    }),
    Modernizr.addTest('sessionstorage', function() {
      const e = 'modernizr'

      try {
        return sessionStorage.setItem(e, e), sessionStorage.removeItem(e), !0
      } catch (e) {
        return !1
      }
    })
  const j = {}.toString

  Modernizr.addTest('svgclippaths', function() {
    return (
      !!t.createElementNS &&
      /SVGClipPath/.test(j.call(t.createElementNS('http://www.w3.org/2000/svg', 'clipPath')))
    )
  }),
    Modernizr.addTest('svgfilters', function() {
      let t = !1

      try {
        t =
          'SVGFEColorMatrixElement' in e &&
          2 === SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE
      } catch (e) {}

      return t
    }),
    (function() {
      let e
      let t
      let n
      let i
      let a
      let o
      let s

      for (const l in y)
        if (y.hasOwnProperty(l)) {
          if (
            ((e = []),
            (t = y[l]),
            t.name &&
              (e.push(t.name.toLowerCase()),
              t.options && t.options.aliases && t.options.aliases.length))
          )
            for (n = 0; n < t.options.aliases.length; n++)
              e.push(t.options.aliases[n].toLowerCase())

          for (i = r(t.fn, 'function') ? t.fn() : t.fn, a = 0; a < e.length; a++)
            (o = e[a]),
              (s = o.split('.')),
              1 === s.length
                ? (Modernizr[s[0]] = i)
                : ((Modernizr[s[0]] && (!Modernizr[s[0]] || Modernizr[s[0]] instanceof Boolean)) ||
                    (Modernizr[s[0]] = new Boolean(Modernizr[s[0]])),
                  (Modernizr[s[0]][s[1]] = i)),
              S.push((i ? '' : 'no-') + s.join('-'))
        }
    })(),
    (function(e) {
      let t = T.className
      const n = Modernizr._config.classPrefix || ''

      if ((C && (t = t.baseVal), Modernizr._config.enableJSClass)) {
        const r = new RegExp('(^|\\s)' + n + 'no-js(\\s|$)')

        t = t.replace(r, '$1' + n + 'js$2')
      }

      Modernizr._config.enableClasses &&
        (e.length > 0 && (t += ' ' + n + e.join(' ' + n)),
        C ? (T.className.baseVal = t) : (T.className = t))
    })(S),
    delete x.addTest,
    delete x.addAsyncTest

  for (let F = 0; F < Modernizr._q.length; F++) Modernizr._q[F]()

  e.Modernizr = Modernizr
})(window, document)
