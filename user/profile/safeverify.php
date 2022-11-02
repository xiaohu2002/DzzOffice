<?php
/**
 * Created by PhpStorm.
 * User: a
 * Date: 2017/3/23
 * Time: 17:45
 */
if(!defined('IN_DZZ')) {
    exit('Access Denied');
}
Hook::listen('check_login');
$do=isset($_GET['do']) ? trim($_GET['do']):'';
$uid=intval($_G['uid']);
$member=C::t('user_profile')->get_userprofile_by_uid($_G['uid']);
$verify = C::t('user_verify')->fetch($_G['uid']);//验证信息
if($do == 'chkpass'){

    session_start();

    $type = isset($_GET['returnType']) ? $_GET['returnType']:'json';

    $password=$_GET['chkpassword'];

    if($_GET['chkcodeverify']){

        if(!check_seccode($_GET['seccodeverify'],$_GET['sechash'])){

            showTips(array('error'=>lang('submit_seccode_invalid'),'codeerror'=>true), $type);
        }
    }

    if(md5(md5($password).$member['salt']) != $member['password']){

            if(isset($_SESSION['chkerrornum'.$uid])){
                $_SESSION['chkerrornum'.$uid] += 1;
            }else{
                $_SESSION['chkerrornum'.$uid] = 1;
            }
        showTips(array('error'=>lang('login_password_invalid'),'errornum'=>$_SESSION['chkerrornum'.$uid]), $type);

    }else{
        $_SESSION['chkerrornum'.$uid] = 0;
        showTips(array('success'=>true), $type);
    }
}elseif($do == 'chkemail'){

    $type = $_GET['returnType'];

    $verifyemail = $member['email'];

    $idstring = random(6);

    $confirmurl = C::t('shorturl')->getShortUrl("{$_G[siteurl]}user.php?mod=profile&op=password&do=changeemail&uid={$_G[uid]}&email={$verifyemail}&idchk=$idstring");

    $email_bind_message = <<<EOT
      <p style="font-size:14px;color:#333; line-height:24px; margin:0;">尊敬的用户$member[username],您好！</p>
      <p style="line-height: 24px; margin: 6px 0px 0px; overflow-wrap: break-word; word-break: break-all;"><span style="color: rgb(51, 51, 51); font-size: 14px;">这封信是由 $sitename 发送的。您收到这封邮件，是由于在 $sitename 进行了Email 绑定操作，或修改 Email 绑定使用了这个邮箱地址。如果您不是 $sitename 的用户，或没有进行上述操作，请忽略这封邮件。您不需要退订或进行其他进一步的操作。</span></p>
      <p style="line-height: 24px; margin: 6px 0px 0px; overflow-wrap: break-word; word-break: break-all;"><span style="color: rgb(51, 51, 51); font-size: 14px;font-weight:bold;">邮箱绑定链接：</span></p>
      <p style="line-height: 24px; margin: 6px 0px 0px; overflow-wrap: break-word; word-break: break-all;"><span style="color: rgb(51, 51, 51); font-size: 12px;"><a href="$confirmurl" style="text-decoration-line: none; word-break: break-all; overflow-wrap: normal; color: rgb(51, 51, 51); font-size: 12px;" rel="noopener" target="_blank"><span style="color: rgb(0, 164, 255);">$confirmurl</span></a><span style="font-size: 12px; color: rgb(51, 51, 51);">,(如果上面不是链接形式，请将该地址手工粘贴到浏览器地址栏再访问)</span></p>
EOT;
    if(!sendmail("$member[username] <$verifyemail>",'Email 安全验证', $email_bind_message)) {

        runlog('sendmail', "$verifyemail  发送失败");

        showTips(array('error'=>lang('setting_mail_send_error')),$type);

    }else{
        $updatearr = array("emailsenddate"=>$idstring.'_'.time());
        C::t('user')->update($uid,$updatearr);
        showTips(array('success'=>array('email'=>$verifyemail)),$type);

    }
}