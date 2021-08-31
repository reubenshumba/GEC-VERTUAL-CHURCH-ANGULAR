var _gaq = _gaq || [];

var Base64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode: function (e) {
    var t = "";
    var n, r, i, s, o, u, a;
    var f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = ((n & 3) << 4) | (r >> 4);
      u = ((r & 15) << 2) | (i >> 6);
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64;
      } else if (isNaN(i)) {
        a = 64;
      }
      t =
        t +
        this._keyStr.charAt(s) +
        this._keyStr.charAt(o) +
        this._keyStr.charAt(u) +
        this._keyStr.charAt(a);
    }
    return t;
  },
  decode: function (e) {
    var t = "";
    var n, r, i;
    var s, o, u, a;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++));
      o = this._keyStr.indexOf(e.charAt(f++));
      u = this._keyStr.indexOf(e.charAt(f++));
      a = this._keyStr.indexOf(e.charAt(f++));
      n = (s << 2) | (o >> 4);
      r = ((o & 15) << 4) | (u >> 2);
      i = ((u & 3) << 6) | a;
      t = t + String.fromCharCode(n);
      if (u != 64) {
        t = t + String.fromCharCode(r);
      }
      if (a != 64) {
        t = t + String.fromCharCode(i);
      }
    }
    t = Base64._utf8_decode(t);
    return t;
  },
  _utf8_encode: function (e) {
    e = e.replace(/\r\n/g, "\n");
    var t = "";
    for (var n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode((r >> 6) | 192);
        t += String.fromCharCode((r & 63) | 128);
      } else {
        t += String.fromCharCode((r >> 12) | 224);
        t += String.fromCharCode(((r >> 6) & 63) | 128);
        t += String.fromCharCode((r & 63) | 128);
      }
    }
    return t;
  },
  _utf8_decode: function (e) {
    var t = "";
    var n = 0;
    var r = (c1 = c2 = 0);
    while (n < e.length) {
      r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
        n++;
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1);
        t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
        n += 2;
      } else {
        c2 = e.charCodeAt(n + 1);
        c3 = e.charCodeAt(n + 2);
        t += String.fromCharCode(
          ((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        n += 3;
      }
    }
    return t;
  },
};

var scriptHost = "play.streamingvideoprovider.com";

if (document.currentScript) {
  var src = document.currentScript.src;

  if (src && typeof URL === "function") {
    var url = new URL(src);
    var hostName = url.hostname;

    if (
      /(streamingvideoprovider\.com|webvideocore\.net|vediostream\.cn)$/.test(
        hostName
      )
    ) {
      scriptHost = hostName;
    }
  }
}

if (typeof SvpSwfObject === "undefined")
  var SvpSwfObject = {
    get: function () {
      if (typeof this.swfobject !== "undefined") return this.swfobject;
      /*! SWFObject v2.3.20130521 <http://github.com/swfobject/swfobject>
		is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
		*/
      var swfobject = (function () {
        var D = "undefined",
          r = "object",
          T = "Shockwave Flash",
          Z = "ShockwaveFlash.ShockwaveFlash",
          q = "application/x-shockwave-flash",
          S = "SWFObjectExprInst",
          x = "onreadystatechange",
          Q = window,
          h = document,
          t = navigator,
          V = false,
          X = [],
          o = [],
          P = [],
          K = [],
          I,
          p,
          E,
          B,
          L = false,
          a = false,
          m,
          G,
          j = true,
          l = false,
          O = (function () {
            var ad =
                typeof h.getElementById != D &&
                typeof h.getElementsByTagName != D &&
                typeof h.createElement != D,
              ak = t.userAgent.toLowerCase(),
              ab = t.platform.toLowerCase(),
              ah = ab ? /win/.test(ab) : /win/.test(ak),
              af = ab ? /mac/.test(ab) : /mac/.test(ak),
              ai = /webkit/.test(ak)
                ? parseFloat(ak.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1"))
                : false,
              aa = t.appName === "Microsoft Internet Explorer",
              aj = [0, 0, 0],
              ae = null;
            if (typeof t.plugins != D && typeof t.plugins[T] == r) {
              ae = t.plugins[T].description;
              if (
                ae &&
                typeof t.mimeTypes != D &&
                t.mimeTypes[q] &&
                t.mimeTypes[q].enabledPlugin
              ) {
                V = true;
                aa = false;
                ae = ae.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                aj[0] = n(ae.replace(/^(.*)\..*$/, "$1"));
                aj[1] = n(ae.replace(/^.*\.(.*)\s.*$/, "$1"));
                aj[2] = /[a-zA-Z]/.test(ae)
                  ? n(ae.replace(/^.*[a-zA-Z]+(.*)$/, "$1"))
                  : 0;
              }
            } else {
              if (typeof Q.ActiveXObject != D) {
                try {
                  var ag = new ActiveXObject(Z);
                  if (ag) {
                    ae = ag.GetVariable("$version");
                    if (ae) {
                      aa = true;
                      ae = ae.split(" ")[1].split(",");
                      aj = [n(ae[0]), n(ae[1]), n(ae[2])];
                    }
                  }
                } catch (ac) {}
              }
            }
            return { w3: ad, pv: aj, wk: ai, ie: aa, win: ah, mac: af };
          })(),
          i = (function () {
            if (!O.w3) {
              return;
            }
            if (
              (typeof h.readyState != D &&
                (h.readyState === "complete" ||
                  h.readyState === "interactive")) ||
              (typeof h.readyState == D &&
                (h.getElementsByTagName("body")[0] || h.body))
            ) {
              f();
            }
            if (!L) {
              if (typeof h.addEventListener != D) {
                h.addEventListener("DOMContentLoaded", f, false);
              }
              if (O.ie) {
                h.attachEvent(x, function aa() {
                  if (h.readyState == "complete") {
                    h.detachEvent(x, aa);
                    f();
                  }
                });
                if (Q == top) {
                  (function ac() {
                    if (L) {
                      return;
                    }
                    try {
                      h.documentElement.doScroll("left");
                    } catch (ad) {
                      setTimeout(ac, 0);
                      return;
                    }
                    f();
                  })();
                }
              }
              if (O.wk) {
                (function ab() {
                  if (L) {
                    return;
                  }
                  if (!/loaded|complete/.test(h.readyState)) {
                    setTimeout(ab, 0);
                    return;
                  }
                  f();
                })();
              }
            }
          })();
        function f() {
          if (L || !document.getElementsByTagName("body")[0]) {
            return;
          }
          try {
            var ac,
              ad = C("span");
            ad.style.display = "none";
            ac = h.getElementsByTagName("body")[0].appendChild(ad);
            ac.parentNode.removeChild(ac);
            ac = null;
            ad = null;
          } catch (ae) {
            return;
          }
          L = true;
          var aa = X.length;
          for (var ab = 0; ab < aa; ab++) {
            X[ab]();
          }
        }
        function M(aa) {
          if (L) {
            aa();
          } else {
            X[X.length] = aa;
          }
        }
        function s(ab) {
          if (typeof Q.addEventListener != D) {
            Q.addEventListener("load", ab, false);
          } else {
            if (typeof h.addEventListener != D) {
              h.addEventListener("load", ab, false);
            } else {
              if (typeof Q.attachEvent != D) {
                g(Q, "onload", ab);
              } else {
                if (typeof Q.onload == "function") {
                  var aa = Q.onload;
                  Q.onload = function () {
                    aa();
                    ab();
                  };
                } else {
                  Q.onload = ab;
                }
              }
            }
          }
        }
        function Y() {
          var aa = h.getElementsByTagName("body")[0];
          var ae = C(r);
          ae.setAttribute("style", "visibility: hidden;");
          ae.setAttribute("type", q);
          var ad = aa.appendChild(ae);
          if (ad) {
            var ac = 0;
            (function ab() {
              if (typeof ad.GetVariable != D) {
                try {
                  var ag = ad.GetVariable("$version");
                  if (ag) {
                    ag = ag.split(" ")[1].split(",");
                    O.pv = [n(ag[0]), n(ag[1]), n(ag[2])];
                  }
                } catch (af) {
                  O.pv = [8, 0, 0];
                }
              } else {
                if (ac < 10) {
                  ac++;
                  setTimeout(ab, 10);
                  return;
                }
              }
              aa.removeChild(ae);
              ad = null;
              H();
            })();
          } else {
            H();
          }
        }
        function H() {
          var aj = o.length;
          if (aj > 0) {
            for (var ai = 0; ai < aj; ai++) {
              var ab = o[ai].id;
              var ae = o[ai].callbackFn;
              var ad = { success: false, id: ab };
              if (O.pv[0] > 0) {
                var ah = c(ab);
                if (ah) {
                  if (F(o[ai].swfVersion) && !(O.wk && O.wk < 312)) {
                    w(ab, true);
                    if (ae) {
                      ad.success = true;
                      ad.ref = z(ab);
                      ad.id = ab;
                      ae(ad);
                    }
                  } else {
                    if (o[ai].expressInstall && A()) {
                      var al = {};
                      al.data = o[ai].expressInstall;
                      al.width = ah.getAttribute("width") || "0";
                      al.height = ah.getAttribute("height") || "0";
                      if (ah.getAttribute("class")) {
                        al.styleclass = ah.getAttribute("class");
                      }
                      if (ah.getAttribute("align")) {
                        al.align = ah.getAttribute("align");
                      }
                      var ak = {};
                      var aa = ah.getElementsByTagName("param");
                      var af = aa.length;
                      for (var ag = 0; ag < af; ag++) {
                        if (
                          aa[ag].getAttribute("name").toLowerCase() != "movie"
                        ) {
                          ak[aa[ag].getAttribute("name")] =
                            aa[ag].getAttribute("value");
                        }
                      }
                      R(al, ak, ab, ae);
                    } else {
                      b(ah);
                      if (ae) {
                        ae(ad);
                      }
                    }
                  }
                }
              } else {
                w(ab, true);
                if (ae) {
                  var ac = z(ab);
                  if (ac && typeof ac.SetVariable != D) {
                    ad.success = true;
                    ad.ref = ac;
                    ad.id = ac.id;
                  }
                  ae(ad);
                }
              }
            }
          }
        }
        X[0] = function () {
          if (V) {
            Y();
          } else {
            H();
          }
        };
        function z(ac) {
          var aa = null,
            ab = c(ac);
          if (ab && ab.nodeName.toUpperCase() === "OBJECT") {
            if (typeof ab.SetVariable !== D) {
              aa = ab;
            } else {
              aa = ab.getElementsByTagName(r)[0] || ab;
            }
          }
          return aa;
        }
        function A() {
          return !a && F("6.0.65") && (O.win || O.mac) && !(O.wk && O.wk < 312);
        }
        function R(ad, ae, aa, ac) {
          var ah = c(aa);
          aa = W(aa);
          a = true;
          E = ac || null;
          B = { success: false, id: aa };
          if (ah) {
            if (ah.nodeName.toUpperCase() == "OBJECT") {
              I = J(ah);
              p = null;
            } else {
              I = ah;
              p = aa;
            }
            ad.id = S;
            if (
              typeof ad.width == D ||
              (!/%$/.test(ad.width) && n(ad.width) < 310)
            ) {
              ad.width = "310";
            }
            if (
              typeof ad.height == D ||
              (!/%$/.test(ad.height) && n(ad.height) < 137)
            ) {
              ad.height = "137";
            }
            var ag = O.ie ? "ActiveX" : "PlugIn",
              af =
                "MMredirectURL=" +
                encodeURIComponent(Q.location.toString().replace(/&/g, "%26")) +
                "&MMplayerType=" +
                ag +
                "&MMdoctitle=" +
                encodeURIComponent(
                  h.title.slice(0, 47) + " - Flash Player Installation"
                );
            if (typeof ae.flashvars != D) {
              ae.flashvars += "&" + af;
            } else {
              ae.flashvars = af;
            }
            if (O.ie && ah.readyState != 4) {
              var ab = C("div");
              aa += "SWFObjectNew";
              ab.setAttribute("id", aa);
              ah.parentNode.insertBefore(ab, ah);
              ah.style.display = "none";
              y(ah);
            }
            u(ad, ae, aa);
          }
        }
        function b(ab) {
          if (O.ie && ab.readyState != 4) {
            ab.style.display = "none";
            var aa = C("div");
            ab.parentNode.insertBefore(aa, ab);
            aa.parentNode.replaceChild(J(ab), aa);
            y(ab);
          } else {
            ab.parentNode.replaceChild(J(ab), ab);
          }
        }
        function J(af) {
          var ae = C("div");
          if (O.win && O.ie) {
            ae.innerHTML = af.innerHTML;
          } else {
            var ab = af.getElementsByTagName(r)[0];
            if (ab) {
              var ag = ab.childNodes;
              if (ag) {
                var aa = ag.length;
                for (var ad = 0; ad < aa; ad++) {
                  if (
                    !(ag[ad].nodeType == 1 && ag[ad].nodeName == "PARAM") &&
                    !(ag[ad].nodeType == 8)
                  ) {
                    ae.appendChild(ag[ad].cloneNode(true));
                  }
                }
              }
            }
          }
          return ae;
        }
        function k(aa, ab) {
          var ac = C("div");
          ac.innerHTML =
            "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='" +
            aa +
            "'>" +
            ab +
            "</object>";
          return ac.firstChild;
        }
        function u(ai, ag, ab) {
          var aa,
            ad = c(ab);
          ab = W(ab);
          if (O.wk && O.wk < 312) {
            return aa;
          }
          if (ad) {
            var ac = O.ie ? C("div") : C(r),
              af,
              ah,
              ae;
            if (typeof ai.id == D) {
              ai.id = ab;
            }
            for (ae in ag) {
              if (ag.hasOwnProperty(ae) && ae.toLowerCase() !== "movie") {
                e(ac, ae, ag[ae]);
              }
            }
            if (O.ie) {
              ac = k(ai.data, ac.innerHTML);
            }
            for (af in ai) {
              if (ai.hasOwnProperty(af)) {
                ah = af.toLowerCase();
                if (ah === "styleclass") {
                  ac.setAttribute("class", ai[af]);
                } else {
                  if (ah !== "classid" && ah !== "data") {
                    ac.setAttribute(af, ai[af]);
                  }
                }
              }
            }
            if (O.ie) {
              P[P.length] = ai.id;
            } else {
              ac.setAttribute("type", q);
              ac.setAttribute("data", ai.data);
            }
            ad.parentNode.replaceChild(ac, ad);
            aa = ac;
          }
          return aa;
        }
        function e(ac, aa, ab) {
          var ad = C("param");
          ad.setAttribute("name", aa);
          ad.setAttribute("value", ab);
          ac.appendChild(ad);
        }
        function y(ac) {
          var ab = c(ac);
          if (ab && ab.nodeName.toUpperCase() == "OBJECT") {
            if (O.ie) {
              ab.style.display = "none";
              (function aa() {
                if (ab.readyState == 4) {
                  for (var ad in ab) {
                    if (typeof ab[ad] == "function") {
                      ab[ad] = null;
                    }
                  }
                  ab.parentNode.removeChild(ab);
                } else {
                  setTimeout(aa, 10);
                }
              })();
            } else {
              ab.parentNode.removeChild(ab);
            }
          }
        }
        function U(aa) {
          return aa && aa.nodeType && aa.nodeType === 1;
        }
        function W(aa) {
          return U(aa) ? aa.id : aa;
        }
        function c(ac) {
          if (U(ac)) {
            return ac;
          }
          var aa = null;
          try {
            aa = h.getElementById(ac);
          } catch (ab) {}
          return aa;
        }
        function C(aa) {
          return h.createElement(aa);
        }
        function n(aa) {
          return parseInt(aa, 10);
        }
        function g(ac, aa, ab) {
          ac.attachEvent(aa, ab);
          K[K.length] = [ac, aa, ab];
        }
        function F(ac) {
          ac += "";
          var ab = O.pv,
            aa = ac.split(".");
          aa[0] = n(aa[0]);
          aa[1] = n(aa[1]) || 0;
          aa[2] = n(aa[2]) || 0;
          return ab[0] > aa[0] ||
            (ab[0] == aa[0] && ab[1] > aa[1]) ||
            (ab[0] == aa[0] && ab[1] == aa[1] && ab[2] >= aa[2])
            ? true
            : false;
        }
        function v(af, ab, ag, ae) {
          var ad = h.getElementsByTagName("head")[0];
          if (!ad) {
            return;
          }
          var aa = typeof ag == "string" ? ag : "screen";
          if (ae) {
            m = null;
            G = null;
          }
          if (!m || G != aa) {
            var ac = C("style");
            ac.setAttribute("type", "text/css");
            ac.setAttribute("media", aa);
            m = ad.appendChild(ac);
            if (O.ie && typeof h.styleSheets != D && h.styleSheets.length > 0) {
              m = h.styleSheets[h.styleSheets.length - 1];
            }
            G = aa;
          }
          if (m) {
            if (typeof m.addRule != D) {
              m.addRule(af, ab);
            } else {
              if (typeof h.createTextNode != D) {
                m.appendChild(h.createTextNode(af + " {" + ab + "}"));
              }
            }
          }
        }
        function w(ad, aa) {
          if (!j) {
            return;
          }
          var ab = aa ? "visible" : "hidden",
            ac = c(ad);
          if (L && ac) {
            ac.style.visibility = ab;
          } else {
            if (typeof ad === "string") {
              v("#" + ad, "visibility:" + ab);
            }
          }
        }
        function N(ab) {
          var ac = /[\\\"<>\.;]/;
          var aa = ac.exec(ab) != null;
          return aa && typeof encodeURIComponent != D
            ? encodeURIComponent(ab)
            : ab;
        }
        var d = (function () {
          if (O.ie) {
            window.attachEvent("onunload", function () {
              var af = K.length;
              for (var ae = 0; ae < af; ae++) {
                K[ae][0].detachEvent(K[ae][1], K[ae][2]);
              }
              var ac = P.length;
              for (var ad = 0; ad < ac; ad++) {
                y(P[ad]);
              }
              for (var ab in O) {
                O[ab] = null;
              }
              O = null;
              for (var aa in swfobject) {
                swfobject[aa] = null;
              }
              swfobject = null;
            });
          }
        })();
        return {
          registerObject: function (ae, aa, ad, ac) {
            if (O.w3 && ae && aa) {
              var ab = {};
              ab.id = ae;
              ab.swfVersion = aa;
              ab.expressInstall = ad;
              ab.callbackFn = ac;
              o[o.length] = ab;
              w(ae, false);
            } else {
              if (ac) {
                ac({ success: false, id: ae });
              }
            }
          },
          getObjectById: function (aa) {
            if (O.w3) {
              return z(aa);
            }
          },
          embedSWF: function (af, al, ai, ak, ab, ae, ad, ah, aj, ag) {
            var ac = W(al),
              aa = { success: false, id: ac };
            if (O.w3 && !(O.wk && O.wk < 312) && af && al && ai && ak && ab) {
              w(ac, false);
              M(function () {
                ai += "";
                ak += "";
                var an = {};
                if (aj && typeof aj === r) {
                  for (var aq in aj) {
                    an[aq] = aj[aq];
                  }
                }
                an.data = af;
                an.width = ai;
                an.height = ak;
                var ar = {};
                if (ah && typeof ah === r) {
                  for (var ao in ah) {
                    ar[ao] = ah[ao];
                  }
                }
                if (ad && typeof ad === r) {
                  for (var am in ad) {
                    if (ad.hasOwnProperty(am)) {
                      var ap = l ? encodeURIComponent(am) : am,
                        at = l ? encodeURIComponent(ad[am]) : ad[am];
                      if (typeof ar.flashvars != D) {
                        ar.flashvars += "&" + ap + "=" + at;
                      } else {
                        ar.flashvars = ap + "=" + at;
                      }
                    }
                  }
                }
                if (F(ab)) {
                  var au = u(an, ar, al);
                  if (an.id == ac) {
                    w(ac, true);
                  }
                  aa.success = true;
                  aa.ref = au;
                  aa.id = au.id;
                } else {
                  if (ae && A()) {
                    an.data = ae;
                    R(an, ar, al, ag);
                    return;
                  } else {
                    w(ac, true);
                  }
                }
                if (ag) {
                  ag(aa);
                }
              });
            } else {
              if (ag) {
                ag(aa);
              }
            }
          },
          switchOffAutoHideShow: function () {
            j = false;
          },
          enableUriEncoding: function (aa) {
            l = typeof aa === D ? true : aa;
          },
          ua: O,
          getFlashPlayerVersion: function () {
            return { major: O.pv[0], minor: O.pv[1], release: O.pv[2] };
          },
          hasFlashPlayerVersion: F,
          createSWF: function (ac, ab, aa) {
            if (O.w3) {
              return u(ac, ab, aa);
            } else {
              return undefined;
            }
          },
          showExpressInstall: function (ac, ad, aa, ab) {
            if (O.w3 && A()) {
              R(ac, ad, aa, ab);
            }
          },
          removeSWF: function (aa) {
            if (O.w3) {
              y(aa);
            }
          },
          createCSS: function (ad, ac, ab, aa) {
            if (O.w3) {
              v(ad, ac, ab, aa);
            }
          },
          addDomLoadEvent: M,
          addLoadEvent: s,
          getQueryParamValue: function (ad) {
            var ac = h.location.search || h.location.hash;
            if (ac) {
              if (/\?/.test(ac)) {
                ac = ac.split("?")[1];
              }
              if (ad == null) {
                return N(ac);
              }
              var ab = ac.split("&");
              for (var aa = 0; aa < ab.length; aa++) {
                if (ab[aa].substring(0, ab[aa].indexOf("=")) == ad) {
                  return N(ab[aa].substring(ab[aa].indexOf("=") + 1));
                }
              }
            }
            return "";
          },
          expressInstallCallback: function () {
            if (a) {
              var aa = c(S);
              if (aa && I) {
                aa.parentNode.replaceChild(I, aa);
                if (p) {
                  w(p, true);
                  if (O.ie) {
                    I.style.display = "block";
                  }
                }
                if (E) {
                  E(B);
                }
              }
              a = false;
            }
          },
          version: "2.3",
        };
      })();

      this.swfobject = swfobject;

      return this.swfobject;
    },
    destroy: function () {
      delete this.swfobject;
    },
  };
if (typeof SvpPlayerInstances === "undefined")
  var SvpPlayerInstances = {
    instances: {},
    registerInstance: function (id, instance) {
      this.instances[id] = instance;
    },
    getInstance: function (id) {
      return this.instances[id];
    },
    getPlayerInstance: function (playerId) {
      for (var key in this.instances) {
        var instance = this.instances[key];
        if (instance.vars.clip_id == playerId) return instance;
      }
      return null;
    },
    removeInstance: function (id) {
      delete this.instances[id];
    },
  };
if (typeof SvpPlayerIndexes === "undefined") var SvpPlayerIndexes = 0;
if (typeof svpHashTicketCode === "undefined") {
  var hash = window.location.hash;
  if (hash.indexOf("ticket=") !== -1) {
    var params = hash.split("&");
    var svpHashTicketCode = params[0].replace("#ticket=", "");
    var clip = params[1] !== undefined ? params[1] : "";
    if (clip.indexOf("clip=") !== -1) {
      var clipKey = clip.replace("clip=", "");
      window.location.hash = "#clip=" + clipKey;
    }
  }
}

if (!document.getElementById("sticky-module")) {
  var StickyPlayerContainer = {};
  var stickyModule = document.createElement("script");

  stickyModule.setAttribute("id", "sticky-module");
  stickyModule.type = "text/javascript";
  stickyModule.async = true;
  stickyModule.src = "https://" + scriptHost + "/js/sticky_player.js";

  document.head.appendChild(stickyModule);

  stickyModule.onload = function () {
    StickyPlayerContainer = new StickyPlayer();
    StickyPlayerContainer.fireSticky();
  };
}

function SVPHTML5Player(dplayer) {
  var html5_url =
    typeof dplayer.vars.html5_url !== "undefined"
      ? dplayer.vars.html5_url
      : dplayer.site_root + "html5.html";

  this.url =
    html5_url +
    "?p=" +
    encodeURIComponent(window.location.href) +
    "&clipId=" +
    dplayer.vars.clip_id +
    (dplayer.staticCache === false ? "&v=" + new Date().getTime() : "");
  this.vars = dplayer.translateVars();
  this.id = dplayer.player_id;
  this.width = dplayer.player_width;
  this.height = dplayer.player_height;
  this.callback = dplayer.onSuccessEmbed;
  this.dplayer = dplayer;

  this.isReady = false;
  this.isPlaying = false;
  this.isComplete = false;
  this.isLive = false;
  this.currentSecond = 0;
  this.duration = 0;
  this.volume = 0;
  this.videoID = this.vars.clipId;

  this.initGetters();
  this.build();
}

SVPHTML5Player.prototype.initGetters = function () {
  Object.defineProperty(this, "style", {
    get: function () {
      return this.iframe.style;
    },
  });

  Object.defineProperty(this, "scrollLeft", {
    get: function () {
      return this.iframe.scrollLeft;
    },
  });

  Object.defineProperty(this, "scrollTop", {
    get: function () {
      return this.iframe.scrollTop;
    },
  });

  Object.defineProperty(this, "offsetLeft", {
    get: function () {
      return this.iframe.offsetLeft;
    },
  });

  Object.defineProperty(this, "offsetTop", {
    get: function () {
      return this.iframe.offsetTop;
    },
  });

  Object.defineProperty(this, "offsetParent", {
    get: function () {
      return this.iframe.offsetParent;
    },
  });

  Object.defineProperty(this, "parentNode", {
    get: function () {
      return this.iframe.parentNode;
    },
  });
};

SVPHTML5Player.prototype.build = function () {
  var element = document.getElementById(this.id);

  if (element === null) {
    return;
  }

  this.iframe = document.createElement("iframe");

  this.iframe.setAttribute("src", this.url);
  this.iframe.setAttribute(
    "style",
    "width: 100%; height: 100%; position: absolute; left: 0; top: 0;"
  );
  this.iframe.setAttribute("allowfullscreen", true);
  this.iframe.setAttribute("allowtransparency", true);
  this.iframe.setAttribute("frameborder", 0);
  this.iframe.setAttribute("id", this.id);
  this.iframe.setAttribute("name", this.id);

  this.onMessageListener = this.onMessage.bind(this);

  window.addEventListener("message", this.onMessageListener, false);

  if (this.vars.sleekPlayer) {
    var holder = this.vars.isPopin ? this.iframe : element.parentElement;

    holder.style.boxShadow = "0 20px 22px -8px rgba(48,48,48,.4)";
    holder.style.borderRadius = "4px";
    holder.style.overflow = "hidden";
  }

  element.parentNode.replaceChild(this.iframe, element);

  this.triggerReady();
};

SVPHTML5Player.prototype.remove = function () {
  if (this.dplayer.isStickyExist() && this.dplayer.isStickyPlayer()) {
    delete StickyPlayerContainer.remove(this.vars.rid);
  }

  window.removeEventListener("message", this.onMessageListener);
  delete this.onMessageListener;

  this.iframe.parentNode.removeChild(this.iframe);

  delete this.iframe;
  delete this.vars;
  delete this.dplayer;
  delete this.callback;

  if (typeof this.destroyCallback !== "undefined") {
    this.destroyCallback();
  }

  delete this.destroyCallback;
};

SVPHTML5Player.prototype.destroy = function (destroyCallback) {
  this.iframe.style.display = "none";

  this.sendMessage("destroy");

  if (typeof destroyCallback === "function") {
    this.destroyCallback = destroyCallback;
  }
};

SVPHTML5Player.prototype.onMessage = function (event) {
  if (event.source !== this.iframe.contentWindow) {
    return;
  }

  var key = event.message ? "message" : "data";
  var details = event[key];
  var message = details.message;
  var data = details.data;

  this.processMessage(message, data);
};

SVPHTML5Player.prototype.processMessage = function (message, data) {
  switch (message) {
    case "init": {
      this.init();
      break;
    }
    case "ready": {
      this.ready(data);
      break;
    }
    case "fireEvent": {
      this.fireEvent(data);
      break;
    }
    case "closePlayer": {
      this.dplayer.stop();
      window.ClosePlayer(data.rid);
      break;
    }
    case "isPlaying":
    case "isComplete": {
      this.dplayer.manageMessagePlayerActions(message, data);
      break;
    }
    case "isLive": {
      this.isLive = data;
      break;
    }
    case "currentSecond": {
      this.currentSecond = data;
      break;
    }
    case "volume": {
      this.volume = data;
      break;
    }
    case "reinitialize": {
      if (!this.isReady) {
        this.triggerReady();
      }

      this.dplayer.reinitialize(data);
      break;
    }
    case "destroy": {
      this.remove();
      break;
    }
  }
};

SVPHTML5Player.prototype.init = function () {
  this.sendMessage("init", this.vars);
};

SVPHTML5Player.prototype.triggerReady = function () {
  this.isReady = true;
  this.callback({
    success: true,
    ref: this,
  });
};

SVPHTML5Player.prototype.ready = function (data) {
  if (typeof window.SvpDestroySlide === "function") {
    window.SvpDestroySlide(this.videoID);
  }

  var floatingPlayerDirection = this.vars.floating_player;

  if (
    this.dplayer.isForSticky() &&
    this.dplayer.floatingDirections.indexOf(floatingPlayerDirection) > -1
  ) {
    var replacedIframe = document.getElementById(this.id);
    var stickyPlayerContainer = replacedIframe.parentElement.getAttribute(
      "data-initialized"
    )
      ? replacedIframe.parentElement
      : replacedIframe.parentElement.parentElement;

    stickyPlayerContainer.setAttribute("animation", floatingPlayerDirection);

    StickyPlayerContainer.addInstance(this.vars.rid, this.dplayer);
    StickyPlayerContainer.onScroll();
  }

  this.isLive = data.isLive;
  this.duration = data.duration;
  this.volume = data.volume;

  this.registerJSEvent = this.doRegisterJSEvent;
  this.playerLoadVideo = this.doPlayerLoadVideo;
  this.playerSetVolume = this.doPlayerSetVolume;
  this.playerSeekToAndPause = this.doPlayerSeekToAndPause;
  this.playerSeekToAndPlay = this.doPlayerSeekToAndPlay;
  this.playerCommand = this.doPlayerCommand;
  this.executeCommand = this.doExecuteCommand;
};

SVPHTML5Player.prototype.getContext = function (handler) {
  var chunks = handler.split(".");

  chunks.pop();
  chunks = chunks.join(".");

  return eval(chunks);
};

SVPHTML5Player.prototype.fireEvent = function (data) {
  var handler = data.handler;

  eval(handler).call(this.getContext(handler), data.data);
};

SVPHTML5Player.prototype.sendMessage = function (message, data) {
  this.iframe.contentWindow.postMessage(
    {
      message: message,
      data: data,
    },
    "*"
  );
};

SVPHTML5Player.prototype.doRegisterJSEvent = function (name, handler) {
  this.sendMessage("registerJSEvent", {
    name: name,
    handler: handler,
  });
};

// PUBLIC API

// Player control methods

SVPHTML5Player.prototype.doExecuteCommand = function (command) {
  this.sendMessage("executeCommand", command);
};

SVPHTML5Player.prototype.doPlayerCommand = function (command) {
  this.sendMessage("playerCommand", command);
};

// Setters

SVPHTML5Player.prototype.doPlayerSeekToAndPlay = function (seconds) {
  this.sendMessage("seekToAndPlay", seconds);
};

SVPHTML5Player.prototype.doPlayerSeekToAndPause = function (seconds) {
  this.sendMessage("seekToAndPause", seconds);
};

SVPHTML5Player.prototype.doPlayerSetVolume = function (volume) {
  this.sendMessage("setVolume", volume);
};

SVPHTML5Player.prototype.doPlayerLoadVideo = function (videoID) {
  this.videoID = videoID;

  this.sendMessage("loadVideo", videoID);
};

// Getters

SVPHTML5Player.prototype.get_isPlaying = function () {
  return this.isPlaying;
};

SVPHTML5Player.prototype.get_isPaused = function () {
  return !this.isPlaying;
};

SVPHTML5Player.prototype.get_isComplete = function () {
  return this.isComplete;
};

SVPHTML5Player.prototype.get_isMuted = function () {
  return this.volume === 0;
};

SVPHTML5Player.prototype.get_isLive = function () {
  return this.isLive;
};

SVPHTML5Player.prototype.get_videoID = function () {
  return this.videoID;
};

SVPHTML5Player.prototype.get_streamTime = function () {
  return this.currentSecond;
};

SVPHTML5Player.prototype.get_streamDuration = function () {
  return this.duration;
};

SVPHTML5Player.prototype.get_volume = function () {
  return this.volume;
};

function SVPDynamicPlayer(
  id,
  url,
  width,
  height,
  internal_params,
  vars,
  params
) {
  //Player variables
  this.player_object_id = id;
  this.player_url = url;
  this.player_width = width;
  this.player_height = height;
  this.min_player_width = 320;
  this.min_player_height = 240;
  this.def_player_width = 400;
  this.def_player_height = 341;
  this.def_big_player_width = 800;
  this.def_big_player_height = 450;
  this.def_player_skin = 0;
  this.def_player_controls_height = 19;
  this.player_align = "NONE"; //Available values: TL, TC, TR, ML, MC, MR, BL, BC, BR, NONE
  this.player_offset_x = 0;
  this.player_offset_y = 0;
  this.player_offset_left = undefined;
  this.player_offset_top = undefined;
  this.is_ssl = true;
  this.site_root = (this.is_ssl ? "https:" : "http:") + "//" + scriptHost + "/";
  this.services_entry = this.is_ssl
    ? "https://service.webvideocore.net/"
    : "http://service.webvideocore.net/";
  this.confirm_entry = this.is_ssl
    ? "https://service.webvideocore.net/"
    : "http://service.webvideocore.net/";
  this.logs_entry = this.is_ssl
    ? "https://flashlogs.webvideocore.net/"
    : "http://flashlogs.webvideocore.net/";
  this.staticCache = true;

  this.player_instance = null;
  this.html5_player_instance = null;
  this.back_player_instance = null;
  this.backup_player_id = null;
  this.player_in_fs_mode = false;
  this.player_fullscreen_mode = "DOUBLE"; //Available values: DOUBLE, FILL, FIXED, NATIVE, NONE
  this.player_fs_width = 0;
  this.player_fs_height = 0;
  this.player_background_color = "";
  this.player_background_transparency = 0; //in percents
  this.player_keep_state_on_scroll = false;
  this.player_keep_state_on_resize = false;
  this.auto_show = true;
  this.is_responsive = false;
  this.flashActive = true;
  this.floatingDirections = ["left", "right"];

  this.getIEVersion = function () {
    var search = "MSIE";
    var agent = navigator.userAgent;
    var index = agent.indexOf(search);

    return index === -1
      ? 0
      : parseFloat(agent.substring(index + search.length + 1));
  };
  this.getIOSVersion = function () {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
      var match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);

      return parseInt(match[1], 10);
    }

    return 0;
  };

  this.vars = typeof vars != "undefined" ? vars : {};
  this.params = typeof params != "undefined" ? params : {};
  this.internal_params =
    typeof internal_params != "undefined" ? internal_params : {};
  this.iEVersion = this.getIEVersion();
  this.iOSVersion = this.getIOSVersion();
  this.isIE = this.iEVersion > 0;
  this.isIOS = this.iOSVersion > 0;
  this.isOpera = typeof window.opera !== "undefined";
  this.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
  this.visibilityInterval = null;
  this.visibilityDelay = 250;
  this.baseZindex = 10000;
  this.isMobile = false;
  this.isPPV = false;
  this.ticketsShown = false;
  this.twoFactorPassEmailShown = false;
  this.twoFactorNoMoreDevicesPageShown = false;
  this.twoFactorWaitPageShown = false;
  this.twoFactorCodePageShown = false;
  this.isDownloadable = false;
  this.documentAppend = false;

  var playButton = this.vars.play_button;
  var playButtonStyle = this.vars.play_button_style;
  var isPlayButtonEnabled =
    playButton !== "1" &&
    !parseInt(this.vars.no_controls, 10) &&
    playButtonStyle !== "static";

  this.vars.play_button =
    isPlayButtonEnabled || playButton === "1" ? "1" : playButton;
  this.vars.play_button_style = isPlayButtonEnabled
    ? "static"
    : playButtonStyle;
  this.vars.sleek_player = this.vars.sleek_player || "0";

  // TRACKING VARIABLES
  this.clipName = "";
  this.gaTrackingEnabled = false;
  this.gaTrackingCode = "";
  this.refCode = "";
  // END OF TRACKING VARIABLES

  //Internal variables
  this._d = document;
  this._w = window;
  this.player_id = null;
  this.defaultEventListeners = [
    "TIMELINE.PPV",
    "TIMELINE.DOWNLOAD",
    "TIMELINE.GA",
    "PLAYER.INITIALIZED",
    "PLAYHEAD.START",
    "CONFIRM.RESULT",
    "PPV.RESIZE",
    "PPV.DESTROY",
    "DOWNLOAD.DESTROY",
  ];
  this.flash_version = "9.0.0";
  this.express_install = "expressInstall.swf";
  this.player_content_html =
    '<a href="http://get.adobe.com/flashplayer/" target="_blank" class="svp_no_flash" style="width:100%;position:absolute;left:0;top:0;height:100%;background: #000;text-align:center;-webkit-transform-style: preserve-3d;-moz-transform-style:preserve-3d;transform-style:preserve-3d;">' +
    '<div id="svp_no_flash_layer' +
    this.vars.clip_id +
    '" style="position:relative; display:inline-block; color:#fff; overflow:hidden; margin:auto 10px; text-align:center; font-size:11px; font-family:Arial, Helvetica, sans-serif;  top: 50%;transform: translateY(-50%);-moz-transform: translateY(-50%);-webkit-transform: translateY(-50%);">' +
    '<p align="left" style="color:#fff;margin:0;padding:0;font-size:12px;line-height16px;">' +
    '<img border="0" src="' +
    this.site_root +
    'img/flash_icon.png" style="float:left; margin-right:11px;width:20vmin; max-width:80px;"/>' +
    '<b style="font-size:14px;">ADOBE FLASH PLAYER</b><br />' +
    "You must activate <b>ADOBE Flash Player</b> to watch this video.<br /><br />" +
    '<span style="color:#3ac9f8; text-decoration:none; font-size:11px; font-weight:bold;" >Activate Flash</span>' +
    "</p>" +
    "</div>" +
    "</a>";
  this.offlineDefaultBackground =
    '<g id="Layer_1"><rect x="0" fill="#F6F6F8" width="14.285%" height="100%"/><rect x="14.285%" fill="#ECE922" width="14.285%" height="100%"/><rect x="28.57%" fill="#64CAD8" width="14.285%" height="100%"/><rect x="42.855%" fill="#76C043" width="14.285%" height="100%"/><rect x="57.14%" fill="#B64D9F" width="14.285%" height="100%"/><rect x="71.425%" fill="#EE1D23" width="14.285%" height="100%"/><rect x="85.71%" fill="#37509D" width="14.285%" height="100%"/></g><g id="Layer_2"><rect x="0" y="70%" fill="#384EA9" width="14.285%" height="10%"/><rect x="14.285%" y="70%" fill="#010003" width="14.285%" height="10%"/><rect x="28.57%" y="70%" fill="#B6509C" width="14.285%" height="10%"/><rect x="42.855%" y="70%" fill="#010101" width="14.285%" height="10%"/><rect x="57.14%" y="70%" fill="#64C8D8" width="14.285%" height="10%"/><rect x="71.425%" y="70%" fill="#020403" width="14.285%" height="10%"/><rect x="85.71%" y="70%" fill="#EFEFEF" width="14.285%" height="10%"/></g><g id="Layer_3"><rect x="0" y="80%" fill="#013D59" width="16.6%" height="20%"/><rect x="16.6%" y="80%" fill="#F5F6F8" width="16.6%" height="20%"/><rect x="33.3%" y="80%" fill="#28246E" width="16.6%" height="20%"/><rect x="49.8%" y="80%" fill="#000201" width="16.6%" height="20%"/><rect x="66.4%" y="80%" fill="#3B3B3D" width="16.6%" height="20%"/><rect x="83%" y="80%" fill="#010101" width="16.9%" height="20%"/></g>';
  this.offlineCustomBackground =
    '<image preserveAspectRatio="none" xlink:href="data:image/jpg;base64,%imageBase64%" width="%width%px" height="%height%px" x="%x%" y="%y%"/>';
  this.offlineBox =
    '<rect width="%boxWidth%" height="%boxHeight%" x="%boxX%" y="%boxY%" rx="10" ry="10" fill="#000000" style="fill-opacity:0.6"/><text y="%titleY%" text-anchor="middle" x="50%" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-size: 32px; line-height: normal; font-family: Arial;"><tspan>%title%</tspan></text><text y="%subtitleY%" text-anchor="middle" x="50%" stroke="none" fill="#ffffff" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-size: 17px; line-height: normal; font-family: Arial;"><tspan>%description%</tspan></text>';
  this.posterSVG =
    '<svg style="overflow: hidden; position: relative;" version="1.1" id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 %width% %height%" preserveAspectRatio="none">%offlineBackground%%offlineBox%</svg>';

  this.isHTML5Player =
    typeof window.MediaSource !== "undefined" || this.iOSVersion > 9;

  this.transformInputParameters = function (params) {
    var out_params = [];
    for (var x in params) {
      out_params[x] = eval("(typeof(" + params[x] + ') != "undefined");')
        ? eval(params[x])
        : undefined;
    }
    return out_params;
  };
  this.getWindowSize = function () {
    return [
      this._w.innerWidth || this._d.documentElement.clientWidth,
      this._w.innerHeight || this._d.documentElement.clientHeight,
    ];
  };
  this.getDocumentSize = function () {
    var documentWidth = Math.max(
      Math.max(this._d.body.scrollWidth, this._d.documentElement.scrollWidth),
      Math.max(this._d.body.offsetWidth, this._d.documentElement.offsetWidth),
      Math.max(this._d.body.clientWidth, this._d.documentElement.clientWidth)
    );
    var documentHeight = Math.max(
      Math.max(this._d.body.scrollHeight, this._d.documentElement.scrollHeight),
      Math.max(this._d.body.offsetHeight, this._d.documentElement.offsetHeight),
      Math.max(this._d.body.clientHeight, this._d.documentElement.clientHeight)
    );
    return [documentWidth, documentHeight];
  };
  (this.getWindowScrollXY = function () {
    var windowScrollX = 0,
      windowScrollY = 0;
    if (typeof window.pageYOffset == "number") {
      //Netscape compliant
      windowScrollY = window.pageYOffset;
      windowScrollX = window.pageXOffset;
    } else if (
      document.body &&
      (document.body.scrollLeft || document.body.scrollTop)
    ) {
      //DOM compliant
      windowScrollY = document.body.scrollTop;
      windowScrollX = document.body.scrollLeft;
    } else if (
      document.documentElement &&
      (document.documentElement.scrollLeft ||
        document.documentElement.scrollTop)
    ) {
      //IE6 standards compliant mode
      windowScrollY = document.documentElement.scrollTop;
      windowScrollX = document.documentElement.scrollLeft;
    }
    return [windowScrollX, windowScrollY];
  }),
    (this.getObject = function (id) {
      var object = null;
      if (this._d.getElementById) {
        object = this._d.getElementById(id);
      } else if (this._d.layers) {
        object = this._d.layers[id];
      } else if (this._d.all) {
        object = this._d.all[id];
      }
      return object;
    }),
    (this.createElement = function (nodeName, name, id, style) {
      var node;
      try {
        var attributes = "";
        if (typeof name != "undefined") attributes += ' name="' + name + '"';
        if (typeof id != "undefined") attributes += ' id="' + id + '"';
        if (typeof style != "undefined") attributes += ' style="' + style + '"';
        node = this._d.createElement("<" + nodeName + attributes + ">");
      } catch (e) {
        node = this._d.createElement(nodeName);
        if (typeof name != "undefined") node.setAttribute("name", name);
        if (typeof id != "undefined") node.setAttribute("id", id);
        if (typeof style != "undefined") node.setAttribute("style", style);
      }
      return node;
    }),
    (this.getElementPosition = function (element) {
      var x = 0,
        y = 0;
      if (
        typeof element.x !== "undefined" &&
        typeof element.y !== "undefined"
      ) {
        x += element.x;
        y += element.y;
      } else {
        do {
          x += element.offsetLeft;
          y += element.offsetTop;
          element = element.offsetParent;
        } while (element !== null);
      }
      return [x, y];
    }),
    (this.parseVars = function (vars) {
      this.checkParsedVars(this.transformInputParameters(vars));
    }),
    (this.checkParsedVars = function (vars) {
      //Required variables
      this.vars.clip_id =
        typeof vars.clip_id === "undefined" ? 0 : vars.clip_id;

      //Optional variables
      this.vars.color =
        typeof vars.player_color === "undefined"
          ? "#9C9EA4"
          : vars.player_color;
      this.vars.color1 =
        typeof vars.player_color1 === "undefined"
          ? "#FCF6FC"
          : vars.player_color1;
      if (this.vars.colorHighlight) this.vars.color1 = this.vars.colorHighlight;
      if (this.vars.colorBase) this.vars.color2 = this.vars.colorBase;
      this.vars.color_ratio =
        typeof vars.player_color_ratio === "undefined"
          ? "0.6"
          : vars.player_color_ratio;
      this.vars.is_ssl =
        typeof vars.is_ssl !== "undefined" ? vars.is_ssl : this.is_ssl;
      this.vars.inlineIPhone =
        typeof vars.inlineIPhone === "undefined"
          ? false
          : Boolean(vars.inlineIPhone);
      this.vars.aspect_ratio =
        typeof vars.aspect_ratio === "undefined" ? "" : vars.aspect_ratio;
      this.vars.custom_url =
        typeof vars.custom_url !== "undefined" && vars.custom_url !== ""
          ? vars.custom_url
          : undefined;
      this.vars.custom_poster =
        typeof vars.custom_poster !== "undefined" && vars.custom_poster !== ""
          ? vars.custom_poster
          : undefined;

      var alpha = typeof vars.alpha === "undefined" ? false : vars.alpha;
      var stretch_video =
        typeof vars.stretch_video === "undefined" ? 0 : vars.stretch_video;
      var pause = typeof vars.pause === "undefined" ? true : vars.pause != "0";
      var repeat =
        typeof vars.repeat === "undefined" || vars.repeat == "0"
          ? false
          : vars.repeat;

      this.vars.autoHide =
        typeof vars.auto_hide === "undefined" || vars.auto_hide === ""
          ? "0"
          : vars.auto_hide;
      this.vars.brandNW =
        typeof vars.brand_new_window === "undefined" ||
        vars.brand_new_window === ""
          ? "1"
          : vars.brand_new_window;
      if (pause) this.vars.autoStart = "0";
      else this.vars.autoStart = "1";

      var start_img =
        typeof vars.start_img === "undefined" ? 0 : vars.start_img;
      if (start_img) this.vars.start_img = start_img;

      var start_volume =
        typeof vars.start_volume === "undefined" ? "" : vars.start_volume;
      if (start_volume) this.vars.start_volume = start_volume;

      var transparent =
        typeof vars.transparent === "undefined" ? true : vars.transparent;
      if (transparent === "false") transparent = false;

      var direct = typeof vars.direct === "undefined" ? false : vars.direct;
      if (direct === "false") direct = false;
      this.direct = direct;

      no_fullscreen =
        typeof vars.no_fullscreen === "undefined" || vars.no_fullscreen == "0"
          ? false
          : vars.no_fullscreen;
      no_fs =
        typeof vars.no_fs === "undefined" || vars.no_fs == "0"
          ? false
          : vars.no_fs;
      no_controls =
        typeof vars.no_controls === "undefined"
          ? 0
          : parseInt(vars.no_controls, 10);
      true_fullscreen =
        typeof vars.fs_mode === "undefined" ? false : vars.fs_mode == "1";
      native_fullscreen =
        typeof vars.fs_mode === "undefined" ? false : vars.fs_mode == "2";
      this.only_fs = typeof vars.only_fs === "undefined" ? false : vars.only_fs;
      if (no_controls === 1) {
        no_fullscreen = true;
      }

      if (this.internal_params.skin == "3") {
        var no_fs =
          typeof vars.no_fs === "undefined" || parseInt(vars.no_fs, 10) === 1;
        var no_fullscreen =
          typeof vars.no_fullscreen === "undefined" ||
          parseInt(vars.no_fullscreen, 10) === 1;

        if (no_fs && no_fullscreen && vars.fs_mode !== "2") {
          vars.fs_mode = "0";
        } else {
          vars.fs_mode = "2";
        }
      }

      if (no_fullscreen) this.player_fullscreen_mode = "NONE";
      this.player_keep_state_on_resize = true;

      if (!this.only_fs) {
        this.params.quality = "high";

        if (direct) {
          this.params.wmode = "direct";
        } else if (transparent) {
          this.params.wmode = "transparent";
        } else if (native_fullscreen) {
          this.params.wmode = "window";
        } else {
          this.params.wmode = "opaque";
        }
        if (native_fullscreen) {
          this.params.allowFullScreen = "true";
          this.vars.native_fs = "1";
        }

        if (alpha) this.vars.alphaPlayer = "1";
        if (repeat) this.vars.repeatVideo = "1";
        if (stretch_video) this.vars.stretch_video = "1";
        if (no_fullscreen) this.vars.no_fs = "1";

        if (!no_fullscreen) {
          if (typeof vars.fs_mode == "undefined") {
            this.player_fullscreen_mode = "NONE";
          } else if (!vars.fs_mode) {
            this.player_fullscreen_mode = "FIXED";
            if (
              !isNaN(this.player_width) &&
              !isNaN(this.player_height) &&
              vars.force_size === "true"
            ) {
              this.player_fs_height = parseInt(this.player_height, 10);
              this.player_fs_width = parseInt(this.player_width, 10);
            } else {
              this.player_fs_height = this.def_big_player_height;
              this.player_fs_width = this.def_big_player_width;
            }
          } else if (vars.fs_mode == "1") {
            this.player_fullscreen_mode = "FILL";
            this.params.wmode = "transparent";
          } else {
            this.player_fullscreen_mode = "NATIVE";
          }
        }
        if (no_controls === 1) {
          this.vars.noControls = no_controls;
        }
      } else {
        this.vars.fullscreen = "1";
        if (
          typeof vars.fs_mode == "undefined" ||
          !vars.fs_mode ||
          this.vars.fs_popin === "1"
        ) {
          this.player_fullscreen_mode = "FIXED";
          if (
            !isNaN(this.player_width) &&
            !isNaN(this.player_height) &&
            vars.force_size === "true"
          ) {
            this.player_fs_height = parseInt(this.player_height, 10);
            this.player_fs_width = parseInt(this.player_width, 10);
          } else {
            this.player_fs_height = this.def_big_player_height;
            this.player_fs_width = this.def_big_player_width;
          }
        } else {
          this.player_fullscreen_mode = "FILL";
          this.params.wmode = "transparent";
        }
      }
      if (typeof vars.bg_color !== "undefined")
        this.player_background_color = vars.bg_color;
      var location = "";
      try {
        location = self.location.href;
      } catch (e) {}
      this.vars.page =
        typeof this.vars.page !== "undefined"
          ? this.vars.page
          : encodeURIComponent(location);
      if (
        typeof vars.player_align !== "undefined" &&
        vars.player_align !== "" &&
        vars.player_align !== "NONE"
      ) {
        this.player_align = vars.player_align;
        this.player_keep_state_on_scroll = true;
      }
      if (typeof vars.offset_x !== "undefined" && vars.offset_x !== "")
        this.player_offset_x = vars.offset_x;
      if (typeof vars.offset_y !== "undefined" && vars.offset_y !== "")
        this.player_offset_y = vars.offset_y;
      if (typeof vars.bg_transp !== "undefined" && vars.bg_transp !== "")
        this.player_background_transparency = vars.bg_transp;
      if (typeof vars.prebuffer !== "undefined" && vars.prebuffer !== "")
        this.vars.preLoad = vars.prebuffer;
      if (typeof vars.rid !== "undefined") this.vars.rid = vars.rid;
      if (typeof vars.ext !== "undefined") this.vars.ext = vars.ext;
      if (typeof vars.referer !== "undefined")
        this.vars.referer = encodeURIComponent(vars.referer);
      if (typeof vars.preview !== "undefined")
        this.vars.is_preview = vars.preview;
      if (typeof vars.start_volume !== "undefined" && vars.start_volume !== "")
        this.vars.start_volume = vars.start_volume;
      if (typeof vars.close_button !== "undefined" && vars.close_button !== "")
        this.vars.close_button = vars.close_button;
      if (typeof vars.debug === "undefined" || vars.debug === "false")
        vars.debug = 0;
      if (vars.debug === "true") vars.debug = 1;
      this.vars.debug = Number(vars.debug);
      this.vars.noHlsBilling = "1";
      this.params.allowScriptAccess = "always";
      this.params.allowNetworking = "all";
      this.params.LOOP = "false";
      this.params.swLiveConnect = "true";
      this.params.bgcolor = "#000000";
      if (typeof vars.pbgcolor != "undefined")
        this.params.bgcolor = vars.pbgcolor;
      this.is_responsive =
        typeof vars.is_responsive !== "undefined" &&
        vars.is_responsive === "true";
      if (this.is_responsive) {
        var container = document.getElementById(this.internal_params.use_div);
        if (container.getAttribute("data-initialized") !== null) {
          return;
        }

        container.style.width = "100%";

        if (this.vars.aspect_ratio === "adaptive") {
          container.style.height = "100%";

          return;
        }

        var width = container.offsetWidth,
          height = container.offsetHeight;
        var attributes = this.vars.aspect_ratio.split(":");
        if (height === 0) {
          if (width === 0) width = 16;
          height = width / (16 / 9);
        }
        if (attributes.length === 2) {
          width = parseInt(attributes[0], 10);
          height = parseInt(attributes[1], 10);
        }

        container.style.height = "auto";
        container.style.paddingTop = (height / width) * 100 + "%";
      }

      var autoPlay = Number(this.vars.auto_play);
      var autoPlayType = this.vars.auto_play_type;

      if (autoPlay > 0 && autoPlayType === "mute") {
        this.vars.pause = "0";
        this.vars.autoStart = "1";
        this.vars.start_volume = "0";
      }

      if (autoPlay === 1) {
        this.vars.pause = "0";
        this.vars.autoStart = "1";
      }
    });
  (this.parseInternalParams = function (internal_params) {
    this.checkParsedInternalParams(
      this.transformInputParameters(internal_params)
    );
  }),
    (this.checkParsedInternalParams = function (internal_params) {
      if (typeof this.player_height == "undefined" || !this.player_height) {
        this.player_height =
          typeof internal_params.player_height == "undefined"
            ? this.def_player_height
            : internal_params.player_height;
      }
      if (typeof this.player_width == "undefined" || !this.player_width) {
        this.player_width =
          typeof internal_params.player_width == "undefined"
            ? this.def_player_width
            : internal_params.player_width;
      }
      var skin =
        typeof internal_params.skin == "undefined"
          ? this.def_player_skin
          : internal_params.skin;
      if (
        typeof this.player_object_id == "undefined" ||
        !this.player_object_id
      ) {
        this.player_object_id =
          typeof internal_params.use_div == "undefined"
            ? ""
            : internal_params.use_div;
      }
      this.player_url = this.site_root + "player" + skin + ".swf";
      this.player_controls_height =
        typeof internal_params.player_controls_height == "undefined"
          ? this.def_player_controls_height
          : internal_params.player_controls_height;
      if (
        typeof internal_params.auto_show != "undefined" &&
        internal_params.auto_show == "false"
      )
        this.auto_show = false;
    });
  this.init = function () {
    var player_content = null;
    this.use_existing_div = true;
    if (
      typeof this.player_object_id === "undefined" ||
      !this.player_object_id
    ) {
      this.use_existing_div = false;
      this.player_id =
        "svp_" +
        (typeof this.vars.clip_id == "undefined"
          ? Math.floor(Math.random() * 100000000001)
          : this.vars.clip_id);
    } else if (this.need_new_layer) {
      this.player_id =
        this.player_align != "NONE"
          ? this.player_object_id
          : "svp_" + this.player_object_id;
    } else {
      this.player_id = "svp_" + this.player_object_id;
      var player_wrapper = null;
      var width = isNaN(this.player_width)
        ? this.player_width
        : this.player_width + "px";
      var height = isNaN(this.player_height)
        ? this.player_height
        : this.player_height + "px";
      if (!this.is_responsive) {
        var style =
          "position:relative;width:" + width + ";" + "height:" + height + ";";

        if (this.vars.sleek_player !== "0") {
          style +=
            "box-shadow:0 20px 22px -8px rgba(48,48,48,.4);border-radius:4px;overflow:hidden";
        }

        player_wrapper = this.createElement(
          "div",
          "wrapper_" + this.player_id,
          "wrapper_" + this.player_id,
          style
        );
      }
      player_content = this.createElement(
        "div",
        this.player_id,
        this.player_id,
        "width:100%;height:100%;position:absolute;left:0;top:0;"
      );
      var object = this.getObject(this.player_object_id);
      if (object !== null) {
        if (object.getAttribute("data-initialized") !== null) {
          return;
        }
        object.setAttribute("data-initialized", "true");
        player_content.innerHTML = object.innerHTML;
        object.innerHTML = "";
        if (!this.is_responsive) {
          player_wrapper.appendChild(player_content);
          object.appendChild(player_wrapper);
        } else {
          object.appendChild(player_content);
        }
      }
    }
    if (typeof this.vars.rid === "undefined")
      this.vars.rid =
        new Date().getTime() + Math.floor(Math.random() * 100000000001);

    this.attributes = {
      id: this.player_id,
      name: this.player_id,
      style: "position: absolute; top: 0; left: 0;",
    };
    //create player div layer
    if (!this.only_fs && this.need_new_layer) {
      if (this.player_align !== "NONE") {
        player_content = this.getObject(this.player_object_id);
      } else {
        player_content = this.createElement(
          "div",
          this.player_id,
          this.player_id
        );
      }
      if (this.player_keep_state_on_scroll) {
        this.static_div = this.createElement(
          "div",
          "static_" + this.player_id,
          "static_" + this.player_id,
          "width:" +
            this.player_width +
            "px" +
            ";" +
            "height:" +
            this.player_height +
            "px" +
            ";"
        );
        this.static_div.style.position = "fixed";
        this.static_div.style.zIndex = ++SvpPlayerIndexes + this.baseZindex;

        this.static_div.appendChild(player_content);
        this._d.body.insertBefore(this.static_div, this._d.body.childNodes[0]);
      } else {
        this._d.body.appendChild(player_content);
      }
    }
    if (
      this.use_existing_div &&
      this.need_new_layer &&
      this.player_align === "NONE"
    ) {
      var params = this.getElementPosition(
        this.getObject(this.player_object_id)
      );
      this.player_offset_left = params[0];
      this.player_offset_top = params[1];
    }

    SvpPlayerInstances.registerInstance(this.vars.rid, this);
    if (!this.auto_show) {
      this.getObject(this.player_id).style.display = "none";
      if (this.static_div) this.static_div.style.display = "none";
    } else if (!this.only_fs) this.embedPlayer();
    this.executePlayerEvent("PLAYER.INIT", true);
  };
  this.onResize = (function (self) {
    return function (e) {
      self.resize(e);
    };
  })(this);
  this.bindPlayerEvents = function (events) {
    var i = 0;
    var length = events.length;
    for (; i < length; i++) {
      this.addPlayerEventListener(events[i], this.onPlayerEvent);
    }
  };
  this.sendGaEvent = function () {
    if (typeof window._gaq._getAsyncTracker !== "undefined") {
      _gaq.push(["_setAccount", this.gaTrackingCode]);
      _gaq.push(["_trackEvent", "Videos Played", this.refCode, this.clipName]);
    } else {
      var that = this;
      setTimeout(function () {
        that.sendGaEvent();
      }, 50);
    }
  };
  this.onPlayerEvent = function (event, object, type) {
    if (type === "TIMELINE.GA") {
      var eventData = event.split(",");
      if (eventData[0].length > 0) {
        object.gaTrackingEnabled = true;
        object.gaTrackingCode = eventData[0];
        object.clipName = eventData[1];
        object.refCode = eventData[2];
        (function () {
          var ga = document.createElement("script");
          ga.type = "text/javascript";
          ga.async = true;
          ga.src =
            (object.is_ssl ? "https://ssl" : "http://www") +
            ".google-analytics.com/ga.js";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(ga, s);
        })();
      }
    } else if (type === "PLAYHEAD.START" && object.gaTrackingEnabled === true) {
      object.sendGaEvent();
    } else if (type === "TIMELINE.PPV" || type === "TIMELINE.DOWNLOAD") {
      var r = object.staticCache === false ? "?v=" + new Date().getTime() : "";
      var eventParams = event.split(",");
      var eventCat = type.split(".")[1];
      svpJSLoader.JS.load(
        object.site_root + "js/dplayerUtils.js",
        r,
        function () {
          svpDplayerUtils.SETTINGS.cache = object.staticCache;
          svpDplayerUtils.CORE.init(
            object.site_root,
            function () {
              var params = {};
              if (eventCat === "PPV") {
                params.layout = parseInt(eventParams[0], 10);
                if (object.html_playlist !== true) params.layout = 1;
                if (
                  object.params.wmode !== "transparent" &&
                  object.html5_player_locked !== true
                )
                  params.hide_bg = 1;
                if (
                  object.html5_player_locked === true &&
                  object.html_playlist !== true
                )
                  params.close = 0;
                params.is_live =
                  typeof eventParams[1] !== "undefined"
                    ? parseInt(eventParams[1], 10)
                    : 0;
                params.bg_image =
                  typeof eventParams[2] !== "undefined"
                    ? eventParams[2]
                    : false;
                params.tmode =
                  typeof eventParams[3] !== "undefined"
                    ? parseInt(eventParams[3], 10)
                    : 0;
                svpDplayerUtils.PPV.init(params, object);
              } else if (eventCat === "DOWNLOAD") {
                svpDplayerUtils.DL.init(params, object, "");
                object.isDownloadable = true;
              }
            },
            function (e) {
              alert(
                "There is a problem with initialization of utils library. Please try again in a few minutes." +
                  e
              );
            }
          );
        },
        function (e) {
          alert(
            "There is a problem with loading of utils library. Please try again in a few minutes." +
              e
          );
        }
      );
    } else if (type === "CONFIRM.RESULT") {
      var att = event.split(":"),
        s = typeof att[0] !== "undefined" ? unescape(att[0]) : "",
        ed =
          typeof att[1] !== "undefined"
            ? unescape(att[1]).replace(/&amp;/g, "&").split(";")
            : "",
        m = typeof att[2] !== "undefined" ? unescape(att[2]) : "";
      var d = {};
      for (var i = 0; i < ed.length; i++) {
        var val = ed[i].split("=");
        var idx = val.shift();
        d[idx] = val.join("=");
      }
      if (d.code === "PPV")
        svpDplayerUtils.PPV.confirmResponse(object, d.code, s, m);
      else if (d.code === "DL") {
        var iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        iframe.src = d.storage_link;
      }
    } else if (
      type === "PPV.RESIZE" &&
      typeof svpDplayerUtils !== "undefined" &&
      object.isPPV
    ) {
      svpDplayerUtils.PPV.resize(object);
    } else if (
      type === "PPV.DESTROY" &&
      typeof svpDplayerUtils !== "undefined" &&
      object.isPPV
    ) {
      svpDplayerUtils.PPV.destroy(object);
    } else if (
      type === "DOWNLOAD.DESTROY" &&
      typeof svpDplayerUtils !== "undefined" &&
      object.isDownloadable
    ) {
      svpDplayerUtils.DL.destroy(object);
    }
  };
  this.addListener = function (elem, evt, func) {
    if (
      elem === this._w &&
      evt === "load" &&
      document.readyState === "complete"
    ) {
      func();
      return true;
    }
    if (elem.addEventListener) {
      //W3C DOM
      elem.addEventListener(evt, func, false);
      return true;
    } else if (elem.attachEvent) {
      //IE DOM
      var r = elem.attachEvent("on" + evt, func);
      return r;
    }
    return false;
  };
  this.removeListener = function (elem, evt, func) {
    if (elem.removeEventListener) {
      //W3C DOM
      elem.removeEventListener(evt, func, false);
      return true;
    } else if (elem.detachEvent) {
      //IE DOM
      var r = elem.detachEvent("on" + evt, func);
      return r;
    }
    return false;
  };
  this.createCSS = function (css) {
    this.style = this._d.createElement("style");
    this.style.setAttribute("type", "text/css");
    this.style.setAttribute("media", "screen");
    this.style.setAttribute("id", "svp_style_sheet_" + this.player_id);
    var valid = true;
    if (this.style.styleSheet) {
      //IE
      try {
        this.style.styleSheet.cssText = css;
      } catch (e) {
        valid = false;
      }
    } else {
      //the world
      var styleText = this._d.createTextNode(css);
      try {
        this.style.appendChild(styleText);
      } catch (e) {
        valid = false;
      }
    }
    if (valid) {
      this.head = this._d.getElementsByTagName("head")[0];
      this.head.appendChild(this.style);
    }
  };
  this.removeCSS = function () {
    if (typeof this.head !== "undefined") {
      this.head.removeChild(this.style);
    }
  };
  this.openFullscreen = function () {
    //cache current values
    this.player_in_fs_mode = true;
    this.cached_width = this.player_width;
    this.cached_height = this.player_height;
    this.cached_align = this.player_align;
    this.cached_offset_left = this.player_offset_left;
    this.cached_offset_top = this.player_offset_top;
    this.cached_overflow = this._d.body.style.overflow;

    var windowSizes = null;
    var windowScrolling = this.getWindowScrollXY();
    this.cached_scroll_x = windowScrolling[0];
    this.cached_scroll_y = windowScrolling[1];

    this._d.body.style.overflow = "hidden";

    if (
      (this.player_fullscreen_mode === "FIXED" ||
        this.player_fullscreen_mode === "FILL") &&
      (this.isIE || this.isOpera)
    ) {
      this.createCSS("html {overflow:hidden;}");
    }

    this.background_id = "player_background_" + this.player_id;
    var popPlayerContainer = document.getElementById(this.background_id);

    if (
      !popPlayerContainer &&
      this.player_background_color !== "" &&
      this.player_fullscreen_mode !== "FILL"
    ) {
      windowSizes = this.getWindowSize();
      windowWidth = windowSizes[0];
      windowHeight = windowSizes[1];
      var sizes = this.getWindowScrollXY();
      var transparency = this.player_background_transparency;
      if (transparency > 100) transparency = 100;
      if (transparency < 0) transparency = 0;
      transparency = 100 - transparency;
      if (this.isIE)
        transparency_string =
          "filter:alpha(opacity=" +
          transparency +
          ");opacity:" +
          transparency / 100;
      else transparency_string = "opacity:" + transparency / 100;
      // var z = ++SvpPlayerIndexes + this.baseZindex;
      var z = this.player_instance.style.zIndex
        ? this.player_instance.style.zIndex - 1
        : ++SvpPlayerIndexes + this.baseZindex;
      this.background_content = this.createElement(
        "div",
        this.background_id,
        this.background_id,
        "margin:0;width:" +
          windowWidth +
          "px;height:" +
          windowHeight +
          "px;top:" +
          sizes[1] +
          "px;left:" +
          sizes[0] +
          "px;z-index:" +
          z +
          ";overflow:hidden;position:absolute;background-color:" +
          this.player_background_color +
          ";" +
          transparency_string +
          ";"
      );
      this._d.body.appendChild(this.background_content);
      var thisObject = this;

      if (
        this.player_fullscreen_mode === "FIXED" &&
        this.vars.fs_popin == "1"
      ) {
        this.background_content.onclick = function () {
          ClosePlayer(thisObject.vars.rid);
        };
      }
    }

    if (this.player_fullscreen_mode == "DOUBLE") {
      this.player_width *= 2;
      this.player_height *= 2;
      this.player_align = "MC";
      this.player_offset_left = undefined;
      this.player_offset_top = undefined;
    } else if (this.player_fullscreen_mode == "FIXED") {
      this.defineFixedSizes();
      this.player_align = "MC";
      this.player_offset_left = undefined;
      this.player_offset_top = undefined;
    } else if (this.player_fullscreen_mode == "FILL") {
      this.player_align = "NONE";
      this.player_offset_left = undefined;
      this.player_offset_top = undefined;

      windowSizes = this.getWindowSize();
      windowWidth = windowSizes[0];
      windowHeight = windowSizes[1];
      this.player_width = windowWidth;
      this.player_height = windowHeight;
      this._w.scrollTo(0, 0);
    }
    if (this.flashActive) this.positionPlayer();
  };
  this.closeFullscreen = function () {
    this.player_in_fs_mode = false;

    if (
      this.player_background_color !== "" &&
      this.player_fullscreen_mode !== "FILL" &&
      this.background_content
    ) {
      this._d.body.removeChild(this.background_content);
      delete this.background_content;
    }
    if (
      (this.player_fullscreen_mode === "FILL" ||
        this.player_fullscreen_mode === "FIXED") &&
      (this.isIE || this.isOpera)
    )
      this.removeCSS();
    if (this.player_fullscreen_mode === "FILL")
      this._w.scrollTo(this.cached_scroll_x, this.cached_scroll_y);

    this._d.body.style.overflow = this.cached_overflow;
    this.player_width = this.cached_width;
    this.player_height = this.cached_height;
    this.player_align = this.cached_align;
    this.player_offset_left = this.cached_offset_left;
    this.player_offset_top = this.cached_offset_top;

    this.positionPlayer();
  };
  this.execute = function () {
    this.need_new_layer =
      this.player_align !== "NONE" ||
      (this.player_fullscreen_mode !== "NONE" &&
        this.player_fullscreen_mode !== "NATIVE");
    if (!this.need_new_layer) {
      this.init();
    } else {
      if (!this.auto_show) {
        this.getObject(this.internal_params.use_div).style.display = "none";
      }
      this.addListener(this._w, "load", this.onLoad);
    }
  };
  this.onLoad = (function (self) {
    return function (e) {
      self.init();
    };
  })(this);
  this.defineFixedSizes = function () {
    var windowSizes = this.getWindowSize();
    windowWidth = windowSizes[0];
    windowHeight = windowSizes[1];

    var proportion = this.player_fs_width / this.player_fs_height;
    this.player_width = this.player_fs_width;
    this.player_height = this.player_fs_height;

    if (this.player_width > windowWidth) {
      this.player_width = windowWidth;
      this.player_height = Math.floor(this.player_width / proportion);
    }
    if (this.player_height > windowHeight) {
      this.player_height = windowHeight;
      this.player_width = Math.floor(this.player_height * proportion);
    }
  };
  this.resize = function (e) {
    var windowSizes = null;
    if (this.player_instance !== null) {
      if (this.player_in_fs_mode === true) {
        if (this.player_fullscreen_mode === "FILL") {
          windowSizes = this.getWindowSize();
          windowWidth = windowSizes[0];
          windowHeight = windowSizes[1];
          this.player_width = windowWidth;
          this.player_height = windowHeight;
        } else if (this.player_fullscreen_mode === "FIXED") {
          this.defineFixedSizes();
          windowSizes = this.getWindowSize();
          windowWidth = windowSizes[0];
          windowHeight = windowSizes[1];
          this.background_content.style.width = windowWidth + "px";
          this.background_content.style.height = windowHeight + "px";
        }
      } else {
        if (this.player_align == "NONE") {
          if (this.player_object_id) {
            var pos = this.getElementPosition(
              this.getObject(this.player_object_id)
            );
            this.player_offset_left = pos[0];
            this.player_offset_top = pos[1];
          }
        }
      }
      this.positionPlayer();
    }
  };
  this.positionPlayer = function () {
    var offsetLeft = 0,
      offsetTop = 0;

    if (
      typeof this.player_offset_left !== "undefined" &&
      typeof this.player_offset_top !== "undefined"
    ) {
      offsetLeft = this.player_offset_left;
      offsetTop = this.player_offset_top;
    } else if (this.player_align !== "NONE") {
      var windowSizes = this.getWindowSize();
      var documentSizes = this.getDocumentSize();
      var windowWidth = Math.min(documentSizes[0], windowSizes[0]);
      var windowHeight = Math.min(documentSizes[1], windowSizes[1]);

      if (
        this.player_align === "TL" ||
        this.player_align === "ML" ||
        this.player_align === "BL"
      ) {
        offsetLeft = 0 + Math.floor(this.player_offset_x);
      } else if (
        this.player_align === "TC" ||
        this.player_align === "MC" ||
        this.player_align === "BC"
      ) {
        offsetLeft =
          Math.floor(
            (Math.floor(windowWidth) - Math.floor(this.player_width)) / 2
          ) + Math.floor(this.player_offset_x);
      } else {
        offsetLeft =
          Math.floor(windowWidth) -
          Math.floor(this.player_width) -
          Math.floor(this.player_offset_x);
      }

      if (
        this.player_align === "TL" ||
        this.player_align === "TC" ||
        this.player_align === "TR"
      ) {
        offsetTop = 0 + Math.floor(this.player_offset_y);
      } else if (
        this.player_align === "ML" ||
        this.player_align === "MC" ||
        this.player_align === "MR"
      ) {
        offsetTop =
          (Math.floor(windowHeight) - Math.floor(this.player_height)) / 2 +
          Math.floor(this.player_offset_y);
      } else {
        offsetTop =
          Math.floor(windowHeight) -
          Math.floor(this.player_height) -
          Math.floor(this.player_offset_y);
      }

      if (
        this.player_fullscreen_mode === "FIXED" &&
        this.player_align !== "NONE"
      ) {
        var windowScrolling = this.getWindowScrollXY();
        offsetLeft += windowScrolling[0];
        offsetTop += windowScrolling[1];
      }
    }

    if (this.player_keep_state_on_scroll) {
      if (this.isIE && this.iEVersion <= 6) {
        var style =
          " {position:absolute;top:expression(0+((e=document.documentElement.scrollTop)?e:document.body.scrollTop)+'px');left: expression(0+((e=document.documentElement.scrollLeft)?e:document.body.scrollLeft)+'px');}";
        this.createCSS("#" + this.player_instance.id + style);
        this.createCSS("#" + this.static_div.id + style);

        this.static_div.style.top = offsetTop + "px";
        this.static_div.style.left = offsetLeft + "px";
        this.static_div.style.position = "absolute";
      } else {
        this.static_div.style.top = offsetTop + "px";
        this.static_div.style.left = offsetLeft + "px";
      }
    } else {
      if (this.player_instance !== null) {
        this.player_instance.style.position = "absolute";
        this.player_instance.style.left = offsetLeft + "px";
        this.player_instance.style.top = offsetTop + "px";

        this.player_instance.style.width = this.player_width + "px";
        this.player_instance.style.height = this.player_height + "px";
      }

      if (this.html5_player_instance !== null) {
        this.html5_player_instance.style.width = this.player_width + "px";
        this.html5_player_instance.style.height = this.player_height + "px";
      }
    }
    this.executePlayerEvent("PLAYER.POSITION_CHANGED", true);
  };
  this.embedPlayer = function () {
    if (this.only_fs && !document.getElementById("svp_player-container")) {
      var player_content = this.createElement(
        "div",
        this.player_id,
        this.player_id
      );
      player_content.innerHTML = this.player_content_html;
      this._d.body.appendChild(player_content);
    }
    if (this.vars.fs_popin === "1") {
      delete this.vars.only_fs;
      if (!this.direct) this.params.wmode = "window";
      else this.params.wmode = "direct";
      this.params.allowFullScreen = "true";
      delete this.vars.fullscreen;
    }
    if (this.isHTML5Player) {
      var player = new SVPHTML5Player(this);

      return;
    }
    this.vars.testHttpURL = "http://socket.webvideocore.net:82/";
    SvpSwfObject.get().embedSWF(
      this.player_url,
      this.player_id,
      "100%",
      "100%",
      this.flash_version,
      this.express_install,
      this.vars,
      this.params,
      this.attributes,
      this.onSuccessEmbed
    );
  };
  this.translateVars = function () {
    return {
      servicesEntry: this.services_entry,
      confirmEntry: this.confirm_entry,
      logsEntry: this.logs_entry,
      staticRoot: this.site_root,
      isPopin: Number(this.vars.fs_popin) === 1,
      autoplay: this.vars.autoStart === "1",
      autoHideControls: this.vars.autoHide === "1",
      brandNewWindow: this.vars.brandNW === "1",
      closeButton: this.vars.close_button === "1",
      clipId: this.vars.clip_id,
      rid: this.vars.rid,
      colorBase: this.vars.colorBase,
      colorHover: this.vars.colorHighlight,
      colorText: this.vars.colorIcon,
      bgColor1: this.vars.bg_color1,
      bgColor2: this.vars.bg_color2,
      shareOptions: this.vars.share_options || "",
      opacity: this.vars.skinAlpha / 100,
      fullscreenToggle: parseInt(this.vars.fs_mode, 10) === 2,
      controls: this.vars.no_controls !== "1",
      playButton: this.vars.play_button !== "0",
      playButtonStyle: this.vars.play_button_style,
      sleekPlayer: this.vars.sleek_player !== "0",
      loop: this.vars.repeat === "1",
      volume: parseInt(this.vars.start_volume, 10),
      stretch: this.vars.stretch_video === "1",
      minViewers: parseInt(this.vars.viewers_limit, 10),
      threeColorsMode: true,
      preview: this.vars.is_preview,
      params: this.vars.params,
      page: this.vars.page,
      floating_player: this.vars.floating_player,
      customUrl: this.vars.custom_url,
      customPoster: this.vars.custom_poster,
      videoPosterFollowControls: this.vars.video_poster_follow_controls === "1",
      debug: this.vars.debug,
      disabledTimedPPV: this.isIOS && this.iOSVersion < 12,
      livePosterOptions: {
        offlineDefaultBackground: this.offlineDefaultBackground,
        offlineCustomBackground: this.offlineCustomBackground,
        offlineBox: this.offlineBox,
        posterSVG: this.posterSVG,
      },
    };
  };
  this.iPlatformVideoData = function (videoID) {
    var head = this._d.getElementsByTagName("head")[0];
    var script = this._d.createElement("script");
    var id = typeof videoID !== "undefined" ? videoID : this.vars.clip_id;
    script.id = "ajax_video_path";
    script.src =
      this.services_entry +
      "index.php?l=info&a=ajax_video_info&file=" +
      id +
      "&rid=" +
      this.vars.rid +
      "&page=" +
      this.vars.page +
      "&preview=" +
      this.vars.is_preview;
    head.appendChild(script);
  };
  this.confirmClose = function () {
    if (this.html5_player_locked === true)
      this.buildVideoTag(
        this.services_entry + "index.php?l=info&a=404",
        this.real_image_src
      );
  };
  this.confirmComplete = function () {
    if (this.html5_player_locked === true)
      this.buildVideoTag(this.real_video_src, this.real_image_src);
  };
  this.buildVideoTag = function (video_src, image_src) {
    var width = 0,
      height = 0;
    if (this.only_fs) {
      if (this.player_fullscreen_mode === "FILL") {
        var windowSizes = this.getWindowSize();
        width = windowSizes[0];
        height = windowSizes[1];
      } else {
        width = this.player_width;
        height = this.player_height;
      }
    } else {
      width = this.player_width;
      height = this.player_height;
    }

    var html5_video_id = "html5_video_" + this.vars.clip_id;
    var src = ' src="' + video_src + '"';
    var type = ' type="video/flv"';
    var autoplay = this.vars.pause != "1" ? ' autoplay="autoplay"' : "";
    var loop = this.vars.repeat == "1" ? ' loop="loop"' : "";
    var muted =
      this.vars.start_volume == "0" || this.vars.auto_play_type === "mute"
        ? ' muted="muted"'
        : "";
    //var poster = this.vars.pause == '1' && this.vars.start_img == '1' ? ' poster="' + image_src + '"' : '';
    var poster = ' poster="' + image_src + '"';
    //var controls = this.vars.no_controls != '1' ? ' controls="controls"' : '';
    var controls = ' controls="controls"';
    var preload = this.vars.prebuffer == "1" ? ' preload="auto"' : "";
    var style =
      ' style="top: 0;left: 0;width: 100%;height: 100%;position: absolute;"';
    var playsinline = this.isIOS ? " playsinline" : "";

    var tag =
      '<video id="' +
      html5_video_id +
      '"' +
      src +
      autoplay +
      loop +
      muted +
      poster +
      controls +
      preload +
      playsinline +
      style +
      "><source" +
      src +
      type +
      "/>Your browser does not support the video tag.</video>";
    if (this.only_fs || this.player_align != "NONE")
      tag =
        '<a href="#" onclick="ClosePlayer(\'' +
        this.vars.rid +
        '\');return false;" style="position:absolute;display:block;width:20px;height:20px;text-align:center;line-height:20px;background:#222;color:#fff;top:0;right:0;z-index:1;">X</a>' +
        tag;
    this.player_instance = this.getObject(this.player_id);
    this.player_instance.innerHTML = tag;
    if (this.player_align != "NONE") this.positionPlayer();

    this.html5_player_instance = this.getObject(html5_video_id);
    this.html5_player_locked = false;

    if (
      this.vars.inlineIPhone === true &&
      this.isIOS &&
      typeof document.head.style.grid === "undefined"
    ) {
      var that = this;
      var r = this.staticCache === false ? "?v=" + new Date().getTime() : "";

      svpJSLoader.JS.load(
        this.site_root + "js/iphone-inline-video.min.js",
        r,
        function () {
          var cssTag = document.createElement("style");
          var css =
            "#" + html5_video_id + ".IIV::-webkit-media-controls-play-button,";
          css +=
            " #" +
            html5_video_id +
            ".IIV::-webkit-media-controls-start-playback-button {";
          css += "opacity: 0; pointer-events: none; width: 5px; }";

          cssTag.type = "text/css";
          if (cssTag.styleSheet) {
            cssTag.styleSheet.cssText = css;
          } else {
            cssTag.appendChild(document.createTextNode(css));
          }

          that.html5_player_instance.parentNode.insertBefore(
            cssTag,
            that.html5_player_instance
          );

          makeVideoPlayableInline(that.html5_player_instance);

          that.html5_player_instance.addEventListener(
            "touchstart",
            function () {
              var isPlaying = !!(
                this.currentTime > 0 &&
                !this.paused &&
                !this.ended &&
                this.readyState > 2
              );
              if (!isPlaying) {
                this.play();
              } else {
                this.pause();
              }
            }
          );
        },
        function () {
          alert(
            "There is a problem with loading of iphone-inline-video library. Please try again in a few minutes."
          );
        }
      );
    }

    this.executePlayerEvent("PLAYER.INITIALIZED", true);
  };
  this.parseTemplate = function (data, template) {
    for (var key in data) {
      template = template.replace("%" + key + "%", data[key]);
    }
    return template;
  };
  this.videoTagEmbed = function (
    video_src,
    image_src,
    event_data,
    live_video_data
  ) {
    this.eventObject = {};
    this.live_video = live_video_data.live_video === 1;
    if (this.live_video && live_video_data.is_started === 0) {
      var offlineBox = "";
      var offlineBackground = this.offlineDefaultBackground;

      if (live_video_data.offline_overlay === 1) {
        var titleHeight = 32;
        var titleWidth =
          (live_video_data.offline_title.length * titleHeight) / 2;
        var subTitleHeight = 17;
        var subTitleWidth =
          (live_video_data.offline_descr.length * subTitleHeight) / 2;

        var boxWidth = Math.max(titleWidth, subTitleWidth) + 20;
        var boxHeight = titleHeight + subTitleHeight + 30;
        var boxX = Math.ceil((this.player_width - boxWidth) / 2);
        var boxY = Math.ceil((this.player_height * 20) / 100);

        offlineBox = this.parseTemplate(
          {
            boxWidth: boxWidth,
            boxHeight: boxHeight,
            boxX: boxX,
            boxY: boxY,
            titleY: boxY + titleHeight + 5,
            title: live_video_data.offline_title,
            subtitleY: boxY + titleHeight + 15 + subTitleHeight,
            description: live_video_data.offline_descr,
          },
          this.offlineBox
        );

        if (image_src !== "") {
          var width = live_video_data.image_width;
          var height = live_video_data.image_height;
          var ratio = width / height;
          if (width > this.player_width) {
            width = this.player_width;
            height = Math.ceil(width / ratio);
          }
          if (height > this.player_height) {
            height = this.player_height;
            width = Math.ceil(height * ratio);
          }
          var x = Math.ceil((this.player_width - width) / 2);
          var y = Math.ceil((this.player_height - height) / 2);

          offlineBackground = this.parseTemplate(
            {
              imageBase64: live_video_data.image_b64,
              width: width,
              height: height,
              x: x,
              y: y,
            },
            this.offlineCustomBackground
          );
        }
      }

      if (image_src === "" || offlineBox !== "") {
        image_src =
          "data:image/svg+xml;base64," +
          Base64.encode(
            this.parseTemplate(
              {
                width: this.player_width,
                height: this.player_height,
                offlineBackground: offlineBackground,
                offlineBox: offlineBox,
              },
              this.posterSVG
            )
          );
      }
    }

    if (this.vars.inlineIPhone && image_src === "")
      image_src = this.site_root + "img/poster.jpg";

    if (event_data) {
      var eventDataParams = event_data.split(";");
      for (var i = 0; i < eventDataParams.length; i++) {
        var paramData = eventDataParams[i].split("=");
        this.eventObject[paramData[0]] = paramData[1];
      }
      this.real_video_src = video_src;
      this.real_image_src = image_src;
      var player_img =
        '<img src="' +
        image_src +
        '" width="' +
        this.player_width +
        '" height="' +
        this.player_height +
        '" border="0"/>';
      this.getObject(this.player_id).innerHTML = player_img;
      this.html5_player_instance = null;
      this.html5_player_locked = true;
      this.executePlayerEvent("PLAYER.INITIALIZED", true);
      this.executePlayerEvent("TIMELINE.PPV", this.eventObject.params);
    } else {
      if (this.html5_player_instance !== null) {
        this.html5_player_instance.src = video_src;
        this.html5_player_instance.poster = image_src;
      } else {
        this.buildVideoTag(video_src, image_src);
        if (this.live_video && live_video_data.is_started === 1) {
          this.buildLiveIcon();
        }
      }
    }

    this.executePlayerEvent("PLAYER.CLIP_CHANGED", true);
  };
  this.buildLiveIcon = function () {
    var live_icon = this.createElement(
      "div",
      "liveicon",
      "liveicon_" + this.player_id,
      "position:absolute; top:10px;right:10px;z-index:3;font-size:11px; font-family:Arial, Helvetica, sans-serif;font-weight:bold;text-shadow: 0px 0px 4px #666;color:#fff;"
    );

    var red_dot = this.createElement(
      "div",
      "reddot",
      "reddot_" + this.player_id,
      "display:inline-block;margin-right:5px;width:9px;height:9px;background:#ff0000;border-radius:50%;box-shadow: 0px 0px 4px #666;"
    );

    var liveText = document.createTextNode("Live");

    live_icon.appendChild(red_dot);
    live_icon.appendChild(liveText);

    this.player_instance.appendChild(live_icon);
  };
  this.setVisibilityInterval = function () {
    if (this.visibilityDelay <= 0 || this.visibilityInterval !== null)
      return false;
    var hidden = false;
    var thisObject = this;
    this.visibilityInterval = setInterval(function () {
      var instance =
        thisObject.back_player_instance !== null
          ? thisObject.back_player_instance
          : thisObject.player_instance;
      if (
        instance.parentNode !== null &&
        typeof instance.registerJSEvent !== "function"
      ) {
        if (!hidden) hidden = true;
      } else {
        if (hidden) {
          hidden = false;
          thisObject.registerEvents();
        }
      }
    }, this.visibilityDelay);
  };
  this.registerCachedEvents = function () {
    if (typeof this.eventStack === "undefined") return false;
    var length = this.eventStack.length;
    if (length > 0) this.setVisibilityInterval();
    for (var i = 0; i < length; i++) {
      this.registerJSEvent(this.eventStack[i]);
    }
  };
  this.registerEvents = function () {
    for (var event in this.eventHandlers) {
      this.registerJSEvent(event);
    }
  };
  this.initEvents = function () {
    var thisObject = this;
    this.eventInterval = setInterval(function () {
      thisObject.checkRegisterJSEvents();
    }, 5);
  };
  this.checkRegisterJSEvents = function () {
    if (
      this.player_instance !== null &&
      typeof this.player_instance.registerJSEvent === "function"
    ) {
      clearInterval(this.eventInterval);

      this.registerCachedEvents();
      this.executePlayerEvent("PLAYER.STARTED", true);
    }
  };
  this.registerJSEvent = function (event) {
    var active =
      this.player_instance !== null &&
      typeof this.player_instance.registerJSEvent === "function";
    if (this.eventHandlers[event].registered || !active) {
      return;
    }
    this.eventHandlers[event].registered = true;

    this.player_instance.registerJSEvent(
      event,
      "SvpPlayerInstances.instances[" +
        this.vars.rid +
        '].eventHandlers["' +
        event +
        '"].fireEvent'
    );
  };
  this.onSuccessEmbed = (function (self) {
    return function (e) {
      self.successEmbed(e);
    };
  })(this);
  this.successEmbed = function (e) {
    this.flashActive = false;

    if (e.success === true && typeof e.ref !== "undefined") {
      this.player_instance = e.ref;
      this.flashActive = true;
    } else {
      this.player_instance = this.getObject(this.player_id);

      this.isMobile = this.isIOS || this.isAndroid;

      if (this.isMobile) {
        this.iPlatformVideoData();
      } else if (this.player_instance !== null) {
        this.player_instance.outerHTML = this.player_content_html;
        this.executePlayerEvent("PLAYER.INITIALIZED", true);
      }
    }

    if (this.player_keep_state_on_resize && this.need_new_layer) {
      this.addListener(this._w, "resize", this.onResize);
    }

    if (this.flashActive === true) {
      this.initEvents();
    }

    if (
      this.use_existing_div &&
      this.need_new_layer &&
      this.player_align === "NONE"
    ) {
      this.getObject(this.player_object_id).innerHTML = "";
    }
    this.documentAppend =
      this.isMobile === false &&
      !this.isIE &&
      !this.isOpera &&
      this.need_new_layer &&
      !this.player_keep_state_on_scroll;
    if (this.documentAppend && !this.isHTML5Player) {
      this._d.documentElement.appendChild(this.player_instance);
    }

    if (this.only_fs) {
      this.openFullscreen();
    } else if (this.need_new_layer) {
      this.positionPlayer();
    }
    if (
      (this.only_fs || this.need_new_layer) &&
      !this.player_keep_state_on_scroll
    )
      this.player_instance.style.zIndex = ++SvpPlayerIndexes + this.baseZindex;
  };
  this.onDestroy = function (forceFlash) {
    this.isHTML5Player = !forceFlash;
    this.init();
    if (this.vars.fs_popin === "1") OpenFullScreen(this.vars.rid);
  };
  this.reinitialize = function (forceFlash) {
    var that = this;
    if (this.vars.fs_popin === "1")
      DoClosePlayer(this.vars.rid, function () {
        that.onDestroy(forceFlash);
      });
    this.destroy(true, function () {
      that.onDestroy(forceFlash);
    });
  };
  this.destroy = function (removeInstance, callback) {
    if (this.player_instance === null) return;
    if (this.isPPV) svpDplayerUtils.PPV.destroy(this);
    if (this.isDownloadable) svpDplayerUtils.DL.destroy(this);

    this.removeListener(this._w, "load", this.onLoad);

    if (this.player_keep_state_on_resize && this.need_new_layer) {
      this.removeListener(this._w, "resize", this.onResize);
    }
    for (var event in this.eventHandlers) {
      delete this.eventHandlers[event].registered;
    }
    if (this.visibilityInterval !== null) {
      clearInterval(this.visibilityInterval);
      this.visibilityInterval = null;
    }
    if (this.eventInterval !== null) {
      clearInterval(this.eventInterval);
      this.eventInterval = null;
    }
    if (this.documentAppend && !this.isHTML5Player) {
      this._d.documentElement.removeChild(this.player_instance);
    }
    if (!this.isHTML5Player) {
      if (this.isMobile)
        this.player_instance.parentNode.removeChild(this.player_instance);
      else {
        SvpSwfObject.get().removeSWF(this.player_id);
        SvpSwfObject.destroy();
      }
    } else {
      this.player_instance.destroy(callback);
    }
    if (this.static_div && this.auto_show)
      this._d.body.removeChild(this.static_div);

    var object = this.getObject(this.player_object_id);
    if (object !== null && object.getAttribute("data-initialized") !== null) {
      object.removeAttribute("data-initialized");
    }

    if (removeInstance !== false)
      SvpPlayerInstances.removeInstance(this.vars.rid);
    this.player_instance = null;
    this.html5_player_instance = null;

    if (!this.isHTML5Player && typeof callback === "function") {
      callback();
    }
  };
  this.show = function () {
    if (this.backup_player_id !== null) return false;
    var player_object = this.getObject(this.player_id);
    player_object.style.display = "";
    if (this.static_div) this.static_div.style.display = "";
    this.backup_player_id = this.player_id;
    this.backup_player_content = player_object.innerHTML;
    this.player_id = "layer_" + this.player_id;
    this.attributes = {
      id: this.player_id,
      name: this.player_id,
    };
    var player_content = this.createElement(
      "div",
      this.player_id,
      this.player_id,
      "width:" +
        this.player_width +
        "px" +
        ";" +
        "height:" +
        this.player_height +
        "px" +
        ";"
    );
    player_content.innerHTML = this.backup_player_content;
    player_object.innerHTML = "";
    player_object.appendChild(player_content);
    this.embedPlayer();
  };
  this.hide = function () {
    if (this.backup_player_id === null) return false;
    this.player_id = this.backup_player_id;
    this.attributes = {
      id: this.player_id,
      name: this.player_id,
    };
    var player_object = this.getObject(this.player_id);
    player_object.style.display = "none";
    if (this.static_div) this.static_div.style.display = "none";
    this.destroy(false);
    player_object.innerHTML = this.backup_player_content;
    this.backup_player_id = null;
  };
  this.playerCommand = function (command) {
    if (
      this.player_instance === null ||
      typeof this.player_instance.playerCommand !== "function"
    ) {
      return;
    }

    this.player_instance.playerCommand(command);
  };
  this.playerSet = function (method, value) {
    if (
      this.player_instance === null ||
      typeof this.player_instance[method] !== "function"
    ) {
      return false;
    }

    this.player_instance[method](value);

    return true;
  };
  this.playerGet = function (method) {
    if (
      this.player_instance === null ||
      typeof this.player_instance[method] !== "function"
    ) {
      return;
    }

    return this.player_instance[method]();
  };
  this.play = function () {
    this.playerCommand("play");
  };
  this.pause = function () {
    this.playerCommand("pause");
  };
  this.stop = function () {
    this.playerCommand("stop");
  };
  this.toggle = function () {
    this.playerCommand("toggle");
  };
  this.replay = function () {
    this.playerCommand("replay");
  };
  this.adjust = function () {
    this.playerCommand("adjust");
  };
  this.toggleAudio = function () {
    this.playerCommand("toggle_audio");
  };
  this.mute = function () {
    this.playerCommand("mute");
  };
  this.unMute = function () {
    this.playerCommand("unmute");
  };
  this.seekToAndPlay = function (seconds) {
    this.playerSet("playerSeekToAndPlay", seconds);
  };
  this.seekToAndPause = function (seconds) {
    this.playerSet("playerSeekToAndPause", seconds);
  };
  this.setVolume = function (volume) {
    this.playerSet("playerSetVolume", volume);
  };
  this.loadVideo = function (videoID) {
    this.vars.clip_id = videoID;

    if (this.isMobile) {
      this.iPlatformVideoData(videoID);
    } else if (this.getVideoID() !== videoID) {
      if (this.isPPV) svpDplayerUtils.PPV.destroy(this);
      if (this.isDownloadable) svpDplayerUtils.DL.destroy(this);
      if (this.playerSet("playerLoadVideo", videoID)) {
        this.executePlayerEvent("PLAYER.CLIP_CHANGED", true);
      }
      if (!this.isHTML5Player) {
        this.reinitialize(false);
      }
    }
  };
  this.isPlaying = function () {
    return this.playerGet("get_isPlaying");
  };
  this.isPaused = function () {
    return this.playerGet("get_isPaused");
  };
  this.isComplete = function () {
    return this.playerGet("get_isComplete");
  };
  this.getVideoID = function () {
    return this.playerGet("get_videoID");
  };
  this.getStreamTime = function () {
    return this.playerGet("get_streamTime");
  };
  this.getStreamDuration = function () {
    return this.playerGet("get_streamDuration");
  };
  this.getVolume = function () {
    return this.playerGet("get_volume");
  };
  this.isMuted = function () {
    return this.playerGet("get_isMuted");
  };
  this.isLive = function () {
    return this.playerGet("get_isLive");
  };
  this.addPlayerEventListener = function (event, eventHandler) {
    var registered = false;
    if (typeof this.eventHandlers === "undefined") this.eventHandlers = {};
    if (typeof this.eventHandlers[event] === "undefined")
      this.eventHandlers[event] = {};
    else registered = true;
    if (typeof this.eventHandlers[event].listeners === "undefined")
      this.eventHandlers[event].listeners = [];

    this.eventHandlers[event].listeners.push(eventHandler);
    var thisEvent = event;
    var thisObject = this;
    if (typeof this.eventHandlers[event].fireEvent === "undefined")
      this.eventHandlers[event].fireEvent = function (args) {
        thisObject.executePlayerEvent(thisEvent, args);
      };
    if (
      this.player_instance !== null &&
      typeof this.player_instance.registerJSEvent === "function"
    ) {
      if (!registered) {
        this.registerJSEvent(event);
        this.setVisibilityInterval();
      }
    } else {
      var exists = false;
      if (typeof this.eventStack === "undefined") this.eventStack = [];
      for (var i = 0; i < this.eventStack.length; i++) {
        if (this.eventStack[i] === event) exists = true;
      }
      if (exists === false) this.eventStack.push(event);
    }
  };
  this.removePlayerEventListener = function (event, eventHandler) {
    if (typeof this.eventHandlers === "undefined") return;
    if (typeof this.eventHandlers[event] === "undefined") return;
    if (typeof this.eventHandlers[event].listeners === "undefined") return;
    for (var i = 0; i < this.eventHandlers[event].listeners.length; i++) {
      if (this.eventHandlers[event].listeners[i] === eventHandler) {
        this.eventHandlers[event].listeners.splice(i);
        break;
      }
    }
    if (this.eventHandlers[event].listeners.length === 0)
      delete this.eventHandlers[event];
    var empty = true;
    for (var k in this.eventHandlers) {
      empty = false;
      break;
    }
    if (empty && this.visibilityInterval !== null) {
      clearInterval(this.visibilityInterval);
      this.visibilityInterval = null;
    }
  };
  this.execEvent = function (event, i, args) {
    var that = this;
    setTimeout(function () {
      if (typeof that.eventHandlers[event] !== "undefined")
        that.eventHandlers[event].listeners[i](args, that, event);
    }, 0);
  };
  this.executePlayerEvent = function (event, args) {
    if (typeof this.eventHandlers === "undefined") return;
    if (typeof this.eventHandlers[event] === "undefined") return;
    if (typeof this.eventHandlers[event].listeners === "undefined") return;
    for (
      var i = 0;
      typeof this.eventHandlers[event] !== "undefined" &&
      i < this.eventHandlers[event].listeners.length;
      i++
    ) {
      this.execEvent(event, i, args);
    }
  };

  if (typeof vars !== "undefined") this.checkParsedVars(this.vars);
  if (typeof internal_params !== "undefined")
    this.checkParsedInternalParams(this.internal_params);
  this.bindPlayerEvents(this.defaultEventListeners);

  if (typeof svpCurrentPage === "undefined") {
    svpCurrentPage = decodeURIComponent(this.vars.page);
  }

  this.isStickyExist = function () {
    return typeof StickyPlayerContainer !== "undefined";
  };

  this.isForSticky = function () {
    return !this.player_instance.vars.isPopin && this.isStickyExist();
  };

  this.isStickyPlayer = function () {
    return StickyPlayerContainer.getInstanceById(this.vars.rid);
  };

  this.manageMessagePlayerActions = function (message, data) {
    this.player_instance[message] = data;

    if (this.isForSticky() && this.isStickyPlayer()) {
      StickyPlayerContainer.manageMessagePlayerActions(message, data, this);
    }
  };
}
function get_page() {
  return this.vars.page;
}
function OpenFullScreen(id) {
  var instance = SvpPlayerInstances.getInstance(id);
  if (typeof instance != "undefined") {
    if (instance.only_fs) {
      instance.embedPlayer();
    } else {
      instance.openFullscreen();
    }
  }
}
function ClosePlayer(id) {
  setTimeout(function () {
    DoClosePlayer(id);
  }, 50);
}
function DoClosePlayer(id, callback) {
  var instance = SvpPlayerInstances.getInstance(id);
  instance.executePlayerEvent("PLAYER.CLOSED", true);
  if (instance.only_fs) {
    var link = instance.getObject("svp_" + id);
    instance.closeFullscreen();
    instance.destroy(false, callback);
    if (link !== null) link.focus();
  } else if (
    typeof instance.vars.close_button !== "undefined" &&
    instance.vars.close_button == 1
  ) {
    if (!instance.auto_show) {
      instance.hide();
    } else {
      instance.destroy(callback);
    }
  } else instance.closeFullscreen();
}
function playerInitialize(id) {
  var instance = SvpPlayerInstances.getInstance(id);
  instance.registerEvents();
}
function iPlatformFetchURL(
  id,
  video_src,
  image_src,
  event_data,
  live_video_data
) {
  var instance = SvpPlayerInstances.getInstance(id);
  instance.videoTagEmbed(video_src, image_src, event_data, live_video_data);
}
if (typeof svpJSLoader === "undefined") {
  var svpJSLoader = {};
  svpJSLoader.JS = (function () {
    var h,
      stack = {},
      loaded = [],
      tr = 0,
      mtr = 5,
      tm = 3000;
    function load(u, r, sC, eC, nt) {
      var lock = true;
      for (var i = 0; i < loaded.length; i++) {
        if (loaded[i] === u) {
          sC();
          return false;
        }
      }
      if (nt === 1) lock = false;
      else {
        if (typeof stack[u] === "undefined") {
          stack[u] = [];
          lock = false;
        }
        stack[u].push({ sC: sC, eC: eC });
      }
      if (!lock) {
        var s = document.createElement("script");
        s.id =
          "svp_js_" + new Date().getTime() + Math.floor(Math.random() * 1000);
        s.src = u + r;
        s.async = true;
        s.onload = s.onreadystatechange = function () {
          if (
            !this.readyState ||
            this.readyState === "loaded" ||
            this.readyState === "complete"
          ) {
            loaded.push(u);
            clearTimeout(t);
            s.onload = s.onreadystatechange = null;
            for (var i = 0; i < stack[u].length; i++) {
              var ob = stack[u][i].sC;
              if (typeof ob !== "undefined") ob();
            }
            delete stack[u];
          }
        };
        var t = setTimeout(function () {
          clearTimeout(t);
          h.removeChild(s);
          if (tr < mtr) {
            tr++;
            svpJSLoader.JS.load(u, r, sC, eC, 1);
          } else {
            tr = 0;
            for (var i = 0; i < stack[u].length; i++) {
              var ob = stack[u][i].eC;
              if (typeof ob !== "undefined") ob("");
            }
            delete stack[u];
          }
        }, tm);
        if (!h) h = document.getElementsByTagName("head")[0];
        h.appendChild(s);
      }
    }
    return {
      load: load,
    };
  })();
}
