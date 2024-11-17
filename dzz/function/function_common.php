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
global $_G;

if (CURMODULE) {
	if ($_G['adminid']) return;
	$appidxu = C::t('app_market')->fetch_by_identifier(CURMODULE);
	if ($appidxu['appid']) {
		if (!$appidxu['available']) return showmessage(lang('该应用已关闭，请联系管理员。'));
		if ($appidxu['group'] == 0) return;
		if ($appidxu['group'] == 3) showmessage(lang('您无权限使用该应用，请联系管理员为您分配权限。'));
		if ($_G['uid']) {
			$uid = $_G['uid'];
		} elseif (isset($_GET['uidtoken'])) {
			$uid = intval(dzzdecode($_GET['uidtoken']));
		}
		if ($uid) {
			$apps = C::t('app_market')->fetch_all_by_default($uid,$onlyAppid = true);
			$allowed = false;
			$allowed = in_array($appidxu['appid'], $apps);
			if (!$allowed) {
				showmessage(lang('您无权限使用该应用，请联系管理员为您分配权限。'));
			}
		} elseif ($appidxu['group'] == -1) {
			// 游客可以使用，跳过
		} else {
			dheader("Location: user.php?mod=login");
		}
	}
}