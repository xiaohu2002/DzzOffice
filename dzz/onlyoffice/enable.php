<?php
/* @authorcode  codestrings
 * @copyright   QiaoQiaoShiDai Internet Technology(Shanghai)Co.,Ltd
 * @license     https://www.oaooa.com/licenses/
 * 
 * @link        https://www.oaooa.com
 * @author      zyx(zyx@oaooa.com)
 */
if (!defined('IN_DZZ') || !defined('IN_ADMIN')) {
	exit('Access Denied');
}
if( !isset($apparray['app']['extra']['DocumentUrl']) || !$apparray['app']['extra']['DocumentUrl'] ){
	showmessage('onlyoffice_enable_failed' );
	exit;
}
$finish = true;
 
