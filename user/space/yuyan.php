<?php
/*
 * @copyright   Leyun internet Technology(Shanghai)Co.,Ltd
 * @license     http://www.dzzoffice.com/licenses/license.txt
 * @package     DzzOffice
 * @link        http://www.dzzoffice.com
 * @author      zyx(zyx@dzz.cc)
 */
if(!defined('IN_DZZ')) {
    exit('Access Denied');
}
$fwq=$_SERVER['HTTP_REFERER'];
$requset_url=$_SERVER["REQUEST_URI"];
$pattern="~&do=(.*)~";	
$match=[];
preg_match($pattern, $requset_url, $match);
$url_sub=$match[1];
if ($_G['uid']){
if ($url_sub) {
	if (C::t('user')->update($_G['uid'], array('language' => ($url_sub)))) {
		if ($fwq){
			header("Location: $fwq");
		}else{
			header("Location: /");
		}
	}else{
	if ($fwq){
			header("Location: $fwq");
		}else{
			header("Location: /");
		}
}
}else{
	header("Location: /");
}
}else{
	header("Location: /");
}
exit();