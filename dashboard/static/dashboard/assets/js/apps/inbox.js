'use strict';
!function(loop, $) {
  $(window);
  $("body");
  loop.Break;
  var $allPanels = $(".nk-ibx-aside");
  var a = $(".nk-ibx-link");
  var n = $(".nk-ibx-hide");
  var t = $(".nk-ibx-view");
  var l = $(".nk-ibx-reply-header");
  var o = $(".tagify");
  /** @type {string} */
  var READONLY_CLS = "hide-aside";
  /** @type {string} */
  var c = "show-ibx";
  /**
   * @return {undefined}
   */
  loop.Message = function() {
    a.on("click", function(event) {
      a.removeClass("current");
      $allPanels.addClass(READONLY_CLS);
      t.addClass(c);
      $(this).addClass("current");
      event.preventDefault();
    });
    n.on("click", function(event) {
      $allPanels.removeClass(READONLY_CLS);
      t.removeClass(c);
      event.preventDefault();
    });
    l.on("click", function(s) {
      if (!($(this).hasClass("is-opened") || 0 < $(s.target).parents(".nk-reply-tools").length)) {
        if ($(this).hasClass("is-collapsed")) {
          $(this).removeClass("is-collapsed").next().addClass("is-shown");
        } else {
          if (!$(this).hasClass("is-collapsed")) {
            $(this).addClass("is-collapsed").next().removeClass("is-shown");
          }
        }
      }
    });
    if (o.exists() && "function" == typeof $.fn.tagify) {
      o.tagify();
    }
  };
  loop.coms.docReady.push(loop.Message);
}(NioApp, jQuery);
