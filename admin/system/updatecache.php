<?php
/*
 * @copyright   Leyun internet Technology(Shanghai)Co.,Ltd
 * @license     http://www.dzzoffice.com/licenses/license.txt
 * @package     DzzOffice
 * @link        http://www.dzzoffice.com
 * @author      zyx(zyx@dzz.cc)
 */
if (!defined('IN_DZZ') || !defined('IN_ADMIN')) {
	exit('Access Denied');
}
error_reporting(E_ERROR);
$oparr = array('updatecache', 'database', /*'security','patch','update',*/
'cron', 'log');
$leftmenu = array();
$op = isset($_GET['op']) ? $_GET['op'] : '';
foreach ($oparr as $key => $value) {
	$leftmenu[$value] = array('title' => lang($value), 'active' => '');
	if ($value == $op)
		$leftmenu[$value]['active'] = 'class="nav-link active"';
}

include libfile('function/cache');

$navtitle = lang('updatecache') . ' - ' . lang('appname');
$step = max(1, intval($_GET['step']));

if ($step == 1) {
} elseif ($step == 2) {
	$type = implode('_', (array)$_GET['type']);

} elseif ($step == 3) {
	$type = explode('_', $_GET['type']);
	if (in_array('data', $type)) {
		updatecache();
	}
	if (in_array('tpl', $type) && $_G['config']['output']['tplrefresh']) {
		cleartemplatecache();
	}
}
include template('updatecache');
?>
