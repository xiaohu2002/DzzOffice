/*
 * @copyright   Leyun internet Technology(Shanghai)Co.,Ltd
 * @license     http://www.dzzoffice.com/licenses/license.txt
 * @package     DzzOffice
 * @link        http://www.dzzoffice.com
 * @author      zyx(zyx@dzz.cc)
 */
_hotkey={},_hotkey.ctrl=0,_hotkey.alt=0,_hotkey.shift=0,_hotkey.init=function(){_hotkey.ctrl=0,_hotkey.alt=0,_hotkey.shift=0},jQuery(document).on("keydown",function(e){var t,c=(e=e||window.event).srcElement?e.srcElement:e.target;if(/input|textarea/i.test(c.tagName))return!0;switch(""!=e.which?t=e.which:""!=e.charCode?t=e.charCode:""!=e.keyCode&&(t=e.keyCode),t){case 17:_hotkey.ctrl=1;break;case 18:_hotkey.alt=1;break;case 16:_hotkey.shift=1}}),jQuery(document).on("keyup",function(e){var t,c=(e=e||window.event).srcElement?e.srcElement:e.target;if(/input|textarea/i.test(c.tagName))return!0;switch(""!=e.which?t=e.which:""!=e.charCode?t=e.charCode:""!=e.keyCode&&(t=e.keyCode),t){case 17:_hotkey.ctrl=0;break;case 18:_hotkey.alt=0;break;case 16:_hotkey.shift=0;break;case 46:case 110:try{_explorer.selectall.icos.length>0&&_filemanage.delIco(_config.selectall.icos[0])}catch(t){}break;case 69:try{_hotkey.alt&&_hotkey.ctrl&&_header.loging_close()}catch(t){}}});