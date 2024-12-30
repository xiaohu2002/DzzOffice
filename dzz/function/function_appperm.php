<?php
/*
 * @copyright   QiaoQiaoShiDai Internet Technology(Shanghai)Co.,Ltd
 * @license     https://www.oaooa.com/licenses/
 * 
 * @link        https://www.oaooa.com
 * @author      zyx(zyx@oaooa.com)
 */

if (!defined('IN_DZZ')) { //所有的php文件必须加上此句，防止被外部调用
	exit('Access Denied');
}
if (CURMODULE) {
	global $_G;
	if ($_G['adminid']) return;
	$appidxu = C::t('app_market')->fetch_by_identifier(CURMODULE);
	if ($appidxu['appid']) {
		if ($appidxu['group'] == 0) return;
		if ($_G['uid']) {
			if (!$appidxu['available']) showmessage($appidxu['appname'].' 应用已关闭，请联系管理员。');
			if ($appidxu['group'] == -1) showmessage($appidxu['appname'].' 应用仅限游客访问，请联系管理员。');
			if ($appidxu['group'] == 3) showmessage($appidxu['appname'].' 应用仅限管理员访问，请联系管理员。');
			$apps = C::t('app_market')->fetch_all_by_default($_G['uid'],true);
			$allowed = false;
			$allowed = in_array($appidxu['appid'], $apps);
			if (!$allowed) {
				showmessage('您当前账号暂无('.$appidxu['appname'].')应用的访问权限，建议联系管理员获取相应权限。');
			}
		} elseif ($appidxu['group'] == -1) {
			return;
		} else {
			showmessage('该应用需要登录才能访问，即将为您跳转至登录页面。','user.php?mod=login');
		}
	}
}