/*
 * @copyright   Leyun internet Technology(Shanghai)Co.,Ltd
 * @license     http://www.dzzoffice.com/licenses/license.txt
 * @package     DzzOffice
 * @link        http://www.dzzoffice.com
 * @author      zyx(zyx@dzz.cc)
 */
function checkAll(e,a,t,c,d){c=c||"chkall";for(var n=0;n<a.elements.length;n++){var o=a.elements[n];"option"==e&&"radio"==o.type&&o.value==t&&1!=o.disabled?o.checked=!0:"value"==e&&"checkbox"==o.type&&o.getAttribute("chkvalue")==t?(o.checked=a.elements[c].checked,d&&multiupdate(o)):"prefix"==e&&o.name&&o.name!=c&&(!t||t&&o.name.match(t))&&(o.checked=a.elements[c].checked,d&&(o.parentNode&&"li"==o.parentNode.tagName.toLowerCase()&&(o.parentNode.className=o.checked?"checked":""),o.parentNode.parentNode&&"div"==o.parentNode.parentNode.tagName.toLowerCase()&&(o.parentNode.parentNode.className=o.checked?"item checked":"item")))}}