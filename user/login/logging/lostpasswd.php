<?php
if(!defined('IN_DZZ')) {
    exit('Access Denied');
}

define('NOROBOT', TRUE);
global $_G;
if($_G['setting']['bbclosed']) {
	dheader("Location: user.php?mod=login");
}
elseif(isset($_GET['lostpwsubmit'])) {
    $_GET['email'] = strtolower(trim($_GET['email']));
    $type = $_GET['returnType'];
    if($_GET['email']) {
        $emailcount = C::t('user')->count_by_email($_GET['email'], 1);
        if(!$emailcount) {
            showTips(array('error'=>lang('use_Email_user_not_exist')),$type);
        }

        $member = C::t('user')->fetch_by_email($_GET['email'], 1);
        $tmp['email'] = $member['email'];
    }
    if(!$member) {
        showTips(array('error'=>lang('apology_account_data_mismatching')),$type);
    } elseif($member['adminid'] == 1) {
        showTips(array('error'=>lang('administrator_account_not_allowed_find')),$type);
    }


    if($member['username'] != $_GET['username']) {

        showTips(array('error'=>lang('apology_account_data_mismatching')),$type);
    }

    $idstring = random(6);
    $sitename=$_G['setting']['sitename'];
    $sitelogo=IO::getFileUri('attach::'.$_G['setting']['sitelogo']);
    C::t('user')->update($member['uid'], array('authstr' => "$_G[timestamp]\t1\t$idstring"));
    //require_once libfile('function/mail');
    $get_passwd_message = <<<EOT
      <p style="font-size:14px;color:#333; line-height:24px; margin:0;">尊敬的用户$member[username],您好！</p>
      <p style="line-height: 24px; margin: 6px 0px 0px; overflow-wrap: break-word; word-break: break-all;"><span style="color: rgb(51, 51, 51); font-size: 14px;">您收到这封邮件，是由于这个邮箱地址在 $sitename 被登记为用户邮箱，且该用户请求使用 Email 密码重置功能所致。</span></p>
      <p style="line-height: 24px; margin: 6px 0px 0px; overflow-wrap: break-word; word-break: break-all;"><span style="color: rgb(51, 51, 51); font-size: 14px;">如果您没有提交密码重置的请求或不是 $member[username] 的注册用户，请立即忽略并删除这封邮件。只有在您确认需要重置密码的情况下，才需要继续阅读下面的内容。</span></p>
      <p style="line-height: 24px; margin: 6px 0px 0px; overflow-wrap: break-word; word-break: break-all;"><span style="color: rgb(51, 51, 51); font-size: 14px;font-weight:bold;">链接：</span></p>
      <p style="line-height: 24px; margin: 6px 0px 0px; overflow-wrap: break-word; word-break: break-all;"><span style="color: rgb(51, 51, 51); font-size: 12px;"><a href="$_G[siteurl]user.php?mod=login&op=logging&action=getpasswd&amp;uid=$member[uid]&amp;id=$idstring" style="text-decoration-line: none; word-break: break-all; overflow-wrap: normal; color: rgb(51, 51, 51); font-size: 12px;" rel="noopener" target="_blank"><span style="color: rgb(0, 164, 255);">$_G[siteurl]user.php?mod=login&op=logging&action=getpasswd&amp;uid=$member[uid]&amp;id=$idstring</span></a><span style="font-size: 12px; color: rgb(51, 51, 51);">,(如果上面不是链接形式，请将该地址手工粘贴到浏览器地址栏再访问)</span></p>
      <p style="line-height: 24px; margin: 6px 0px 0px; overflow-wrap: break-word; word-break: break-all;"><span style="color: rgb(51, 51, 51); font-size: 14px;">在上面的链接所打开的页面中输入新的密码后提交，您即可使用新的密码登录网站了。您可以在用户设置中随时修改您的密码。</span></p>
EOT;
    if(!sendmail("$_GET[username] <$tmp[email]>", '取回密码说明', $get_passwd_message)) {
        runlog('sendmail', "$tmp[email]  发送失败");
    }
    showTips(array('success'=>array('msg'=>lang('password_has_been_sent_email',array('email'=>$_GET['email'])).lang('please_tree_edit_password'),'url'=>$_G['siteurl'], 'email'=>$_GET['email']),$type));

}else{
  if ($_G['setting'][loginset][template] == 2){
			include template('lostpasswd2');
		}elseif ($_G['setting'][loginset][template] == 3){
      include template('lostpasswd3');
		}else{
      include template('lostpasswd');
		}
}