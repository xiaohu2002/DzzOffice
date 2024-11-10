<?php
/*
 * @copyright   Leyun internet Technology(Shanghai)Co.,Ltd
 * @license     http://www.dzzoffice.com/licenses/license.txt
 * @package     DzzOffice
 * @link        http://www.dzzoffice.com
 * @author      zyx(zyx@dzz.cc)
 */

if(!defined('IN_DZZ')) {
	exit('Access Denied');
}

class table_syscache extends dzz_table
{
	private $_isfilecache;

	public function __construct() {

		$this->_table = 'syscache';
		$this->_pk    = 'cname';
		$this->_pre_cache_key = '';
		$this->_isfilecache = getglobal('config/cache/type') == 'file';
		$this->_allowmem = memory('check');

		parent::__construct();
	}

	public function fetch($cachename, $force_from_db = false) {
		$data = $this->fetch_all(array($cachename));
		return isset($data[$cachename]) ? $data[$cachename] : false;
	}

	public function fetch_all($cachenames, $force_from_db = false) {
		$data = array();
		$cachenames = is_array($cachenames) ? $cachenames : array($cachenames);
		if ($this->_allowmem) {
			if (($index = array_search('setting', $cachenames)) !== FALSE) {
				if (memory('exists', 'setting')) {
					unset($cachenames[$index]);
					$settings = new memory_setting_array();
				}
			}

			$data = memory('get', $cachenames);
			if (isset($settings)) {
				$data['setting'] = $settings;
			}
			$newarray = $data !== false ? array_diff($cachenames, array_keys($data)) : $cachenames;
			if (empty($newarray)) {
				return $data;
			} else {
				$cachenames = $newarray;
			}
		}

		if($this->_isfilecache) {
			$lostcaches = array();
			foreach($cachenames as $cachename) {
				if(!@include_once(DZZ_ROOT.'./data/cache/cache_'.$cachename.'.php')) {
					$lostcaches[] = $cachename;
				} elseif($this->_allowmem) {
					$cachename === 'setting' ? memory_setting_array::save($data[$cachename]) : memory('set', $cachename, $data[$cachename]);
				}
			}
			if(!$lostcaches) {
				return $data;
			}
			$cachenames = $lostcaches;
			unset($lostcaches);
		}

		$query = DB::query('SELECT * FROM '.DB::table($this->_table).' WHERE '.DB::field('cname', $cachenames));
		while($syscache = DB::fetch($query)) {
			$data[$syscache['cname']] = $syscache['ctype'] ? dunserialize($syscache['data']) : $syscache['data'];
			if ($this->_allowmem) {
				if ($syscache['cname'] === 'setting') {
					memory_setting_array::save($data[$syscache['cname']]);
				} else {
					memory('set', $syscache['cname'], $data[$syscache['cname']]);
				}
			}
			if($this->_isfilecache) {
				$cachedata = '$data[\''.$syscache['cname'].'\'] = '.var_export($data[$syscache['cname']], true).";\n\n";
				$cachedata_save = "<?php\n//DZZ! cache file, DO NOT modify me!\n//Identify: ".md5($syscache['cname'].$cachedata.getglobal('config/security/authkey'))."\n\n$cachedata?>";
				$fp = fopen(DZZ_ROOT.'./data/cache/cache_'.$syscache['cname'].'.php', 'cb');
				if(!($fp && flock($fp, LOCK_EX) && ftruncate($fp, 0) && fwrite($fp, $cachedata_save) && fflush($fp) && flock($fp, LOCK_UN) && fclose($fp))) {
					flock($fp, LOCK_UN);
					fclose($fp);
					unlink(DZZ_ROOT.'./data/cache/cache_'.$syscache['cname'].'.php');
				}
			}
		}

		foreach($cachenames as $name) {
			if(!isset($data[$name]) || $data[$name] === null) {
				$data[$name] = null;
				$this->_allowmem && (memory('set', $name, array()));
			}
		}

		return $data;
	}

	public function insert($data, $return_insert_id = false, $replace = false, $silent = false) {
			return $this->insert_syscache($data, $return_insert_id);
	}

	public function update($val, $data, $unbuffered = false, $low_priority = false) {
			return $this->update_syscache($val, $data);
	}

	public function delete($val, $unbuffered = false) {
			return $this->delete_syscache($val);
	}

	public function insert_syscache($cachename, $data) {

		parent::insert(array(
			'cname' => $cachename,
			'ctype' => is_array($data) ? 1 : 0,
			'dateline' => TIMESTAMP,
			'data' => is_array($data) ? serialize($data) : $data,
		), false, true);

		if ($this->_allowmem && memory('exists', $cachename) !== false) {
			if ($cachename === 'setting') {
				memory_setting_array::save($data);
			} else {
				memory('set', $cachename, $data);
			}
		}
		$this->_isfilecache && @unlink(DZZ_ROOT.'./data/cache/cache_'.$cachename.'.php');
	}

	public function update_syscache($cachename, $data) {
		$this->insert_syscache($cachename, $data);
	}

	public function delete_syscache($cachenames) {
		parent::delete($cachenames);
		if($this->_allowmem || $this->_isfilecache) {
			foreach((array)$cachenames as $cachename) {
				$this->_allowmem && memory('rm', $cachename);
				$this->_isfilecache && @unlink(DZZ_ROOT.'./data/cache/cache_'.$cachename.'.php');
			}
		}
	}
}

?>