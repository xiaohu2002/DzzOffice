<?php
/* @authorcode  codestrings
 * @copyright   Leyun internet Technology(Shanghai)Co.,Ltd
 * @license     http://www.dzzoffice.com/licenses/license.txt
 * @package     DzzOffice
 * @link        http://www.dzzoffice.com
 * @author      zyx(zyx@dzz.cc)
 */
if(!defined('IN_DZZ')) {
	exit('Access Denied');
}
if($_GET['path']){
	$path=dzzdecode($_GET['path']);
  $meta=IO::getMeta($path);
  if($meta['name']){
    $navtitle=$meta['name'];
    $navtitle=str_replace(strrchr($navtitle, "."),"",$navtitle); 
  }else{
    $navtitle='视频';
  }
  $patharr=explode(':',$path);
  if($patharr[0]=='ftp'){
    $src=$_G['siteurl'].DZZSCRIPT.'?mod=io&op=getStream&path='.rawurldecode($_GET['path']).'&n=play.'.$_GET['ext'];
  }else{
    $src=IO::getFileUri($path);
    $src=str_replace('-internal.aliyuncs.com','.aliyuncs.com',$src);
  }
}elseif($_GET['url']){
    $src=$_GET['url'];
  }

include template('index');

?>