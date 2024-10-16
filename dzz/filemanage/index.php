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
$typearr = array('image' => lang('photo'),
    'document' => lang('type_attach'),
    'link' => lang('type_link'),
    'video' => lang('video'),
	'folder' => lang('folder'),
    'dzzdoc' => 'DZZ' . lang('type_attach'),
    'attach' => lang('rest_attachment')
);
require libfile('function/organization');
if ($_GET['do'] == 'delete') {
    $icoid = isset($_GET['icoid']) ? trim($_GET['icoid']) : '';
    if (!$icoid) {
        die(json_encode(['msg' => 'access denied'])); // 使用简化的die函数
    }
    $icoids = explode(',', $icoid);
    // 初始化数组
    $ridarr = array();
    $bz = isset($_GET['bz']) ? trim($_GET['bz']) : '';

    foreach ($icoids as $icoid) {
        if (empty($icoid)) {
            continue;
        }
        try {
            $return = IO::Delete($icoid, true);
            if (!$return['error']) {
                $arr['sucessicoids'][$return['rid']] = $return['rid'];
                $arr['msg'][$return['rid']] = 'success';
                $arr['name'][$return['rid']] = $return['name'];
                $ridarr[] = $return['rid'];
				$i++;
            } else {
                $arr['msg'][$return['rid']] = $return['error'];
                $dels[] =  $icoid . '_0';
            }
        } catch (Exception $e) {
            exit(json_encode(['msg' => 'No items were deleted successfully']));
        }
    }

    // 执行成功的条目数检查
    if (!empty($return['error'])) {
        Hook::listen('solrdel', $dels);
        exit(json_encode(['msg' => 'success']));
    } else {
        exit(json_encode(array('msg' => $return['error'])));
    }

  } else {
  $lpp = empty($_GET['lpp']) ? 20 : $_GET['lpp'];
	$checklpp = array();
	$checklpp[$lpp] = 'selected="selected"';
	$pfid = isset($_GET['pfid']) ? intval($_GET['pfid']) : '';
	$type = isset($_GET['type']) ? trim($_GET['type']) : '';
	$keyword = isset($_GET['keyword']) ? trim($_GET['keyword']) : '';
	$orgid = isset($_GET['orgid']) ? intval($_GET['orgid']) : '';
	$page = (isset($_GET['page'])) ? intval($_GET['page']) : 1;
	$start = ($page - 1) * $lpp;
	$gets = array(
			'mod' => MOD_NAME,
			'lpp' => $lpp,
			'keyword' => $keyword,
			'type' => $_GET['type'],
			'ftype' => $_GET['ftype'],
			'size' => $_GET['size'],
			'dateline' => $_GET['dateline'],
			'orgid' => $orgid,
			'pfid' => $pfid
	);
	$theurl = BASESCRIPT . "?" . url_implode($gets);
	$refer = $theurl . '&page=' . $page;
	if ($_GET['size'] == 'desc') {
			$order = 'ORDER BY size DESC';
	} elseif ($_GET['size'] == 'asc') {
			$order = 'ORDER BY size ASC';
	} elseif ($_GET['ftype'] == 'desc') {
			$order = 'ORDER BY ext DESC';
	} elseif ($_GET['ftype'] == 'asc') {
			$order = 'ORDER BY ext ASC';
	} elseif ($_GET['name'] == 'desc') {
			$order = 'ORDER BY name DESC';
	} elseif ($_GET['name'] == 'asc') {
			$order = 'ORDER BY name ASC';
	} elseif ($_GET['username'] == 'desc') {
			$order = 'ORDER BY username DESC';
	} elseif ($_GET['username'] == 'asc') {
			$order = 'ORDER BY username ASC';
	} elseif ($_GET['relpath'] == 'desc') {
			$order = 'ORDER BY relpath DESC';
	} elseif ($_GET['relpath'] == 'asc') {
			$order = 'ORDER BY relpath ASC';
	} elseif ($_GET['dateline'] == 'asc') {
			$order = 'ORDER BY dateline ASC';
	} else {
			$_GET['dateline'] = 'desc';
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
	$limitsql = 'limit ' . $start . ',' . $lpp;
	if ($_G['adminid']) {
		if ($count = DB::result_first("SELECT COUNT(*) FROM " . DB::table('resources') . " WHERE $sql", $param)) {
			$data = DB::fetch_all("SELECT rid FROM " . DB::table('resources') . " WHERE $sql $order $limitsql", $param);
		}
	}else{
		if ($count = DB::result_first("SELECT COUNT(*) FROM " . DB::table('resources') . " WHERE uid =$uid and $sql", $param)) {
			$data = DB::fetch_all("SELECT rid FROM " . DB::table('resources') . " WHERE uid =$uid and $sql $order $limitsql", $param);
		}
	}
  $multi = multi($count, $lpp, $page, $theurl,'pull-right');
  $list = array();
  foreach ($data as $value) {
      if (!$sourcedata = C::t('resources')->fetch_by_rid($value['rid'])) {
          continue;
      }
      if($sourcedata['relpath'] == '/'){
          $sourcedata['relpath'] = '回收站';
      }
      $list[] = $sourcedata;
    }
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