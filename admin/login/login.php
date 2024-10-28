<?php
/*
 * @copyright   Leyun internet Technology(Shanghai)Co.,Ltd
 * @license     http://www.dzzoffice.com/licenses/license.txt
 * @package     DzzOffice
 * @link        http://www.dzzoffice.com
 * @author      zyx(zyx@dzz.cc)
 */

if (!defined('IN_DZZ') ) {
	exit('Access Denied');
}
global $_G;
if (!function_exists('ajaxshowheader')) {
	function ajaxshowheader() {
		global $_G;
		ob_end_clean();
		@header("Expires: -1");
		@header("Cache-Control: no-store, private, post-check=0, pre-check=0, max-age=0", FALSE);
		@header("Pragma: no-cache");
		header("Content-type: application/xml");
		echo "<?xml version=\"1.0\" encoding=\"" . CHARSET . "\"?>\n<root><![CDATA[";
	}

}

if (!function_exists('ajaxshowfooter')) {
	function ajaxshowfooter() {
		echo ']]></root>';
		exit();
	}

}
if ($this -> core -> var['inajax']) {
	ajaxshowheader();
	ajaxshowfooter();
}

if ($this -> cpaccess == -3) {
	include template ('common/adminlogineer');
	echo '<p class="logintips">' . lang('login_cp_noaccess') . '</p>';

} elseif ($this -> cpaccess == -1) {
	include template ('common/adminlogineer');
	$ltime = $this -> sessionlife - (TIMESTAMP - $this -> adminsession['dateline']);
	echo '<p class="logintips">' . lang('login_cplock', array('ltime' => $ltime)) . '</p>';

} elseif ($this -> cpaccess == -4) {
	include template ('common/adminlogineer');
	$ltime = $this -> sessionlife - (TIMESTAMP - $this -> adminsession['dateline']);
	echo '<p class="logintips">' . lang('login_user_lock') . '</p>';

} else {

	html_login_form();
}

html_login_footer();
function html_login_footer($halt = true) {
	$version = CORE_VERSION;
	$release = CORE_RELEASE;
	$halt && exit();
}

function html_login_form() {
	global $_G;
	$uid = getglobal('uid');
	$isguest = !getglobal('uid');
	$navtitle = lang('title_admincp');
	$lang1 = lang();
	$maintitle=lang('title_admincp');
	$loginuser = $isguest ? '
    <div class="mb-3 has-feedback"><span class="mdi mdi-account" aria-hidden="true"></span><input class="form-control" name="admin_email"  type="text" title="" onfocus="if(this.value==\'' . lang('login_email_username') . '\'){this.value=\'\'}"   onblur="if(this.value==\'\'){this.value=\'' . lang('login_email_username') . '\'}"  placeholder='. lang('login_email_username') . ' autocomplete="off" autofocus required/></div>' : '<div class="text-center username">' . $_G['member']['username'] . '</div><div class="text-center email">' . $_G['member']['email'] . '</div>';
	$sid = getglobal('sid');
  $avatarstatus=getglobal('avatarstatus','member');
   if(!$uid){
	if($_G['setting']['bbclosed']){
		$sitelogo = 'static/image/common/logo.png';
	}else{
		$sitelogo=$_G['setting']['sitelogo']?'index.php?mod=io&op=thumbnail&size=small&path='.dzzencode('attach::'.$_G['setting']['sitelogo']):'static/image/common/logo.png';
	}
		 $avastar='<img src="'.$sitelogo.'">';
   }else{
	   $avastar = avatar_block($uid); 
   }
	$extra = BASESCRIPT . '?' . $_SERVER['QUERY_STRING'];
	include template ('common/adminlogin');
}
?>