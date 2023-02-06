<?php
/* @authorcode  codestrings
 * @copyright   Leyun internet Technology(Shanghai)Co.,Ltd
 * @license     http://www.dzzoffice.com/licenses/license.txt
 * @package     DzzOffice
 * @link        http://www.dzzoffice.com
 * @author      zyx(zyx@dzz.cc)
 */
if(!defined('IN_DZZ') || !defined('IN_ADMIN')) {
	exit('Access Denied');
}

$sql = <<<EOF
DROP TABLE IF EXISTS `dzz_user_qqconnect`;
CREATE TABLE `dzz_user_qqconnect` (
  `openid` varchar(255) NOT NULL COMMENT 'Openid',
  `uid` int(10) unsigned NOT NULL COMMENT '对应UID',
  `dateline` int(10) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `unbind` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`openid`(20)),
  KEY `uid` (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

EOF;
runquery($sql);
$finish = true;