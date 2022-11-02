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
$uid1=$_G['uid'];
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
  $perpage = 20;
  $type = isset($_GET['type']) ? trim($_GET['type']) : '';
  $keyword = isset($_GET['keyword']) ? trim($_GET['keyword']) : '';
  $page = (isset($_GET['page'])) ? intval($_GET['page']) : 1;
  $start = ($page - 1) * $perpage;
  $gets = array(
    'mod' => 'comment',
    'keyword' => $keyword,
		'dateline' => $_GET['dateline'],
    'type' => $_GET['type']
  );
  $theurl = BASESCRIPT . "?" . url_implode($gets);
  $refer = $theurl . '&page=' . $page;
	if ($_GET['dateline'] == 'desc') {
    $order = 'ORDER BY dateline DESC';
	}else {
        $_GET['dateline'] = 'asc';
        $order = 'ORDER BY dateline ASC';
    }
  $sql = "cid!='app'";
  $foldername = array();
  $param = array();
  if ($keyword) {
    $sql .= 'and (message LIKE %s or author LIKE %s)';
    $param[] = '%' . $keyword . '%';
    $param[] = $keyword;
  }
  if ($type) {
    $sql .= ' and module=%s';
    $param[] = $type;
    if($type){
    $appidxu=C::t('app_market')->fetch_by_identifier($type);
    $navtitle=$appidxu['appname'].' - '.$navtitle;
    }
  }
  $limitsql = 'limit ' . $start . ',' . $perpage;
  if ($_G['adminid']) {
    if ($count = DB::result_first("SELECT COUNT(*) FROM " . DB::table('comment') . " WHERE $sql", $param)) {
      $data = DB::fetch_all("SELECT * FROM " . DB::table('comment') . " WHERE $sql $order $limitsql", $param);
    }
  }else{
    if ($count = DB::result_first("SELECT COUNT(*) FROM " . DB::table('comment') . " WHERE authorid =$uid1 and $sql", $param)) {
      $data = DB::fetch_all("SELECT * FROM " . DB::table('comment') . " WHERE authorid =$uid1 and $sql $order $limitsql", $param);
    }
  }
  $multi = multi($count, $perpage, $page, $theurl);
  $list = array();
  foreach ($data as $value) {
      $list[] = $value;
    }
    include template('list');
}
?>
