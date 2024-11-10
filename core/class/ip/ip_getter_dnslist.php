<?php
if(!defined('IN_DZZ')) {
	exit('Access Denied');
}
class ip_getter_dnslist {

	public static function get($s) {
		if (empty($s['header']) || empty($s['list'])) {
			return $_SERVER['REMOTE_ADDR'];
		}
		$ip = $_SERVER['REMOTE_ADDR'];
		$rdns = gethostbyaddr($ip);
		foreach($s['list'] as $host) {
			if (preg_match('/'.$host.'$/i', $rdns)) {
				if ($s['header'] != 'HTTP_X_FORWARDED_FOR') {
					$ip = ip::validate_ip($_SERVER[$s['header']]) ? $_SERVER[$s['header']] : $ip;
				} else {
					if (strpos($_SERVER['HTTP_X_FORWARDED_FOR'], ",") > 0) {
						$exp = explode(",", $_SERVER['HTTP_X_FORWARDED_FOR']);
						$ip = ip::validate_ip(trim($exp[0])) ? $exp[0] : $ip;
					} else {
						$ip = ip::validate_ip($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $ip;
					}
				}
			}
		}
		return $ip;
	}

}