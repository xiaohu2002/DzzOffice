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
if ($_GET['do'] == 'delete') {
	$sids = $_GET['sids'];
    $return = array();
    foreach($sids as $v){
        $result = C::t('shares')->delete_by_id($v);
        if($result['success']){
            $return['msg'][$v]=$result;
        }elseif ($result['error']){
            $return['msg'][$v] = $result['error'];
        }
    }
    exit(json_encode($return));
} elseif ($_GET['do'] == 'shortdel' && $_G['adminid']) {
	$sid = $_GET['sid'];
	if (empty($sid)) {
		exit(json_encode(lang('parameters_error')));
	}
	$return = array();
	try {
		foreach ($sid as $v) {
			$deleteResult=DB::delete('shorturl',"sid='{$v}'");//删除短链接
			if ($deleteResult) {
				$return['msg'][$v] = array('success'=>true);
			} else {
				$return['msg'][$v] = lang('parameters_error');
			}
		}
	} catch (Exception $e) {
		// 捕获在执行删除操作时可能抛出的异常
		$return['msg'] = 'An exception occurred during deletion: ' . $e->getMessage();
	}
    exit(json_encode($return));
} elseif ($_GET['do'] == 'forbidden' && $_G['adminid']) {
	$sids = $_GET['sids'];
	if ($_GET['flag'] == 'forbidden') {
		$status = -4;
	} else {
		$status = 0;
	}
	if ($sids && C::t('shares') -> update($sids, array('status' => $status))) {
		exit(json_encode(array('msg' => 'success')));
	} else {
		exit(json_encode(array('error' => lang('share_screen_failure'))));
	}
}else{
	exit(json_encode(array('error' => '非法操作')));
}
?>
