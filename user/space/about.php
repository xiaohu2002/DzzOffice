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
$verify = C::t('user_verify')->fetch($_G['uid']);
$about=array();
$identify = filter_var($_GET['modname'], FILTER_SANITIZE_STRING);
$appConfig=DZZ_ROOT.'./dzz/'.$identify.'/config/config.php';
if($identify && file_exists($appConfig)){
	$config=include($appConfig);
	if(isset($config['about'])){
		$about=$config['about'];
		if(!$_G['setting']['bbclosed']){
			$about['sitelogo']=$_G['setting']['sitelogo']?\IO::getFileUri('attach::'.$_G['setting']['sitelogo']):'static/image/common/logo.png';
		}else{
			$about['sitelogo']='static/image/common/logo.png'; 
		}
		$appinfo=C::t('app_market')->fetch_by_identifier($identify);
		if(empty($about['logo'])){
			$about['logo']=$_G['setting']['attachurl'].$appinfo['appico'];
		}
		if(empty($about['version'])) $about['version']=$appinfo['version'];
	}
}
$about['xhversion']='V'.CORE_XHVERSION;//版本信息，留空不显示
if(empty($appinfo['appname'])){
	$about['name_zh']='';//中文名称:大桌子协同办公，留空不显示
	$about['name_en']=$_G['setting']['sitename'];//英文名称，注意前面的dzz去掉，留空不显示
	$about['version']='V'.CORE_VERSION;//版本信息，留空不显示
	//中间大图
	if(!$_G['setting']['bbclosed']){
		$about['logo']=$_G['setting']['sitelogo']?\IO::getFileUri('attach::'.$_G['setting']['sitelogo']):'static/image/common/logo.png';
	}else{
		$about['logo']='static/image/common/logo.png'; 
	}
}

//站点logo,留空不显示
include template('about');
exit();