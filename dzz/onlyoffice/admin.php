<?php
/*
 * 应用卸载程序示例
 * @copyright   QiaoQiaoShiDai Internet Technology(Shanghai)Co.,Ltd
 * @license     https://www.oaooa.com/licenses/
 * 
 * @link        https://www.oaooa.com
 * @author      zyx(zyx@oaooa.com)
 */ 
if (!defined('IN_DZZ') && !defined('IN_ADMIN')) {
	exit('Access Denied');
}
$op="admin"; 
Hook::listen('adminlogin');
$navtitle="onlyoffice配置";
$app=C::t('app_market')->fetch_by_identifier('onlyoffice','dzz');
$app['extra'] && $app['extra']=unserialize($app['extra']); 
if (!submitcheck('confirmsubmit')) {
	include_once template('admin');
} else {
	if ( $_GET['app_key'] ) { 
		$extra =$app['extra'];
		$extra["DocumentUrl"]=$_GET['app_key'];
		$extra["exts"]=$_GET['exts']?trim($_GET['exts']):'';
		$extra["token"]=$_GET['token'];
		$extra["callback"]=$_GET['callback'];
		$extra["toubu"]=$_GET['toubu'];
		$extra["modifyFilter"]=$_GET['modifyFilter'];
		$extra["autosave"]=$_GET['autosave'];
		$extra["chat"]=$_GET['chat'];
		$extra["compactHeader"]=$_GET['compactHeader'];
		$extra["compactToolbar"]=$_GET['compactToolbar'];
		$extra["comments"]=$_GET['comments'];
		$extra["macros"]=$_GET['macros'];
		$extra["macrosMode"]=$_GET['macrosMode'];
		$extra["plugins"]=$_GET['plugins'];
		$extra["toolbarNoTabs"]=$_GET['toolbarNoTabs'];
		C::t("app_market")->update($app['appid'],array("extra"=> serialize($extra))); 
		showmessage('save_success', $_GET['refer']?$_GET['refer']:dreferer(), array(), array('alert' => 'right'));
	} else {
		showmessage('onlyoffice_url_setfailed');
	}
	exit();
}
