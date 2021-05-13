'use strict';
/**
 * @param {number} a
 * @param {number} i
 * @return {?}
 */
function _createForOfIteratorHelper(a, i) {
  var c;
  if ("undefined" == typeof Symbol || null == a[Symbol.iterator]) {
    if (Array.isArray(a) || (c = _unsupportedIterableToArray(a)) || i && a && "number" == typeof a.length) {
      if (c) {
        a = c;
      }
      /** @type {number} */
      var position = 0;
      /**
       * @return {undefined}
       */
      i = function() {
      };
      return {
        s : i,
        n : function() {
          return position >= a.length ? {
            done : true
          } : {
            done : false,
            value : a[position++]
          };
        },
        e : function(n) {
          throw n;
        },
        f : i
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var _PAGE_currentSubPage;
  /** @type {boolean} */
  var _ttyWrite = true;
  /** @type {boolean} */
  var i = false;
  return {
    s : function() {
      c = a[Symbol.iterator]();
    },
    n : function() {
      var rl = c.next();
      return _ttyWrite = rl.done, rl;
    },
    e : function(n) {
      /** @type {boolean} */
      i = true;
      _PAGE_currentSubPage = n;
    },
    f : function() {
      try {
        if (!(_ttyWrite || null == c.return)) {
          c.return();
        }
      } finally {
        if (i) {
          throw _PAGE_currentSubPage;
        }
      }
    }
  };
}
/**
 * @param {number} data
 * @param {undefined} maxLength
 * @return {?}
 */
function _unsupportedIterableToArray(data, maxLength) {
  if (data) {
    if ("string" == typeof data) {
      return _arrayLikeToArray(data, maxLength);
    }
    /** @type {string} */
    var className = Object.prototype.toString.call(data).slice(8, -1);
    return "Map" === (className = "Object" === className && data.constructor ? data.constructor.name : className) || "Set" === className ? Array.from(data) : "Arguments" === className || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(className) ? _arrayLikeToArray(data, maxLength) : void 0;
  }
}
/**
 * @param {number} array
 * @param {number} maxLength
 * @return {?}
 */
function _arrayLikeToArray(array, maxLength) {
  if (null == maxLength || maxLength > array.length) {
    maxLength = array.length;
  }
  /** @type {number} */
  var i = 0;
  /** @type {!Array} */
  var buffer = new Array(maxLength);
  for (; i < maxLength; i++) {
    buffer[i] = array[i];
  }
  return buffer;
}
/**
 * @param {?} obj
 * @return {?}
 */
function _typeof(obj) {
  return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(object) {
    return typeof object;
  } : function(obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  })(obj);
}
!function(factory) {
  var t;
  var a;
  var m;
  if ("function" == typeof define && define.amd) {
    define(factory);
    /** @type {boolean} */
    t = true;
  }
  if ("object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports))) {
    module.exports = factory();
    /** @type {boolean} */
    t = true;
  }
  if (!t) {
    a = window.Cookies;
    /**
     * @return {?}
     */
    (m = window.Cookies = factory()).noConflict = function() {
      return window.Cookies = a, m;
    };
  }
}(function() {
  /**
   * @return {?}
   */
  function extend() {
    /** @type {number} */
    var i = 0;
    var newOb = {};
    for (; i < arguments.length; i++) {
      var n;
      var l = arguments[i];
      for (n in l) {
        newOb[n] = l[n];
      }
    }
    return newOb;
  }
  /**
   * @param {string} name
   * @return {?}
   */
  function transform(name) {
    return name.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  }
  return function init(config) {
    /**
     * @return {undefined}
     */
    function self() {
    }
    /**
     * @param {string} path
     * @param {string} value
     * @param {!Object} options
     * @return {?}
     */
    function api(path, value, options) {
      if ("undefined" != typeof document) {
        if ("number" == typeof(options = extend({
          path : "/"
        }, self.defaults, options)).expires) {
          /** @type {!Date} */
          options.expires = new Date(+new Date + 864e5 * options.expires);
        }
        options.expires = options.expires ? options.expires.toUTCString() : "";
        try {
          /** @type {string} */
          var r = JSON.stringify(value);
          if (/^[\{\[]/.test(r)) {
            /** @type {string} */
            value = r;
          }
        } catch (e) {
        }
        value = config.write ? config.write(value, path) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        /** @type {string} */
        path = encodeURIComponent(String(path)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
        var name;
        /** @type {string} */
        var output = "";
        for (name in options) {
          if (options[name]) {
            /** @type {string} */
            output = output + ("; " + name);
            if (true !== options[name]) {
              /** @type {string} */
              output = output + ("=" + options[name].split(";")[0]);
            }
          }
        }
        return document.cookie = path + "=" + value + output;
      }
    }
    /**
     * @param {?} d
     * @param {string} process
     * @return {?}
     */
    function parse(d, process) {
      if ("undefined" != typeof document) {
        var s = {};
        /** @type {!Array} */
        var row = document.cookie ? document.cookie.split("; ") : [];
        /** @type {number} */
        var CR_index = 0;
        for (; CR_index < row.length; CR_index++) {
          var args = row[CR_index].split("=");
          var key = args.slice(1).join("=");
          if (!(process || '"' !== key.charAt(0))) {
            key = key.slice(1, -1);
          }
          try {
            var e = transform(args[0]);
            key = (config.read || config)(key, e) || transform(key);
            if (process) {
              try {
                /** @type {*} */
                key = JSON.parse(key);
              } catch (e) {
              }
            }
            if (s[e] = key, d === e) {
              break;
            }
          } catch (e) {
          }
        }
        return d ? s[d] : s;
      }
    }
    return self.set = api, self.get = function(e) {
      return parse(e, false);
    }, self.getJSON = function(json) {
      return parse(json, true);
    }, self.remove = function(key, attributes) {
      api(key, "", extend(attributes, {
        expires : -1
      }));
    }, self.defaults = {}, self.withConverter = init, self;
  }(function() {
  });
}), function(self, $) {
  var element = $("body");
  var HEAD = $("head");
  /** @type {string} */
  var arrowDiv = "#skin-theme";
  /** @type {string} */
  var group = ".nk-sidebar";
  /** @type {string} */
  var args = ".nk-apps-sidebar";
  /** @type {string} */
  var html = ".nk-header";
  /** @type {!Array} */
  var array = ["demo3", "non"];
  /** @type {!Array} */
  var tags = ["style", "aside", "header", "appside", "skin", "mode"];
  /** @type {string} */
  var mlf = "light-mode";
  /** @type {string} */
  var mode = "dark-mode";
  /** @type {string} */
  var id = ".nk-opt-item";
  /** @type {string} */
  var selector = ".nk-opt-list";
  var map = {
    demo3 : {
      aside : "is-light",
      header : "is-light",
      appside : "is-theme",
      style : "ui-default"
    },
    non : {
      aside : "is-light",
      header : "is-light",
      appside : "is-theme",
      style : "ui-default"
    }
  };
  self.Demo = {
    save : function(words, options) {
      Cookies.set(self.Demo.apps(words), options);
    },
    remove : function(file) {
      Cookies.remove(self.Demo.apps(file));
    },
    current : function(type) {
      return Cookies.get(self.Demo.apps(type));
    },
    apps : function(options) {
      var methodName;
      /** @type {!Array<?>} */
      var attrs_dont_send = window.location.pathname.split("/").map(function(e, canCreateDiscussions, a) {
        return e.replace("-", "");
      });
      var r = _createForOfIteratorHelper(array);
      try {
        r.s();
        for (; !(key = r.n()).done;) {
          var key = key.value;
          if (0 <= attrs_dont_send.indexOf(key)) {
            methodName = key;
          }
        }
      } catch (k) {
        r.e(k);
      } finally {
        r.f();
      }
      return options ? options + "_" + methodName : methodName;
    },
    style : function(name, type) {
      var options = {
        mode : mlf + " " + mode,
        style : "ui-default ui-clean ui-shady",
        aside : "is-light is-default is-theme is-dark",
        header : "is-light is-default is-theme is-dark",
        appside : "is-light is-default is-theme is-dark"
      };
      return "all" === name ? options[type] || "" : "any" === name ? options.mode + " " + options.style + " " + options.aside + " " + options.header + " " + appside.header : "body" === name ? options.mode + " " + options.style : "is-default" === name || "ui-default" === name || "is-regular" === name ? "" : name;
    },
    skins : function(value) {
      return !value || "default" === value ? "theme" : "theme-" + value;
    },
    defs : function(name) {
      var value = self.Demo.apps();
      value = map[value][name] || "";
      return self.Demo.current(name) ? self.Demo.current(name) : value;
    },
    apply : function() {
      self.Demo.apps();
      var query = _createForOfIteratorHelper(tags);
      try {
        query.s();
        for (; !(key = query.n()).done;) {
          var status;
          var key;
          var undefined = key.value;
          if (!("aside" !== undefined && "header" !== undefined && "appside" !== undefined && "style" !== undefined)) {
            status = self.Demo.defs(undefined);
            $(key = "aside" === undefined ? group : "appside" === undefined ? args : "header" === undefined ? html : element).removeClass(self.Demo.style("all", undefined));
            if ("ui-default" !== status && "is-default" !== status) {
              $(key).addClass(status);
            }
          }
          if ("mode" === undefined) {
            self.Demo.update(undefined, self.Demo.current("mode"));
          }
          if ("skin" === undefined) {
            self.Demo.update(undefined, self.Demo.current("skin"));
          }
        }
      } catch (j) {
        query.e(j);
      } finally {
        query.f();
      }
      self.Demo.update("dir", self.Demo.current("dir"));
    },
    locked : function(data) {
      if (true === data) {
        $(id + "[data-key=aside]").add(id + "[data-key=header]").add(id + "[data-key=appside]").addClass("disabled");
        self.Demo.update("skin", "default", true);
        $(id + "[data-key=skin]").removeClass("active");
        $(id + "[data-key=skin][data-update=default]").addClass("active");
      } else {
        $(id + "[data-key=aside]").add(id + "[data-key=header]").add(id + "[data-key=appside]").removeClass("disabled");
      }
    },
    update : function(name, a, indent) {
      var container;
      var c = self.Demo.style(a, name);
      var d = self.Demo.style("all", name);
      self.Demo.apps();
      if (!("aside" !== name && "header" !== name && "appside" !== name)) {
        $(container = "header" == name ? html : "appside" === name ? args : group).removeClass(d);
        $(container).addClass(c);
      }
      if ("mode" === name) {
        element.removeClass(d).removeAttr("theme");
        if (c === mode) {
          element.addClass(c).attr("theme", "dark");
          self.Demo.locked(true);
        } else {
          element.addClass(c).removeAttr("theme");
          self.Demo.locked(false);
        }
      }
      if ("style" === name) {
        element.removeClass(d);
        element.addClass(c);
      }
      if ("skin" === name) {
        d = self.Demo.skins(c);
        c = $("#skin-default").attr("href").replace("theme", "skins/" + d);
        if ("theme" === d) {
          $(arrowDiv).remove();
        } else {
          if (0 < $(arrowDiv).length) {
            $(arrowDiv).attr("href", c);
          } else {
            HEAD.append('<link id="skin-theme" rel="stylesheet" href="' + c + '">');
          }
        }
      }
      if (true === indent) {
        self.Demo.save(name, a);
      }
    },
    reset : function() {
      var term = self.Demo.apps();
      element.removeClass(self.Demo.style("body")).removeAttr("theme");
      $(id).removeClass("active");
      $(arrowDiv).remove();
      $(group).removeClass(self.Demo.style("all", "aside"));
      $(html).removeClass(self.Demo.style("all", "header"));
      var _step3;
      var query = _createForOfIteratorHelper(tags);
      try {
        query.s();
        for (; !(_step3 = query.n()).done;) {
          var i = _step3.value;
          $("[data-key='" + i + "']").each(function() {
            var rlf = $(this).data("update");
            if (!("aside" !== i && "header" !== i && "appside" !== i && "style" !== i)) {
              if (rlf === map[term][i]) {
                $(this).addClass("active");
              }
            }
            if (!("mode" !== i && "skin" !== i || rlf !== mlf && "default" !== rlf)) {
              $(this).addClass("active");
            }
          });
          self.Demo.remove(i);
        }
      } catch (j) {
        query.e(j);
      } finally {
        query.f();
      }
      $("[data-key='dir']").each(function() {
        if ($(this).data("update") === self.Demo.current("dir")) {
          $(this).addClass("active");
        }
      });
      self.Demo.apply();
    },
    load : function() {
      self.Demo.apply();
      if (0 < $(id).length) {
        $(id).each(function() {
          var mode = $(this).data("update");
          var undefined = $(this).data("key");
          if (!("aside" !== undefined && "header" !== undefined && "appside" !== undefined && "style" !== undefined)) {
            if (mode === self.Demo.defs(undefined)) {
              $(this).parent(selector).find(id).removeClass("active");
              $(this).addClass("active");
            }
          }
          if (!("mode" !== undefined && "skin" !== undefined && "dir" !== undefined || mode != self.Demo.current("skin") && mode != self.Demo.current("mode") && mode != self.Demo.current("dir"))) {
            $(this).parent(selector).find(id).removeClass("active");
            $(this).addClass("active");
          }
        });
      }
    },
    trigger : function() {
      $(id).on("click", function(a) {
        a.preventDefault();
        var t = $(this);
        var dropdowns = t.parent(selector);
        var update2 = t.data("update");
        a = t.data("key");
        self.Demo.update(a, update2, true);
        dropdowns.find(id).removeClass("active");
        t.addClass("active");
        if ("dir" == a) {
          setTimeout(function() {
            window.location.reload();
          }, 100);
        }
      });
      $(".nk-opt-reset > a").on("click", function(event) {
        event.preventDefault();
        self.Demo.reset();
      });
    },
    init : function(flightPhase) {
      self.Demo.load();
      self.Demo.trigger();
    }
  };
  self.coms.docReady.push(self.Demo.init);
}(NioApp, jQuery);
