/* @authorcode  codestrings
 * @copyright   Leyun internet Technology(Shanghai)Co.,Ltd
 * @license     http://www.dzzoffice.com/licenses/license.txt
 * @package     DzzOffice
 * @link        http://www.dzzoffice.com
 * @author      zyx(zyx@dzz.cc)
 */
function popbox() {
	$(".popbox")
		.css({
			display: "none"
		})
}! function(o) {
	o.fn.popbox = function(t) {
		var e = o(".popbox");
		e.length || (e = o(' <div class="popbox clearfix">  <div class="popbox-pointer">\t\t<div class="gb_I"></div>\t\t<div class="gb_H"></div>  </div>  <div class="popbox-container">\t   <div class="loadding"></div>  </div></div>')
			.appendTo("body"));
		var a = o(this),
			n = [],
			c = 0,
			p = function(t) {
				return t && t.preventDefault(), a.data("href") && l(a.data("data-href")), o(".js-popbox")
					.removeClass("openpop"), i(), a.data("closest") && a.closest(a.data("closest"))
					.find(".dropdown-toggle")
					.dropdown("toggle"), !1
			},
			i = function() {
				var t = document.documentElement.clientWidth,
					n = document.documentElement.clientHeight;
				if (a.data("closest")) var c = a.closest(a.data("closest"));
				else c = a;
				a.addClass("openpop");
				var p = c.offset(),
					i = e.outerWidth(!0),
					l = e.outerHeight(!0),
					s = c.outerWidth(!0),
					d = c.outerHeight(!0),
					f = 0,
					u = 0;
				switch (e.attr("class", "popbox popbox-" + a.data("bs-placement")), a.data("bs-placement")) {
					case "cover":
						f = p.left, u = p.top;
						break;
					case "right":
						f = p.left + s + 10, u = p.top + d / 2 - l / 2;
						break;
					case "top":
						u = p.top - l - 10, f = p.left + s / 2 - i / 2;
						break;
					case "bottom":
						u = p.top + d + 10, f = p.left + s / 2 - i / 2;
						break;
					case "left":
						f = p.left - i - 10, u = p.top + d / 2 - l / 2;
						break;
					default:
						f = p.left + s + 10, u = p.top + d / 2 - l / 2
				}
				if (a.data("auto-adapt")) switch (a.data("bs-placement")) {
					case "right":
					case "left":
						f + i > t && (f = t - i - 10), f < 0 && (f = 10), u + l > n + jQuery(window)
							.scrollTop() && (u = n + jQuery(window)
								.scrollTop() - l - 10), u < 0 && (u = 10);
						break;
					case "top":
					case "bottom":
						u + l > n + jQuery(window)
							.scrollTop() && "bottom" != a.data("bs-placement") && "cover" != a.data("bs-placement") && (u = n - l - 10 + jQuery(window)
								.scrollTop()), u < 0 && (u = 10), f + i > t && (f = t - i - 10), f < 0 && (f = 10);
						break;
					case "cover":
						f + i > t && (f = t - i - 10), f < 0 && (f = 10)
				}
				switch (e.css({
					display: "block",
					left: f,
					top: u
				}), a.data("bs-placement")) {
					case "right":
					case "left":
						(u = p.top - u + d / 2 - 10) + 25 > l ? u = l - 25 : u < 5 && (u = 5), e.find(".gb_I,.gb_H")
							.attr("style", "top:" + u + "px");
						break;
					case "top":
					case "bottom":
						(f = p.left - f + s / 2 - 10) + 25 > i ? f = i - 25 : f < 5 && (f = 5), e.find(".gb_I,.gb_H")
							.attr("style", "left:" + f + "px")
				}
				o(document)
					.off("click.popbox")
					.on("click.popbox", function(t) {
						o(t.target)
							.closest(".popbox,.ui-icon,.dzzdate,.ui-corner-all", "#jquery-color-picker")
							.length || (r(), o(".openpop")
								.removeClass("openpop"))
					})
			},
			l = function(t) {
				if (t || (t = a.data("href")), "#" == t) {
					var e = a.siblings(".popbox-html")
						.html();
					s(e)
				} else {
					t += (-1 != t.indexOf("?") ? "&" : "?") + "t=" + (new Date)
						.getTime(), c = n.push(t), o.get(t, function(o) {
							s(o)
						})
				}
			},
			s = function(t) {
				e.find(".popbox-container")
					.html(t), e.find(".js-popbox")
					.on("click", function() {
						return l(o(this)
							.data("href")), !1
					}), e.find(".js-popbox-prev")
					.on("click", function() {
						return d(), !1
					}), e.find(".close,.cancel")
					.on("click", function(o) {
						o.preventDefault(), r()
					}), i()
			},
			d = function() {
				c > 1 ? c -= 1 : c = 0, url = n[c - 1], n.splice(c - 1, n.length - c + 1), l(url)
			},
			r = function() {
				c = 0, n = [], e.data("prevel", null), e.fadeOut("fast", function() {
						e.find(".popbox-container")
							.html('<div class="loadding"></div>')
					}), a.removeClass("openpop"), o(document)
					.off("click.popbox")
			};
		"update" == t ? window.setTimeout(function() {
				i()
			}) : "open" == t ? window.setTimeout(function() {
				p()
			}) : "close" == t ? r() : "getdata" == t ? l() : o(this)
			.off("click.popbox")
			.on("click.popbox", p)
	}
}(jQuery);
jQuery('.js-popbox').each(function(){
	if(jQuery(this).hasClass('disabled')) return;
	jQuery(this).popbox();
	jQuery("[data-bs-toggle='tooltip']").tooltip();
});