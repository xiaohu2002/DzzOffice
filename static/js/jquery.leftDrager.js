/*
 * @copyright   Leyun internet Technology(Shanghai)Co.,Ltd
 * @license     http://www.dzzoffice.com/licenses/license.txt
 * @package     DzzOffice
 * @link        http://www.dzzoffice.com
 * @author      zyx(zyx@dzz.cc)
 */
!function(e){e.fn.leftDrager_layout=function(o,i){var t={cookieid:null,cookietime:2592e3,leftHide:700};i=e.extend(t,i);var n=e(this),c=(n.width(),e(".bs-left-container")),d=e(".bs-main-container"),s=(i.cookieid&&getcookie(i.cookieid+"_width")?parseInt(getcookie(i.cookieid+"_width")):c.outerWidth(!0))||0,r=s,u=document.documentElement.clientWidth,f=function(e,o){if(e*=1,!0===o){if(e<10)return r=s,void h("hide");h("show")}var t=d.outerWidth(!0),u=parseInt(d.css("minWidth"))||0;t-e<u&&(e=t-u),r=e,!0===o&&(s=r),c.css("width",r-5),d.css("marginLeft",r);var f=t-e;d.trigger("leftDrager_layout.changeWidthValue",[f]),n.css("left",r-5),i.cookieid&&setcookie(i.cookieid+"_width",r,i.cookietime)},h=function(e,o){"hide"===e?(c.css("display","none"),d.css("marginLeft",0),n.css({left:0,cursor:"default"}),i.cookieid&&!o&&setcookie(i.cookieid+"_isshow","hide",i.cookietime),jQuery(".left-drager-op").addClass("left-drager-op2")):"show"===e?(c.css({width:r,display:"block"}),d.css("marginLeft",document.documentElement.clientWidth<t.leftHide?0:r+5),n.css({left:r,cursor:"w-resize"}),i.cookieid&&!o&&setcookie(i.cookieid+"_isshow","show",i.cookietime),jQuery(".left-drager-op").removeClass("left-drager-op2")):c.width()<5||c.is(":hidden")?h("show"):h("hide")},l=function(){var e=jQuery(".lyear-layout-header").outerHeight(!0),i=Math.max(document.documentElement.clientHeight,document.body.clientHeight);jQuery(".bs-container,.bs-main-container,.bs-left-container,.left-drager,.leftMenu").css("height",i-e-5),jQuery(".bs-container").css("margin-top",e),"function"==typeof o&&o(),a()},a=function(){if(document.documentElement.clientWidth<t.leftHide)h("hide",!0);else if(i.cookieid&&getcookie(i.cookieid+"_isshow")){var e=getcookie(i.cookieid+"_isshow");h("hide"===e?"hide":"show",!0)}else h("show",!0)};!function(){l(),n.find(".left-drager-op").off("click").on("click",function(){h()}),jQuery(".leftTopmenu").off("click").on("click",function(){c.width()<10||c.is(":hidden")?h("hide"):h("show")});i.cookieid&&getcookie(i.cookieid+"_isshow")?"hide"===getcookie(i.cookieid+"_isshow")?h("hide",!0):h("show"):c.width()<10||c.is(":hidden")?h("hide"):h("show"),n.off("mousedown").on("mousedown",function(o){o.preventDefault();var i=o.clientX-n.offset().left,t=n.width();e(document).mousemove(function(e){e.preventDefault();var o=e.clientX;o-i+t>u&&(o=u+i-t),o-i<=0&&(o=i),f(o-i)}),e(document).mouseup(function(o){e(document).off("mouseup").off("mousemove");var n=o.clientX;n-i+t>u&&(n=u+i-t),n-i<=0&&(n=i),f(n-i,!0)})});window.onresize=function(){window.setTimeout(function(){l()},100)},a()}()}}(jQuery),$(document).ready(function(){jQuery(".left-drager").leftDrager_layout()});