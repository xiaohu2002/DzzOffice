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
$navtitle = lang('xtxx') . ' - ' . lang('appname');
$about['version']='V'.CORE_VERSION;//版本信息
$about['xhversion']='V'.CORE_XHVERSION;//版本信息
$about['XHFIXBUG']=CORE_XHFIXBUG;//更新日期
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
    'PHP 版本' => array('c' => 'PHP_VERSION', 'r' => '5.3+', 'b' => 'php7+'),
    '附件上传' => array('r' => '不限制', 'b' => '50M'),
    'GD 库' => array('r' => '1.0', 'b' => '2.0'),
    '磁盘空间' => array('r' => '50M', 'b' => '10G以上'),
		'MySQL数据库持续连接' => array('r' => '', 'b' => ''),
		'域名' => array('r' => '', 'b' => ''),
		'服务器端口' => array('r' => '不限制', 'b' => '不限制'),
		'运行环境' => array('r' => '不限制', 'b' => '不限制'),
		'网站根目录' => array('r' => '', 'b' => ''),
		'执行时间限制' => array('r' => '不限制', 'b' => '不限制'),
  );
  if(function_exists('mysqli_connect')) $func_items = array('mysqli_connect',  'file_get_contents', 'xml_parser_create','filesize', 'curl_init','zip_open','ffmpeg','imagick','imagemagick');
  else $func_items = array('mysql_connect',  'file_get_contents', 'xml_parser_create','filesize', 'curl_init','zip_open','ffmpeg','imagick','imagemagick');
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
    } elseif($key == 'MySQL数据库持续连接') {
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
  foreach($func_items as $item) {
    $status = function_exists($item);
    $func_str .= "<tr>\n";
    $func_str .= "<td>$item()</td>\n";
    if($status) {
      $func_str .= "<td class=\"w pdleft1\">支持</td>\n";
      $func_str .= "<td class=\"padleft\">无</td>\n";
    } else {
      $func_str .= "<td class=\"nw pdleft1\">不支持</td>\n";
      $func_str .= "<td><font color=\"red\">$item</font></td>\n";
    }
  }
  $func_strextra = '';
  $filesock_disabled = 0;
  foreach($filesock_items as $item) {
    $status = function_exists($item);
    $func_strextra .= "<tr>\n";
    $func_strextra .= "<td>$item()</td>\n";
    if($status) {
      $func_strextra .= "<td class=\"w pdleft1\">支持</td>\n";
      $func_strextra .= "<td class=\"padleft\">无</td>\n";
      break;
    } else {
      $filesock_disabled++;
      $func_strextra .= "<td class=\"nw pdleft1\">不支持</td>\n";
      $func_strextra .= "<td><font color=\"red\">".lang('advice_'.$item)."</font></td>\n";
    }
  }
  if($func_str || $func_strextra){
    echo "<h2 class=\"title\">PHP扩展依赖性检查</h2>\n";
    echo "<table class=\"tb\" style=\"margin:20px 0;width:95%;\">\n";
    echo "<tr>\n";
    echo "\t<th>函数名称</th>\n";
    echo "\t<th class=\"padleft\">检查结果</th>\n";
    echo "\t<th class=\"padleft\">提示</th>\n";

    echo "</tr>\n";
    echo $func_str.$func_strextra;
    echo "</table>\n";
  }
}
// 已经安装模块
$loaded_extensions = get_loaded_extensions();
$extensions = '';
foreach ($loaded_extensions as $key => $value) {
    $extensions .= $value . ', ';
}
$zaixianrenshu = DB::result_first("SELECT COUNT(*) FROM " . DB::table('session') . " WHERE uid");
$yonghurenshu = DB::result_first("SELECT COUNT(*) FROM " . DB::table('user') . " WHERE uid");
$tingyongrenshu = DB::result_first("SELECT COUNT(*) FROM " . DB::table('user') . " WHERE status");
include template('xtxx');
?>
