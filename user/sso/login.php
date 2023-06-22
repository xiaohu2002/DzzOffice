<?php
$do = $_GET['do'];
if($_G['setting']['quick_login']){
	$time=trim($_GET['time']);
	$username = trim($_GET['username']);
  $email= trim($_GET['email']);
	$token= trim($_GET['token']);
	if($email && $username && $token && $time){
    if ($time < (time() - 60)) showmessage('验证时间已过期，请重新获取',$_G['siteurl']);
    $key=$_G['setting']['quick_key'];
    $md5=md5(''.$username.''.''.$email.''.''.$key.''.''.$time.'');
		if (!($token ===  $md5)) {
            showmessage('token不正确',$_G['siteurl']);
            return;
        }
    if(($user=C::t('user')->fetch_by_username($username)) || ($user=C::t('user')->fetch_by_email($email))){//用户已经存在时
    if ($user['adminid']) showmessage('为了安全，禁止管理员通过这种方式登录',$_G['siteurl']);
      $idstring = explode('_', $user['emailsenddate']);
    if ($idstring[0] == (time() - $idstring[1]) < 86400) {
        dsetcookie('auth', authcode("{$user['password']}\t{$user['uid']}", 'ENCODE'), 0, 1, true);
    }
		showmessage('Login_success',$_G['siteurl']);
}else{
if($_G['setting']['bbclosed']) showmessage(lang('site_closed_please_admin'));//判断站点是否关闭
require_once libfile('function/user','','user');
if(!check_username($username)) exit(json_encode(array('error'=>lang('user_name_sensitive'))));
		$password=$_G['setting']['quick_password'];
		$user=uc_add_user($username, $password, $email);
		$uid=$user['uid'];
		if($uid<1)  exit(json_encode(array('error'=>lang('import_failure'))));
		$base = array(
				'uid' => $uid,
				'adminid' => 0,
				'groupid' =>9,
				'regdate' => TIMESTAMP,
				'emailstatus' => 1,
			);
			if($_GET['mobile']){
				if(!preg_match("/^\d+$/",$_GET['mobile'])){
				}elseif(C::t('user')->fetch_by_phone($_GET['mobile']) ) {
				}else{
					$base['phone']=$_GET['mobile'];
				}
			}
			if($_GET['weixinid']){
				if(!preg_match("/^[a-zA-Z\d_]{5,}$/i",$_GET['weixinid'])){
				}elseif(C::t('user')->fetch_by_weixinid($_GET['weixinid'])) {
				}else{
					$base['weixinid']=$_GET['weixinid'];
				}
			}
		$sitename=$_G['setting']['sitename'];
		C::t('user')->update($uid,$base);
	
    $idstring = explode('_', $user['emailsenddate']);

    if ($idstring[0] == (time() - $idstring[1]) < 86400) {

        dsetcookie('auth', authcode("{$user['password']}\t{$user['uid']}", 'ENCODE'), 0, 1, true);

    }
		showmessage('Login_success',$_G['siteurl']);
  }
}
}else{
  showmessage('未开启快速登录',$_G['siteurl']);
}
