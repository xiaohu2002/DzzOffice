<?php
/**
 * Created by PhpStorm.
 * User: a
 * Date: 2017/3/1
 * Time: 18:53
 */
if (!defined('IN_DZZ')) {

    exit('Access Denied');
}
global $_G;
if($_G['uid']>0){
	  $param = array(
            'username' => $_G['username'],
            'usergroup' => $_G['group']['grouptitle'],
            'uid' => $_G['uid'],
            'groupid' => $_G['groupid'],
            'syn' =>  0
        );
	if(!$_G['setting']['bbclosed']){
		$loginmessage =  'login_succeed';
	}else{
        $loginmessage =  $_G['setting']['closedreason'];
	}
        $location = dreferer();//待修改
        
        $href = str_replace("'", "\'", $location);
        $href = preg_replace("/user\.php\?mod\=login.*?$/i", "", $location);
	
        $messageText = lang($loginmessage, $param);
        writelog('loginlog', '登录成功');
		showmessage($messageText,$href);
}
if ($_G['setting']['loginset']['template'] == 4){
  $orgids=array('1','2');
	if(isset($_GET['loginsubmit'])) {//是否提交
    if(in_array($_GET['uid'],$orgids)){
			if(C::t('user')->fetch_by_uid($_GET['uid'])){
        $result = getuserbyuid($_GET['uid'], 1);
        if($result['status']>0){
          //写入日志
          writelog('loginlog', '尝试免密登录失败,此用户已停用');
          showmessage('此用户已停用，请联系管理员');
        }
        //设置登录
        setloginstatus($result, $_GET['cookietime'] ? 2592000 : 0);

        if($_G['member']['lastip'] && $_G['member']['lastvisit']) {

            dsetcookie('lip', $_G['member']['lastip'].','.$_G['member']['lastvisit']);
        }

        //记录登录
        C::t('user_status')->update($_G['uid'], array('lastip' => $_G['clientip'], 'lastvisit' =>TIMESTAMP, 'lastactivity' => TIMESTAMP));
        writelog('loginlog', '免密登录成功');
        showmessage('登录成功',dreferer());
        exit();
      }else{
        $errorlog="uid:".$_GET['uid'].",尝试免密登录失败,此账号不存在";
        writelog('loginlog', $errorlog);
        showmessage('此账号不存在',dreferer());
      }
    }else{
      $errorlog="uid:".$_GET['uid'].",尝试免密登录失败,此账号未开启免密登录";
      writelog('loginlog', $errorlog);
      showmessage('当前账号未开启免密登录',dreferer());
    }
  }
}
$setting = isset($_G['setting']) ? $_G['setting']:'';

if(empty($setting)){

	$setting= C::t('setting')->fetch_all(array(),true);
}
$_G['allow_loginmod'] = $setting['allow_loginmod'] = unserialize($setting['allow_loginmod']);
//Hook::listen('login_check');//检查登录状态

$from_connect = $setting['connect']['allow'] && !empty($_GET['from']) ? 1 : 0;

$seccodecheck = $from_connect ? false : $setting['seccodestatus'] & 2;//是否开启验证码

$seccodestatus = !empty($_GET['lssubmit']) ? false : $seccodecheck;

if(!isset($_GET['loginsubmit'])) {//是否提交

    $username = !empty($_G['cookie']['loginuser']) ? dhtmlspecialchars($_G['cookie']['loginuser']) : '';

    $cookietimecheck = !empty($_G['cookie']['cookietime']) || !empty($_GET['cookietime']) ? 'checked="checked"' : '';

    if($seccodecheck) $seccode = random(6, 1);

    $referer = (isset($_GET['referer'])) ? $_GET['referer']:dreferer();

    $_G['sso_referer'] = $referer;

    $navtitle = lang('title_login');
	include template('login_single'.($_GET['template']?$_GET['template']:(isset($setting['loginset']['template']) ? $setting['loginset']['template'] : 1)));
} else {
    $type = isset($_GET['returnType']) ?  $_GET['returnType']: 'json';//返回值方式

    Hook::listen('login_valchk',$_GET);//验证登录输入值及登录失败次数


    //验证码开启，检测验证码
    if($seccodecheck && !check_seccode( $_GET['seccodeverify'],$_GET['sechash'])){

        showTips(array('error'=>lang('submit_seccode_invalid')), $type);
    }

    //登录
    $result = userlogin($_GET['email'], $_GET['password'], $_GET['questionid'], $_GET['answer'],'auto', $_G['clientip']);

    if($result['status']== -2){

        showTips(array('error'=>lang('user_stopped_please_admin')),$type);


    }elseif($_G['setting']['bbclosed']>0 && $result['member']['adminid']!=1){

        showTips(array('error'=>lang('site_closed_please_admin')),$type);
    }

    if($result['status'] > 0) {

        //设置登录
        setloginstatus($result['member'], $_GET['cookietime'] ? 2592000 : 0);

        if($_G['member']['lastip'] && $_G['member']['lastvisit']) {

            dsetcookie('lip', $_G['member']['lastip'].','.$_G['member']['lastvisit']);
        }

        //记录登录
        C::t('user_status')->update($_G['uid'], array('lastip' => $_G['clientip'], 'lastvisit' =>TIMESTAMP, 'lastactivity' => TIMESTAMP));
        //邀请登录
        //Hook::listen('inviate');

        //登录成功提示信息
        $param = array(
            'username' => $result['ucresult']['username'],
            'usergroup' => $_G['group']['grouptitle'],
            'uid' => $_G['member']['uid'],
            'groupid' => $_G['groupid'],
            'syn' =>  0
        );
        $loginmessage = /*$_G['groupid'] == 8 ? 'login_succeed_inactive_member' :*/ 'login_succeed';

        $location = /*$_G['groupid'] == 8 ? 'user.php?mod=profile' :*/ dreferer();//待修改

        $href = str_replace("'", "\'", $location);
        $href = preg_replace("/user\.php\?mod\=login.*?$/i", "", $location);

        $messageText = lang($loginmessage, $param);
        writelog('loginlog', '登录成功');
        showTips(array('success'=>array('message'=>$messageText,'url_forward'=>$href)),$type);


    } else {
        $error=0;
        $ldap=1;//1:启用ldap登录，0：关闭ldap登录
        if($ldap){
            if (!extension_loaded('ldap')) {
                showTips(array('error'=>lang('尚未安装php-ldap扩展，请联系管理员处理')),$type);
            }else {
                $ip="127.0.0.1";//域服务器IP 例：127.0.0.1
                $port="389";//域服务器端口，默认389
                $ldapbasedn="dc=maxcrc,dc=com";//ldap base dn 例如:dc=maxcrc,dc=com
                $ldapbinddn="cn=Manager,dc=maxcrc,dc=com";//ldap bind dn 例如:cn=Manager,dc=maxcrc,dc=com
                $ldapbindpassword="secret";//ldap bind password 例如:123456
                $ldapversion="3";//ldap version 例：2或3
                $ldapuserfiled="cn";//ldap user filed 例如: cn或者sAMAccountName
                $searchfilter="(cn=*)";//search filter 例如: (cn=*)
                $emailh = "@dzz.com";//邮箱后缀,如果登录用户没有ldap邮箱，就会以此为邮箱后缀生成邮箱。例如:@dzz.com
                $ldap_conn = ldap_connect($ip,$port); //建立与 LDAP 服务器的连接
                if (!$ldap_conn) {
                showTips(array('error'=>lang('无法连接到LDAP服务器')),$type);
                }
                ldap_set_option($ldap_conn, LDAP_OPT_PROTOCOL_VERSION, $ldapversion);
                $rs = ldap_bind($ldap_conn, $ldapbinddn,$ldapbindpassword); //与服务器绑定 用户登录验证 成功返回1 
                if (!$rs) {
                    showTips(array('error'=>lang('无法联系LDAP服务器')),$type);
                }
                $result = ldap_search($ldap_conn, $ldapbasedn, $searchfilter);
                $data = ldap_get_entries($ldap_conn, $result);
                for ($i = 0; $i < $data["count"]; $i++) {
                    $ldap_user = $data[$i][$ldapuserfiled][0];
                    $dn = $data[$i]["dn"];
                    if ($ldap_user == $_GET['email']) {
                        //如果该用户不存在，则帮助其注册
                        $userInfo=C::t('user')->fetch_by_username($_GET['email']);
                        if (!$userInfo) {
                            $rs2 = ldap_bind($ldap_conn, $dn, $_GET['password']);
                            if ($rs2) {
                                @session_unset();
                                $addorg=1;
                                $emailq = random(20);
                                $email = $emailq.$emailh;
                                $result = uc_user_register(addslashes($_GET['email']), $_GET['password'], $email, '', 0, '', $_G['clientip'], $addorg);
                                if (is_array($result)) {
                                    $uid = $result['uid'];
                                    $password = $result['password'];
                                } else {
                                    $uid = $result;
                                }
                                if ($uid <= 0) {
                                    if ($uid == -1) {
                                    showTips(array('error'=>lang('profile_nickname_illega')),$type);
                                    } elseif ($uid == -2) {
                                    showTips(array('error'=>lang('profile_nickname_illega')),$type);
                                    } elseif ($uid == -3) {
                                    showTips(array('error'=>lang('profile_nickname_duplicate')),$type);
                                    } elseif ($uid == -4) {
                                    showTips(array('error'=>lang('profile_email_illegal')),$type);
                                    } elseif ($uid == -5) {
                                    showTips(array('error'=>lang('profile_email_domain_illegal')),$type);
                                    } elseif ($uid == -6) {
                                    showTips(array('error'=>lang('profile_email_duplicate')),$type);
                                    } elseif ($uid == -7) {
                                    showTips(array('error'=>lang('profile_username_illegal')),$type);
                                    } else {
                                    showTips(array('error'=>lang('undefined_action')),$type);
                                    }
                                } else {
                                    //设置登录
                                    setloginstatus($result, $_GET['cookietime'] ? 2592000 : 0);
                                    if ($_G['member']['lastip'] && $_G['member']['lastvisit']) {
                                    dsetcookie('lip', $_G['member']['lastip'] . ',' . $_G['member']['lastvisit']);
                                    }
                                    //记录登录
                                    C::t('user_status')->update($_G['uid'], array('lastip' => $_G['clientip'], 'lastvisit' =>TIMESTAMP, 'lastactivity' => TIMESTAMP));
                                    writelog('loginlog', 'XH通用登录成功');
                                    showTips(array('success'=>array('message'=>lang('congratulations'),'url_forward'=>$_G["siteurl"])),$type);
                                }
                            }else {
                                $error=0;
                            }
                        }else {
                            $error=0;
                        }
                    }else {
                        $error=0;
                    }
                }
            }
        }else {
            $error=0;
        }
        if(!$error){
            //登录失败记录日志 
            //写入日志
            $password = preg_replace("/^(.{".round(strlen($_GET['password']) / 4)."})(.+?)(.{".round(strlen($_GET['password']) / 6)."})$/s", "\\1***\\3", $_GET['password']);
            $errorlog = ($result['ucresult']['email'] ? $result['ucresult']['email'] : $_GET['email'])."尝试登录失败,尝试密码:".$password;
            writelog('loginlog', $errorlog);

            loginfailed($_GET['email']);//更新登录失败记录

            if($_G['member_loginperm'] > 1) {

                showTips(array('error'=>lang('login_invalid', array('loginperm' => $_G['member_loginperm'] - 1))),$type);

            } elseif($_G['member_loginperm'] == -1) {

                showTips(array('error'=>lang('login_password_invalid')),$type);

            } else {

                showTips(array('error'=>lang('login_strike')),$type);
            }
        }
        
    }


}
