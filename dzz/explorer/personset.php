<?php
if (!defined('IN_DZZ')) {
    exit('Access Denied');
}
Hook::listen('check_login');//检查是否登录，未登录跳转到登录界面
$uid = $_G['uid'];
$fid = '';
if (submitcheck('userset')) {
    $userhash = isset($_GET['userexplorerhash']) ? trim($_GET['userexplorerhash']) : '';
    if (C::t('user_setting')->insert_by_skey('userexplorerfolder', $userhash, $uid)) {
        exit(json_encode(array('success' => true, 'msg' => lang('update_successfully'))));
    } else {
        exit(json_encode(array('error' => lang('save_failed'))));
    }

} elseif ($_GET['recoverdefault']) {
    C::t('user_setting')->delete_by_field('userexplorerfolder', $uid);
    exit(json_encode(array('success' => true, 'msg' => lang('update_successfully'))));
} else {
    $userhash = C::t('user_setting')->fetch_by_skey('userexplorerfolder', $uid);
    $fid = preg_replace('/(.*)fid=/', '', $userhash);
    if ($fid) $foldername = DB::result_first("select fname from %t where fid = %s", array('folder', $fid));
    require template('personset');
}
