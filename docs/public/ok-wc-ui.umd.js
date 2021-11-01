!(function (e) {
  'function' == typeof define && define.amd ? define(e) : e()
})(function () {
  'use strict'
  var e = function (e) {
      try {
        return !!e()
      } catch (e) {
        return !0
      }
    },
    t = !e(function () {
      return (
        7 !=
        Object.defineProperty({}, 1, {
          get: function () {
            return 7
          },
        })[1]
      )
    }),
    n =
      'undefined' != typeof globalThis
        ? globalThis
        : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : {}
  function r(e) {
    var t = { exports: {} }
    return e(t, t.exports), t.exports
  }
  var o = function (e) {
      return e && e.Math == Math && e
    },
    i =
      o('object' == typeof globalThis && globalThis) ||
      o('object' == typeof window && window) ||
      o('object' == typeof self && self) ||
      o('object' == typeof n && n) ||
      (function () {
        return this
      })() ||
      Function('return this')(),
    s = /#|\.prototype\./,
    a = function (t, n) {
      var r = l[c(t)]
      return r == f || (r != u && ('function' == typeof n ? e(n) : !!n))
    },
    c = (a.normalize = function (e) {
      return String(e).replace(s, '.').toLowerCase()
    }),
    l = (a.data = {}),
    u = (a.NATIVE = 'N'),
    f = (a.POLYFILL = 'P'),
    p = a,
    d = function (e) {
      return 'object' == typeof e ? null !== e : 'function' == typeof e
    },
    h = i.document,
    m = d(h) && d(h.createElement),
    g = function (e) {
      return m ? h.createElement(e) : {}
    },
    v =
      !t &&
      !e(function () {
        return (
          7 !=
          Object.defineProperty(g('div'), 'a', {
            get: function () {
              return 7
            },
          }).a
        )
      }),
    y = function (e) {
      if (!d(e)) throw TypeError(String(e) + ' is not an object')
      return e
    },
    b = function (e, t) {
      if (!d(e)) return e
      var n, r
      if (t && 'function' == typeof (n = e.toString) && !d((r = n.call(e))))
        return r
      if ('function' == typeof (n = e.valueOf) && !d((r = n.call(e)))) return r
      if (!t && 'function' == typeof (n = e.toString) && !d((r = n.call(e))))
        return r
      throw TypeError("Can't convert object to primitive value")
    },
    x = Object.defineProperty,
    w = {
      f: t
        ? x
        : function (e, t, n) {
            if ((y(e), (t = b(t, !0)), y(n), v))
              try {
                return x(e, t, n)
              } catch (e) {}
            if ('get' in n || 'set' in n)
              throw TypeError('Accessors not supported')
            return 'value' in n && (e[t] = n.value), e
          },
    },
    _ = function (e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t,
      }
    },
    O = t
      ? function (e, t, n) {
          return w.f(e, t, _(1, n))
        }
      : function (e, t, n) {
          return (e[t] = n), e
        },
    E = {}.hasOwnProperty,
    j = function (e, t) {
      return E.call(e, t)
    },
    k = function (e, t) {
      try {
        O(i, e, t)
      } catch (n) {
        i[e] = t
      }
      return t
    },
    N = '__core-js_shared__',
    A = i[N] || k(N, {}),
    M = Function.toString
  'function' != typeof A.inspectSource &&
    (A.inspectSource = function (e) {
      return M.call(e)
    })
  var S,
    V,
    P,
    R = A.inspectSource,
    T = i.WeakMap,
    C = 'function' == typeof T && /native code/.test(R(T)),
    L = r(function (e) {
      ;(e.exports = function (e, t) {
        return A[e] || (A[e] = void 0 !== t ? t : {})
      })('versions', []).push({
        version: '3.8.1',
        mode: 'global',
        copyright: '© 2020 Denis Pushkarev (zloirock.ru)',
      })
    }),
    I = 0,
    F = Math.random(),
    q = L('keys'),
    D = function (e) {
      return (
        q[e] ||
        (q[e] = (function (e) {
          return (
            'Symbol(' +
            String(void 0 === e ? '' : e) +
            ')_' +
            (++I + F).toString(36)
          )
        })(e))
      )
    },
    Z = {},
    W = i.WeakMap
  if (C) {
    var z = A.state || (A.state = new W()),
      H = z.get,
      B = z.has,
      K = z.set
    ;(S = function (e, t) {
      return (t.facade = e), K.call(z, e, t), t
    }),
      (V = function (e) {
        return H.call(z, e) || {}
      }),
      (P = function (e) {
        return B.call(z, e)
      })
  } else {
    var X = D('state')
    ;(Z[X] = !0),
      (S = function (e, t) {
        return (t.facade = e), O(e, X, t), t
      }),
      (V = function (e) {
        return j(e, X) ? e[X] : {}
      }),
      (P = function (e) {
        return j(e, X)
      })
  }
  var Y,
    U = {
      set: S,
      get: V,
      has: P,
      enforce: function (e) {
        return P(e) ? V(e) : S(e, {})
      },
      getterFor: function (e) {
        return function (t) {
          var n
          if (!d(t) || (n = V(t)).type !== e)
            throw TypeError('Incompatible receiver, ' + e + ' required')
          return n
        }
      },
    },
    G = r(function (e) {
      var t = U.get,
        n = U.enforce,
        r = String(String).split('String')
      ;(e.exports = function (e, t, o, s) {
        var a,
          c = !!s && !!s.unsafe,
          l = !!s && !!s.enumerable,
          u = !!s && !!s.noTargetGet
        'function' == typeof o &&
          ('string' != typeof t || j(o, 'name') || O(o, 'name', t),
          (a = n(o)).source ||
            (a.source = r.join('string' == typeof t ? t : ''))),
          e !== i
            ? (c ? !u && e[t] && (l = !0) : delete e[t],
              l ? (e[t] = o) : O(e, t, o))
            : l
            ? (e[t] = o)
            : k(t, o)
      })(Function.prototype, 'toString', function () {
        return ('function' == typeof this && t(this).source) || R(this)
      })
    }),
    J = {}.toString,
    Q = function (e) {
      return J.call(e).slice(8, -1)
    },
    $ =
      Object.setPrototypeOf ||
      ('__proto__' in {}
        ? (function () {
            var e,
              t = !1,
              n = {}
            try {
              ;(e = Object.getOwnPropertyDescriptor(
                Object.prototype,
                '__proto__'
              ).set).call(n, []),
                (t = n instanceof Array)
            } catch (e) {}
            return function (n, r) {
              return (
                y(n),
                (function (e) {
                  if (!d(e) && null !== e)
                    throw TypeError(
                      "Can't set " + String(e) + ' as a prototype'
                    )
                })(r),
                t ? e.call(n, r) : (n.__proto__ = r),
                n
              )
            }
          })()
        : void 0),
    ee = function (e, t, n) {
      var r, o
      return (
        $ &&
          'function' == typeof (r = t.constructor) &&
          r !== n &&
          d((o = r.prototype)) &&
          o !== n.prototype &&
          $(e, o),
        e
      )
    },
    te = ''.split,
    ne = e(function () {
      return !Object('z').propertyIsEnumerable(0)
    })
      ? function (e) {
          return 'String' == Q(e) ? te.call(e, '') : Object(e)
        }
      : Object,
    re = function (e) {
      if (null == e) throw TypeError("Can't call method on " + e)
      return e
    },
    oe = function (e) {
      return ne(re(e))
    },
    ie = Math.ceil,
    se = Math.floor,
    ae = function (e) {
      return isNaN((e = +e)) ? 0 : (e > 0 ? se : ie)(e)
    },
    ce = Math.min,
    le = Math.max,
    ue = Math.min,
    fe = function (e) {
      return function (t, n, r) {
        var o,
          i,
          s = oe(t),
          a = (o = s.length) > 0 ? ce(ae(o), 9007199254740991) : 0,
          c = (function (e, t) {
            var n = ae(e)
            return n < 0 ? le(n + t, 0) : ue(n, t)
          })(r, a)
        if (e && n != n) {
          for (; a > c; ) if ((i = s[c++]) != i) return !0
        } else
          for (; a > c; c++) if ((e || c in s) && s[c] === n) return e || c || 0
        return !e && -1
      }
    },
    pe = { includes: fe(!0), indexOf: fe(!1) }.indexOf,
    de = function (e, t) {
      var n,
        r = oe(e),
        o = 0,
        i = []
      for (n in r) !j(Z, n) && j(r, n) && i.push(n)
      for (; t.length > o; ) j(r, (n = t[o++])) && (~pe(i, n) || i.push(n))
      return i
    },
    he = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf',
    ],
    me =
      Object.keys ||
      function (e) {
        return de(e, he)
      },
    ge = t
      ? Object.defineProperties
      : function (e, t) {
          y(e)
          for (var n, r = me(t), o = r.length, i = 0; o > i; )
            w.f(e, (n = r[i++]), t[n])
          return e
        },
    ve = i,
    ye = function (e) {
      return 'function' == typeof e ? e : void 0
    },
    be = (function (e, t) {
      return arguments.length < 2
        ? ye(ve[e]) || ye(i[e])
        : (ve[e] && ve[e][t]) || (i[e] && i[e][t])
    })('document', 'documentElement'),
    xe = D('IE_PROTO'),
    we = function () {},
    _e = function (e) {
      return '<script>' + e + '</' + 'script>'
    },
    Oe = function () {
      try {
        Y = document.domain && new ActiveXObject('htmlfile')
      } catch (e) {}
      var e, t
      Oe = Y
        ? (function (e) {
            e.write(_e('')), e.close()
            var t = e.parentWindow.Object
            return (e = null), t
          })(Y)
        : (((t = g('iframe')).style.display = 'none'),
          be.appendChild(t),
          (t.src = String('javascript:')),
          (e = t.contentWindow.document).open(),
          e.write(_e('document.F=Object')),
          e.close(),
          e.F)
      for (var n = he.length; n--; ) delete Oe.prototype[he[n]]
      return Oe()
    }
  Z[xe] = !0
  var Ee =
      Object.create ||
      function (e, t) {
        var n
        return (
          null !== e
            ? ((we.prototype = y(e)),
              (n = new we()),
              (we.prototype = null),
              (n[xe] = e))
            : (n = Oe()),
          void 0 === t ? n : ge(n, t)
        )
      },
    je = he.concat('length', 'prototype'),
    ke = {
      f:
        Object.getOwnPropertyNames ||
        function (e) {
          return de(e, je)
        },
    },
    Ne = {}.propertyIsEnumerable,
    Ae = Object.getOwnPropertyDescriptor,
    Me = {
      f:
        Ae && !Ne.call({ 1: 2 }, 1)
          ? function (e) {
              var t = Ae(this, e)
              return !!t && t.enumerable
            }
          : Ne,
    },
    Se = Object.getOwnPropertyDescriptor,
    Ve = {
      f: t
        ? Se
        : function (e, t) {
            if (((e = oe(e)), (t = b(t, !0)), v))
              try {
                return Se(e, t)
              } catch (e) {}
            if (j(e, t)) return _(!Me.f.call(e, t), e[t])
          },
    },
    Pe = '[\t\n\v\f\r                　\u2028\u2029\ufeff]',
    Re = RegExp('^' + Pe + Pe + '*'),
    Te = RegExp(Pe + Pe + '*$'),
    Ce = function (e) {
      return function (t) {
        var n = String(re(t))
        return (
          1 & e && (n = n.replace(Re, '')), 2 & e && (n = n.replace(Te, '')), n
        )
      }
    },
    Le = { start: Ce(1), end: Ce(2), trim: Ce(3) },
    Ie = ke.f,
    Fe = Ve.f,
    qe = w.f,
    De = Le.trim,
    Ze = 'Number',
    We = i.Number,
    ze = We.prototype,
    He = Q(Ee(ze)) == Ze,
    Be = function (e) {
      var t,
        n,
        r,
        o,
        i,
        s,
        a,
        c,
        l = b(e, !1)
      if ('string' == typeof l && l.length > 2)
        if (43 === (t = (l = De(l)).charCodeAt(0)) || 45 === t) {
          if (88 === (n = l.charCodeAt(2)) || 120 === n) return NaN
        } else if (48 === t) {
          switch (l.charCodeAt(1)) {
            case 66:
            case 98:
              ;(r = 2), (o = 49)
              break
            case 79:
            case 111:
              ;(r = 8), (o = 55)
              break
            default:
              return +l
          }
          for (s = (i = l.slice(2)).length, a = 0; a < s; a++)
            if ((c = i.charCodeAt(a)) < 48 || c > o) return NaN
          return parseInt(i, r)
        }
      return +l
    }
  if (p(Ze, !We(' 0o1') || !We('0b1') || We('+0x1'))) {
    for (
      var Ke,
        Xe = function (t) {
          var n = arguments.length < 1 ? 0 : t,
            r = this
          return r instanceof Xe &&
            (He
              ? e(function () {
                  ze.valueOf.call(r)
                })
              : Q(r) != Ze)
            ? ee(new We(Be(n)), r, Xe)
            : Be(n)
        },
        Ye = t
          ? Ie(We)
          : 'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range'.split(
              ','
            ),
        Ue = 0;
      Ye.length > Ue;
      Ue++
    )
      j(We, (Ke = Ye[Ue])) && !j(Xe, Ke) && qe(Xe, Ke, Fe(We, Ke))
    ;(Xe.prototype = ze), (ze.constructor = Xe), G(i, Ze, Xe)
  }
  function Ge(e, t) {
    return (
      t || (t = e.slice(0)),
      Object.freeze(
        Object.defineProperties(e, { raw: { value: Object.freeze(t) } })
      )
    )
  }
  var Je = 'top',
    Qe = 'bottom',
    $e = 'right',
    et = 'left',
    tt = 'auto',
    nt = [Je, Qe, $e, et],
    rt = 'start',
    ot = 'end',
    it = 'viewport',
    st = 'popper',
    at = nt.reduce(function (e, t) {
      return e.concat([t + '-' + rt, t + '-' + ot])
    }, []),
    ct = [].concat(nt, [tt]).reduce(function (e, t) {
      return e.concat([t, t + '-' + rt, t + '-' + ot])
    }, []),
    lt = [
      'beforeRead',
      'read',
      'afterRead',
      'beforeMain',
      'main',
      'afterMain',
      'beforeWrite',
      'write',
      'afterWrite',
    ]
  function ut(e) {
    return e ? (e.nodeName || '').toLowerCase() : null
  }
  function ft(e) {
    if ('[object Window]' !== e.toString()) {
      var t = e.ownerDocument
      return (t && t.defaultView) || window
    }
    return e
  }
  function pt(e) {
    return e instanceof ft(e).Element || e instanceof Element
  }
  function dt(e) {
    return e instanceof ft(e).HTMLElement || e instanceof HTMLElement
  }
  function ht(e) {
    return e.split('-')[0]
  }
  function mt(e) {
    return {
      x: e.offsetLeft,
      y: e.offsetTop,
      width: e.offsetWidth,
      height: e.offsetHeight,
    }
  }
  function gt(e, t) {
    var n,
      r = t.getRootNode && t.getRootNode()
    if (e.contains(t)) return !0
    if (r && ((n = r) instanceof ft(n).ShadowRoot || n instanceof ShadowRoot)) {
      var o = t
      do {
        if (o && e.isSameNode(o)) return !0
        o = o.parentNode || o.host
      } while (o)
    }
    return !1
  }
  function vt(e) {
    return ft(e).getComputedStyle(e)
  }
  function yt(e) {
    return ['table', 'td', 'th'].indexOf(ut(e)) >= 0
  }
  function bt(e) {
    return (
      (pt(e) ? e.ownerDocument : e.document) || window.document
    ).documentElement
  }
  function xt(e) {
    return 'html' === ut(e)
      ? e
      : e.assignedSlot || e.parentNode || e.host || bt(e)
  }
  function wt(e) {
    if (!dt(e) || 'fixed' === vt(e).position) return null
    var t = e.offsetParent
    if (t) {
      var n = bt(t)
      if (
        'body' === ut(t) &&
        'static' === vt(t).position &&
        'static' !== vt(n).position
      )
        return n
    }
    return t
  }
  function _t(e) {
    for (var t = ft(e), n = wt(e); n && yt(n) && 'static' === vt(n).position; )
      n = wt(n)
    return n && 'body' === ut(n) && 'static' === vt(n).position
      ? t
      : n ||
          (function (e) {
            for (
              var t = xt(e);
              dt(t) && ['html', 'body'].indexOf(ut(t)) < 0;

            ) {
              var n = vt(t)
              if (
                'none' !== n.transform ||
                'none' !== n.perspective ||
                (n.willChange && 'auto' !== n.willChange)
              )
                return t
              t = t.parentNode
            }
            return null
          })(e) ||
          t
  }
  function Ot(e) {
    return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y'
  }
  function Et(e, t, n) {
    return Math.max(e, Math.min(t, n))
  }
  function jt(e) {
    return Object.assign(
      Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }),
      e
    )
  }
  function kt(e, t) {
    return t.reduce(function (t, n) {
      return (t[n] = e), t
    }, {})
  }
  var Nt = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' }
  function At(e) {
    var t,
      n = e.popper,
      r = e.popperRect,
      o = e.placement,
      i = e.offsets,
      s = e.position,
      a = e.gpuAcceleration,
      c = e.adaptive,
      l = e.roundOffsets
        ? (function (e) {
            var t = e.x,
              n = e.y,
              r = window.devicePixelRatio || 1
            return {
              x: Math.round(t * r) / r || 0,
              y: Math.round(n * r) / r || 0,
            }
          })(i)
        : i,
      u = l.x,
      f = void 0 === u ? 0 : u,
      p = l.y,
      d = void 0 === p ? 0 : p,
      h = i.hasOwnProperty('x'),
      m = i.hasOwnProperty('y'),
      g = et,
      v = Je,
      y = window
    if (c) {
      var b = _t(n)
      b === ft(n) && (b = bt(n)),
        o === Je &&
          ((v = Qe), (d -= b.clientHeight - r.height), (d *= a ? 1 : -1)),
        o === et &&
          ((g = $e), (f -= b.clientWidth - r.width), (f *= a ? 1 : -1))
    }
    var x,
      w = Object.assign({ position: s }, c && Nt)
    return a
      ? Object.assign(
          Object.assign({}, w),
          {},
          (((x = {})[v] = m ? '0' : ''),
          (x[g] = h ? '0' : ''),
          (x.transform =
            (y.devicePixelRatio || 1) < 2
              ? 'translate(' + f + 'px, ' + d + 'px)'
              : 'translate3d(' + f + 'px, ' + d + 'px, 0)'),
          x)
        )
      : Object.assign(
          Object.assign({}, w),
          {},
          (((t = {})[v] = m ? d + 'px' : ''),
          (t[g] = h ? f + 'px' : ''),
          (t.transform = ''),
          t)
        )
  }
  var Mt = { passive: !0 }
  var St = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
  function Vt(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return St[e]
    })
  }
  var Pt = { start: 'end', end: 'start' }
  function Rt(e) {
    return e.replace(/start|end/g, function (e) {
      return Pt[e]
    })
  }
  function Tt(e) {
    var t = e.getBoundingClientRect()
    return {
      width: t.width,
      height: t.height,
      top: t.top,
      right: t.right,
      bottom: t.bottom,
      left: t.left,
      x: t.left,
      y: t.top,
    }
  }
  function Ct(e) {
    var t = ft(e)
    return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset }
  }
  function Lt(e) {
    return Tt(bt(e)).left + Ct(e).scrollLeft
  }
  function It(e) {
    var t = vt(e),
      n = t.overflow,
      r = t.overflowX,
      o = t.overflowY
    return /auto|scroll|overlay|hidden/.test(n + o + r)
  }
  function Ft(e) {
    return ['html', 'body', '#document'].indexOf(ut(e)) >= 0
      ? e.ownerDocument.body
      : dt(e) && It(e)
      ? e
      : Ft(xt(e))
  }
  function qt(e, t) {
    void 0 === t && (t = [])
    var n = Ft(e),
      r = 'body' === ut(n),
      o = ft(n),
      i = r ? [o].concat(o.visualViewport || [], It(n) ? n : []) : n,
      s = t.concat(i)
    return r ? s : s.concat(qt(xt(i)))
  }
  function Dt(e) {
    return Object.assign(
      Object.assign({}, e),
      {},
      { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height }
    )
  }
  function Zt(e, t) {
    return t === it
      ? Dt(
          (function (e) {
            var t = ft(e),
              n = bt(e),
              r = t.visualViewport,
              o = n.clientWidth,
              i = n.clientHeight,
              s = 0,
              a = 0
            return (
              r &&
                ((o = r.width),
                (i = r.height),
                /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
                  ((s = r.offsetLeft), (a = r.offsetTop))),
              { width: o, height: i, x: s + Lt(e), y: a }
            )
          })(e)
        )
      : dt(t)
      ? (function (e) {
          var t = Tt(e)
          return (
            (t.top = t.top + e.clientTop),
            (t.left = t.left + e.clientLeft),
            (t.bottom = t.top + e.clientHeight),
            (t.right = t.left + e.clientWidth),
            (t.width = e.clientWidth),
            (t.height = e.clientHeight),
            (t.x = t.left),
            (t.y = t.top),
            t
          )
        })(t)
      : Dt(
          (function (e) {
            var t = bt(e),
              n = Ct(e),
              r = e.ownerDocument.body,
              o = Math.max(
                t.scrollWidth,
                t.clientWidth,
                r ? r.scrollWidth : 0,
                r ? r.clientWidth : 0
              ),
              i = Math.max(
                t.scrollHeight,
                t.clientHeight,
                r ? r.scrollHeight : 0,
                r ? r.clientHeight : 0
              ),
              s = -n.scrollLeft + Lt(e),
              a = -n.scrollTop
            return (
              'rtl' === vt(r || t).direction &&
                (s += Math.max(t.clientWidth, r ? r.clientWidth : 0) - o),
              { width: o, height: i, x: s, y: a }
            )
          })(bt(e))
        )
  }
  function Wt(e, t, n) {
    var r =
        'clippingParents' === t
          ? (function (e) {
              var t = qt(xt(e)),
                n =
                  ['absolute', 'fixed'].indexOf(vt(e).position) >= 0 && dt(e)
                    ? _t(e)
                    : e
              return pt(n)
                ? t.filter(function (e) {
                    return pt(e) && gt(e, n) && 'body' !== ut(e)
                  })
                : []
            })(e)
          : [].concat(t),
      o = [].concat(r, [n]),
      i = o[0],
      s = o.reduce(function (t, n) {
        var r = Zt(e, n)
        return (
          (t.top = Math.max(r.top, t.top)),
          (t.right = Math.min(r.right, t.right)),
          (t.bottom = Math.min(r.bottom, t.bottom)),
          (t.left = Math.max(r.left, t.left)),
          t
        )
      }, Zt(e, i))
    return (
      (s.width = s.right - s.left),
      (s.height = s.bottom - s.top),
      (s.x = s.left),
      (s.y = s.top),
      s
    )
  }
  function zt(e) {
    return e.split('-')[1]
  }
  function Ht(e) {
    var t,
      n = e.reference,
      r = e.element,
      o = e.placement,
      i = o ? ht(o) : null,
      s = o ? zt(o) : null,
      a = n.x + n.width / 2 - r.width / 2,
      c = n.y + n.height / 2 - r.height / 2
    switch (i) {
      case Je:
        t = { x: a, y: n.y - r.height }
        break
      case Qe:
        t = { x: a, y: n.y + n.height }
        break
      case $e:
        t = { x: n.x + n.width, y: c }
        break
      case et:
        t = { x: n.x - r.width, y: c }
        break
      default:
        t = { x: n.x, y: n.y }
    }
    var l = i ? Ot(i) : null
    if (null != l) {
      var u = 'y' === l ? 'height' : 'width'
      switch (s) {
        case rt:
          t[l] = t[l] - (n[u] / 2 - r[u] / 2)
          break
        case ot:
          t[l] = t[l] + (n[u] / 2 - r[u] / 2)
      }
    }
    return t
  }
  function Bt(e, t) {
    void 0 === t && (t = {})
    var n = t,
      r = n.placement,
      o = void 0 === r ? e.placement : r,
      i = n.boundary,
      s = void 0 === i ? 'clippingParents' : i,
      a = n.rootBoundary,
      c = void 0 === a ? it : a,
      l = n.elementContext,
      u = void 0 === l ? st : l,
      f = n.altBoundary,
      p = void 0 !== f && f,
      d = n.padding,
      h = void 0 === d ? 0 : d,
      m = jt('number' != typeof h ? h : kt(h, nt)),
      g = u === st ? 'reference' : st,
      v = e.elements.reference,
      y = e.rects.popper,
      b = e.elements[p ? g : u],
      x = Wt(pt(b) ? b : b.contextElement || bt(e.elements.popper), s, c),
      w = Tt(v),
      _ = Ht({ reference: w, element: y, strategy: 'absolute', placement: o }),
      O = Dt(Object.assign(Object.assign({}, y), _)),
      E = u === st ? O : w,
      j = {
        top: x.top - E.top + m.top,
        bottom: E.bottom - x.bottom + m.bottom,
        left: x.left - E.left + m.left,
        right: E.right - x.right + m.right,
      },
      k = e.modifiersData.offset
    if (u === st && k) {
      var N = k[o]
      Object.keys(j).forEach(function (e) {
        var t = [$e, Qe].indexOf(e) >= 0 ? 1 : -1,
          n = [Je, Qe].indexOf(e) >= 0 ? 'y' : 'x'
        j[e] += N[n] * t
      })
    }
    return j
  }
  function Kt(e, t) {
    void 0 === t && (t = {})
    var n = t,
      r = n.placement,
      o = n.boundary,
      i = n.rootBoundary,
      s = n.padding,
      a = n.flipVariations,
      c = n.allowedAutoPlacements,
      l = void 0 === c ? ct : c,
      u = zt(r),
      f = u
        ? a
          ? at
          : at.filter(function (e) {
              return zt(e) === u
            })
        : nt,
      p = f.filter(function (e) {
        return l.indexOf(e) >= 0
      })
    0 === p.length && (p = f)
    var d = p.reduce(function (t, n) {
      return (
        (t[n] = Bt(e, {
          placement: n,
          boundary: o,
          rootBoundary: i,
          padding: s,
        })[ht(n)]),
        t
      )
    }, {})
    return Object.keys(d).sort(function (e, t) {
      return d[e] - d[t]
    })
  }
  function Xt(e, t, n) {
    return (
      void 0 === n && (n = { x: 0, y: 0 }),
      {
        top: e.top - t.height - n.y,
        right: e.right - t.width + n.x,
        bottom: e.bottom - t.height + n.y,
        left: e.left - t.width - n.x,
      }
    )
  }
  function Yt(e) {
    return [Je, $e, Qe, et].some(function (t) {
      return e[t] >= 0
    })
  }
  function Ut(e, t, n) {
    void 0 === n && (n = !1)
    var r,
      o,
      i = bt(t),
      s = Tt(e),
      a = dt(t),
      c = { scrollLeft: 0, scrollTop: 0 },
      l = { x: 0, y: 0 }
    return (
      (a || (!a && !n)) &&
        (('body' !== ut(t) || It(i)) &&
          (c =
            (r = t) !== ft(r) && dt(r)
              ? { scrollLeft: (o = r).scrollLeft, scrollTop: o.scrollTop }
              : Ct(r)),
        dt(t)
          ? (((l = Tt(t)).x += t.clientLeft), (l.y += t.clientTop))
          : i && (l.x = Lt(i))),
      {
        x: s.left + c.scrollLeft - l.x,
        y: s.top + c.scrollTop - l.y,
        width: s.width,
        height: s.height,
      }
    )
  }
  function Gt(e) {
    var t = new Map(),
      n = new Set(),
      r = []
    function o(e) {
      n.add(e.name),
        []
          .concat(e.requires || [], e.requiresIfExists || [])
          .forEach(function (e) {
            if (!n.has(e)) {
              var r = t.get(e)
              r && o(r)
            }
          }),
        r.push(e)
    }
    return (
      e.forEach(function (e) {
        t.set(e.name, e)
      }),
      e.forEach(function (e) {
        n.has(e.name) || o(e)
      }),
      r
    )
  }
  var Jt = { placement: 'bottom', modifiers: [], strategy: 'absolute' }
  function Qt() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n]
    return !t.some(function (e) {
      return !(e && 'function' == typeof e.getBoundingClientRect)
    })
  }
  function $t(e) {
    void 0 === e && (e = {})
    var t = e,
      n = t.defaultModifiers,
      r = void 0 === n ? [] : n,
      o = t.defaultOptions,
      i = void 0 === o ? Jt : o
    return function (e, t, n) {
      void 0 === n && (n = i)
      var o,
        s,
        a = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign(Object.assign({}, Jt), i),
          modifiersData: {},
          elements: { reference: e, popper: t },
          attributes: {},
          styles: {},
        },
        c = [],
        l = !1,
        u = {
          state: a,
          setOptions: function (n) {
            f(),
              (a.options = Object.assign(
                Object.assign(Object.assign({}, i), a.options),
                n
              )),
              (a.scrollParents = {
                reference: pt(e)
                  ? qt(e)
                  : e.contextElement
                  ? qt(e.contextElement)
                  : [],
                popper: qt(t),
              })
            var o,
              s,
              l = (function (e) {
                var t = Gt(e)
                return lt.reduce(function (e, n) {
                  return e.concat(
                    t.filter(function (e) {
                      return e.phase === n
                    })
                  )
                }, [])
              })(
                ((o = [].concat(r, a.options.modifiers)),
                (s = o.reduce(function (e, t) {
                  var n = e[t.name]
                  return (
                    (e[t.name] = n
                      ? Object.assign(
                          Object.assign(Object.assign({}, n), t),
                          {},
                          {
                            options: Object.assign(
                              Object.assign({}, n.options),
                              t.options
                            ),
                            data: Object.assign(
                              Object.assign({}, n.data),
                              t.data
                            ),
                          }
                        )
                      : t),
                    e
                  )
                }, {})),
                Object.keys(s).map(function (e) {
                  return s[e]
                }))
              )
            return (
              (a.orderedModifiers = l.filter(function (e) {
                return e.enabled
              })),
              a.orderedModifiers.forEach(function (e) {
                var t = e.name,
                  n = e.options,
                  r = void 0 === n ? {} : n,
                  o = e.effect
                if ('function' == typeof o) {
                  var i = o({ state: a, name: t, instance: u, options: r }),
                    s = function () {}
                  c.push(i || s)
                }
              }),
              u.update()
            )
          },
          forceUpdate: function () {
            if (!l) {
              var e = a.elements,
                t = e.reference,
                n = e.popper
              if (Qt(t, n)) {
                ;(a.rects = {
                  reference: Ut(t, _t(n), 'fixed' === a.options.strategy),
                  popper: mt(n),
                }),
                  (a.reset = !1),
                  (a.placement = a.options.placement),
                  a.orderedModifiers.forEach(function (e) {
                    return (a.modifiersData[e.name] = Object.assign({}, e.data))
                  })
                for (var r = 0; r < a.orderedModifiers.length; r++)
                  if (!0 !== a.reset) {
                    var o = a.orderedModifiers[r],
                      i = o.fn,
                      s = o.options,
                      c = void 0 === s ? {} : s,
                      f = o.name
                    'function' == typeof i &&
                      (a =
                        i({ state: a, options: c, name: f, instance: u }) || a)
                  } else (a.reset = !1), (r = -1)
              }
            }
          },
          update:
            ((o = function () {
              return new Promise(function (e) {
                u.forceUpdate(), e(a)
              })
            }),
            function () {
              return (
                s ||
                  (s = new Promise(function (e) {
                    Promise.resolve().then(function () {
                      ;(s = void 0), e(o())
                    })
                  })),
                s
              )
            }),
          destroy: function () {
            f(), (l = !0)
          },
        }
      if (!Qt(e, t)) return u
      function f() {
        c.forEach(function (e) {
          return e()
        }),
          (c = [])
      }
      return (
        u.setOptions(n).then(function (e) {
          !l && n.onFirstUpdate && n.onFirstUpdate(e)
        }),
        u
      )
    }
  }
  var en = $t({
    defaultModifiers: [
      {
        name: 'eventListeners',
        enabled: !0,
        phase: 'write',
        fn: function () {},
        effect: function (e) {
          var t = e.state,
            n = e.instance,
            r = e.options,
            o = r.scroll,
            i = void 0 === o || o,
            s = r.resize,
            a = void 0 === s || s,
            c = ft(t.elements.popper),
            l = [].concat(t.scrollParents.reference, t.scrollParents.popper)
          return (
            i &&
              l.forEach(function (e) {
                e.addEventListener('scroll', n.update, Mt)
              }),
            a && c.addEventListener('resize', n.update, Mt),
            function () {
              i &&
                l.forEach(function (e) {
                  e.removeEventListener('scroll', n.update, Mt)
                }),
                a && c.removeEventListener('resize', n.update, Mt)
            }
          )
        },
        data: {},
      },
      {
        name: 'popperOffsets',
        enabled: !0,
        phase: 'read',
        fn: function (e) {
          var t = e.state,
            n = e.name
          t.modifiersData[n] = Ht({
            reference: t.rects.reference,
            element: t.rects.popper,
            strategy: 'absolute',
            placement: t.placement,
          })
        },
        data: {},
      },
      {
        name: 'computeStyles',
        enabled: !0,
        phase: 'beforeWrite',
        fn: function (e) {
          var t = e.state,
            n = e.options,
            r = n.gpuAcceleration,
            o = void 0 === r || r,
            i = n.adaptive,
            s = void 0 === i || i,
            a = n.roundOffsets,
            c = void 0 === a || a,
            l = {
              placement: ht(t.placement),
              popper: t.elements.popper,
              popperRect: t.rects.popper,
              gpuAcceleration: o,
            }
          null != t.modifiersData.popperOffsets &&
            (t.styles.popper = Object.assign(
              Object.assign({}, t.styles.popper),
              At(
                Object.assign(
                  Object.assign({}, l),
                  {},
                  {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: s,
                    roundOffsets: c,
                  }
                )
              )
            )),
            null != t.modifiersData.arrow &&
              (t.styles.arrow = Object.assign(
                Object.assign({}, t.styles.arrow),
                At(
                  Object.assign(
                    Object.assign({}, l),
                    {},
                    {
                      offsets: t.modifiersData.arrow,
                      position: 'absolute',
                      adaptive: !1,
                      roundOffsets: c,
                    }
                  )
                )
              )),
            (t.attributes.popper = Object.assign(
              Object.assign({}, t.attributes.popper),
              {},
              { 'data-popper-placement': t.placement }
            ))
        },
        data: {},
      },
      {
        name: 'applyStyles',
        enabled: !0,
        phase: 'write',
        fn: function (e) {
          var t = e.state
          Object.keys(t.elements).forEach(function (e) {
            var n = t.styles[e] || {},
              r = t.attributes[e] || {},
              o = t.elements[e]
            dt(o) &&
              ut(o) &&
              (Object.assign(o.style, n),
              Object.keys(r).forEach(function (e) {
                var t = r[e]
                !1 === t
                  ? o.removeAttribute(e)
                  : o.setAttribute(e, !0 === t ? '' : t)
              }))
          })
        },
        effect: function (e) {
          var t = e.state,
            n = {
              popper: {
                position: t.options.strategy,
                left: '0',
                top: '0',
                margin: '0',
              },
              arrow: { position: 'absolute' },
              reference: {},
            }
          return (
            Object.assign(t.elements.popper.style, n.popper),
            t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
            function () {
              Object.keys(t.elements).forEach(function (e) {
                var r = t.elements[e],
                  o = t.attributes[e] || {},
                  i = Object.keys(
                    t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
                  ).reduce(function (e, t) {
                    return (e[t] = ''), e
                  }, {})
                dt(r) &&
                  ut(r) &&
                  (Object.assign(r.style, i),
                  Object.keys(o).forEach(function (e) {
                    r.removeAttribute(e)
                  }))
              })
            }
          )
        },
        requires: ['computeStyles'],
      },
      {
        name: 'offset',
        enabled: !0,
        phase: 'main',
        requires: ['popperOffsets'],
        fn: function (e) {
          var t = e.state,
            n = e.options,
            r = e.name,
            o = n.offset,
            i = void 0 === o ? [0, 0] : o,
            s = ct.reduce(function (e, n) {
              return (
                (e[n] = (function (e, t, n) {
                  var r = ht(e),
                    o = [et, Je].indexOf(r) >= 0 ? -1 : 1,
                    i =
                      'function' == typeof n
                        ? n(
                            Object.assign(
                              Object.assign({}, t),
                              {},
                              { placement: e }
                            )
                          )
                        : n,
                    s = i[0],
                    a = i[1]
                  return (
                    (s = s || 0),
                    (a = (a || 0) * o),
                    [et, $e].indexOf(r) >= 0 ? { x: a, y: s } : { x: s, y: a }
                  )
                })(n, t.rects, i)),
                e
              )
            }, {}),
            a = s[t.placement],
            c = a.x,
            l = a.y
          null != t.modifiersData.popperOffsets &&
            ((t.modifiersData.popperOffsets.x += c),
            (t.modifiersData.popperOffsets.y += l)),
            (t.modifiersData[r] = s)
        },
      },
      {
        name: 'flip',
        enabled: !0,
        phase: 'main',
        fn: function (e) {
          var t = e.state,
            n = e.options,
            r = e.name
          if (!t.modifiersData[r]._skip) {
            for (
              var o = n.mainAxis,
                i = void 0 === o || o,
                s = n.altAxis,
                a = void 0 === s || s,
                c = n.fallbackPlacements,
                l = n.padding,
                u = n.boundary,
                f = n.rootBoundary,
                p = n.altBoundary,
                d = n.flipVariations,
                h = void 0 === d || d,
                m = n.allowedAutoPlacements,
                g = t.options.placement,
                v = ht(g),
                y =
                  c ||
                  (v === g || !h
                    ? [Vt(g)]
                    : (function (e) {
                        if (ht(e) === tt) return []
                        var t = Vt(e)
                        return [Rt(e), t, Rt(t)]
                      })(g)),
                b = [g].concat(y).reduce(function (e, n) {
                  return e.concat(
                    ht(n) === tt
                      ? Kt(t, {
                          placement: n,
                          boundary: u,
                          rootBoundary: f,
                          padding: l,
                          flipVariations: h,
                          allowedAutoPlacements: m,
                        })
                      : n
                  )
                }, []),
                x = t.rects.reference,
                w = t.rects.popper,
                _ = new Map(),
                O = !0,
                E = b[0],
                j = 0;
              j < b.length;
              j++
            ) {
              var k = b[j],
                N = ht(k),
                A = zt(k) === rt,
                M = [Je, Qe].indexOf(N) >= 0,
                S = M ? 'width' : 'height',
                V = Bt(t, {
                  placement: k,
                  boundary: u,
                  rootBoundary: f,
                  altBoundary: p,
                  padding: l,
                }),
                P = M ? (A ? $e : et) : A ? Qe : Je
              x[S] > w[S] && (P = Vt(P))
              var R = Vt(P),
                T = []
              if (
                (i && T.push(V[N] <= 0),
                a && T.push(V[P] <= 0, V[R] <= 0),
                T.every(function (e) {
                  return e
                }))
              ) {
                ;(E = k), (O = !1)
                break
              }
              _.set(k, T)
            }
            if (O)
              for (
                var C = function (e) {
                    var t = b.find(function (t) {
                      var n = _.get(t)
                      if (n)
                        return n.slice(0, e).every(function (e) {
                          return e
                        })
                    })
                    if (t) return (E = t), 'break'
                  },
                  L = h ? 3 : 1;
                L > 0;
                L--
              ) {
                if ('break' === C(L)) break
              }
            t.placement !== E &&
              ((t.modifiersData[r]._skip = !0),
              (t.placement = E),
              (t.reset = !0))
          }
        },
        requiresIfExists: ['offset'],
        data: { _skip: !1 },
      },
      {
        name: 'preventOverflow',
        enabled: !0,
        phase: 'main',
        fn: function (e) {
          var t = e.state,
            n = e.options,
            r = e.name,
            o = n.mainAxis,
            i = void 0 === o || o,
            s = n.altAxis,
            a = void 0 !== s && s,
            c = n.boundary,
            l = n.rootBoundary,
            u = n.altBoundary,
            f = n.padding,
            p = n.tether,
            d = void 0 === p || p,
            h = n.tetherOffset,
            m = void 0 === h ? 0 : h,
            g = Bt(t, {
              boundary: c,
              rootBoundary: l,
              padding: f,
              altBoundary: u,
            }),
            v = ht(t.placement),
            y = zt(t.placement),
            b = !y,
            x = Ot(v),
            w = 'x' === x ? 'y' : 'x',
            _ = t.modifiersData.popperOffsets,
            O = t.rects.reference,
            E = t.rects.popper,
            j =
              'function' == typeof m
                ? m(
                    Object.assign(
                      Object.assign({}, t.rects),
                      {},
                      { placement: t.placement }
                    )
                  )
                : m,
            k = { x: 0, y: 0 }
          if (_) {
            if (i) {
              var N = 'y' === x ? Je : et,
                A = 'y' === x ? Qe : $e,
                M = 'y' === x ? 'height' : 'width',
                S = _[x],
                V = _[x] + g[N],
                P = _[x] - g[A],
                R = d ? -E[M] / 2 : 0,
                T = y === rt ? O[M] : E[M],
                C = y === rt ? -E[M] : -O[M],
                L = t.elements.arrow,
                I = d && L ? mt(L) : { width: 0, height: 0 },
                F = t.modifiersData['arrow#persistent']
                  ? t.modifiersData['arrow#persistent'].padding
                  : { top: 0, right: 0, bottom: 0, left: 0 },
                q = F[N],
                D = F[A],
                Z = Et(0, O[M], I[M]),
                W = b ? O[M] / 2 - R - Z - q - j : T - Z - q - j,
                z = b ? -O[M] / 2 + R + Z + D + j : C + Z + D + j,
                H = t.elements.arrow && _t(t.elements.arrow),
                B = H ? ('y' === x ? H.clientTop || 0 : H.clientLeft || 0) : 0,
                K = t.modifiersData.offset
                  ? t.modifiersData.offset[t.placement][x]
                  : 0,
                X = _[x] + W - K - B,
                Y = _[x] + z - K,
                U = Et(d ? Math.min(V, X) : V, S, d ? Math.max(P, Y) : P)
              ;(_[x] = U), (k[x] = U - S)
            }
            if (a) {
              var G = 'x' === x ? Je : et,
                J = 'x' === x ? Qe : $e,
                Q = _[w],
                $ = Et(Q + g[G], Q, Q - g[J])
              ;(_[w] = $), (k[w] = $ - Q)
            }
            t.modifiersData[r] = k
          }
        },
        requiresIfExists: ['offset'],
      },
      {
        name: 'arrow',
        enabled: !0,
        phase: 'main',
        fn: function (e) {
          var t,
            n = e.state,
            r = e.name,
            o = n.elements.arrow,
            i = n.modifiersData.popperOffsets,
            s = ht(n.placement),
            a = Ot(s),
            c = [et, $e].indexOf(s) >= 0 ? 'height' : 'width'
          if (o && i) {
            var l = n.modifiersData[r + '#persistent'].padding,
              u = mt(o),
              f = 'y' === a ? Je : et,
              p = 'y' === a ? Qe : $e,
              d =
                n.rects.reference[c] +
                n.rects.reference[a] -
                i[a] -
                n.rects.popper[c],
              h = i[a] - n.rects.reference[a],
              m = _t(o),
              g = m
                ? 'y' === a
                  ? m.clientHeight || 0
                  : m.clientWidth || 0
                : 0,
              v = d / 2 - h / 2,
              y = l[f],
              b = g - u[c] - l[p],
              x = g / 2 - u[c] / 2 + v,
              w = Et(y, x, b),
              _ = a
            n.modifiersData[r] =
              (((t = {})[_] = w), (t.centerOffset = w - x), t)
          }
        },
        effect: function (e) {
          var t = e.state,
            n = e.options,
            r = e.name,
            o = n.element,
            i = void 0 === o ? '[data-popper-arrow]' : o,
            s = n.padding,
            a = void 0 === s ? 0 : s
          null != i &&
            ('string' != typeof i ||
              (i = t.elements.popper.querySelector(i))) &&
            gt(t.elements.popper, i) &&
            ((t.elements.arrow = i),
            (t.modifiersData[r + '#persistent'] = {
              padding: jt('number' != typeof a ? a : kt(a, nt)),
            }))
        },
        requires: ['popperOffsets'],
        requiresIfExists: ['preventOverflow'],
      },
      {
        name: 'hide',
        enabled: !0,
        phase: 'main',
        requiresIfExists: ['preventOverflow'],
        fn: function (e) {
          var t = e.state,
            n = e.name,
            r = t.rects.reference,
            o = t.rects.popper,
            i = t.modifiersData.preventOverflow,
            s = Bt(t, { elementContext: 'reference' }),
            a = Bt(t, { altBoundary: !0 }),
            c = Xt(s, r),
            l = Xt(a, o, i),
            u = Yt(c),
            f = Yt(l)
          ;(t.modifiersData[n] = {
            referenceClippingOffsets: c,
            popperEscapeOffsets: l,
            isReferenceHidden: u,
            hasPopperEscaped: f,
          }),
            (t.attributes.popper = Object.assign(
              Object.assign({}, t.attributes.popper),
              {},
              { 'data-popper-reference-hidden': u, 'data-popper-escaped': f }
            ))
        },
      },
    ],
  })
  const tn = new WeakMap(),
    nn = e => 'function' == typeof e && tn.has(e),
    rn =
      'undefined' != typeof window &&
      null != window.customElements &&
      void 0 !== window.customElements.polyfillWrapFlushCallback,
    on = (e, t, n = null) => {
      for (; t !== n; ) {
        const n = t.nextSibling
        e.removeChild(t), (t = n)
      }
    },
    sn = {},
    an = {},
    cn = `{{lit-${String(Math.random()).slice(2)}}}`,
    ln = `\x3c!--${cn}--\x3e`,
    un = new RegExp(`${cn}|${ln}`),
    fn = '$lit$'
  class pn {
    constructor(e, t) {
      ;(this.parts = []), (this.element = t)
      const n = [],
        r = [],
        o = document.createTreeWalker(t.content, 133, null, !1)
      let i = 0,
        s = -1,
        a = 0
      const {
        strings: c,
        values: { length: l },
      } = e
      for (; a < l; ) {
        const e = o.nextNode()
        if (null !== e) {
          if ((s++, 1 === e.nodeType)) {
            if (e.hasAttributes()) {
              const t = e.attributes,
                { length: n } = t
              let r = 0
              for (let e = 0; e < n; e++) dn(t[e].name, fn) && r++
              for (; r-- > 0; ) {
                const t = c[a],
                  n = gn.exec(t)[2],
                  r = n.toLowerCase() + fn,
                  o = e.getAttribute(r)
                e.removeAttribute(r)
                const i = o.split(un)
                this.parts.push({
                  type: 'attribute',
                  index: s,
                  name: n,
                  strings: i,
                }),
                  (a += i.length - 1)
              }
            }
            'TEMPLATE' === e.tagName && (r.push(e), (o.currentNode = e.content))
          } else if (3 === e.nodeType) {
            const t = e.data
            if (t.indexOf(cn) >= 0) {
              const r = e.parentNode,
                o = t.split(un),
                i = o.length - 1
              for (let t = 0; t < i; t++) {
                let n,
                  i = o[t]
                if ('' === i) n = mn()
                else {
                  const e = gn.exec(i)
                  null !== e &&
                    dn(e[2], fn) &&
                    (i =
                      i.slice(0, e.index) +
                      e[1] +
                      e[2].slice(0, -fn.length) +
                      e[3]),
                    (n = document.createTextNode(i))
                }
                r.insertBefore(n, e),
                  this.parts.push({ type: 'node', index: ++s })
              }
              '' === o[i]
                ? (r.insertBefore(mn(), e), n.push(e))
                : (e.data = o[i]),
                (a += i)
            }
          } else if (8 === e.nodeType)
            if (e.data === cn) {
              const t = e.parentNode
              ;(null !== e.previousSibling && s !== i) ||
                (s++, t.insertBefore(mn(), e)),
                (i = s),
                this.parts.push({ type: 'node', index: s }),
                null === e.nextSibling ? (e.data = '') : (n.push(e), s--),
                a++
            } else {
              let t = -1
              for (; -1 !== (t = e.data.indexOf(cn, t + 1)); )
                this.parts.push({ type: 'node', index: -1 }), a++
            }
        } else o.currentNode = r.pop()
      }
      for (const e of n) e.parentNode.removeChild(e)
    }
  }
  const dn = (e, t) => {
      const n = e.length - t.length
      return n >= 0 && e.slice(n) === t
    },
    hn = e => -1 !== e.index,
    mn = () => document.createComment(''),
    gn = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/
  class vn {
    constructor(e, t, n) {
      ;(this.__parts = []),
        (this.template = e),
        (this.processor = t),
        (this.options = n)
    }
    update(e) {
      let t = 0
      for (const n of this.__parts) void 0 !== n && n.setValue(e[t]), t++
      for (const e of this.__parts) void 0 !== e && e.commit()
    }
    _clone() {
      const e = rn
          ? this.template.element.content.cloneNode(!0)
          : document.importNode(this.template.element.content, !0),
        t = [],
        n = this.template.parts,
        r = document.createTreeWalker(e, 133, null, !1)
      let o,
        i = 0,
        s = 0,
        a = r.nextNode()
      for (; i < n.length; )
        if (((o = n[i]), hn(o))) {
          for (; s < o.index; )
            s++,
              'TEMPLATE' === a.nodeName &&
                (t.push(a), (r.currentNode = a.content)),
              null === (a = r.nextNode()) &&
                ((r.currentNode = t.pop()), (a = r.nextNode()))
          if ('node' === o.type) {
            const e = this.processor.handleTextExpression(this.options)
            e.insertAfterNode(a.previousSibling), this.__parts.push(e)
          } else
            this.__parts.push(
              ...this.processor.handleAttributeExpressions(
                a,
                o.name,
                o.strings,
                this.options
              )
            )
          i++
        } else this.__parts.push(void 0), i++
      return rn && (document.adoptNode(e), customElements.upgrade(e)), e
    }
  }
  const yn =
      window.trustedTypes &&
      trustedTypes.createPolicy('lit-html', { createHTML: e => e }),
    bn = ` ${cn} `
  class xn {
    constructor(e, t, n, r) {
      ;(this.strings = e),
        (this.values = t),
        (this.type = n),
        (this.processor = r)
    }
    getHTML() {
      const e = this.strings.length - 1
      let t = '',
        n = !1
      for (let r = 0; r < e; r++) {
        const e = this.strings[r],
          o = e.lastIndexOf('\x3c!--')
        n = (o > -1 || n) && -1 === e.indexOf('--\x3e', o + 1)
        const i = gn.exec(e)
        t +=
          null === i
            ? e + (n ? bn : ln)
            : e.substr(0, i.index) + i[1] + i[2] + fn + i[3] + cn
      }
      return (t += this.strings[e]), t
    }
    getTemplateElement() {
      const e = document.createElement('template')
      let t = this.getHTML()
      return void 0 !== yn && (t = yn.createHTML(t)), (e.innerHTML = t), e
    }
  }
  const wn = e =>
      null === e || !('object' == typeof e || 'function' == typeof e),
    _n = e => Array.isArray(e) || !(!e || !e[Symbol.iterator])
  class On {
    constructor(e, t, n) {
      ;(this.dirty = !0),
        (this.element = e),
        (this.name = t),
        (this.strings = n),
        (this.parts = [])
      for (let e = 0; e < n.length - 1; e++) this.parts[e] = this._createPart()
    }
    _createPart() {
      return new En(this)
    }
    _getValue() {
      const e = this.strings,
        t = e.length - 1,
        n = this.parts
      if (1 === t && '' === e[0] && '' === e[1]) {
        const e = n[0].value
        if ('symbol' == typeof e) return String(e)
        if ('string' == typeof e || !_n(e)) return e
      }
      let r = ''
      for (let o = 0; o < t; o++) {
        r += e[o]
        const t = n[o]
        if (void 0 !== t) {
          const e = t.value
          if (wn(e) || !_n(e)) r += 'string' == typeof e ? e : String(e)
          else for (const t of e) r += 'string' == typeof t ? t : String(t)
        }
      }
      return (r += e[t]), r
    }
    commit() {
      this.dirty &&
        ((this.dirty = !1),
        this.element.setAttribute(this.name, this._getValue()))
    }
  }
  class En {
    constructor(e) {
      ;(this.value = void 0), (this.committer = e)
    }
    setValue(e) {
      e === sn ||
        (wn(e) && e === this.value) ||
        ((this.value = e), nn(e) || (this.committer.dirty = !0))
    }
    commit() {
      for (; nn(this.value); ) {
        const e = this.value
        ;(this.value = sn), e(this)
      }
      this.value !== sn && this.committer.commit()
    }
  }
  class jn {
    constructor(e) {
      ;(this.value = void 0), (this.__pendingValue = void 0), (this.options = e)
    }
    appendInto(e) {
      ;(this.startNode = e.appendChild(mn())),
        (this.endNode = e.appendChild(mn()))
    }
    insertAfterNode(e) {
      ;(this.startNode = e), (this.endNode = e.nextSibling)
    }
    appendIntoPart(e) {
      e.__insert((this.startNode = mn())), e.__insert((this.endNode = mn()))
    }
    insertAfterPart(e) {
      e.__insert((this.startNode = mn())),
        (this.endNode = e.endNode),
        (e.endNode = this.startNode)
    }
    setValue(e) {
      this.__pendingValue = e
    }
    commit() {
      if (null === this.startNode.parentNode) return
      for (; nn(this.__pendingValue); ) {
        const e = this.__pendingValue
        ;(this.__pendingValue = sn), e(this)
      }
      const e = this.__pendingValue
      e !== sn &&
        (wn(e)
          ? e !== this.value && this.__commitText(e)
          : e instanceof xn
          ? this.__commitTemplateResult(e)
          : e instanceof Node
          ? this.__commitNode(e)
          : _n(e)
          ? this.__commitIterable(e)
          : e === an
          ? ((this.value = an), this.clear())
          : this.__commitText(e))
    }
    __insert(e) {
      this.endNode.parentNode.insertBefore(e, this.endNode)
    }
    __commitNode(e) {
      this.value !== e && (this.clear(), this.__insert(e), (this.value = e))
    }
    __commitText(e) {
      const t = this.startNode.nextSibling,
        n = 'string' == typeof (e = null == e ? '' : e) ? e : String(e)
      t === this.endNode.previousSibling && 3 === t.nodeType
        ? (t.data = n)
        : this.__commitNode(document.createTextNode(n)),
        (this.value = e)
    }
    __commitTemplateResult(e) {
      const t = this.options.templateFactory(e)
      if (this.value instanceof vn && this.value.template === t)
        this.value.update(e.values)
      else {
        const n = new vn(t, e.processor, this.options),
          r = n._clone()
        n.update(e.values), this.__commitNode(r), (this.value = n)
      }
    }
    __commitIterable(e) {
      Array.isArray(this.value) || ((this.value = []), this.clear())
      const t = this.value
      let n,
        r = 0
      for (const o of e)
        (n = t[r]),
          void 0 === n &&
            ((n = new jn(this.options)),
            t.push(n),
            0 === r ? n.appendIntoPart(this) : n.insertAfterPart(t[r - 1])),
          n.setValue(o),
          n.commit(),
          r++
      r < t.length && ((t.length = r), this.clear(n && n.endNode))
    }
    clear(e = this.startNode) {
      on(this.startNode.parentNode, e.nextSibling, this.endNode)
    }
  }
  class kn {
    constructor(e, t, n) {
      if (
        ((this.value = void 0),
        (this.__pendingValue = void 0),
        2 !== n.length || '' !== n[0] || '' !== n[1])
      )
        throw new Error(
          'Boolean attributes can only contain a single expression'
        )
      ;(this.element = e), (this.name = t), (this.strings = n)
    }
    setValue(e) {
      this.__pendingValue = e
    }
    commit() {
      for (; nn(this.__pendingValue); ) {
        const e = this.__pendingValue
        ;(this.__pendingValue = sn), e(this)
      }
      if (this.__pendingValue === sn) return
      const e = !!this.__pendingValue
      this.value !== e &&
        (e
          ? this.element.setAttribute(this.name, '')
          : this.element.removeAttribute(this.name),
        (this.value = e)),
        (this.__pendingValue = sn)
    }
  }
  class Nn extends On {
    constructor(e, t, n) {
      super(e, t, n),
        (this.single = 2 === n.length && '' === n[0] && '' === n[1])
    }
    _createPart() {
      return new An(this)
    }
    _getValue() {
      return this.single ? this.parts[0].value : super._getValue()
    }
    commit() {
      this.dirty &&
        ((this.dirty = !1), (this.element[this.name] = this._getValue()))
    }
  }
  class An extends En {}
  let Mn = !1
  ;(() => {
    try {
      const e = {
        get capture() {
          return (Mn = !0), !1
        },
      }
      window.addEventListener('test', e, e),
        window.removeEventListener('test', e, e)
    } catch (e) {}
  })()
  class Sn {
    constructor(e, t, n) {
      ;(this.value = void 0),
        (this.__pendingValue = void 0),
        (this.element = e),
        (this.eventName = t),
        (this.eventContext = n),
        (this.__boundHandleEvent = e => this.handleEvent(e))
    }
    setValue(e) {
      this.__pendingValue = e
    }
    commit() {
      for (; nn(this.__pendingValue); ) {
        const e = this.__pendingValue
        ;(this.__pendingValue = sn), e(this)
      }
      if (this.__pendingValue === sn) return
      const e = this.__pendingValue,
        t = this.value,
        n =
          null == e ||
          (null != t &&
            (e.capture !== t.capture ||
              e.once !== t.once ||
              e.passive !== t.passive)),
        r = null != e && (null == t || n)
      n &&
        this.element.removeEventListener(
          this.eventName,
          this.__boundHandleEvent,
          this.__options
        ),
        r &&
          ((this.__options = Vn(e)),
          this.element.addEventListener(
            this.eventName,
            this.__boundHandleEvent,
            this.__options
          )),
        (this.value = e),
        (this.__pendingValue = sn)
    }
    handleEvent(e) {
      'function' == typeof this.value
        ? this.value.call(this.eventContext || this.element, e)
        : this.value.handleEvent(e)
    }
  }
  const Vn = e =>
    e &&
    (Mn ? { capture: e.capture, passive: e.passive, once: e.once } : e.capture)
  const Pn = new (class {
    handleAttributeExpressions(e, t, n, r) {
      const o = t[0]
      if ('.' === o) {
        return new Nn(e, t.slice(1), n).parts
      }
      if ('@' === o) return [new Sn(e, t.slice(1), r.eventContext)]
      if ('?' === o) return [new kn(e, t.slice(1), n)]
      return new On(e, t, n).parts
    }
    handleTextExpression(e) {
      return new jn(e)
    }
  })()
  function Rn(e) {
    let t = Tn.get(e.type)
    void 0 === t &&
      ((t = { stringsArray: new WeakMap(), keyString: new Map() }),
      Tn.set(e.type, t))
    let n = t.stringsArray.get(e.strings)
    if (void 0 !== n) return n
    const r = e.strings.join(cn)
    return (
      (n = t.keyString.get(r)),
      void 0 === n &&
        ((n = new pn(e, e.getTemplateElement())), t.keyString.set(r, n)),
      t.stringsArray.set(e.strings, n),
      n
    )
  }
  const Tn = new Map(),
    Cn = new WeakMap()
  'undefined' != typeof window &&
    (window.litHtmlVersions || (window.litHtmlVersions = [])).push('1.3.0')
  const Ln = (e, ...t) => new xn(e, t, 'html', Pn),
    In = {},
    Fn = Object.assign,
    qn = Object.prototype.hasOwnProperty,
    Dn = (e, t) => qn.call(e, t),
    Zn = Array.isArray,
    Wn = e => '[object Map]' === Kn(e),
    zn = e => 'symbol' == typeof e,
    Hn = e => null !== e && 'object' == typeof e,
    Bn = Object.prototype.toString,
    Kn = e => Bn.call(e),
    Xn = e =>
      'string' == typeof e &&
      'NaN' !== e &&
      '-' !== e[0] &&
      '' + parseInt(e, 10) === e,
    Yn = (e, t) => e !== t && (e == e || t == t),
    Un = new WeakMap(),
    Gn = []
  let Jn
  const Qn = Symbol(''),
    $n = Symbol('')
  function er(e, t = In) {
    ;(function (e) {
      return e && !0 === e._isEffect
    })(e) && (e = e.raw)
    const n = (function (e, t) {
      const n = function () {
        if (!n.active) return t.scheduler ? void 0 : e()
        if (!Gn.includes(n)) {
          !(function (e) {
            const { deps: t } = e
            if (t.length) {
              for (let n = 0; n < t.length; n++) t[n].delete(e)
              t.length = 0
            }
          })(n)
          try {
            return rr.push(nr), (nr = !0), Gn.push(n), (Jn = n), e()
          } finally {
            Gn.pop(), or(), (Jn = Gn[Gn.length - 1])
          }
        }
      }
      return (
        (n.id = tr++),
        (n.allowRecurse = !!t.allowRecurse),
        (n._isEffect = !0),
        (n.active = !0),
        (n.raw = e),
        (n.deps = []),
        (n.options = t),
        n
      )
    })(e, t)
    return t.lazy || n(), n
  }
  let tr = 0
  let nr = !0
  const rr = []
  function or() {
    const e = rr.pop()
    nr = void 0 === e || e
  }
  function ir(e, t, n) {
    if (!nr || void 0 === Jn) return
    let r = Un.get(e)
    r || Un.set(e, (r = new Map()))
    let o = r.get(n)
    o || r.set(n, (o = new Set())), o.has(Jn) || (o.add(Jn), Jn.deps.push(o))
  }
  function sr(e, t, n, r, o, i) {
    const s = Un.get(e)
    if (!s) return
    const a = new Set(),
      c = e => {
        e &&
          e.forEach(e => {
            ;(e !== Jn || e.allowRecurse) && a.add(e)
          })
      }
    if ('clear' === t) s.forEach(c)
    else if ('length' === n && Zn(e))
      s.forEach((e, t) => {
        ;('length' === t || t >= r) && c(e)
      })
    else
      switch ((void 0 !== n && c(s.get(n)), t)) {
        case 'add':
          Zn(e)
            ? Xn(n) && c(s.get('length'))
            : (c(s.get(Qn)), Wn(e) && c(s.get($n)))
          break
        case 'delete':
          Zn(e) || (c(s.get(Qn)), Wn(e) && c(s.get($n)))
          break
        case 'set':
          Wn(e) && c(s.get(Qn))
      }
    a.forEach(e => {
      e.options.scheduler ? e.options.scheduler(e) : e()
    })
  }
  const ar = new Set(
      Object.getOwnPropertyNames(Symbol)
        .map(e => Symbol[e])
        .filter(zn)
    ),
    cr = dr(),
    lr = dr(!1, !0),
    ur = dr(!0),
    fr = dr(!0, !0),
    pr = {}
  function dr(e = !1, t = !1) {
    return function (n, r, o) {
      if ('__v_isReactive' === r) return !e
      if ('__v_isReadonly' === r) return e
      if ('__v_raw' === r && o === (e ? Dr : qr).get(n)) return n
      const i = Zn(n)
      if (!e && i && Dn(pr, r)) return Reflect.get(pr, r, o)
      const s = Reflect.get(n, r, o)
      if (zn(r) ? ar.has(r) : '__proto__' === r || '__v_isRef' === r) return s
      if ((e || ir(n, 0, r), t)) return s
      if (Kr(s)) {
        return !i || !Xn(r) ? s.value : s
      }
      return Hn(s) ? (e ? zr(s) : Wr(s)) : s
    }
  }
  ;['includes', 'indexOf', 'lastIndexOf'].forEach(e => {
    const t = Array.prototype[e]
    pr[e] = function (...e) {
      const n = Br(this)
      for (let e = 0, t = this.length; e < t; e++) ir(n, 0, e + '')
      const r = t.apply(n, e)
      return -1 === r || !1 === r ? t.apply(n, e.map(Br)) : r
    }
  }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(e => {
      const t = Array.prototype[e]
      pr[e] = function (...e) {
        rr.push(nr), (nr = !1)
        const n = t.apply(this, e)
        return or(), n
      }
    })
  function hr(e = !1) {
    return function (t, n, r, o) {
      const i = t[n]
      if (!e && ((r = Br(r)), !Zn(t) && Kr(i) && !Kr(r)))
        return (i.value = r), !0
      const s = Zn(t) && Xn(n) ? Number(n) < t.length : Dn(t, n),
        a = Reflect.set(t, n, r, o)
      return (
        t === Br(o) &&
          (s ? Yn(r, i) && sr(t, 'set', n, r) : sr(t, 'add', n, r)),
        a
      )
    }
  }
  const mr = {
      get: cr,
      set: hr(),
      deleteProperty: function (e, t) {
        const n = Dn(e, t),
          r = (e[t], Reflect.deleteProperty(e, t))
        return r && n && sr(e, 'delete', t, void 0), r
      },
      has: function (e, t) {
        const n = Reflect.has(e, t)
        return (zn(t) && ar.has(t)) || ir(e, 0, t), n
      },
      ownKeys: function (e) {
        return ir(e, 0, Zn(e) ? 'length' : Qn), Reflect.ownKeys(e)
      },
    },
    gr = { get: ur, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
    vr = Fn({}, mr, { get: lr, set: hr(!0) }),
    yr = (Fn({}, gr, { get: fr }), e => (Hn(e) ? Wr(e) : e)),
    br = e => (Hn(e) ? zr(e) : e),
    xr = e => e,
    wr = e => Reflect.getPrototypeOf(e)
  function _r(e, t, n = !1, r = !1) {
    const o = Br((e = e.__v_raw)),
      i = Br(t)
    t !== i && !n && ir(o, 0, t), !n && ir(o, 0, i)
    const { has: s } = wr(o),
      a = n ? br : r ? xr : yr
    return s.call(o, t) ? a(e.get(t)) : s.call(o, i) ? a(e.get(i)) : void 0
  }
  function Or(e, t = !1) {
    const n = this.__v_raw,
      r = Br(n),
      o = Br(e)
    return (
      e !== o && !t && ir(r, 0, e),
      !t && ir(r, 0, o),
      e === o ? n.has(e) : n.has(e) || n.has(o)
    )
  }
  function Er(e, t = !1) {
    return (e = e.__v_raw), !t && ir(Br(e), 0, Qn), Reflect.get(e, 'size', e)
  }
  function jr(e) {
    e = Br(e)
    const t = Br(this),
      n = wr(t).has.call(t, e)
    return t.add(e), n || sr(t, 'add', e, e), this
  }
  function kr(e, t) {
    t = Br(t)
    const n = Br(this),
      { has: r, get: o } = wr(n)
    let i = r.call(n, e)
    i || ((e = Br(e)), (i = r.call(n, e)))
    const s = o.call(n, e)
    return (
      n.set(e, t), i ? Yn(t, s) && sr(n, 'set', e, t) : sr(n, 'add', e, t), this
    )
  }
  function Nr(e) {
    const t = Br(this),
      { has: n, get: r } = wr(t)
    let o = n.call(t, e)
    o || ((e = Br(e)), (o = n.call(t, e)))
    r && r.call(t, e)
    const i = t.delete(e)
    return o && sr(t, 'delete', e, void 0), i
  }
  function Ar() {
    const e = Br(this),
      t = 0 !== e.size,
      n = e.clear()
    return t && sr(e, 'clear', void 0, void 0), n
  }
  function Mr(e, t) {
    return function (n, r) {
      const o = this,
        i = o.__v_raw,
        s = Br(i),
        a = e ? br : t ? xr : yr
      return !e && ir(s, 0, Qn), i.forEach((e, t) => n.call(r, a(e), a(t), o))
    }
  }
  function Sr(e, t, n) {
    return function (...r) {
      const o = this.__v_raw,
        i = Br(o),
        s = Wn(i),
        a = 'entries' === e || (e === Symbol.iterator && s),
        c = 'keys' === e && s,
        l = o[e](...r),
        u = t ? br : n ? xr : yr
      return (
        !t && ir(i, 0, c ? $n : Qn),
        {
          next() {
            const { value: e, done: t } = l.next()
            return t
              ? { value: e, done: t }
              : { value: a ? [u(e[0]), u(e[1])] : u(e), done: t }
          },
          [Symbol.iterator]() {
            return this
          },
        }
      )
    }
  }
  function Vr(e) {
    return function (...t) {
      return 'delete' !== e && this
    }
  }
  const Pr = {
      get(e) {
        return _r(this, e)
      },
      get size() {
        return Er(this)
      },
      has: Or,
      add: jr,
      set: kr,
      delete: Nr,
      clear: Ar,
      forEach: Mr(!1, !1),
    },
    Rr = {
      get(e) {
        return _r(this, e, !1, !0)
      },
      get size() {
        return Er(this)
      },
      has: Or,
      add: jr,
      set: kr,
      delete: Nr,
      clear: Ar,
      forEach: Mr(!1, !0),
    },
    Tr = {
      get(e) {
        return _r(this, e, !0)
      },
      get size() {
        return Er(this, !0)
      },
      has(e) {
        return Or.call(this, e, !0)
      },
      add: Vr('add'),
      set: Vr('set'),
      delete: Vr('delete'),
      clear: Vr('clear'),
      forEach: Mr(!0, !1),
    }
  function Cr(e, t) {
    const n = t ? Rr : e ? Tr : Pr
    return (t, r, o) =>
      '__v_isReactive' === r
        ? !e
        : '__v_isReadonly' === r
        ? e
        : '__v_raw' === r
        ? t
        : Reflect.get(Dn(n, r) && r in t ? n : t, r, o)
  }
  ;['keys', 'values', 'entries', Symbol.iterator].forEach(e => {
    ;(Pr[e] = Sr(e, !1, !1)), (Tr[e] = Sr(e, !0, !1)), (Rr[e] = Sr(e, !1, !0))
  })
  const Lr = { get: Cr(!1, !1) },
    Ir = { get: Cr(!1, !0) },
    Fr = { get: Cr(!0, !1) },
    qr = new WeakMap(),
    Dr = new WeakMap()
  function Zr(e) {
    return e.__v_skip || !Object.isExtensible(e)
      ? 0
      : (function (e) {
          switch (e) {
            case 'Object':
            case 'Array':
              return 1
            case 'Map':
            case 'Set':
            case 'WeakMap':
            case 'WeakSet':
              return 2
            default:
              return 0
          }
        })((e => Kn(e).slice(8, -1))(e))
  }
  function Wr(e) {
    return e && e.__v_isReadonly ? e : Hr(e, !1, mr, Lr)
  }
  function zr(e) {
    return Hr(e, !0, gr, Fr)
  }
  function Hr(e, t, n, r) {
    if (!Hn(e)) return e
    if (e.__v_raw && (!t || !e.__v_isReactive)) return e
    const o = t ? Dr : qr,
      i = o.get(e)
    if (i) return i
    const s = Zr(e)
    if (0 === s) return e
    const a = new Proxy(e, 2 === s ? r : n)
    return o.set(e, a), a
  }
  function Br(e) {
    return (e && Br(e.__v_raw)) || e
  }
  function Kr(e) {
    return Boolean(e && !0 === e.__v_isRef)
  }
  const Xr = console.error,
    Yr = Object.prototype.toString
  function Ur(e) {
    return function (t) {
      return typeof t === e
    }
  }
  const Gr = Array.isArray,
    Jr = Ur('function'),
    Qr = Ur('string'),
    $r = Ur('number'),
    eo = Ur('boolean'),
    to = Ur('object'),
    no =
      ((ro = 'Object'),
      function (e) {
        return (e => Yr.call(e).slice(8, -1))(e) === ro
      })
  var ro
  function oo(e) {
    return 'false' !== e && !!e
  }
  function io(e) {
    try {
      const t = JSON.parse(e)
      if (to(t)) return t
    } catch {}
    return !1
  }
  function so(e, t, n) {
    let r = n[e]
    if (null == r)
      if (void 0 !== t.default)
        r = (function (e) {
          return Jr(e.default) && e.type !== Function ? e.default() : e.default
        })(t)
      else if (t.required) return void Xr(`props ${e} is required!`)
    function o(e, n, o, i) {
      if ((!i && (i = n), t.transform && (i = t.transform), e !== n)) return !1
      if (o(r)) return !0
      {
        const e = i(r)
        return (n !== Number || !Number.isNaN(e)) && ((r = e), !0)
      }
    }
    function i(n, o, i, s) {
      if (n !== o) return !1
      if (i(r)) return !0
      {
        const n = (t.transform ?? io)(r)
        return n && i(n)
          ? ((r = n), !0)
          : (s && Xr(`the ${e} is a ${s}, please give the ${s} or JSON string`),
            !1)
      }
    }
    function s(e) {
      if (e !== Function) return !1
      if (Jr(r)) return !0
      try {
        const e = e => new Function(`return ${e}`)(),
          n = (t.transform ?? e)(r)
        return Jr(n) && (r = n), !0
      } catch (e) {
        return Xr(e), !1
      }
    }
    if (t.type) {
      const n = Gr(t.type) ? [...new Set(t.type)] : [t.type]
      let r = !1
      for (let e = 0; e < n.length; e++) {
        const t = n[e]
        if (
          o(t, String, Qr) ||
          o(t, Number, $r) ||
          o(t, Boolean, eo, oo) ||
          i(t, Object, no, 'object') ||
          i(t, Array, Gr) ||
          s(t)
        ) {
          r = !0
          break
        }
      }
      r || Xr(`the ${e} value does not hit all type rules`)
    }
    n[e] = r
  }
  let ao
  function co(e, t, n) {
    let r,
      o = [],
      i = {}
    Jr(t) ? (r = t) : Jr(n) && ((r = n), (i = t), (o = Object.keys(t)))
    const s = class extends HTMLElement {
      constructor() {
        super(),
          (this._bm = []),
          (this._bu = []),
          (this._u = []),
          (this._m = []),
          (this._um = []),
          (this.$refs = {})
        const e = this._getProps()
        Object.keys(e).forEach(t => so(t, i[t], e))
        const t = (this._props = Hr(e, !1, vr, Ir))
        ao = this
        const n = r.call(null, t, this)
        ;(ao = null),
          this._bm && this._bm.forEach(e => e()),
          this.emit('hook:beforeMount'),
          (this.$el = this.attachShadow({ mode: 'closed' }))
        let s = !1
        er(() => {
          s ||
            (this._bu && this._bu.forEach(e => e()),
            this.emit('hook:beforeUpdate')),
            ((e, t, n) => {
              let r = Cn.get(t)
              void 0 === r &&
                (on(t, t.firstChild),
                Cn.set(
                  t,
                  (r = new jn(Object.assign({ templateFactory: Rn }, n)))
                ),
                r.appendInto(t)),
                r.setValue(e),
                r.commit()
            })(n(), this.$el),
            s
              ? (this._applyDirective(),
                this._u && this._u.forEach(e => e()),
                this.emit('hook:updated'))
              : (s = !0)
        })
        for (const e of o)
          if (this.hasOwnProperty(e)) {
            const t = this[e]
            delete this[e], (this[e] = t)
          }
      }
      static get observedAttributes() {
        return o
      }
      emit(e, t) {
        const n = new CustomEvent(e, { bubbles: !0, detail: t })
        this.dispatchEvent(n)
      }
      _applyDirective() {
        this._applyVShow(), this._applyRef()
      }
      _applyRef() {
        const e = this.$el.querySelectorAll('[ref]'),
          t = []
        Array.from(e).forEach(e => {
          const n = e.getAttribute('ref')
          t.push(n), this.$refs[n] !== e && (this.$refs[n] = e)
        }),
          Object.keys(this.$refs).forEach(e => {
            t.includes(e) || delete this.$refs[e]
          })
      }
      _applyVShow() {
        const e = this.$el.querySelectorAll('[v-show]')
        Array.from(e).forEach(e => {
          const t = oo(e.getAttribute('v-show'))
          e.__prevShow !== t &&
            (t
              ? (e.style.display = e.__prevDisplay)
              : ((e.__prevDisplay = e.style.display || ''),
                (e.style.display = 'none')),
            (e.__prevShow = t))
        })
      }
      _getProps() {
        let e = {}
        for (const t of o) e[t] = this.getAttribute(t) || this[t] || void 0
        return e
      }
      connectedCallback() {
        this._applyDirective(),
          this._m && this._m.forEach(e => e()),
          this.emit('hook:mounted')
      }
      disconnectedCallback() {
        this._um && this._um.forEach(e => e()), this.emit('hook:unmount')
      }
      attributeChangedCallback(e, t, n) {
        ;(this._props[e] = n), so(e, i[e], this._props)
      }
    }
    for (const e of o)
      Object.defineProperty(s.prototype, e, {
        get() {
          if (this._props) return this._props[e]
        },
        set(t) {
          ;(this._props[e] = t), so(e, i[e], this._props)
        },
      })
    customElements.define(e, s)
  }
  function lo(e) {
    return t => {
      ao && (ao[e] || (ao[e] = [])).push(t)
    }
  }
  const uo = lo('_m'),
    fo = lo('_u'),
    po = lo('_um')
  var ho = function (e) {
    return (
      e ||
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABnCAIAAAB94aCQAAAJI0lEQVR4nO2cb1PjOBLG+2n9sR0nwAyzc/f9P9a9uVdXtXs1OzsESGJb6r4XspPAAEs2cmJu8wzUBKqw5Z+6Wy1Zavzr37/RRYeIz92Aj6cLsoN1QXawLsgO1gXZwbLnbsATAS//XvW07XhTk0AGENH+9xvSs+M7NbI9O8KzX2JHbh+bkpKi/58Uw9+djd2JkL1mR+j/EQEMAsD83MyUSEVVVRSqiifszgDuFMgSL+AJIBrQpY/GYD4r6qow5oUR6XHdPKyaEKIqVFRoyy7ppOBGRwYAREhGxMwgNkxEDKgqEZxlMFeFqyrHr8T/RV3OZ8W66dabVoS6LoQoIqpKSqcGNy4yABjczRkzrwvnjHeWiADqOjEGxvBgbm9FfgCz0leFV1JVWq+b5eMmhB6cDK56AmwjIgMo2ZdhMPOn61lVun0ypjg4K9x6dz0rqsrf3a83my5EhYiokioRxqY2FrIhfoGZreWreVmV7m07OvD6MMCnq5nMVYl++7bsQhQhIiXCqE46XvYPgJjJGr6al/NZkZHX/j2MYcP45dPcW2MYDOAd2d0xGgXZ1iXZcFW6sshpXy/dDs6ZX24X3lkeqI13x5GsDARi5tI7Z42zZpy77N0PsMZ8/bIovEvMxqOWHxmQvmCYvDX1zGe/xWv3NcxfbxfO8gDt1UnrMRrDygDqR8mydIZPuljCjK+3V8ZwSp3HCGqZn2fwiOSV1rkzTPutMdeLkjFWUMuJbC/qgxlV6c1PE8YTCKBFXXpnMFhaXmVDtk3EDMMwL+qyKl2uix/eGHy+qcEYAmvOi2e0MgAEJjBfzctFPUoi9n55Z7zdGlrOluRBtjdKYjEr5rPyvLxSm66vqmH9JKeh5bKy3i2dtdeL6uc1r9MLRN726UbeoTMDsv3pd1m4s5vXVmxgLYMo7yCQxcpSrg9ruBh5bnSQQKhSF2ZlliuWAcC8LqtiEu9fkgBazEtm9NQyYTsW2TbzYYKIHN+gvALBsBnamIdZDitLsYxpVvnpeGUSQIlYxoYdj2x4oQZYM/qKxcECruoy75CZY8QkMIj5tXcd5xSIysL1TcsUzvI4JgHO8qhrocfop9fJRynTiEnqrZmglfXaJRkZmpgt+y/8hNKLJwIxmPIlZ3mQKdHjpj37BpMXBSJjOOPcPAcyJRVdb7rzb8p5RbPKTSv7T29cSbXpwvFXG0PGMHrfzKDjkW0tC1PMMoiyj+OZwr/qVBOMpCmtZKimzXIUo4pMM5gp7e8POlpZYlmSPK6aae1q3Ur3vo9WLsckVepCzHO1rFKi+8dG8nVlrrxMRSmKtN30qCmFEDO6ZhZkfVtUdZrRTHchN4PyvZRTJaK2nWhqNvRrBmo5wv9g86qoyhNtWnmnUoQV2TXyeGWbYyoRkUzhddy+lPTufq3Ub2/MEjZy7skQpd//eJhUNJMobRdEcm4EzYYsbSgPQabz0kRVl4+N9tuOKZdn5rQyJdKJTc5F0lZt2nE7WrmQ9d2oRJNKzXp/zBorsm7Jy2n+eRRjChg525R9FyNdLcq81zxGMW5nStML/4MmlGR0QUKU7CsFmfKy7XxEddN0Wa55vH7crfqm5Yv9lDPJICIlUX1ctVN4CaBKQaJq/qM5eZMMFdGm7R5W7dmZrTdtCKJZM7KkjMg0WZmIrjftedcaVenuYZOA5fVKypr9976pqiHG87qmksY4ildS7sOFqkQiRP0h5vONntp33vBDTmWNZdp/dV349v1hLyc6nVQ1ivzntx9dFFXN7pU0whFWVaKotG66X78t//nlik94wuRh1Swf1ioUomgf+vP3WuZUdjA0VdEQ5NdvyxhPtLChSg+PTQjShajJwMYp4zLGMTbVNHSqRJHl/fo0aZqqhiiiqaZG33Fj3Cg/sr53lVRIoq42bdOOvrahRKtNG3t/HCWEbTXKYcmBmoqqiHz/8SgjjwQicrdc6256NOLtxjpf2hf9UBWhKPH73WrUx1g+bPo1nvFjwKhHcre5LYU4om+qUtcNg0y/QXy8u42LbFtlBc6Y8Z4DoEVdMCPtvP6QRR/2BSJjMKv8qNlZWbhFXVlr2PCo5QvoBDV/mDErfDny2SaA5jPPjB/LFalG6be8fZS8jGh7qJWImefzU5xoBVBX/sunuXd2V/PhgxR9SAIRgZkZesK5pnd2MS/NcKr8AxR92FfqacN8yl0HANWVL/yTSjaTPY6/E4bTyQw4yy8WvhtPAG5vamZO1PrKLDsdO3Rni8r7XtD3LQOAP8epE2O48LZpAyMtFMuuAOYLrnpYlv3Xn2foK+z/2FdkAw1+gdk5tk8lQ7t/bLoQQohRUkk49HP1VEJ0h2oL8V2LHwcj+7l2535RSlAPiwDDqEp/ru1TxvDNVbVpuraL3pm0OqAiSqRCSukTKamKDjY4FIx70+7ei+xZzde+rtpwnjYFCU5ZWOULb501IcrZz4KVhSsLlz7EKF2IItoFUZW2iyIqIjFhFBIVVdorJPoyuT9/JGxBYVe+E0xMzAwCMWAte+fKwqZKO+kPTxz1/1TG7Aai/Tc7TRvaNoQoXYjarx6RyDbwPef2FrLnsADmVGULhbPeu9lQXnFb9OSjaPtQnq13ViptuwCgacNq07Zd6BdKSVWBp4VEX0b2M6xEyln75XO9ncBN7fD9XxYzkv96Zxd10bThx/26bQP1C5ZPDO0FZDu76WERM9eVr8rCOzO13bB5lZ69LNxXZ5cP6/vHJqY6ovS6le2iFYgNW+bC27ouCm/HXB2YnJhxvZgVhfv2/Z4i7a/27ZDtGxcDzFyV7tP1bMieT97qcwugsnD/+HL939+XsT/SpqpPJkwAiAHDsJZvrsrbm9oa7gvA/C0FIufM7c3cWWNNXxWzR5ZgMbMx7Ky9vZkv6vL/O2y9UyAqvP18U1tr2Bhm2G1SyoYtI0E15m/piq8o5eek9MdyxTCWU+giKr2tZ35WFsZcYD0XA1Xlm7Zbt8ESiEGpsvy5anR+CDFjXpeEpvfQWVWU3l54vSEQeWcWdWmdNc6ZRV2etsrwhxQA5wweVk1VuMvg+H4hLRZd9H5drOtgXQLYweIJnGr4YJpqnZ4J6+KYB+u9yE7gv6Pu1syoA6xs7OfJXph/JP0PlPHxgxdnTpMAAAAASUVORK5CYII='
    )
  }
  function mo() {
    var e = Ge([
      '\n      <style>\n        ',
      '\n      </style>\n      <span\n        @mouseenter=',
      '\n        @mouseleave=',
      '\n        ref="personCell"\n        class="ok-person-cell"\n      >\n        <img src="',
      '" />\n      </span>\n      <div ref="tooltip" id="tooltip">\n        <ok-person-detail\n          @mouseenter=',
      '\n          @mouseleave=',
      '\n          .person=',
      '\n        >\n        </ok-person-detail>\n      </div>\n    ',
    ])
    return (
      (mo = function () {
        return e
      }),
      e
    )
  }
  co(
    'ok-person-cell',
    {
      person: {
        type: Object,
        default: {
          id: '500',
          name: '小辛辛',
          department: 'HRBP-产品技术运营-北京',
          email: 'masiwei@kuaishou.com',
        },
        required: !0,
      },
      size: { type: Number, default: 32, required: !0 },
      zIndex: { type: String, default: '9000', required: !0 },
    },
    function (e, t) {
      var n,
        r = function (t) {
          n.setOptions({
            modifiers: [
              { name: 'offset', options: { offset: [0, 20] } },
              {
                name: 'hide',
                fn: function (n) {
                  ;(n.state.attributes.popper[
                    'data-popper-reference-hidden'
                  ] = t),
                    (n.state.styles.popper.zIndex = e.zIndex)
                },
              },
            ],
          })
        }
      uo(function () {
        ;(n = en(t.$refs.personCell, t.$refs.tooltip, {
          placement: 'left',
          strategy: 'fixed',
        })),
          requestAnimationFrame(function () {
            r(!0)
          })
      })
      var o = void 0,
        i = void 0,
        s = function () {
          i && window.clearTimeout(i),
            (o = window.setTimeout(function () {
              r(!1)
            }, 200))
        },
        a = function () {
          o && window.clearTimeout(o),
            (i = window.setTimeout(function () {
              r(!0)
            }, 200))
        }
      return function () {
        var t
        return Ln(
          mo(),
          '.ok-person-cell{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;border-radius:50%;overflow:hidden;width:100%;height:100%;max-width:56px;max-height:56px}.ok-person-cell img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}#tooltip[data-popper-reference-hidden]{visibility:hidden;pointer-events:none}',
          s,
          a,
          ho(null === (t = e.person) || void 0 === t ? void 0 : t.avatar),
          s,
          a,
          e.person
        )
      }
    }
  )
  var go = w.f,
    vo = Function.prototype,
    yo = vo.toString,
    bo = /^\s*function ([^ (]*)/,
    xo = 'name'
  t &&
    !(xo in vo) &&
    go(vo, xo, {
      configurable: !0,
      get: function () {
        try {
          return yo.call(this).match(bo)[1]
        } catch (e) {
          return ''
        }
      },
    })
  function wo() {
    var e = Ge([
      '\n      <style>\n        ',
      '\n      </style>\n\n      <div class="ok-person-detail">\n        <header class="person-image">\n          <img src=',
      ' />\n          <div class="overlay">\n            <span class="person-name">',
      '</span>\n          </div>\n        </header>\n        <footer class="person-detail-footer">\n          <div class="person-detail-info">\n            <span class="title">部门</span>\n            <span class="placeholder">',
      '</span>\n          </div>\n          <div class="person-detail-info">\n            <span class="title">邮箱</span>\n            <span class="placeholder">',
      '</span>\n          </div>\n          <div @click=',
      ' class="person-detail-button">\n            <img src=',
      ' />\n            发送Kim消息\n          </div>\n        </footer>\n      </div>\n    ',
    ])
    return (
      (wo = function () {
        return e
      }),
      e
    )
  }
  co(
    'ok-person-detail',
    { person: { type: Object, required: !0 } },
    function (e, t) {
      uo(function () {}), fo(function () {}), po(function () {})
      var n = function () {
        window.location.href = 'kim://username?username='.concat(
          e.person.userName
        )
      }
      return function () {
        var t
        return Ln(
          wo(),
          '.ok-person-detail{width:320px;height:434px;overflow:hidden;font-family:PingFang SC;font-style:normal;cursor:default;background:#fff;border-radius:4px;-webkit-box-shadow:0 2px 8px rgba(0,0,0,.12);box-shadow:0 2px 8px rgba(0,0,0,.12)}.ok-person-detail .person-image{position:relative;width:100%;height:270px}.ok-person-detail .person-image img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.ok-person-detail .person-image .overlay{position:absolute;top:0;left:0;width:100%;height:100%;background:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.0001)),color-stop(99.42%,rgba(0,0,0,.6)));background:linear-gradient(180deg,rgba(0,0,0,.0001),rgba(0,0,0,.6) 99.42%);border-radius:4px 4px 0 0;mix-blend-mode:normal}.ok-person-detail .person-image .person-name{position:absolute;bottom:24px;left:16px;width:288px;font-size:24px;font-weight:500;line-height:24px;color:#fff;text-shadow:0 1px 5px rgba(0,0,0,.2);word-wrap:break-word;white-space:pre-wrap}.ok-person-detail .person-detail-footer{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;height:164px;padding:20px 16px}.ok-person-detail .person-detail-footer .person-detail-info{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-bottom:12px}.ok-person-detail .person-detail-footer .person-detail-info .title{width:28px;margin-right:10px;font-size:14px;line-height:22px;color:#8f959e}.ok-person-detail .person-detail-footer .person-detail-info .placeholder{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;text-align:left;font-size:14px;line-height:22px;color:#1f2329;overflow:hidden;white-space:pre-wrap;word-break:break-word}.ok-person-detail .person-detail-footer .person-detail-button{position:absolute;bottom:20px;left:16px;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:288px;height:32px;font-size:12px;line-height:22px;color:#1f2329;cursor:pointer;border:1px solid #dee0e3;border-radius:2px}.ok-person-detail .person-detail-footer .person-detail-button img{margin-right:6px}',
          ho(null === (t = e.person) || void 0 === t ? void 0 : t.avatar),
          e.person.name,
          e.person.department,
          e.person.email,
          n,
          "data:image/svg+xml,%3csvg width='16' height='15' viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M8.75586 7.96582H14.3073V8.7397C14.3073 10.5806 12.791 12.073 10.9205 12.073H8.75586V7.96582Z' fill='%23FFA536'/%3e%3cpath d='M10.0649 0H12.5341C14.4483 0 16.0001 1.54588 16.0001 3.45281V8.68829H10.0649V0Z' fill='%23F8CF62'/%3e%3cpath d='M10.0649 0H12.5341C14.4483 0 16.0001 1.54588 16.0001 3.45281V8.68829H10.0649V0Z' fill='url(%23paint0_linear)'/%3e%3cpath d='M3.68926 0.0673828H10.1326V12.1407H3.68926C1.65174 12.1407 0 10.4945 0 8.46381V3.7443C0 1.71359 1.65174 0.0673828 3.68926 0.0673828Z' fill='%234290F5'/%3e%3cpath d='M10.1326 14.0592L8.30259 12.1066H3.68926C1.65174 12.1066 0 10.4558 0 8.41953V3.68703C0 1.65074 1.65174 0 3.68926 0H10.1326V14.0592Z' fill='url(%23paint1_linear)'/%3e%3cpath opacity='0.081' d='M10.1326 11.0877V12.5007C10.1082 12.9895 10.0585 13.4717 9.98499 13.946L8.30248 12.1569H3.68921C1.65171 12.1569 0 10.5116 0 8.48199V3.76508C0 1.7355 1.65171 0.0901908 3.68921 0.0901908L3.79032 0.0898438C7.43444 2.46252 9.90245 6.48135 10.1326 11.0877Z' fill='white'/%3e%3cpath d='M3.76855 2.73047C4.34187 2.73047 4.80663 3.19523 4.80663 3.76855C4.80663 4.34187 4.34187 4.80663 3.76855 4.80663C3.19523 4.80663 2.73047 4.34187 2.73047 3.76855C2.73047 3.19523 3.19523 2.73047 3.76855 2.73047Z' fill='white'/%3e%3cdefs%3e%3clinearGradient id='paint0_linear' x1='10.0423' y1='7.67833e-08' x2='15.9037' y2='3.33437' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23FFBF00'/%3e%3cstop offset='1' stop-color='%23F7C02E'/%3e%3c/linearGradient%3e%3clinearGradient id='paint1_linear' x1='1.30508' y1='-1.25339e-07' x2='9.19425' y2='6.4264' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%230066F3'/%3e%3cstop offset='1' stop-color='%230383F9'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
        )
      }
    }
  )
})
