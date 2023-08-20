<?php
/*
 * @copyright   Leyun internet Technology(Shanghai)Co.,Ltd
 * @license     http://www.dzzoffice.com/licenses/license.txt
 * @package     DzzOffice
 * @link        http://www.dzzoffice.com
 * @author      zyx(zyx@dzz.cc)
 */
if (!defined('IN_DZZ')) {
    exit('Access Denied');
}
$setting = $_G['setting'];
$ismobile=helper_browser::ismobile();
$showregisterform = 1;
Hook::listen('register_before');//注册预处理钩子

if($_G['uid']) {
			
	$url_forward = dreferer();
	if(strpos($url_forward, 'user.php') !== false) {
		$url_forward = 'index.php';
	}
	showmessage('login_succeed', $url_forward ? $url_forward : './', array('username' => $_G['member']['username'], 'usergroup' => $_G['group']['grouptitle'], 'uid' => $_G['uid']), array());
} elseif($setting['bbclosed']) {
	dheader("Location: user.php?mod=login");
} elseif(!$setting['regclosed']) {	
	if($_GET['action'] == 'activation' || $_GET['activationauth']) {
		if(!$setting['ucactivation'] && !$setting['closedallowactivation']) {
			showmessage('register_disable_activation');
		}
	} elseif(!$setting['regstatus']) {
		showmessage(!$setting['regclosemessage'] ? 'register_disable' : str_replace(array("\r", "\n"), '', $setting['regclosemessage']));
	}
}
$seccodecheck = $setting['seccodestatus'] & 1;


//判断是否提交
if(!submitcheck('regsubmit', 0, $seccodecheck)) {

    //应用注册页挂载点
    Hook::listen('appregister');
		$bbrules = $setting['bbrules'];
		
		$regname =$setting['regname'];
		
		$bbrulehash = $bbrules ? substr(md5(FORMHASH), 0, 8) : '';
		$auth = $_GET['auth'];

		$username = isset($_GET['username']) ? dhtmlspecialchars($_GET['username']) : '';
		if($seccodecheck) {
			$seccode = random(6, 1);
		}
		$navtitle = $setting['reglinkname'];

		$dreferer = dreferer();
    if ($setting[loginset][template] == 2){
			include template('register2');
		}elseif ($setting[loginset][template] == 3){
      include template('register3');
		}else{
      include template('register');
		}
		exit();
    //QQ登陆相关
    @session_start();
    $qqopenid = $_SESSION['openid'] ? $_SESSION['openid'] :'';
    $qquinfo = $_SESSION['uinfo'] ? $_SESSION['uinfo'] :'';
    include template($this->template);
}else{
	
    Hook::listen('check_val',$_GET);//用户数据验证钩子,用户注册资料信息提交验证
    $result=$_GET;
    Hook::listen('register_common',$result);//用户注册钩子
    $type = isset($_GET['returnType']) ? $_GET['returnType']:'';
   
    //获取ip
    $ip = $_G['clientip'];
    //用户状态表数据
    $status = array(
        'uid' => $result['uid'],
        'regip' => (string)$ip,
        'lastip' => (string)$ip,
        'lastvisit' => TIMESTAMP,
        'lastactivity' => TIMESTAMP,
        'lastsendmail' => 0
    );
    //插入用户状态表
    DB::insert('user_status',$status,1); 

    //新用户登录
    setloginstatus(array(
        'uid' => $result['uid'],
        'username' => $result['username'],
        'password' => $result['password'],
        'groupid' => $result['groupid'],
    ), 0);
	if ($_G['uid']) {
    //发送通知
        $notevars=array(
                'from_id' => '0',
                'from_idtype' => 'app',
                'url' => '',
                'author' => getglobal('username'),
                'authorid' => getglobal('uid'),
                'dataline' => dgmdate(TIMESTAMP),
                'title'=> replacesitevar($_G['setting']['welcomemsgtxt'])
                );

          $action = 'register';
          $type = 'register_'.$_G['uid'];

        dzz_notification::notification_add($_G['uid'], $type, $action, $notevars);
    }
    //设置显示提示文字
    $param = daddslashes(array('sitename' => $setting['sitename'], 'username' => $result['username'], 'usergroup' => $_G['cache']['usergroups'][$result['groupid']]['grouptitle'], 'uid' => $result['uid']));

    $messageText = lang('register_succeed', $param);

    //获取之前的链接
    $url_forward = (isset($_GET['referer'])) ? $_GET['referer']:dreferer();


    $url_forward = $url_forward ? $url_forward : './';
    if(strpos($url_forward, 'user.php') !== false) {
		$url_forward = 'index.php';
	}
    showTips(array('success'=>array('message'=>$messageText,'url_forward'=>$url_forward)),$type);

}

