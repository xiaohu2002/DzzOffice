/*
 * @copyright   Leyun internet Technology(Shanghai)Co.,Ltd
 * @license     http://www.dzzoffice.com/licenses/license.txt
 * @package     DzzOffice
 * @link        http://www.dzzoffice.com
 * @author      zyx(zyx@dzz.cc)
 
 //依赖：BROWSER
 //头部引入js：
 <!--[if lt IE 9]>
  <script src="static/js/jquery.placeholder.js" type="text/javascript"></script>
 <![endif]-->
 
  //调用示例
 jQuery(document).ready(function(e) {
	jQuery(':input[placeholder]').each(function(){
		jQuery(this).placeholder();
	});
});
 
  */
!function(t){t.fn.placeholder=function(e){var o=t.extend({pColor:"#666",pActive:"#999",pFont:"14px",activeBorder:"#080",posL:16,zIndex:"999"},e);return this.each(function(){if(!("placeholder"in document.createElement("input"))){t(this).parent().css("position","relative");var e=BROWSER.ie,i=BROWSER.ie,n=t(this),r=n.attr("placeholder"),s=n.outerHeight(!0),c=n.outerWidth(!0),p=n.position().left,l=n.position().top,h=t("<span>",{class:"wrapper-placeholder",text:r,css:{position:"absolute",left:p+"px",top:l+"px",width:c+"px","padding-left":o.posL+"px",height:s+"px","line-height":s+"px",color:o.pColor,"font-size":o.pFont,"z-index":o.zIndex,cursor:"text"}}).insertBefore(n);n.val().length>0&&h.hide(),n.on("focus",function(){if(t(this).val().length>0&&h.hide(),h.css("color",o.pActive),e&&i<=9)var n="propertychange";else n="input";t(this).on(n,function(){0==t(this).val().length?h.show():h.hide()})}).on("blur",function(){0==t(this).val().length&&h.css("color",o.pColor).show()}),h.on("click",function(){n.trigger("focus"),t(this).css("color",o.pActive)}),n.filter(":focus").trigger("focus")}})}}(jQuery);