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
$op="qqlogin"; 
Hook::listen('adminlogin');
$setting = C::t('setting') -> fetch_all(null);
$navtitle="QQ登录配置";
include template('admin');
