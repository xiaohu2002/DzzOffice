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
$uid=$_G['uid'];
$do = isset($_GET['do']) ? $_GET['do'] : '';
$typearr = array('image' => lang('photo'),
    'document' => lang('type_attach'),
    'link' => lang('type_link'),
    'video' => lang('video'),
	'folder' => lang('folder'),
    'dzzdoc' => 'DZZ' . lang('type_attach'),
    'attach' => lang('rest_attachment')
);
require libfile('function/organization');
if ($do == 'delete') {
    $icoid = isset($_GET['icoid']) ? trim($_GET['icoid']) : '';
    if (empty($icoid)) {
		exit(json_encode(['msg' => 'access denied']));
	}
    $icoids = explode(',', $icoid);
	$sucessicoids = [];
	$failedicoids = [];

	foreach ($icoids as $icoid) {
		try {
			$return = IO::Delete($icoid, true);
			if (!$return['error']) {
				$sucessicoids[$return['rid']] = [
					'msg' => 'success',
					'name' => $return['name']
				];
				$dels[] =  $icoid . '_0';
			} else {
				$failedicoids[$icoid] = $return['error'];
			}
		} catch (Exception $e) {
			$failedicoids[$icoid] = 'An unexpected error occurred: ' . $e->getMessage();
		}
	}
	// 执行成功的条目数检查
	if (!empty($dels)) {
		Hook::listen('solrdel', $dels);
	}

	$response = [
		'msg' => !empty($failedicoids) ? '部分文件删除失败' : 'success',
		'success' => $sucessicoids,
		'failed' => $failedicoids
	];
	exit(json_encode($response));

  } elseif ($do == 'getinfo') {
	$callback = isset($_GET['callback']) ? $_GET['callback'] : '';
	$sort = isset($_GET['sort']) ? $_GET['sort'] : '';
	$type = isset($_GET['type']) ? trim($_GET['type']) : '';
	$orgid = isset($_GET['orgid']) ? intval($_GET['orgid']) : '';
	$pfid = isset($_GET['pfid']) ? intval($_GET['pfid']) : '';
	$sortOrder = isset($_GET['sortOrder']) ? $_GET['sortOrder'] : '';
	$limit = empty($_GET['limit']) ? 20 : $_GET['limit'];
	$keyword = isset($_GET['keyword']) ? trim($_GET['keyword']) : '';
	$page = (isset($_GET['page'])) ? intval($_GET['page']) : 1;
	$start = ($page - 1) * $limit;
	$validSortFields = ['name', 'size', 'type', 'username', 'dateline'];
	$validSortOrders = ['asc', 'desc'];
	if (in_array($sort, $validSortFields) && in_array($sortOrder, $validSortOrders)) {
		$order = "ORDER BY $sort $sortOrder";
	} else {
		$order = 'ORDER BY dateline DESC';
	}
	$sql = "type!='app' and type!='shortcut'";
	$foldername = array();
	$param = array();
	if ($keyword) {
			$sql .= ' and (name like %s OR username=%s)';
			$param[] = '%' . $keyword . '%';
			$param[] = $keyword;
	}
	if ($type) {
			$sql .= ' and type=%s';
			$param[] = $type;
	}
	if ($pfid) {
			$sql .= ' and (pfid = %d)';
			$param[] = $pfid;
			$pathkey = DB::result_first("select pathkey from %t where fid = %d", array('resources_path', $pfid));
			$patharr = explode('-', str_replace('_', '', $pathkey));
			unset($patharr[0]);
			foreach (DB::fetch_all("select fname,fid from %t where fid in(%n)", array('folder', $patharr)) as $v) {
				
					$foldername[] = array('fid' => $v['fid'], 'fname' => $v['fname']);
			}
	} else {
			if ($orgid) {
				if ($org = C::t('organization')->fetch($orgid)) {
						$fids = array($org['fid']);
						foreach (DB::fetch_all("select fid from %t where pfid=%d", array('folder', $org['fid'])) as $value) {
								$fids[] = $value['fid'];
						}
						$sql .= ' and  pfid IN(%n)';
						$param[] = $fids;
				}
			}
	}
	$limitsql = 'limit ' . $start . ',' . $limit;
	if ($_G['adminid']) {
		$whereClause = $sql;
	} else {
		$whereClause = "uid = $uid AND $sql";
	}
	$count = DB::result_first("SELECT COUNT(*) FROM " . DB::table('resources') . " WHERE $whereClause", $param);
	if ($count) {
		$data = DB::fetch_all("SELECT rid FROM " . DB::table('resources') . " WHERE $whereClause $order $limitsql", $param);
	}
	$list = array();
	$id = $start + 1;
	foreach ($data as $value) {
		if (!$data = C::t('resources')->fetch_by_rid($value['rid'])) {
			continue;
		}
		if($data['relpath'] == '/'){
			$data['relpath'] = '回收站';
		}
		if($data['isdelete']){
			$isdelete = '是';
		} else {
			$isdelete = '否';
		}
		if($data['type']!=='folder'){
			$copys = $data['copys'];
			$FileUri = IO::getFileUri($data['path'])?:'';
		} else {
			$copys = '';
			$FileUri = '';
		}
		$list[] = [
			"id" => $id++,
			"username" => '<a href="user.php?uid='.$data['uid'].'">'.$data['username'].'</a>',
			"rid" => $data['rid'],
			"name" => '<img class="icon" src="'.$data['img'].'">'.$data['name'],
			"dpath" => $data['dpath'],
			"size" => $data['fsize'],
			"type" => $data['ftype'],
			"ftype" => $data['type'],
			"oid" => $data['oid'],
			"relpath" => $data['relpath'],
			"dateline" => $data['fdateline'],
			"isdelete" => $isdelete,
			"copys" => $copys,
			"FileUri" => $FileUri
		];
	}
	$breadcrumb = '<a href="javascript:;" class="btn btn-primary fid-btn" data-fid="">' . lang('all_typename_attach') . '</a>';
	if (!empty($foldername)) {
		$i = 0;
		foreach ($foldername as $v) {
			$i++;
			if ($i == count($foldername)) {
				$breadcrumb .= '<a href="javascript:;" class="btn btn-outline-primary fid-btn" data-fid="' . $v['fid'] . '">' .$v['fname']. '</a>';
			} else {
				$breadcrumb .= '<a href="javascript:;" class="btn btn-primary fid-btn" data-fid="' . $v['fid'] . '">' . $v['fname'] . '</a>';
			}
		}
	}
	
	$return = [
		"rows" => $list,
		"total" => $count,
		"breadcrumb" => $breadcrumb,
	];
	exit($callback . '(' . json_encode($return) . ');');
  } else {
	if ($org = C::t('organization')->fetch($orgid)) {
        $orgpath = getPathByOrgid($org['orgid']);
        $org['depart'] = implode('-', ($orgpath));
    } else {
        $org = array();
        $org['depart'] = lang('select_a_organization_or_department');
        $org['orgid'] = $orgid;
    }
    include template('list');
}
?>