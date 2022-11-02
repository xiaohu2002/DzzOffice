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
$uid = intval($_G['uid']);
$ismobile=helper_browser::ismobile();
$space = C::t('user_profile')->get_userprofile_by_uid($uid);//用户资料信息
$langList = $_G['config']['output']['language_list'];
include template('navmenu');
exit();