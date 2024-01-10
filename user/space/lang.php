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
$langList = $_G['config']['output']['language_list']; 

$langset=trim($_GET['lang']);
if(!isset($langList[$langset])){
	exit(json_encode(array('error'=>'error')));
}else{
	if($_G['uid'])	C::t('user')->update($_G['uid'], array('language' => ($langset)));
	dsetcookie('language',$langset,60*60*24*30);
	include libfile('function/cache');
	cleartemplatecache();
	C::memory()->clear();
	exit(json_encode(array('msg'=>'success')));
}