/*
 * @copyright   Leyun internet Technology(Shanghai)Co.,Ltd
 * @license     http://www.dzzoffice.com/licenses/license.txt
 * @package     DzzOffice
 * @link        http://www.dzzoffice.com
 * @author      zyx(zyx@dzz.cc)
 */
function checkAll(e,t,a,n,r){n=n||"chkall";for(var c=0;c<t.elements.length;c++){var d=t.elements[c];"option"==e&&"radio"==d.type&&d.value==a&&1!=d.disabled?d.checked=!0:"value"==e&&"checkbox"==d.type&&d.getAttribute("chkvalue")==a?(d.checked=t.elements[n].checked,r&&multiupdate(d)):"prefix"==e&&d.name&&d.name!=n&&(!a||a&&d.name.match(a))&&(d.checked=t.elements[n].checked,r&&(d.parentNode&&"li"==d.parentNode.tagName.toLowerCase()&&(d.parentNode.className=d.checked?"checked":""),d.parentNode.parentNode&&"div"==d.parentNode.parentNode.tagName.toLowerCase()&&(d.parentNode.parentNode.className=d.checked?"item checked":"item")))}}function fixTree_organization(e){e.find(".tree-heng1").each(function(){var e=jQuery(this).parent().parent().parent(),t=jQuery(this).parent().find(".tree-su").length;e.nextAll().each(function(){var e=jQuery(this).find(".child-org");if(e.find(".tree-su").length<=t)return!1;e.find(".tree-su").eq(t).removeClass("tree-su")})})}