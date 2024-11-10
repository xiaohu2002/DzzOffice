<?php
if(!defined('IN_DZZ')) {
	exit('Access Denied');
}
function convertip($ip) {
	return ip::convert($ip);
}

function modlog($thread, $action) {
	global $_G;
	$reason = $_GET['reason'];
	writelog('modslog', dhtmlspecialchars("{$_G['timestamp']}\t{$_G['username']}\t{$_G['adminid']}\t{$_G['clientip']}\t".$_G['forum']['fid']."\t".$_G['forum']['name']."\t{$thread['tid']}\t{$thread['subject']}\t$action\t$reason\t".$_G['toforum']['fid']."\t".$_G['toforum']['name']));
}

function savebanlog($username, $origgroupid, $newgroupid, $expiration, $reason) {
	global $_G;
	if($_G['setting']['plugins']['func'][HOOKTYPE]['savebanlog']) {
		$param = func_get_args();
		hookscript('savebanlog', 'global', 'funcs', array('param' => $param), 'savebanlog');
	}
	writelog('banlog', dhtmlspecialchars("{$_G['timestamp']}\t{$_G['member']['username']}\t{$_G['groupid']}\t{$_G['clientip']}\t$username\t$origgroupid\t$newgroupid\t$expiration\t$reason"));
}

function clearlogstring($str) {
	if(!empty($str)) {
		if(!is_array($str)) {
			$str = dhtmlspecialchars(trim($str));
			$str = str_replace(array("\t", "\r\n", "\n", "   ", "  "), ' ', $str);
		} else {
			foreach ($str as $key => $val) {
				$str[$key] = clearlogstring($val);
			}
		}
	}
	return $str;
}
function implodearray($array, $skip = array()) {
	$return = '';
	if(is_array($array) && !empty($array)) {
		foreach ($array as $key => $value) {
			if(empty($skip) || !in_array($key, $skip, true)) {
				if(is_array($value)) {
					$return .= "$key={".implodearray($value, $skip)."}; ";
				} elseif(!empty($value)) {
					$return .= "$key=$value; ";
				} else {
					$return .= '';
				}
			}
		}
	}
	return $return;
}
?>
