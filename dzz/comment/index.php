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
$uid=$_G['uid'];
$navtitle='评论管理';
//获取通知包含类型
$searchappid = array();
foreach(DB::fetch_all("select distinct(module) from %t where authorid = %d",array('comment',$_G['uid'])) as $v){
	$searchappid[] = $v['module'];
}
$searchcats = array();
if($searchappid){
	foreach(DB::fetch_all("select appname,identifier,appico from %t where identifier in(%n)",array('app_market',$searchappid)) as $v){
		$searchcats[] = array('identifier'=>$v['identifier'],'appname'=>$v['appname'],'appico'=>$_G['setting']['attachurl'].$v['appico']);
	}
}
if ($_GET['do'] == 'delete') {
    $icoid = isset($_GET['cid']) ? trim($_GET['cid']) : '';
    $icoids = explode(',', $icoid);
    foreach ($icoids as $icoid) {
        $return = C::t('comment') -> delete_by_cid($icoid);
    }

}else {
  $type = isset($_GET['type']) ? trim($_GET['type']) : '';
  $keyword = trim($_GET['keyword']);
	$lpp = empty($_GET['lpp']) ? 20 : $_GET['lpp'];
	$checklpp = array();
	$checklpp[$lpp] = 'selected="selected"';
  $page = (isset($_GET['page'])) ? intval($_GET['page']) : 1;
  $start = ($page - 1) * $lpp;
  $gets = array(
    'mod' => MOD_NAME,
		'lpp' => $lpp,
    'keyword' => $keyword,
		'dateline' => $_GET['dateline'],
    'type' => $_GET['type']
  );
  $theurl = BASESCRIPT . "?" . url_implode($gets);
	if ($_GET['dateline'] == 'desc') {
    $order = 'ORDER BY dateline DESC';
	}elseif ($_GET['author'] == 'asc') {
    $order = 'ORDER BY author ASC';
  } elseif ($_GET['author'] == 'desc') {
    $order = 'ORDER BY author DESC';
  }else {
    $_GET['dateline'] = 'asc';
    $order = 'ORDER BY dateline ASC';
  }
  $sql = "cid!='app'";
  $param = array();
  if ($keyword) {
    $sql .= 'and (message LIKE %s or author LIKE %s)';
    $param[] = '%' . $keyword . '%';
		$param[] =$keyword;
  }
  if ($type) {
    $sql .= ' and module=%s';
    $param[] = $type;
    if($type){
    $appidxu=C::t('app_market')->fetch_by_identifier($type);
    $navtitle=$appidxu['appname'].' - '.$navtitle;
    }
  }
  $limitsql = 'limit ' . $start . ',' . $lpp;
  if ($_G['adminid']) {
    if ($count = DB::result_first("SELECT COUNT(*) FROM " . DB::table('comment') . " WHERE $sql", $param)) {
      $data = DB::fetch_all("SELECT * FROM " . DB::table('comment') . " WHERE $sql $order $limitsql", $param);
    }
  }else{
    if ($count = DB::result_first("SELECT COUNT(*) FROM " . DB::table('comment') . " WHERE authorid =$uid and $sql", $param)) {
      $data = DB::fetch_all("SELECT * FROM " . DB::table('comment') . " WHERE authorid =$uid and $sql $order $limitsql", $param);
    }
  }
  $multi = multi($count, $lpp, $page, $theurl,'pull-right');
  $list = array();
  foreach ($data as $value) {
      $list[] = $value;
    }
    include template('list');
}
?>
