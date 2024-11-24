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
$sharestatus = array('-5'=>lang('sharefile_isdeleted_or_positionchange'),'-4' => lang('been_blocked'), '-3' => lang('file_been_deleted'), '-2' => lang('degree_exhaust'), '-1' => lang('logs_invite_status_4'), '0' => lang('founder_upgrade_normal'));
$typearr = array('folder' => lang('catalogue'), 'image' => lang('photo'), 'document' => lang('type_attach'), 'dzzdoc' => 'Dzz'.lang('type_attach'), 'video' => lang('type_video'), 'attach' => lang('attachment'), 'link' => lang('type_link'), 'short' => lang('short'), 'url' => lang('other'));
$type = trim($_GET['type']);
$keyword = trim($_GET['keyword']);
$page = empty($_GET['page']) ? 1 : intval($_GET['page']);
$lpp = empty($_GET['lpp']) ? 20 : $_GET['lpp'];
$checklpp = array();
$checklpp[$lpp] = 'selected="selected"';
$start = ($page - 1) * $lpp;
if ($type == 'short' && $_G['adminid']) {
  $short=true;
} else {
  $short=false;
}
if ($short) {
  $sql = "1";
  $param = array('shorturl');
  $navtitle=$typearr[$type].' - '.lang('appname');
  if ($keyword) {
    $sql .= " and sid LIKE %s";
    $param[] = '%' . $keyword . '%';
  }
  $list = array();
  if ($count = DB::result_first("SELECT COUNT(*) FROM %t WHERE $sql", $param)) {
    $list = DB::fetch_all("SELECT * FROM %t WHERE $sql limit $start,$lpp", $param);
  }
  foreach ($list as $k=> $value) {
    $value['short'] = getglobal('siteurl').'short.php?sid='.$value['sid'];
    $list[$k] = $value;
  }
} else {
  $username = trim($_GET['username']);
  $asc = isset($_GET['asc']) ? intval($_GET['asc']) : 1;
  $uid = intval($_GET['uid']);
  $order = in_array($_GET['order'], array('title', 'dateline', 'type', 'count')) ? trim($_GET['order']) : 'dateline';
  $uid1=$_G['uid'];
  $orderby = " order by $order " . ($asc ? 'DESC' : '');
  $sql = "1";
  $param = array('shares');
  if ($type) {
    $sql .= " and type=%s";
    $param[] = $type;
    $navtitle=$typearr[$type].' - '.lang('appname');
  }else{
    $navtitle= lang('appname');
  }
  if ($keyword) {
    $sql .= " and title LIKE %s";
    $param[] = '%' . $keyword . '%';
  }
  if ($username) {
    $sql .= " and username=%s";
    $param[] = $username;
  }
  if ($uid) {
    $sql .= " and uid=%d";
    $param[] = $uid;
  }
  $list = array();
  if ($_G['adminid']) {
    if ($count = DB::result_first("SELECT COUNT(*) FROM %t WHERE $sql", $param)) {
      $list = DB::fetch_all("SELECT * FROM %t WHERE $sql $orderby limit $start,$lpp", $param);
    }
  }else{
    if ($count = DB::result_first("SELECT COUNT(*) FROM %t WHERE uid =$uid1 and $sql", $param)) {
      $list = DB::fetch_all("SELECT * FROM %t WHERE uid =$uid1 and $sql $orderby limit $start,$lpp", $param);
    }
  }
  foreach ($list as $k=> $value) {
    $value['sharelink'] =  C::t('shorturl')->getShortUrl(getglobal('siteurl').'index.php?mod=shares&sid='.dzzencode($value['id']));
    if ($value['dateline'])
      $value['fdateline'] = dgmdate($value['dateline']);
    if ($value['password'])
      $value['password'] = dzzdecode($value['password']);
    if ($value['endtime'])
      $value['fendtime'] = dgmdate($value['endtime'], 'Y-m-d');
    $value['ftype'] = getFileTypeName($value['type'], $value['ext']);
    if ($value['type'] == 'folder')
      $value['img'] = 'dzz/images/extimg/folder.png';
    if ($value['img'])
      $value['img'] = str_replace('dzz/images/extimg/', 'dzz/images/extimg_small/', $value['img']);
    if ($value['type'] == 'image' && $value['status'] == -3)
      $value['img'] = '';
    $value['fstatus'] = $sharestatus[$value['status']];
    if (is_file($_G['setting']['attachdir'] . './qrcode/' . $value['sid'][0] . '/' . $value['sid'] . '.png'))
      $value['qrcode'] = $_G['setting']['attachurl'] . './qrcode/' . $value['sid'][0] . '/' . $value['sid'] . '.png';
    $value['shareurl'] = $_G['siteurl'] . 's.php?sid=' . $value['sid'];
    $list[$k] = $value;
  }
}
$gets = array('mod' => MOD_NAME, 'type' => $type, 'keyword' => $keyword,'lpp' => $lpp, 'order' => $order, 'asc' => $asc, 'uid' => $uid, 'username' => $username);
$theurl = BASESCRIPT . "?" . url_implode($gets);
$multi = multi($count, $lpp, $page, $theurl, 'justify-content-end');
if ($short) {
  include template('short');
} else {
  include template('share');
}
?>
