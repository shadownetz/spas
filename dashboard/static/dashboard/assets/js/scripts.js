'use strict';
!function(self, $) {
  /**
   * @param {?} obj
   * @param {!Object} source
   * @return {?}
   */
  function get(obj, source) {
    return Object.keys(source).forEach(function(key) {
      obj[key] = source[key];
    }), obj;
  }
  /** @type {string} */
  self.Package.name = "SPAS";
  /** @type {string} */
  self.Package.version = "1.0";
  var windowRef = $(window);
  var i = $("body");
  var element = $(document);
  /** @type {string} */
  var optionName = "nk-menu";
  /** @type {string} */
  var row = "nk-header-menu";
  /** @type {string} */
  var id = "nk-sidebar";
  /** @type {string} */
  var classAdd = "nk-sidebar-mobile";
  var options = self.Break;
  /**
   * @return {undefined}
   */
  self.ClassBody = function() {
    self.AddInBody(id);
    self.AddInBody("nk-apps-sidebar");
  };
  /**
   * @return {undefined}
   */
  self.ClassNavMenu = function() {
    self.BreakClass("." + row, options.lg, {
      timeOut : 0
    });
    self.BreakClass("." + id, options.lg, {
      timeOut : 0,
      classAdd : classAdd
    });
    windowRef.on("resize", function() {
      self.BreakClass("." + row, options.lg);
      self.BreakClass("." + id, options.lg, {
        classAdd : classAdd
      });
    });
  };
  /**
   * @return {undefined}
   */
  self.Prettify = function() {
    if (window.prettyPrint) {
      prettyPrint();
    }
  };
  /**
   * @return {undefined}
   */
  self.Copied = function() {
    /**
     * @param {!Object} res
     * @param {string} value
     * @return {undefined}
     */
    function done(res, value) {
      res = $(res);
      var elem = res.parent();
      var result = {
        text : "Copy",
        done : "Copied",
        fail : "Failed"
      };
      res = {
        text : res.data("clip-text"),
        done : res.data("clip-success"),
        fail : res.data("clip-error")
      };
      result.text = res.text || result.text;
      result.done = res.done || result.done;
      result.fail = res.fail || result.fail;
      res = "success" === value ? result.done : result.fail;
      /** @type {string} */
      value = "success" === value ? on : type;
      elem.addClass(value).find(SEARCH_RESULTS).html(res);
      setTimeout(function() {
        elem.removeClass(on + " " + type).find(SEARCH_RESULTS).html(result.text).blur();
        elem.find("input").blur();
      }, 2e3);
    }
    /** @type {string} */
    var deleteButton = ".clipboard-init";
    /** @type {string} */
    var SEARCH_RESULTS = ".clipboard-text";
    /** @type {string} */
    var on = "clipboard-success";
    /** @type {string} */
    var type = "clipboard-error";
    if (ClipboardJS.isSupported()) {
      (new ClipboardJS(deleteButton)).on("success", function(self) {
        done(self.trigger, "success");
        self.clearSelection();
      }).on("error", function(validation) {
        done(validation.trigger, "error");
      });
    } else {
      $(deleteButton).css("display", "none");
    }
  };
  /**
   * @return {undefined}
   */
  self.CurrentLink = function() {
    /** @type {string} */
    var oldUrl = window.location.href;
    /** @type {string} */
    var b = (b = oldUrl.substring(0, -1 == oldUrl.indexOf("#") ? oldUrl.length : oldUrl.indexOf("#"))).substring(0, -1 == b.indexOf("?") ? b.length : b.indexOf("?"));
    $(".nk-menu-link, .menu-link, .nav-link").each(function() {
      var t = $(this);
      var tldRegex = t.attr("href");
      if (b.match(tldRegex)) {
        t.closest("li").addClass("active current-page").parents().closest("li").addClass("active current-page");
        t.closest("li").children(".nk-menu-sub").css("display", "block");
        t.parents().closest("li").children(".nk-menu-sub").css("display", "block");
      } else {
        t.closest("li").removeClass("active current-page").parents().closest("li:not(.current-page)").removeClass("active");
      }
    });
  };
  /**
   * @return {undefined}
   */
  self.PassSwitch = function() {
    self.Passcode(".passcode-switch");
  };
  /**
   * @param {string} message
   * @param {string} type
   * @param {!Object} value
   * @return {undefined}
   */
  self.Toast = function(message, type, value) {
    /** @type {string} */
    var path = "";
    /** @type {string} */
    var icon_new = "info" === (type = type || "info") ? "ni ni-info-fill" : "success" === type ? "ni ni-check-circle-fill" : "error" === type ? "ni ni-cross-circle-fill" : "warning" === type ? "ni ni-alert-fill" : "";
    var options = {
      position : "bottom-right",
      ui : "",
      icon : "auto",
      clear : false
    };
    options = value ? get(options, value) : options;
    /** @type {string} */
    options.position = options.position ? "toast-" + options.position : "toast-bottom-right";
    /** @type {string} */
    options.icon = "auto" === options.icon ? icon_new : options.icon || "";
    /** @type {string} */
    options.ui = options.ui ? " " + options.ui : "";
    /** @type {string} */
    path = "" !== options.icon ? '<span class="toastr-icon"><em class="icon ' + options.icon + '"></em></span>' : "";
    if ("" !== (message = "" !== message ? path + '<div class="toastr-text">' + message + "</div>" : "")) {
      if (true === options.clear) {
        toastr.clear();
      }
      path = {
        closeButton : true,
        debug : false,
        newestOnTop : false,
        progressBar : false,
        positionClass : options.position + options.ui,
        closeHtml : '<span class="btn-trigger">Close</span>',
        preventDuplicates : true,
        showDuration : "1500",
        hideDuration : "1500",
        timeOut : "2000",
        toastClass : "toastr",
        extendedTimeOut : "3000"
      };
      toastr.options = get(path, options);
      toastr[type](message);
    }
  };
  /**
   * @param {?} path
   * @return {undefined}
   */
  self.TGL.screen = function(path) {
    if ($(path).exists()) {
      $(path).each(function() {
        var classShiftLeft = $(this).data("toggle-screen");
        if (classShiftLeft) {
          $(this).addClass("toggle-screen-" + classShiftLeft);
        }
      });
    }
  };
  /**
   * @param {!Object} data
   * @param {!Object} key
   * @return {undefined}
   */
  self.TGL.content = function(data, key) {
    var backwardCtrl = $(data || ".toggle");
    var options = $("[data-content]");
    /** @type {boolean} */
    var th0 = false;
    data = {
      active : "active",
      content : "content-active",
      break : true
    };
    var value = key ? get(data, key) : data;
    self.TGL.screen(options);
    backwardCtrl.on("click", function(event) {
      th0 = this;
      self.Toggle.trigger($(this).data("target"), value);
      event.preventDefault();
    });
    element.on("mouseup", function(e) {
      var t;
      var popoverElement;
      var $mobileMenu;
      var $filterButton;
      if (th0) {
        t = $(th0);
        popoverElement = $(".select2-container");
        $mobileMenu = $(".datepicker-dropdown");
        $filterButton = $(".ui-timepicker-container");
        if (!(t.is(e.target) || 0 !== t.has(e.target).length || options.is(e.target) || 0 !== options.has(e.target).length || popoverElement.is(e.target) || 0 !== popoverElement.has(e.target).length || $mobileMenu.is(e.target) || 0 !== $mobileMenu.has(e.target).length || $filterButton.is(e.target) || 0 !== $filterButton.has(e.target).length)) {
          self.Toggle.removed(t.data("target"), value);
          /** @type {boolean} */
          th0 = false;
        }
      }
    });
    windowRef.on("resize", function() {
      options.each(function() {
        var target = $(this).data("content");
        var size = $(this).data("toggle-screen");
        size = options[size];
        if (self.Win.width > size) {
          self.Toggle.removed(target, value);
        }
      });
    });
  };
  /**
   * @param {!Object} prefix
   * @param {!Object} parent
   * @return {undefined}
   */
  self.TGL.expand = function(prefix, parent) {
    var n = prefix || ".expand";
    prefix = {
      toggle : true
    };
    var p = parent ? get(prefix, parent) : prefix;
    $(n).on("click", function(event) {
      self.Toggle.trigger($(this).data("target"), p);
      event.preventDefault();
    });
  };
  /**
   * @param {!Object} prefix
   * @param {!Object} parent
   * @return {undefined}
   */
  self.TGL.ddmenu = function(prefix, parent) {
    var n = prefix || ".nk-menu-toggle";
    prefix = {
      active : "active",
      self : "nk-menu-toggle",
      child : "nk-menu-sub"
    };
    var p = parent ? get(prefix, parent) : prefix;
    $(n).on("click", function(event) {
      if (self.Win.width < options.lg || $(this).parents().hasClass(id)) {
        self.Toggle.dropMenu($(this), p);
      }
      event.preventDefault();
    });
  };
  /**
   * @param {!Object} item
   * @param {!Object} key
   * @return {undefined}
   */
  self.TGL.showmenu = function(item, key) {
    var n = $(item || ".nk-nav-toggle");
    var value = $("[data-content]");
    var C = value.hasClass(row) ? options.lg : options.xl;
    item = {
      active : "toggle-active",
      content : id + "-active",
      body : "nav-shown",
      overlay : "nk-sidebar-overlay",
      break : C,
      close : {
        profile : true,
        menu : false
      }
    };
    var val = key ? get(item, key) : item;
    n.on("click", function(event) {
      self.Toggle.trigger($(this).data("target"), val);
      event.preventDefault();
    });
    element.on("mouseup", function(options) {
      if (!n.is(options.target) && 0 === n.has(options.target).length && !value.is(options.target) && 0 === value.has(options.target).length && self.Win.width < C) {
        self.Toggle.removed(n.data("target"), val);
      }
    });
    windowRef.on("resize", function() {
      if (self.Win.width < options.xl || self.Win.width < C) {
        self.Toggle.removed(n.data("target"), val);
      }
    });
  };
  /**
   * @param {string} value
   * @param {!Object} key
   * @return {undefined}
   */
  self.Ani.formSearch = function(value, key) {
    var data = {
      active : "active",
      timeout : 400,
      target : "[data-search]"
    };
    var config = key ? get(data, key) : data;
    var a = $(value);
    var o = $(config.target);
    if (a.exists()) {
      a.on("click", function(a) {
        a.preventDefault();
        a = $(this).data("target");
        var container = $("[data-search=" + a + "]");
        a = $("[data-target=" + a + "]");
        if (container.hasClass(config.active)) {
          a.add(container).removeClass(config.active);
          setTimeout(function() {
            container.find("input").val("");
          }, config.timeout);
        } else {
          a.add(container).addClass(config.active);
          container.find("input").focus();
        }
      });
      element.on({
        keyup : function(event) {
          if ("Escape" === event.key) {
            a.add(o).removeClass(config.active);
          }
        },
        mouseup : function(options) {
          if (!(o.find("input").val() || o.is(options.target) || 0 !== o.has(options.target).length || a.is(options.target) || 0 !== a.has(options.target).length)) {
            a.add(o).removeClass(config.active);
          }
        }
      });
    }
  };
  /**
   * @param {string} item
   * @param {!Object} key
   * @return {undefined}
   */
  self.Ani.formElm = function(item, key) {
    var a = {
      focus : "focused"
    };
    var value = key ? get(a, key) : a;
    if ($(item).exists()) {
      $(item).each(function() {
        var $input = $(this);
        if ($input.val()) {
          $input.parent().addClass(value.focus);
        }
        $input.on({
          focus : function() {
            $input.parent().addClass(value.focus);
          },
          blur : function() {
            if (!$input.val()) {
              $input.parent().removeClass(value.focus);
            }
          }
        });
      });
    }
  };
  /**
   * @param {string} path
   * @param {!Object} name
   * @return {undefined}
   */
  self.Validate = function(path, name) {
    if ($(path).exists()) {
      $(path).each(function() {
        var config = {
          errorElement : "span"
        };
        config = name ? get(config, name) : config;
        $(this).validate(config);
      });
    }
  };
  /**
   * @return {undefined}
   */
  self.Validate.init = function() {
    self.Validate(".form-validate", {
      errorElement : "span",
      errorClass : "invalid",
      errorPlacement : function(error, element) {
        error.appendTo(element.parent());
      }
    });
  };
  /**
   * @param {string} item
   * @param {!Object} context
   * @return {undefined}
   */
  self.Dropzone = function(item, context) {
    if ($(item).exists()) {
      $(item).each(function() {
        var t = (t = $(item).data("max-files")) || null;
        var fileSize = (fileSize = $(item).data("max-file-size")) || 256;
        var cb = $(item).data("accepted-files");
        cb = {
          autoDiscover : false,
          maxFiles : t,
          maxFilesize : fileSize,
          acceptedFiles : cb = cb || null
        };
        cb = context ? get(cb, context) : cb;
        $(this).addClass("dropzone").dropzone(cb);
      });
    }
  };
  /**
   * @return {undefined}
   */
  self.Dropzone.init = function() {
    self.Dropzone(".upload-zone", {
      url : "/images"
    });
  };
  /**
   * @return {undefined}
   */
  self.Wizard = function() {
    var form = $(".nk-wizard").show();
    form.steps({
      headerTag : ".nk-wizard-head",
      bodyTag : ".nk-wizard-content",
      labels : {
        finish : "Submit",
        next : "Next",
        previous : "Prev",
        loading : "Loading ..."
      },
      onStepChanging : function(event, currentIndex, newIndex) {
        return newIndex < currentIndex || (currentIndex < newIndex && (form.find(".body:eq(" + newIndex + ") label.error").remove(), form.find(".body:eq(" + newIndex + ") .error").removeClass("error")), form.validate().settings.ignore = ":disabled,:hidden", form.valid());
      },
      onFinishing : function(event, currentIndex) {
        return form.validate().settings.ignore = ":disabled", form.valid();
      },
      onFinished : function(err, response) {
        /** @type {string} */
        window.location.href = "#";
      }
    }).validate({
      errorElement : "span",
      errorClass : "invalid",
      errorPlacement : function(error, element) {
        error.appendTo(element.parent());
      }
    });
  };
  /**
   * @param {string} path
   * @param {!Object} value
   * @return {undefined}
   */
  self.DataTable = function(path, value) {
    if ($(path).exists()) {
      $(path).each(function() {
        var undefined = $(this).data("auto-responsive");
        var options = {
          responsive : true,
          autoWidth : false,
          dom : $(this).hasClass("is-separate") ? '<"row justify-between g-2"<"col-7 col-sm-6 text-left"f><"col-5 col-sm-6 text-right"<"datatable-filter"l>>><"my-3"t><"row align-items-center"<"col-7 col-sm-12 col-md-9"p><"col-5 col-sm-12 col-md-3 text-left text-md-right"i>>' : '<"row justify-between g-2"<"col-7 col-sm-6 text-left"f><"col-5 col-sm-6 text-right"<"datatable-filter"l>>><"datatable-wrap my-3"t><"row align-items-center"<"col-7 col-sm-12 col-md-9"p><"col-5 col-sm-12 col-md-3 text-left text-md-right"i>>',
          language : {
            search : "",
            searchPlaceholder : "Type in to Search",
            lengthMenu : "<span class='d-none d-sm-inline-block'>Show</span><div class='form-control-select'> _MENU_ </div>",
            info : "_START_ -_END_ of _TOTAL_",
            infoEmpty : "No records found",
            infoFiltered : "( Total _MAX_  )",
            paginate : {
              first : "First",
              last : "Last",
              next : "Next",
              previous : "Prev"
            }
          }
        };
        options = value ? get(options, value) : options;
        options = false === undefined ? get(options, {
          responsive : false
        }) : options;
        $(this).DataTable(options);
      });
    }
  };
  /**
   * @return {undefined}
   */
  self.DataTable.init = function() {
    self.DataTable(".datatable-init", {
      responsive : {
        details : true
      }
    });
    /** @type {number} */
    $.fn.DataTable.ext.pager.numbers_length = 7;
  };
  /**
   * @param {string} object
   * @param {string} old_len
   * @return {undefined}
   */
  self.BS.ddfix = function(object, old_len) {
    var MODULE_SELECTOR = old_len || "a:not(.clickable), button:not(.clickable), a:not(.clickable) *, button:not(.clickable) *";
    $(object || ".dropdown-menu").on("click", function(event) {
      if (!$(event.target).is(MODULE_SELECTOR)) {
        event.stopPropagation();
      }
    });
    if (self.State.isRTL) {
      $(".dropdown-menu").each(function() {
        var $item = $(this);
        if ($item.hasClass("dropdown-menu-right") && !$item.hasClass("dropdown-menu-center")) {
          $item.prev('[data-toggle="dropdown"]').dropdown({
            popperConfig : {
              placement : "bottom-start"
            }
          });
        } else {
          if (!($item.hasClass("dropdown-menu-right") || $item.hasClass("dropdown-menu-center"))) {
            $item.prev('[data-toggle="dropdown"]').dropdown({
              popperConfig : {
                placement : "bottom-end"
              }
            });
          }
        }
      });
    }
  };
  /**
   * @param {string} object
   * @return {undefined}
   */
  self.BS.tabfix = function(object) {
    $(object || '[data-toggle="modal"]').on("click", function() {
      var c = $(this);
      var src = c.data("target");
      var m = c.attr("href");
      c = c.data("tab-target");
      m = src ? i.find(src) : i.find(m);
      if (c && "#" !== c && m) {
        m.find('[href="' + c + '"]').tab("show");
      } else {
        if (m) {
          m = m.find(".nk-nav.nav-tabs");
          m = $(m[0]).find('[data-toggle="tab"]');
          $(m[0]).tab("show");
        }
      }
    });
  };
  /**
   * @return {undefined}
   */
  self.ModeSwitch = function() {
    var t = $(".dark-switch");
    if (i.hasClass("dark-mode")) {
      t.addClass("active");
    } else {
      t.removeClass("active");
    }
    t.on("click", function(event) {
      event.preventDefault();
      $(this).toggleClass("active");
      i.toggleClass("dark-mode");
    });
  };
  /**
   * @param {string} y
   * @param {!Object} options
   * @return {undefined}
   */
  self.Knob = function(y, options) {
    var defaults;
    var config;
    if ($(y).exists() && "function" == typeof $.fn.knob) {
      defaults = {
        min : 0
      };
      config = options ? get(defaults, options) : defaults;
      $(y).each(function() {
        $(this).knob(config);
      });
    }
  };
  /**
   * @return {undefined}
   */
  self.Knob.init = function() {
    var opts = {
      readOnly : true,
      lineCap : "round"
    };
    var options = {
      angleOffset : -90,
      angleArc : 180,
      readOnly : true,
      lineCap : "round"
    };
    self.Knob(".knob", opts);
    self.Knob(".knob-half", options);
  };
  /**
   * @param {string} item
   * @param {!Object} value
   * @return {undefined}
   */
  self.Range = function(item, value) {
    if ($(item).exists() && "undefined" != typeof noUiSlider) {
      $(item).each(function() {
        var options = $(this).attr("id");
        /** @type {(Element|null)} */
        var slider = document.getElementById(options);
        options = {
          start : [25],
          connect : "lower",
          direction : self.State.isRTL ? "rtl" : "ltr",
          range : {
            min : 0,
            max : 100
          }
        };
        options = value ? get(options, value) : options;
        noUiSlider.create(slider, options);
      });
    }
  };
  /**
   * @return {undefined}
   */
  self.Range.init = function() {
    self.Range(".form-range-slider");
  };
  /**
   * @return {undefined}
   */
  self.Select2.init = function() {
    self.Select2(".form-select");
  };
  /**
   * @param {string} path
   * @param {!Object} config
   * @return {undefined}
   */
  self.Slick = function(path, config) {
    if ($(path).exists() && "function" == typeof $.fn.slick) {
      $(path).each(function() {
        var defaults = {
          prevArrow : '<div class="slick-arrow-prev"><a href="javascript:void(0);" class="slick-prev"><em class="icon ni ni-chevron-left"></em></a></div>',
          nextArrow : '<div class="slick-arrow-next"><a href="javascript:void(0);" class="slick-next"><em class="icon ni ni-chevron-right"></em></a></div>',
          rtl : self.State.isRTL
        };
        defaults = config ? get(defaults, config) : defaults;
        $(this).slick(defaults);
      });
    }
  };
  /**
   * @return {undefined}
   */
  self.Slider.init = function() {
    self.Slick(".slider-init");
  };
  /**
   * @param {?} formatters
   * @param {?} customFormatters
   * @return {undefined}
   */
  self.NumberSpinner = function(formatters, customFormatters) {
    /** @type {!NodeList<Element>} */
    var a = document.querySelectorAll("[data-number='plus']");
    /** @type {!NodeList<Element>} */
    var aSorted = document.querySelectorAll("[data-number='minus']");
    a.forEach(function(canCreateDiscussions, i, n) {
      a[i].parentNode;
      a[i].addEventListener("click", function() {
        var list = a[i].parentNode.children;
        list.forEach(function(canCreateDiscussions, name, n) {
          var value;
          var spacing;
          var distance;
          if (list[name].classList.contains("number-spinner")) {
            /** @type {number} */
            value = "" == !list[name].value ? parseInt(list[name].value) : 0;
            /** @type {number} */
            spacing = "" == !list[name].step ? parseInt(list[name].step) : 1;
            /** @type {number} */
            distance = "" == !list[name].max ? parseInt(list[name].max) : 1 / 0;
            /** @type {number} */
            list[name].value = value + spacing < distance + 1 ? value + spacing : value;
          }
        });
      });
    });
    aSorted.forEach(function(canCreateDiscussions, i, n) {
      aSorted[i].parentNode;
      aSorted[i].addEventListener("click", function() {
        var list = aSorted[i].parentNode.children;
        list.forEach(function(canCreateDiscussions, name, n) {
          var value;
          var prev;
          var next;
          if (list[name].classList.contains("number-spinner")) {
            /** @type {number} */
            value = "" == !list[name].value ? parseInt(list[name].value) : 0;
            /** @type {number} */
            prev = "" == !list[name].step ? parseInt(list[name].step) : 1;
            /** @type {number} */
            next = "" == !list[name].min ? parseInt(list[name].min) : 0;
            /** @type {number} */
            list[name].value = next - 1 < value - prev ? value - prev : value;
          }
        });
      });
    });
  };
  /**
   * @return {undefined}
   */
  self.OtherInit = function() {
    self.ClassBody();
    self.PassSwitch();
    self.CurrentLink();
    self.LinkOff(".is-disable");
    self.ClassNavMenu();
    self.SetHW("[data-height]", "height");
    self.SetHW("[data-width]", "width");
    self.NumberSpinner();
  };
  /**
   * @return {undefined}
   */
  self.Ani.init = function() {
    self.Ani.formElm(".form-control-outlined");
    self.Ani.formSearch(".toggle-search");
  };
  /**
   * @return {undefined}
   */
  self.BS.init = function() {
    self.BS.menutip("a.nk-menu-link");
    self.BS.tooltip(".nk-tooltip");
    self.BS.tooltip(".btn-tooltip", {
      placement : "top"
    });
    self.BS.tooltip('[data-toggle="tooltip"]');
    self.BS.tooltip(".tipinfo,.nk-menu-tooltip", {
      placement : "right"
    });
    self.BS.popover('[data-toggle="popover"]');
    self.BS.progress("[data-progress]");
    self.BS.fileinput(".custom-file-input");
    self.BS.modalfix();
    self.BS.ddfix();
    self.BS.tabfix();
  };
  /**
   * @return {undefined}
   */
  self.Picker.init = function() {
    self.Picker.date(".date-picker");
    self.Picker.dob(".date-picker-alt");
    self.Picker.time(".time-picker");
    self.Picker.date(".date-picker-range", {
      todayHighlight : false,
      autoclose : false
    });
  };
  /**
   * @return {undefined}
   */
  self.Addons.Init = function() {
    self.Knob.init();
    self.Range.init();
    self.Select2.init();
    self.Dropzone.init();
    self.Slider.init();
    self.DataTable.init();
  };
  /**
   * @return {undefined}
   */
  self.TGL.init = function() {
    self.TGL.content(".toggle");
    self.TGL.expand(".toggle-expand");
    self.TGL.expand(".toggle-opt", {
      toggle : false
    });
    self.TGL.showmenu(".nk-nav-toggle");
    self.TGL.ddmenu("." + optionName + "-toggle", {
      self : optionName + "-toggle",
      child : optionName + "-sub"
    });
  };
  /**
   * @return {undefined}
   */
  self.BS.modalOnInit = function() {
    $(".modal").on("shown.bs.modal", function() {
      self.Select2.init();
      self.Validate.init();
    });
  };
  /**
   * @return {undefined}
   */
  self.init = function() {
    self.coms.docReady.push(self.OtherInit);
    self.coms.docReady.push(self.Prettify);
    self.coms.docReady.push(self.ColorBG);
    self.coms.docReady.push(self.ColorTXT);
    self.coms.docReady.push(self.Copied);
    self.coms.docReady.push(self.Ani.init);
    self.coms.docReady.push(self.TGL.init);
    self.coms.docReady.push(self.BS.init);
    self.coms.docReady.push(self.Validate.init);
    self.coms.docReady.push(self.Picker.init);
    self.coms.docReady.push(self.Addons.Init);
    self.coms.docReady.push(self.Wizard);
    self.coms.winLoad.push(self.ModeSwitch);
  };
  self.init();
}(NioApp, jQuery);
