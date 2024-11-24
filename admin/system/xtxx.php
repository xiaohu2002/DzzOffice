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
$op = isset($_GET['op']) ? $_GET['op'] : '';
$do = isset($_GET['do']) ? $_GET['do'] : '';
if($do == 'phpinfo'){
	exit(phpinfo());
}
$navtitle = lang('xtxx') . ' - ' . lang('appname');
function kuozhan(){
  if(function_exists('mysqli_connect')) $func_items = array('mysqli_connect',  'file_get_contents', 'xml_parser_create','filesize', 'curl_init','zip_open','ffmpeg','imagick','imagemagick','cURL','date','Exif','Fileinfo','Ftp','GD','gettext','intl','Iconv','json','ldap','Mbstring','Mcrypt','Memcached','MySQLi','SQLite3','OpenSSL','PDO','pdo_mysql','pdo_sqlite','Redis','session','Sockets','Swoole','dom','xml','SimpleXML','libxml','bz2','zip','zlib');
  else $func_items = array('mysql_connect',  'file_get_contents', 'xml_parser_create','filesize', 'curl_init','zip_open','ffmpeg','imagick','imagemagick','cURL','date','Exif','Fileinfo','Ftp','GD','gettext','intl','Iconv','json','ldap','Mbstring','Mcrypt','Memcached','MySQLi','SQLite3','OpenSSL','PDO','pdo_mysql','pdo_sqlite','Redis','session','Sockets','Swoole','dom','xml','SimpleXML','libxml','bz2','zip','zlib');
  foreach($func_items as $item) {
    $status = function_exists($item);
    $func_str .= "<div class=\"col-sm-4 float-start\">$item\n";
    if($status) {
      $func_str .= "<span class=\"mdi mdi-check-circle text-success lead\"></span>\n";
    } else {
      $func_str .= "<span class=\"mdi mdi-close-circle text-danger lead\"></span>\n";
    }
    $func_str .= "</div>\n";
  }
  echo $func_str;
}
// 已经安装模块
$loaded_extensions = get_loaded_extensions();
$extensions = '';
foreach ($loaded_extensions as $key => $value) {
	$extensions .= '<span class="bg label label-primary">'.$value . '</span>';
}
include template('xtxx');
?>
