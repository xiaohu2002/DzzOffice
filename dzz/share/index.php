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
$navtitle = lang('appname');
$typearr = array('folder' => lang('catalogue'), 'image' => lang('photo'), 'document' => lang('type_attach'), 'dzzdoc' => 'Dzz'.lang('type_attach'), 'video' => lang('type_video'), 'attach' => lang('attachment'), 'link' => lang('type_link'), 'short' => lang('short'), 'url' => lang('other'));
$type = trim($_GET['type']);
$do = isset($_GET['do']) ? $_GET['do'] : '';
if ($type == 'short' && $_G['adminid']) {
  $short=true;
} else {
  $short=false;
}
if ($do == 'getinfo') {
	$callback = isset($_GET['callback']) ? $_GET['callback'] : '';
	$sort = in_array($_GET['sort'], array('title', 'dateline', 'type', 'size', 'count', 'username')) ? trim($_GET['sort']) : 'dateline';
  $sortOrder = in_array($_GET['sortOrder'], array('asc', 'desc')) ? trim($_GET['sortOrder']) : 'DESC';
	$limit = empty($_GET['limit']) ? 20 : $_GET['limit'];
	$keyword = isset($_GET['keyword']) ? trim($_GET['keyword']) : '';
	$page = (isset($_GET['page'])) ? intval($_GET['page']) : 1;
	$start = ($page - 1) * $limit;
	$username = trim($_GET['username']);
  $uid = intval($_GET['uid']);
  $uid1=$_G['uid'];
  $orderby = " order by $sort " . $sortOrder;
  $sql = "1";
  $param = array('shares');
  if ($type) {
    $sql .= " and type=%s";
    $param[] = $type;
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
  if ($_G['adminid']) {
    if ($count = DB::result_first("SELECT COUNT(*) FROM %t WHERE $sql", $param)) {
      $list = DB::fetch_all("SELECT * FROM %t WHERE $sql $orderby limit $start,$limit", $param);
    }
  }else{
    if ($count = DB::result_first("SELECT COUNT(*) FROM %t WHERE uid =$uid1 and $sql", $param)) {
      $list = DB::fetch_all("SELECT * FROM %t WHERE uid =$uid1 and $sql $orderby limit $start,$limit", $param);
    }
  }
  $sharestatus = array('-5'=>lang('sharefile_isdeleted_or_positionchange'),'-4' => '<span class="badge bg-danger">'.lang('been_blocked').'</span>', '-3' => '<span class="badge bg-danger">'.lang('file_been_deleted').'</span>', '-2' => '<span class="badge bg-secondary">'.lang('degree_exhaust').'</span>', '-1' => '<span class="badge bg-secondary">'.lang('logs_invite_status_4').'</span>', '0' => '<span class="badge bg-success">'.lang('founder_upgrade_normal').'</span>');
  $id = $start + 1;
  $data = array();
  foreach ($list as $value) {
    $value['sharelink'] =  C::t('shorturl')->getShortUrl(getglobal('siteurl').'index.php?mod=shares&sid='.dzzencode($value['id']));
    if ($value['dateline']){
      $value['fdateline'] = dgmdate($value['dateline']);
    }
    if ($value['endtime']) {
      $value['fendtime'] = dgmdate($value['endtime'], 'Y-m-d');
    }
    if($value['password']){
      $value['password'] = dzzdecode($value['password']);
    }
    $endtimeico = '';
    if ($value['password'] && $value['endtime']) {
      $endtimeico = '<i class="mdi mdi-lock-clock lead text-danger"></i>';
    } elseif($value['endtime']) {
      $endtimeico = '<i class="mdi mdi-clock-time-eight-outline lead text-danger"></i>';
    } elseif($value['password']) {
      $endtimeico = '<i class="mdi mdi-lock-alert lead text-danger"></i>';
    }
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
      $data[] = [
        "id" => $id++,
        "sid" => $value['id'],
        "username" => '<a href="user.php?uid='.$value['uid'].'" target="_blank">'.$value['username'].'</a>',
        "title" => '<img class="icon" src="'.$value['img'].'">'.$value['title'].$endtimeico,
        "fstatus" => $value['fstatus'],
        "type" => $value['ftype'],
        "fendtime" => $value['fendtime'],
        "password" => $value['password'],
        "dateline" => $value['fdateline'],
        "count" => $value['count'].lang('degree'),
        "qrcode" => $value['qrcode'],
        "sharelink" => $value['sharelink'],
        "number" => $value['count'] .'/'.$value['times'],
        "text"=> $value['password']?(lang('link').'：'.$value['sharelink'].' '. lang('password').'：'.$value['password']):$value['sharelink'],
      ];
  }
	
	$return = [
		"rows" => $data,
		"total" => $count
	];
	exit($callback . '(' . json_encode($return) . ');');
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
}
if (isset($_G['setting']['template']) && $_G['setting']['template'] !== 'lyear') {
  $type = trim($_GET['type']);
  $keyword = trim($_GET['keyword']);
  $username = trim($_GET['username']);
  $asc = isset($_GET['asc']) ? intval($_GET['asc']) : 1;
  $uid = intval($_GET['uid']);
  $order = in_array($_GET['order'], array('title', 'dateline', 'type', 'size', 'count')) ? trim($_GET['order']) : 'dateline';
  $page = empty($_GET['page']) ? 1 : intval($_GET['page']);
  $perpage = 20;
  $start = ($page - 1) * $perpage;
  $gets = array('mod' => 'share', 'type' => $type, 'keyword' => $keyword, 'order' => $order, 'asc' => $asc, 'uid' => $uid, 'username' => $username);
  $theurl = BASESCRIPT . "?" . url_implode($gets);
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
  if ($count = DB::result_first("SELECT COUNT(*) FROM %t WHERE $sql", $param)) {
    $list = DB::fetch_all("SELECT * FROM %t WHERE $sql $orderby limit $start,$perpage", $param); 
    foreach ($list as $k=> $value) {
      $value['sharelink'] =  C::t('shorturl')->getShortUrl(getglobal('siteurl').'index.php?mod=shares&sid='.dzzencode($value['id']));
      if ($value['dateline'])
        $value['fdateline'] = dgmdate($value['dateline']);
      if ($value['password'])
        $value['password'] = dzzdecode($value['password']);
      if ($value['endtime'])
        $value['fendtime'] = dgmdate($value['endtime'], 'Y-m-d');
      $value['fsize'] = formatsize($value['size']);
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
    $multi = multi($count, $perpage, $page, $theurl, 'pull-right');
  }
}
if ($short) {
  include template('short');
} else {
  include template('share');
}
?>
