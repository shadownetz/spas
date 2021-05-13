"use strict";
!(function (c, l) {
    (c.Package.name = "SPAS"), (c.Package.version = "1.0");
    var d = l(window),
        i = l("body"),
        u = l(document),
        t = "nk-menu",
        s = "nk-header-menu",
        r = "nk-sidebar",
        e = "nk-sidebar-mobile",
        p = c.Break;
    function f(e, n) {
        return (
            Object.keys(n).forEach(function (t) {
                e[t] = n[t];
            }),
                e
        );
    }
    (c.ClassBody = function () {
        c.AddInBody(r), c.AddInBody("nk-apps-sidebar");
    }),
        (c.ClassNavMenu = function () {
            c.BreakClass("." + s, p.lg, { timeOut: 0 }),
                c.BreakClass("." + r, p.lg, { timeOut: 0, classAdd: e }),
                d.on("resize", function () {
                    c.BreakClass("." + s, p.lg), c.BreakClass("." + r, p.lg, { classAdd: e });
                });
        }),
        (c.Prettify = function () {
            window.prettyPrint && prettyPrint();
        }),
        (c.Copied = function () {
            var t = ".clipboard-init",
                a = ".clipboard-text",
                o = "clipboard-success",
                s = "clipboard-error";
            function e(t, e) {
                var t = l(t),
                    n = t.parent(),
                    i = { text: "Copy", done: "Copied", fail: "Failed" },
                    t = { text: t.data("clip-text"), done: t.data("clip-success"), fail: t.data("clip-error") };
                (i.text = t.text || i.text), (i.done = t.done || i.done), (i.fail = t.fail || i.fail);
                (t = "success" === e ? i.done : i.fail), (e = "success" === e ? o : s);
                n.addClass(e).find(a).html(t),
                    setTimeout(function () {
                        n
                            .removeClass(o + " " + s)
                            .find(a)
                            .html(i.text)
                            .blur(),
                            n.find("input").blur();
                    }, 2e3);
            }
            ClipboardJS.isSupported()
                ? new ClipboardJS(t)
                    .on("success", function (t) {
                        e(t.trigger, "success"), t.clearSelection();
                    })
                    .on("error", function (t) {
                        e(t.trigger, "error");
                    })
                : l(t).css("display", "none");
        }),
        (c.CurrentLink = function () {
            var t = window.location.href,
                n = (n = t.substring(0, -1 == t.indexOf("#") ? t.length : t.indexOf("#"))).substring(0, -1 == n.indexOf("?") ? n.length : n.indexOf("?"));
            l(".nk-menu-link, .menu-link, .nav-link").each(function () {
                var t = l(this),
                    e = t.attr("href");
                n.match(e)
                    ? (t.closest("li").addClass("active current-page").parents().closest("li").addClass("active current-page"),
                        t.closest("li").children(".nk-menu-sub").css("display", "block"),
                        t.parents().closest("li").children(".nk-menu-sub").css("display", "block"))
                    : t.closest("li").removeClass("active current-page").parents().closest("li:not(.current-page)").removeClass("active");
            });
        }),
        (c.PassSwitch = function () {
            c.Passcode(".passcode-switch");
        }),
        (c.Toast = function (t, e, n) {
            var i = "",
                a = "info" === (e = e || "info") ? "ni ni-info-fill" : "success" === e ? "ni ni-check-circle-fill" : "error" === e ? "ni ni-cross-circle-fill" : "warning" === e ? "ni ni-alert-fill" : "",
                o = { position: "bottom-right", ui: "", icon: "auto", clear: !1 },
                o = n ? f(o, n) : o;
            (o.position = o.position ? "toast-" + o.position : "toast-bottom-right"),
                (o.icon = "auto" === o.icon ? a : o.icon || ""),
                (o.ui = o.ui ? " " + o.ui : ""),
                (i = "" !== o.icon ? '<span class="toastr-icon"><em class="icon ' + o.icon + '"></em></span>' : ""),
            "" !== (t = "" !== t ? i + '<div class="toastr-text">' + t + "</div>" : "") &&
            (!0 === o.clear && toastr.clear(),
                (i = {
                    closeButton: !0,
                    debug: !1,
                    newestOnTop: !1,
                    progressBar: !1,
                    positionClass: o.position + o.ui,
                    closeHtml: '<span class="btn-trigger">Close</span>',
                    preventDuplicates: !0,
                    showDuration: "1500",
                    hideDuration: "1500",
                    timeOut: "2000",
                    toastClass: "toastr",
                    extendedTimeOut: "3000",
                }),
                (toastr.options = f(i, o)),
                toastr[e](t));
        }),
        (c.TGL.screen = function (t) {
            l(t).exists() &&
            l(t).each(function () {
                var t = l(this).data("toggle-screen");
                t && l(this).addClass("toggle-screen-" + t);
            });
        }),
        (c.TGL.content = function (t, e) {
            var n = l(t || ".toggle"),
                o = l("[data-content]"),
                s = !1,
                t = { active: "active", content: "content-active", break: !0 },
                r = e ? f(t, e) : t;
            c.TGL.screen(o),
                n.on("click", function (t) {
                    (s = this), c.Toggle.trigger(l(this).data("target"), r), t.preventDefault();
                }),
                u.on("mouseup", function (t) {
                    var e, n, i, a;
                    s &&
                    ((e = l(s)),
                        (n = l(".select2-container")),
                        (i = l(".datepicker-dropdown")),
                        (a = l(".ui-timepicker-container")),
                    e.is(t.target) ||
                    0 !== e.has(t.target).length ||
                    o.is(t.target) ||
                    0 !== o.has(t.target).length ||
                    n.is(t.target) ||
                    0 !== n.has(t.target).length ||
                    i.is(t.target) ||
                    0 !== i.has(t.target).length ||
                    a.is(t.target) ||
                    0 !== a.has(t.target).length ||
                    (c.Toggle.removed(e.data("target"), r), (s = !1)));
                }),
                d.on("resize", function () {
                    o.each(function () {
                        var t = l(this).data("content"),
                            e = l(this).data("toggle-screen"),
                            e = p[e];
                        c.Win.width > e && c.Toggle.removed(t, r);
                    });
                });
        }),
        (c.TGL.expand = function (t, e) {
            var n = t || ".expand",
                t = { toggle: !0 },
                i = e ? f(t, e) : t;
            l(n).on("click", function (t) {
                c.Toggle.trigger(l(this).data("target"), i), t.preventDefault();
            });
        }),
        (c.TGL.ddmenu = function (t, e) {
            var n = t || ".nk-menu-toggle",
                t = { active: "active", self: "nk-menu-toggle", child: "nk-menu-sub" },
                i = e ? f(t, e) : t;
            l(n).on("click", function (t) {
                (c.Win.width < p.lg || l(this).parents().hasClass(r)) && c.Toggle.dropMenu(l(this), i), t.preventDefault();
            });
        }),
        (c.TGL.showmenu = function (t, e) {
            var n = l(t || ".nk-nav-toggle"),
                i = l("[data-content]"),
                a = i.hasClass(s) ? p.lg : p.xl,
                t = { active: "toggle-active", content: r + "-active", body: "nav-shown", overlay: "nk-sidebar-overlay", break: a, close: { profile: !0, menu: !1 } },
                o = e ? f(t, e) : t;
            n.on("click", function (t) {
                c.Toggle.trigger(l(this).data("target"), o), t.preventDefault();
            }),
                u.on("mouseup", function (t) {
                    !n.is(t.target) && 0 === n.has(t.target).length && !i.is(t.target) && 0 === i.has(t.target).length && c.Win.width < a && c.Toggle.removed(n.data("target"), o);
                }),
                d.on("resize", function () {
                    (c.Win.width < p.xl || c.Win.width < a) && c.Toggle.removed(n.data("target"), o);
                });
        }),
        (c.Ani.formSearch = function (t, e) {
            var n = { active: "active", timeout: 400, target: "[data-search]" },
                i = e ? f(n, e) : n,
                a = l(t),
                o = l(i.target);
            a.exists() &&
            (a.on("click", function (t) {
                t.preventDefault();
                var t = l(this).data("target"),
                    e = l("[data-search=" + t + "]"),
                    t = l("[data-target=" + t + "]");
                e.hasClass(i.active)
                    ? (t.add(e).removeClass(i.active),
                        setTimeout(function () {
                            e.find("input").val("");
                        }, i.timeout))
                    : (t.add(e).addClass(i.active), e.find("input").focus());
            }),
                u.on({
                    keyup: function (t) {
                        "Escape" === t.key && a.add(o).removeClass(i.active);
                    },
                    mouseup: function (t) {
                        o.find("input").val() || o.is(t.target) || 0 !== o.has(t.target).length || a.is(t.target) || 0 !== a.has(t.target).length || a.add(o).removeClass(i.active);
                    },
                }));
        }),
        (c.Ani.formElm = function (t, e) {
            var n = { focus: "focused" },
                i = e ? f(n, e) : n;
            l(t).exists() &&
            l(t).each(function () {
                var t = l(this);
                t.val() && t.parent().addClass(i.focus),
                    t.on({
                        focus: function () {
                            t.parent().addClass(i.focus);
                        },
                        blur: function () {
                            t.val() || t.parent().removeClass(i.focus);
                        },
                    });
            });
        }),
        (c.Validate = function (t, e) {
            l(t).exists() &&
            l(t).each(function () {
                var t = { errorElement: "span" },
                    t = e ? f(t, e) : t;
                l(this).validate(t);
            });
        }),
        (c.Validate.init = function () {
            c.Validate(".form-validate", {
                errorElement: "span",
                errorClass: "invalid",
                errorPlacement: function (t, e) {
                    t.appendTo(e.parent());
                },
            });
        }),
        (c.Dropzone = function (i, a) {
            l(i).exists() &&
            l(i).each(function () {
                var t = (t = l(i).data("max-files")) || null,
                    e = (e = l(i).data("max-file-size")) || 256,
                    n = l(i).data("accepted-files"),
                    n = { autoDiscover: !1, maxFiles: t, maxFilesize: e, acceptedFiles: (n = n || null) },
                    n = a ? f(n, a) : n;
                l(this).addClass("dropzone").dropzone(n);
            });
        }),
        (c.Dropzone.init = function () {
            c.Dropzone(".upload-zone", { url: "/images" });
        }),
        (c.Wizard = function () {
            var i = l(".nk-wizard").show();
            i.steps({
                headerTag: ".nk-wizard-head",
                bodyTag: ".nk-wizard-content",
                labels: { finish: "Submit", next: "Next", previous: "Prev", loading: "Loading ..." },
                onStepChanging: function (t, e, n) {
                    return n < e || (e < n && (i.find(".body:eq(" + n + ") label.error").remove(), i.find(".body:eq(" + n + ") .error").removeClass("error")), (i.validate().settings.ignore = ":disabled,:hidden"), i.valid());
                },
                onFinishing: function (t, e) {
                    return (i.validate().settings.ignore = ":disabled"), i.valid();
                },
                onFinished: function (t, e) {
                    window.location.href = "#";
                },
            }).validate({
                errorElement: "span",
                errorClass: "invalid",
                errorPlacement: function (t, e) {
                    t.appendTo(e.parent());
                },
            });
        }),
        (c.DataTable = function (t, n) {
            l(t).exists() &&
            l(t).each(function () {
                var t = l(this).data("auto-responsive"),
                    e = {
                        responsive: !0,
                        autoWidth: !1,
                        dom: l(this).hasClass("is-separate")
                            ? '<"row justify-between g-2"<"col-7 col-sm-6 text-left"f><"col-5 col-sm-6 text-right"<"datatable-filter"l>>><"my-3"t><"row align-items-center"<"col-7 col-sm-12 col-md-9"p><"col-5 col-sm-12 col-md-3 text-left text-md-right"i>>'
                            : '<"row justify-between g-2"<"col-7 col-sm-6 text-left"f><"col-5 col-sm-6 text-right"<"datatable-filter"l>>><"datatable-wrap my-3"t><"row align-items-center"<"col-7 col-sm-12 col-md-9"p><"col-5 col-sm-12 col-md-3 text-left text-md-right"i>>',
                        language: {
                            search: "",
                            searchPlaceholder: "Type in to Search",
                            lengthMenu: "<span class='d-none d-sm-inline-block'>Show</span><div class='form-control-select'> _MENU_ </div>",
                            info: "_START_ -_END_ of _TOTAL_",
                            infoEmpty: "No records found",
                            infoFiltered: "( Total _MAX_  )",
                            paginate: { first: "First", last: "Last", next: "Next", previous: "Prev" },
                        },
                    },
                    e = n ? f(e, n) : e,
                    e = !1 === t ? f(e, { responsive: !1 }) : e;
                l(this).DataTable(e);
            });
        }),
        (c.DataTable.init = function () {
            c.DataTable(".datatable-init", { responsive: { details: !0 } }), (l.fn.DataTable.ext.pager.numbers_length = 7);
        }),
        (c.BS.ddfix = function (t, e) {
            var n = e || "a:not(.clickable), button:not(.clickable), a:not(.clickable) *, button:not(.clickable) *";
            l(t || ".dropdown-menu").on("click", function (t) {
                l(t.target).is(n) || t.stopPropagation();
            }),
            c.State.isRTL &&
            l(".dropdown-menu").each(function () {
                var t = l(this);
                t.hasClass("dropdown-menu-right") && !t.hasClass("dropdown-menu-center")
                    ? t.prev('[data-toggle="dropdown"]').dropdown({ popperConfig: { placement: "bottom-start" } })
                    : t.hasClass("dropdown-menu-right") || t.hasClass("dropdown-menu-center") || t.prev('[data-toggle="dropdown"]').dropdown({ popperConfig: { placement: "bottom-end" } });
            });
        }),
        (c.BS.tabfix = function (t) {
            l(t || '[data-toggle="modal"]').on("click", function () {
                var t = l(this),
                    e = t.data("target"),
                    n = t.attr("href"),
                    t = t.data("tab-target"),
                    n = e ? i.find(e) : i.find(n);
                t && "#" !== t && n ? n.find('[href="' + t + '"]').tab("show") : n && ((n = n.find(".nk-nav.nav-tabs")), (n = l(n[0]).find('[data-toggle="tab"]')), l(n[0]).tab("show"));
            });
        }),
        (c.ModeSwitch = function () {
            var t = l(".dark-switch");
            i.hasClass("dark-mode") ? t.addClass("active") : t.removeClass("active"),
                t.on("click", function (t) {
                    t.preventDefault(), l(this).toggleClass("active"), i.toggleClass("dark-mode");
                });
        }),
        (c.Knob = function (t, e) {
            var n, i;
            l(t).exists() &&
            "function" == typeof l.fn.knob &&
            ((n = { min: 0 }),
                (i = e ? f(n, e) : n),
                l(t).each(function () {
                    l(this).knob(i);
                }));
        }),
        (c.Knob.init = function () {
            var t = { readOnly: !0, lineCap: "round" },
                e = { angleOffset: -90, angleArc: 180, readOnly: !0, lineCap: "round" };
            c.Knob(".knob", t), c.Knob(".knob-half", e);
        }),
        (c.Range = function (t, n) {
            l(t).exists() &&
            "undefined" != typeof noUiSlider &&
            l(t).each(function () {
                var t = l(this).attr("id"),
                    e = document.getElementById(t),
                    t = { start: [25], connect: "lower", direction: c.State.isRTL ? "rtl" : "ltr", range: { min: 0, max: 100 } },
                    t = n ? f(t, n) : t;
                noUiSlider.create(e, t);
            });
        }),
        (c.Range.init = function () {
            c.Range(".form-range-slider");
        }),
        (c.Select2.init = function () {
            c.Select2(".form-select");
        }),
        (c.Slick = function (t, e) {
            l(t).exists() &&
            "function" == typeof l.fn.slick &&
            l(t).each(function () {
                var t = {
                        prevArrow: '<div class="slick-arrow-prev"><a href="javascript:void(0);" class="slick-prev"><em class="icon ni ni-chevron-left"></em></a></div>',
                        nextArrow: '<div class="slick-arrow-next"><a href="javascript:void(0);" class="slick-next"><em class="icon ni ni-chevron-right"></em></a></div>',
                        rtl: c.State.isRTL,
                    },
                    t = e ? f(t, e) : t;
                l(this).slick(t);
            });
        }),
        (c.Slider.init = function () {
            c.Slick(".slider-init");
        }),
        (c.NumberSpinner = function (t, e) {
            var i = document.querySelectorAll("[data-number='plus']"),
                a = document.querySelectorAll("[data-number='minus']");
            i.forEach(function (t, e, n) {
                i[e].parentNode;
                i[e].addEventListener("click", function () {
                    var s = i[e].parentNode.children;
                    s.forEach(function (t, e, n) {
                        var i, a, o;
                        s[e].classList.contains("number-spinner") &&
                        ((i = "" == !s[e].value ? parseInt(s[e].value) : 0), (a = "" == !s[e].step ? parseInt(s[e].step) : 1), (o = "" == !s[e].max ? parseInt(s[e].max) : 1 / 0), (s[e].value = i + a < o + 1 ? i + a : i));
                    });
                });
            }),
                a.forEach(function (t, e, n) {
                    a[e].parentNode;
                    a[e].addEventListener("click", function () {
                        var s = a[e].parentNode.children;
                        s.forEach(function (t, e, n) {
                            var i, a, o;
                            s[e].classList.contains("number-spinner") &&
                            ((i = "" == !s[e].value ? parseInt(s[e].value) : 0), (a = "" == !s[e].step ? parseInt(s[e].step) : 1), (o = "" == !s[e].min ? parseInt(s[e].min) : 0), (s[e].value = o - 1 < i - a ? i - a : i));
                        });
                    });
                });
        }),
        (c.OtherInit = function () {
            c.ClassBody(), c.PassSwitch(), c.CurrentLink(), c.LinkOff(".is-disable"), c.ClassNavMenu(), c.SetHW("[data-height]", "height"), c.SetHW("[data-width]", "width"), c.NumberSpinner();
        }),
        (c.Ani.init = function () {
            c.Ani.formElm(".form-control-outlined"), c.Ani.formSearch(".toggle-search");
        }),
        (c.BS.init = function () {
            c.BS.menutip("a.nk-menu-link"),
                c.BS.tooltip(".nk-tooltip"),
                c.BS.tooltip(".btn-tooltip", { placement: "top" }),
                c.BS.tooltip('[data-toggle="tooltip"]'),
                c.BS.tooltip(".tipinfo,.nk-menu-tooltip", { placement: "right" }),
                c.BS.popover('[data-toggle="popover"]'),
                c.BS.progress("[data-progress]"),
                c.BS.fileinput(".custom-file-input"),
                c.BS.modalfix(),
                c.BS.ddfix(),
                c.BS.tabfix();
        }),
        (c.Picker.init = function () {
            c.Picker.date(".date-picker"), c.Picker.dob(".date-picker-alt"), c.Picker.time(".time-picker"), c.Picker.date(".date-picker-range", { todayHighlight: !1, autoclose: !1 });
        }),
        (c.Addons.Init = function () {
            c.Knob.init(), c.Range.init(), c.Select2.init(), c.Dropzone.init(), c.Slider.init(), c.DataTable.init();
        }),
        (c.TGL.init = function () {
            c.TGL.content(".toggle"), c.TGL.expand(".toggle-expand"), c.TGL.expand(".toggle-opt", { toggle: !1 }), c.TGL.showmenu(".nk-nav-toggle"), c.TGL.ddmenu("." + t + "-toggle", { self: t + "-toggle", child: t + "-sub" });
        }),
        (c.BS.modalOnInit = function () {
            l(".modal").on("shown.bs.modal", function () {
                c.Select2.init(), c.Validate.init();
            });
        }),
        (c.init = function () {
            c.coms.docReady.push(c.OtherInit),
                c.coms.docReady.push(c.Prettify),
                c.coms.docReady.push(c.ColorBG),
                c.coms.docReady.push(c.ColorTXT),
                c.coms.docReady.push(c.Copied),
                c.coms.docReady.push(c.Ani.init),
                c.coms.docReady.push(c.TGL.init),
                c.coms.docReady.push(c.BS.init),
                c.coms.docReady.push(c.Validate.init),
                c.coms.docReady.push(c.Picker.init),
                c.coms.docReady.push(c.Addons.Init),
                c.coms.docReady.push(c.Wizard),
                c.coms.winLoad.push(c.ModeSwitch);
        }),
        c.init();
})(NioApp, jQuery);
