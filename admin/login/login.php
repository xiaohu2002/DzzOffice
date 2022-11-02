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
	html_login_header(false);
} else {
	html_login_header();
}

if ($this -> cpaccess == -3) {
	echo '<p class="logintips">' . lang('login_cp_noaccess') . '</p>';

} elseif ($this -> cpaccess == -1) {
	$ltime = $this -> sessionlife - (TIMESTAMP - $this -> adminsession['dateline']);
	echo '<p class="logintips">' . lang('login_cplock', array('ltime' => $ltime)) . '</p>';

} elseif ($this -> cpaccess == -4) {
	$ltime = $this -> sessionlife - (TIMESTAMP - $this -> adminsession['dateline']);
	echo '<p class="logintips">' . lang('login_user_lock') . '</p>';

} else {

	html_login_form();
}

html_login_footer();

function html_login_header($form = true) {
	global $_G;
	$uid = getglobal('uid');
	$charset = CHARSET;
	$lang = &lang();
	$title = $lang['login_title'];
	$tips = $lang['login_tips'];
	echo <<<EOT
<!DOCTYPE>
<html>
<head>
<title>$title</title>
<base href="{$_G['siteurl']}">
<meta http-equiv="Content-Type" content="text/html;charset=$charset" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<link rel="stylesheet" href="static/bootstrap/css/bootstrap.min.css" type="text/css" media="all" />
<link rel="stylesheet" href="static/css/common.css" type="text/css" media="all" />
<script type="text/javascript" src="static/js/md5.js"></script> 
<script type="text/javascript" src="static/jquery/jquery.min.js?{VERHASH}"></script>
<script type="text/javascript" src="static/js/common.js?{VERHASH}"></script>
<!--[if lt IE 9]>
  <script src="static/js/jquery.placeholder.js" type="text/javascript"></script>
<![endif]-->
<meta content="$lang[dibucopyright]" name="Copyright" />
</head>
<body>
EOT;
	if ($form) {
		include template ('common/adminlogin');
		include template ('common/beijing');
		echo <<<EOT
<div class="mainContainer">
<table class="loginContainer" wide="100%" height="100%">
<tr><td align="center" valign="middle">
EOT;
	}
}

function html_login_footer($halt = true) {
	$version = CORE_VERSION;
	$release = CORE_RELEASE;
	echo <<<EOT
</td>
</tr>
</table>
</div>
</body>
</html>

EOT;
	$halt && exit();
}

function html_login_form() {
	global $_G;
	$uid = getglobal('uid');
	$isguest = !getglobal('uid');
	$lang1 = lang();
    $year=dgmdate(TIMESTAMP,'Y');
	$maintitle=lang('title_admincp');
	$loginuser = $isguest ? '<input class="form-control" name="admin_email"  type="text" title="" onfocus="if(this.value==\'' . lang('login_email_username') . '\'){this.value=\'\'}"   onblur="if(this.value==\'\'){this.value=\'' . lang('login_email_username') . '\'}"  autocomplete="off" />' : '<div class="username">' . $_G['member']['username'] . '</div><div class="email">' . $_G['member']['email'] . '</div>';
	$sid = getglobal('sid');
    $avatarstatus=getglobal('avatarstatus','member');
   if(!$uid ){
		 $sitelogo=$_G['setting']['sitelogo']?'index.php?mod=io&op=thumbnail&size=small&path='.dzzencode('attach::'.$_G['setting']['sitelogo']):'static/image/common/logo.png';
	   $avastar='<img src="'.$sitelogo.'">';
   }else{
	   $avastar = avatar_block($uid); 
   }
	$avastar.='<div class="maintitle">'.$maintitle.'</div>';
	$extra = BASESCRIPT . '?' . $_SERVER['QUERY_STRING'];
	$forcesecques = '<option value="0">' . ($_G['config']['admincp']['forcesecques'] ? $lang1['forcesecques'] : $lang1['security_question_0']) . '</option>';
	echo <<<EOT
    	
		<form method="post" name="login" id="loginform" action="$extra" onsubmit="pwmd5('admin_password')">
     <input type="hidden" name="sid" value="$sid">
      <div class="loginformContainer">       
       <div class="avatarContainer">$avastar</div>
         $loginuser
          <div id="admin_password_Container">
						<input  name="admin_password"  id="admin_password"  type="password" class="form-control"  value="" autocomplete="off" placeholder="$lang1[password]" />
          </div>
          <input name="submit" value="$lang1[login]" type="submit" class="btn btn-primary"  />
					<a href="$_G[siteurl]" class="btn btn-lg btn-primary btn-block" style="margin-top: 2px;">首页</a>
          <div class="copyright-container">
EOT;
	include template ('common/copyright');
	echo <<<EOT
    	</div>
        </div>    
		 </form>
		<script type="text/JavaScript">
       jQuery(document).ready(function(e) {
				jQuery('#loginform .form-control:first').focus();
                if(jQuery('.ie8,.ie9').length){ //ie8模拟placeholder;
                    jQuery(':input[placeholder]').each(function(){
                        jQuery(this).placeholder();
                    });
                }
            });
			$("img").one("error", function(e){
             $(this).attr("src", "static/image/common/logo.png");
        });
		</script>
EOT;
}
?>