/**
 * Select2 Chinese translation
 */
(function ($) {
    "use strict";
    $.fn.select2.locales['zh-CN'] = {
        formatNoMatches: function () { return "No match found"; },
        formatInputTooShort: function (input, min) { var n = min - input.length; return "Please enter again" + n + "Characters";},
        formatInputTooLong: function (input, max) { var n = input.length - max; return "Please delete" + n + "Characters";},
        formatSelectionTooBig: function (limit) { return "You can only select the most" + limit + "term"; },
        formatLoadMore: function (pageNumber) { return "Loading results…"; },
        formatSearching: function () { return "Searching…"; }
    };

    $.extend($.fn.select2.defaults, $.fn.select2.locales['zh-CN']);
})(jQuery);
