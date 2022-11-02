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
$appidxu=C::t('app_market')->fetch_by_identifier(MOD_NAME);
$appidxu1=$appidxu['appid'];
if ($_G['adminid']){
	}else{
	if ($appidxu1){
		if ($appidxu['available']==0){
			showmessage(lang('该应用不存在或您无权使用该应用，请联系管理员。'));
		}elseif($appidxu['group']==-1){
			if ($_G['uid']){
				showmessage(lang('该应用不存在或您无权使用该应用，请联系管理员。'));
			}
		}elseif ($appidxu['group']==1){
			if ($_G['uid']){
			}else{
				Hook::listen('check_login');
			}
		}elseif ($appidxu['group']==2){
			if ($_G['groupid']==2){
			}else{
				showmessage(lang('该应用不存在或您无权使用该应用，请联系管理员。'));
			}
		}elseif($appidxu['group']==3){
			if ($_G['groupid']==1){
			}else{
				showmessage(lang('该应用不存在或您无权使用该应用，请联系管理员。'));
			}
		}
	}
}
?>