<?php
if($_G['setting']['bbclosed']) showmessage(lang('site_closed_please_admin'));//判断站点是否关闭
if($_G['setting']['quick_login']){
	$time=trim($_GET['time']);
	$username = trim($_GET['username']);
  $email= trim($_GET['email']);
	$token= trim($_GET['token']);
	if($email && $username && $token && $time){
    if ($time < (time() - 5)) {//验证时间已过期时
			//写入日志
      writelog('loginlog', '尝试XH通用登录失败，验证时间已过期');
			showmessage('验证时间已过期，请重新获取');
      return;
    }
    $key=$_G['setting']['quick_key'];
    $md5=md5(''.$username.''.''.$email.''.''.$key.''.''.$time.'');
		if (!($token ===  $md5)) {
			//写入日志
      writelog('loginlog', '尝试XH通用登录失败,XH通用登录KAY不正确');
			showmessage('XH通用登录KAY不正确');
      return;
    }
    if(($user=C::t('user')->fetch_by_username($username)) || ($user=C::t('user')->fetch_by_email($email))){//用户已经存在时
			$result = getuserbyuid($user['uid'], 1);
			if($result['status']>0){
				//写入日志
				writelog('loginlog', '尝试XH通用登录失败,此用户已停用');
        showmessage('此用户已停用，请联系管理员');
      }
      if ($user['adminid']) {
        //写入日志
        writelog('loginlog', '管理员尝试XH通用登录失败');
        showmessage('为了安全，禁止管理员通过这种方式登录');
        return;
      }
      $idstring = explode('_', $user['emailsenddate']);
      if ($idstring[0] == (time() - $idstring[1]) < 86400) {
          dsetcookie('auth', authcode("{$user['password']}\t{$user['uid']}", 'ENCODE'), 0, 1, true);
      }
      writelog('loginlog', 'XH通用登录成功');
      showmessage('Login_success',$_G['siteurl']);
    }else{
      require_once libfile('function/user','','user');
      if(!check_username($username)) showmessage(lang('user_name_sensitive'));
        $password=$_G['setting']['quick_password'];
        $user=uc_add_user($username, $password, $email);
        $uid=$user['uid'];
        if($uid<1)  showmessage(lang('import_failure'));
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
        writelog('loginlog', 'XH通用登录成功');
        showmessage('Login_success',$_G['siteurl']);
      }
    }
  }else{
	//写入日志
  writelog('loginlog', '尝试XH通用登录失败，未开启XH通用登录');
  showmessage('未开启XH通用登录');
}
