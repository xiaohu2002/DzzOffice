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
	$lang1 = lang();
	$maintitle=lang('title_admincp');
	$loginuser = $isguest ? '<input class="form-control" name="admin_email"  type="text" title="" onfocus="if(this.value==\'' . lang('login_email_username') . '\'){this.value=\'\'}"   onblur="if(this.value==\'\'){this.value=\'' . lang('login_email_username') . '\'}"  autocomplete="off" />' : '<div class="username">' . $_G['member']['username'] . '</div><div class="email">' . $_G['member']['email'] . '</div>';
	$loginuser2 = $isguest ? '<div class="relative"><input autofocus class="w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500" name="admin_email"  type="text" title="" onfocus="if(this.value==\'' . lang('login_email_username') . '\'){this.value=\'\'}" placeholder='. lang('login_email_username') . ' autocomplete="off" /></div>' : '<div class="relative text-center"><div class="username">' . $_G['member']['username'] . '</div><div class="email">' . $_G['member']['email'] . '</div></div>';
	$sid = getglobal('sid');
  $avatarstatus=getglobal('avatarstatus','member');
   if(!$uid ){
		 $sitelogo=$_G['setting']['sitelogo']?'index.php?mod=io&op=thumbnail&size=small&path='.dzzencode('attach::'.$_G['setting']['sitelogo']):'static/image/common/logo.png';
	   $avastar='<img src="'.$sitelogo.'">';
   }else{
	   $avastar = avatar_block($uid); 
   }
	$avastar1='<div class="maintitle">'.$maintitle.'</div>';
	$extra = BASESCRIPT . '?' . $_SERVER['QUERY_STRING'];
	$forcesecques = '<option value="0">' . ($_G['config']['admincp']['forcesecques'] ? $lang1['forcesecques'] : $lang1['security_question_0']) . '</option>';
	include template ('common/adminlogin');
}
?>