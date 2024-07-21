<?php
/*
 * @copyright   Leyun internet Technology(Shanghai)Co.,Ltd
 * @license     http://www.dzzoffice.com/licenses/license.txt
 * @package     DzzOffice
 * @link        http://www.dzzoffice.com
 * @author      zyx(zyx@dzz.cc)
 */
if (!defined('IN_DZZ') || !defined('IN_ADMIN')) {
	exit('Access Denied');
}
$op = $_GET['op'];
$do=$_GET['do'];
if($do == 'phpinfo'){
	echo phpinfo();
}else{
  require_once './core/function/function_misc.php';
  require_once './user/function/function_user.php';
  $navtitle = lang('xtxx') . ' - ' . lang('appname');
  $about['version']='V'.CORE_VERSION;//版本信息
  $about['xhversion']='V'.CORE_XHVERSION;//版本信息
  $about['XHFIXBUG']=CORE_XHRELEASE;//更新日期
  function shuchu(){
  define('ROOT_PATH', dirname(__FILE__));
  $lang=array (
    'php_version_too_low' => 'php版本太低啦，请先升级php到5.3以上，建议使用php5.4及以上',
    'step_env_check_desc' => '环境以及文件目录权限检查',
    'advice_mysql_connect' => '请检查 mysql 模块是否正确加载',
    'advice_gethostbyname' => '是否 PHP 配置中禁止了 gethostbyname 函数。请联系空间商，确定开启了此项功能',
    'advice_file_get_contents' => '该函数需要 php.ini 中 allow_url_fopen 选项开启。请联系空间商，确定开启了此项功能',
    'advice_xml_parser_create' => '该函数需要 PHP 支持 XML。请联系空间商，确定开启了此项功能',
    'advice_fsockopen' => '该函数需要 php.ini 中 allow_url_fopen 选项开启。请联系空间商，确定开启了此项功能',
    'advice_pfsockopen' => '该函数需要 php.ini 中 allow_url_fopen 选项开启。请联系空间商，确定开启了此项功能',
    'advice_stream_socket_client' => '是否 PHP 配置中禁止了 stream_socket_client 函数',
    'advice_curl_init' => '是否 PHP 配置中禁止了 curl_init 函数',
    'advice_mysql' => '请检查 mysql 模块是否正确加载',
    'advice_fopen' => '该函数需要 php.ini 中 allow_url_fopen 选项开启。请联系空间商，确定开启了此项功能',
    'advice_xml' => '该函数需要 PHP 支持 XML。请联系空间商，确定开启了此项功能',
  );
  $filesock_items = array('fsockopen', 'pfsockopen', 'stream_socket_client');
  $env_items = array
  (
    '操作系统' => array('c' => 'PHP_OS', 'r' => '不限制', 'b' => 'Linux'),
    'PHP 版本' => array('c' => 'PHP_VERSION', 'r' => '7+', 'b' => 'php7+'),
    '附件上传' => array('r' => '不限制', 'b' => '50M'),
    'GD 库' => array('r' => '1.0', 'b' => '2.0'),
    '磁盘空间' => array('r' => '50M', 'b' => '10G以上'),
		'MySQL数据库持续连接' => array('r' => '', 'b' => ''),
		'域名' => array('r' => '', 'b' => ''),
		'服务器端口' => array('r' => '不限制', 'b' => '不限制'),
		'运行环境' => array('r' => '不限制', 'b' => '不限制'),
		'网站根目录' => array('r' => '', 'b' => ''),
		'PHP 平台版本' => array('r' => '32位', 'b' => '64位'),
		'执行时间限制' => array('r' => '不限制', 'b' => '不限制'),
  );
  foreach($env_items as $key => $item) {
    if($key == 'PHP 版本') {
      $env_items[$key]['current'] = PHP_VERSION;
    } elseif($key == '附件上传') {
      $env_items[$key]['current'] = @ini_get('file_uploads') ? ini_get('upload_max_filesize') : 'unknow';
    } elseif($key == 'allow_url_fopen') {
      $env_items[$key]['current'] = @ini_get('allow_url_fopen') ? ini_get('allow_url_fopen') : 'unknow';
    } elseif($key == 'GD 库') {
      $tmp = function_exists('gd_info') ? gd_info() : array();
      $env_items[$key]['current'] = empty($tmp['GD Version']) ? 'noext' : $tmp['GD Version'];
      unset($tmp);
    } elseif($key == '磁盘空间') {
      if(function_exists('disk_free_space')) {
        $env_items[$key]['current'] = floor(disk_free_space(ROOT_PATH) / (1024*1024)).'M';
      } else {
        $env_items[$key]['current'] = 'unknow';
      }
    } elseif($key == 'PHP 平台版本') {
			if (PHP_INT_SIZE === 4) {
			$env_items[$key]['current'] ='32位';
			} else if (PHP_INT_SIZE === 8) {
			$env_items[$key]['current'] ='64位';
			} else {
			$env_items[$key]['current'] ='无法确定架构类型';
			}
    }elseif($key == 'MySQL数据库持续连接') {
        $env_items[$key]['current'] = @get_cfg_var("mysql.allow_persistent")?"是 ":"否";
    } elseif($key == '域名') {
        $env_items[$key]['current'] = GetHostByName($_SERVER['SERVER_NAME']);
    } elseif($key == '服务器端口') {
        $env_items[$key]['current'] = $_SERVER['SERVER_PORT'];
    } elseif($key == '运行环境') {
        $env_items[$key]['current'] = $_SERVER["SERVER_SOFTWARE"];
    } elseif($key == '网站根目录') {
        $env_items[$key]['current'] = $_SERVER["DOCUMENT_ROOT"];
    } elseif($key == '执行时间限制') {
        $env_items[$key]['current'] = ini_get('max_execution_time').'秒';
    }
		elseif(isset($item['c'])) {
      $env_items[$key]['current'] = constant($item['c']);
    }

    $env_items[$key]['status'] = 1;
    if($item['r'] != 'notset' && strcmp($env_items[$key]['current'], $item['r']) < 0) {
      $env_items[$key]['status'] = 0;
    }
  }
  foreach($env_items as $key => $item) {
    $status = 1;
      $env_str .= "<tr>\n";
      $env_str .= "<td>$key</td>\n";
      $env_str .= "<td class=\"padleft\">$item[r]</td>\n";
      $env_str .= "<td class=\"padleft\">$item[b]</td>\n";
      $env_str .= ($status ? "<td class=\"w pdleft1\">" : "<td class=\"nw pdleft1\">").$item['current']."</td>\n";
      $env_str .= "</tr>\n";
  }
    if($env_str){
      echo "<h2 class=\"title\">环境检查</h2>\n";
      echo "<table class=\"tb\" style=\"margin:20px 0;\">\n";
      echo "<tr>\n";
      echo "\t<th>项目</th>\n";
      echo "\t<th class=\"padleft\">DzzOffice 所需配置</th>\n";
      echo "\t<th class=\"padleft\">DzzOffice 最佳</th>\n";
      echo "\t<th class=\"padleft\">当前服务器</th>\n";
      echo "</tr>\n";
      echo $env_str;
      echo "</table>\n";
    }
}
function kuozhan(){
  if(function_exists('mysqli_connect')) $func_items = array('mysqli_connect',  'file_get_contents', 'xml_parser_create','filesize', 'curl_init','zip_open','ffmpeg','imagick','imagemagick','cURL','date','Exif','Fileinfo','Ftp','GD','gettext','intl','Iconv','json','ldap','Mbstring','Mcrypt','Memcached','MySQLi','SQLite3','OpenSSL','PDO','pdo_mysql','pdo_sqlite','Redis','session','Sockets','Swoole','dom','xml','SimpleXML','libxml','bz2','zip','zlib');
  else $func_items = array('mysql_connect',  'file_get_contents', 'xml_parser_create','filesize', 'curl_init','zip_open','ffmpeg','imagick','imagemagick','cURL','date','Exif','Fileinfo','Ftp','GD','gettext','intl','Iconv','json','ldap','Mbstring','Mcrypt','Memcached','MySQLi','SQLite3','OpenSSL','PDO','pdo_mysql','pdo_sqlite','Redis','session','Sockets','Swoole','dom','xml','SimpleXML','libxml','bz2','zip','zlib');
  foreach($func_items as $item) {
    $status = function_exists($item);
    $func_str .= "<div class=\"ext col-sm-6 col-lg-3\">\n";
    $func_str .= "<span>$item</span>\n";
    if($status) {
      $func_str .= "<span class=\"bei dzz dzz-done\"></span>\n";
      $func_str .= "</div>\n";
    } else {
      $func_str .= "<span class=\"beii dzz dzz-close\"></span>\n";
      $func_str .= "</div>\n";
    }
  }
  echo $func_str;
}
// 已经安装模块
$loaded_extensions = get_loaded_extensions();
$extensions = '';
foreach ($loaded_extensions as $key => $value) {
    $extensions .= '<div class="extt"><span class="card beijing">'.$value . '</span></div>';
}
$zaixianrenshu = DB::result_first("SELECT COUNT(*) FROM " . DB::table('session') . " WHERE uid");
$yonghurenshu = DB::result_first("SELECT COUNT(*) FROM " . DB::table('user') . " WHERE uid");
$tingyongrenshu = DB::result_first("SELECT COUNT(*) FROM " . DB::table('user') . " WHERE status");
$wenjiangeshu = DB::result_first("SELECT COUNT(*) FROM " . DB::table('attachment') . " WHERE aid");
$kongjianshiyong=formatsize(DB::result_first("SELECT SUM(filesize) FROM ".DB::table('attachment')));
$type=empty($_GET['type'])?'user':trim($_GET['type']);
$starttime=trim($_GET['starttime']);
$endtime=trim($_GET['endtime']);
$time=trim($_GET['time']);
if(empty($time)) $time='day';
$operation=trim($_GET['operation']);

	switch($time){
		case 'month':
			if(!$starttime){
				$start=strtotime("-6 month",TIMESTAMP);
				$starttime=dgmdate($start,'Y-m');
			}
			if(!$endtime){
				$endtime=dgmdate(TIMESTAMP,'Y-m');
			}
			break;
		case 'week':
			if(!$starttime){
				$start=strtotime("-12 week",TIMESTAMP);
			}else{
				$start=strtotime($starttime);
			}
			
			//$darr=getdate($stamp);
			$stamp_l=strtotime("this Monday",$start);
			//$stamp_u=strtotime("+6 day",$stamp_l);
			$starttime=dgmdate($stamp_l,'Y-m-d');
			
			if(!$endtime){
				$end=TIMESTAMP;
			}else{
				$end=strtotime($endtime);
			}
			
			/*$darr=getdate($end);
			$stamp_l=strtotime("this Monday",$end);
			$stamp_u=strtotime("+6 day",$stamp_l);*/
			$endtime=dgmdate($end,'Y-m-d');
			break;
		case 'day':
			if(!$starttime){
				$start=strtotime("-12 day",TIMESTAMP);
				$starttime=dgmdate($start,'Y-m-d');
			}
			if(!$endtime){
				$endtime=dgmdate(TIMESTAMP,'Y-m-d');
			}
			break;
		
	}
	function getData($time,$starttime,$endtime,$type){
	
	$endtime=strtotime($endtime);
	$data=array('total'=>array(),
				'add'=>array(),
        'login'=>array(),
				'total_d'=>array(),
				'add_d'=>array(),
        'login_d'=>array(),
				);
	switch($time){
			case 'month':
				$stamp=strtotime($starttime);
				$arr=getdate($stamp);
				$key=$arr['year'].'-'.$arr['mon'];
				$low=strtotime($key);
				$up=strtotime('+1 month',$low);
					$ltotal=$data['total'][$key]=DB::result_first("select COUNT(*) from %t where regdate<%d",array('user',$up));
					$data['add'][$key]=DB::result_first("select COUNT(*) from %t where regdate<%d and regdate>=%d",array('user',$up,$low));
					$ltotal+=$data['add'][$key];
				while($up<=$endtime){
					
					$key=dgmdate($up,'Y-m');
					$low=strtotime($key);
					$up=strtotime('+1 month',$low);
						$data['add'][$key]=DB::result_first("select COUNT(*) from %t where regdate<%d and regdate>=%d",array('user',$up,$low));
						$ltotal+=$data['add'][$key];
						$data['total'][$key]=$ltotal;
				}
				
				
				break;
			case 'week':
				$stamp=strtotime($starttime);
				$arr=getdate($stamp);
				$low=strtotime('+'.(1-$arr['wday']).' day',$stamp);
				$up=strtotime('+1 week',$low);
				$key=dgmdate($low,'m-d').'~'.dgmdate($up-60*60*24,'m-d');
					$ltotal=$data['total'][$key]=DB::result_first("select COUNT(*) from %t where regdate<%d",array('user',$up));
					$data['add'][$key]=DB::result_first("select COUNT(*) from %t where regdate<%d and regdate>=%d",array('user',$up,$low));
					$ltotal+=$data['add'][$key];
				
				while($up<$endtime){
					$low=$up;
					$up=strtotime('+1 week',$low);
					$key=dgmdate($low,'m-d').'~'.dgmdate($up-60*60*24,'m-d');
						$data['add'][$key]=DB::result_first("select COUNT(*) from %t where regdate<%d and regdate>=%d",array('user',$up,$low));
						$ltotal+=$data['add'][$key];
						$data['total'][$key]=$ltotal;
				}
				
				break;
			case 'day':
				
				$low=strtotime($starttime);//strtotime('+'.(1-$arr['hours']).' day',$stamp);
				$up=$low+24*60*60;
				$key=dgmdate($low,'Y-m-d');
        $ltotal=$data['total'][$key]=DB::result_first("select COUNT(*) from %t where regdate<%d",array('user',$up));
        $data['add'][$key]=DB::result_first("select COUNT(*) from %t where regdate<%d and regdate>=%d",array('user',$up,$low));
        $ltotal+=$data['add'][$key];
				while($up<=$endtime){
					$low=$up;
					$up=strtotime('+1 day',$low);
					$key=dgmdate($low,'Y-m-d');
          $data['add'][$key]=DB::result_first("select COUNT(*) from %t where regdate<%d and regdate>=%d",array('user',$up,$low));
          $ltotal+=$data['add'][$key];
          $data['total'][$key]=$ltotal;
				}
				break;
			case 'all':
				$min=DB::result_first("select min(regdate) from %t where regdate>0",array('user'));
				$min-=60;
				$max=TIMESTAMP+60*60*8;
				
				$days=($max-$min)/(60*60*24);
				if($days<20){
					$time='day';
					$starttime=gmdate('Y-m-d',$min);
					$endtime=gmdate('Y-m-d',$max);
				}elseif($days<70){
					$time='week';
					$starttime=gmdate('Y-m-d',$min);
					$endtime=gmdate('Y-m-d',$max);
				}else{
					$time='month';
					$starttime=gmdate('Y-m',$min);
					$endtime=gmdate('Y-m',$max);
				}
				$data=getData($time,$starttime,$endtime,$type);
				break;
		}
		
	return $data;
}
	if($operation=='getdata'){
		 $data=getData($time,$starttime,$endtime,$type);
		 include template('xtxx_ajax');
	}else{
		$data=getData($time,$starttime,$endtime,$type);
	}

  include template('xtxx');
}
?>
