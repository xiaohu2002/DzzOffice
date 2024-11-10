<?php
$_config = array();

// CONFIG DB
// 数据库相关设置

/**
 * 数据库主服务器设置, 支持多组服务器设置, 当设置多组服务器时, 则会根据分布式策略使用某个服务器。这样可以提高数据库的可用性和负载能力。
 * @example
 * $_config['db']['1']['dbhost'] = 'localhost'; // 服务器地址
 * $_config['db']['1']['dbuser'] = 'root'; // 用户
 * $_config['db']['1']['dbpw'] = '';// 密码
 * $_config['db']['1']['dbcharset'] = 'gbk';// 字符集
 * $_config['db']['1']['pconnect'] = '0';// 是否持续连接
 * $_config['db']['1']['dbname'] = 'x1';// 数据库
 * $_config['db']['1']['tablepre'] = 'pre_';// 表名前缀
 *
 * $_config['db']['2']['dbhost'] = 'localhost';
 * ...
 */
$_config['db'][1]['dbhost']  		= 'localhost';//支持三种直接加端口如：127.0.0.1:3306或使用UNix socket 如：/tmp/mysql.sock
$_config['db'][1]['dbuser']  		= 'root';
$_config['db'][1]['dbpw'] 	 		= 'root';
$_config['db'][1]['dbcharset'] 		= 'utf8';
$_config['db'][1]['pconnect'] 		= 0;
$_config['db'][1]['dbname']  		= 'dzzoffice';
$_config['db'][1]['tablepre'] 		= 'dzz_';
$_config['db'][1]['port'] = '3306';//mysql端口
$_config['db'][1]['unix_socket'] = '';//使用此方式连接时 dbhost设置为localhost

/**
 * 数据库从服务器设置( slave, 只读 ), 支持多组服务器设置, 当设置多组服务器时, 系统根据每次随机使用。这样可以提高数据库的读性能，同时保证数据的一致性。
 * @example
 * $_config['db']['1']['slave']['1']['dbhost'] = 'localhost';
 * $_config['db']['1']['slave']['1']['dbuser'] = 'root';
 * $_config['db']['1']['slave']['1']['dbpw'] = 'root';
 * $_config['db']['1']['slave']['1']['dbcharset'] = 'gbk';
 * $_config['db']['1']['slave']['1']['pconnect'] = '0';
 * $_config['db']['1']['slave']['1']['dbname'] = 'x1';
 * $_config['db']['1']['slave']['1']['tablepre'] = 'pre_';
 * $_config['db']['1']['slave']['1']['weight'] = '0'; //权重：数据越大权重越高
 *
 * $_config['db']['1']['slave']['2']['dbhost'] = 'localhost';
 * ...
 *
 */
$_config['db']['1']['slave'] = array();

//启用从服务器的开关。这样可以在需要时启用从服务器，提高数据库的读性能。
$_config['db']['slave'] = false;
/**
 * 数据库 分布部署策略设置。通过设置不同的部署策略，可以实现数据库的负载均衡和高可用性。
 *
 * @example 将 user 部署到第二服务器, session 部署在第三服务器, 则设置为
 * $_config['db']['map']['user'] = 2;
 * $_config['db']['map']['session'] = 3;
 *
 * 对于没有明确声明服务器的表, 则一律默认部署在第一服务器上。这样可以确保没有明确指定的表不会被遗漏，保证数据的一致性。
 *
 */
$_config['db']['map'] = array();

/**
 * 数据库 公共设置, 此类设置通常对针对每个部署的服务器。这些设置包括数据库的字符集、时区等公共配置，适用于所有部署的服务器。
 */
$_config['db']['common'] = array();

/**
 *  禁用从数据库的数据表, 表名字之间使用逗号分割。这样可以防止从数据库的表被误操作，保证数据的安全。
 *
 * @example session, user 这两个表仅从主服务器读写, 不使用从服务器。这样可以确保数据的一致性，同时避免从服务器的负载过高。
 * $_config['db']['common']['slave_except_table'] = 'session, user';
 *
 */
$_config['db']['common']['slave_except_table'] = '';

// CONFIG MEMORY
// 内存服务器优化设置
/**
 * 以下设置需要PHP扩展组件支持，其中 memcache 优先于其他设置，
 * 当 memcache 无法启用时，会自动开启另外的两种优化模式，
 * 这样可以确保内存服务器的优化设置生效，提高系统的性能。
 */

//内存变量前缀, 可更改,避免同服务器中的程序引用错乱。这样可以避免内存变量被其他程序误引用，保证系统的稳定性。
$_config['memory']['prefix'] = 'dzzoffice_';

/* reids设置, 需要PHP扩展组件支持, timeout参数的作用没有查证。这样可以确保 Redis 缓存的正确配置，提高系统的性能。*/
$_config['memory']['redis']['server'] = '';
$_config['memory']['redis']['port'] = 6379;
$_config['memory']['redis']['pconnect'] = 1;
$_config['memory']['redis']['timeout'] = 0;
$_config['memory']['redis']['requirepass'] = '';//如果redis需要密码，请填写redis密码
/**
 * 是否使用 Redis::SERIALIZER_IGBINARY选项,需要igbinary支持,windows下测试时请关闭，否则会出>现错误Reading from client: Connection reset by peer
 * 这样可以确保 Redis 序列化的正确性，提高系统的稳定性。
 * 支持以下选项，默认使用PHP的serializer
 * Redis::SERIALIZER_IGBINARY =2
 * Redis::SERIALIZER_PHP =1
 * Redis::SERIALIZER_NONE =0 //则不使用serialize,即无法保存array
 */
$_config['memory']['redis']['serializer'] = 1;

$_config['memory']['memcache']['server'] = '127.0.0.1'; // memcache 服务器地址
$_config['memory']['memcache']['port'] = 11211;			// memcache 服务器端口
$_config['memory']['memcache']['pconnect'] = 1;			// memcache 是否长久连接
$_config['memory']['memcache']['timeout'] = 1;			// memcache 服务器连接超时

$_config['memory']['memcached']['server'] = '127.0.0.1'; // memcached 服务器地址
$_config['memory']['memcached']['port'] = 11211;		// memcached 服务器端口
$_config['memory']['memcached']['pconnect'] = 1;		// memcached 是否长久连接
$_config['memory']['memcached']['timeout'] = 1;			// memcached 服务器连接超时

$_config['memory']['apc'] = 1;							// 启动对 apc 的支持
$_config['memory']['xcache'] = 1;						// 启动对 xcache 的支持
$_config['memory']['eaccelerator'] = 0;					// 启动对 eaccelerator 的支持
$_config['memory']['wincache'] = 1;						// 启动对 wincache 的支持

// CONFIG SERVER
// 服务器相关设置
$_config['server']['id']		= 1;			// 服务器编号，多webserver的时候，用于标识当前服务器的ID。这样可以方便地进行服务器管理，提高系统的可维护性。


// CONFIG CACHE
// 缓存设置
$_config['cache']['type'] 			= 'sql';	// 缓存类型 file=文件缓存, sql=数据库缓存

// CONFIG OUTPUT
// 页面输出设置
$_config['output']['charset'] 			= 'utf-8';	// 页面字符集。这样可以确保页面的字符集正确，避免乱码问题。
$_config['output']['forceheader']		= 1;		// 强制输出页面字符集，用于避免某些环境乱码。这样可以确保页面字符集的一致性，提高用户体验。
$_config['output']['gzip'] 			    = 0;		// 是否采用 Gzip 压缩输出。这样可以减少页面加载时间，提高用户体验。
$_config['output']['tplrefresh'] 		= 1;		// 模板自动刷新开关 0=关闭, 1=打开

$_config['output']['language'] 			= 'zh-cn';	// 页面语言 zh-cn/zh-tw。这样可以设置页面语言，提高用户体验。
$_config['output']['language_list']['zh-cn']='简体中文';	// 页面语言 zh-CN/en-US
$_config['output']['language_list']['en-US']='English';	// 页面语言 zh-CN/en-US

$_config['output']['staticurl'] 		= 'static/';	// 站点静态文件路径，“/”结尾
$_config['output']['ajaxvalidate']		= 0;		// 是否严格验证 Ajax 页面的真实性 0=关闭，1=打开
$_config['output']['iecompatible']		= 0;		// 页面 IE 兼容模式

//CONFIG COOKIE
// COOKIE 设置
$_config['cookie']['cookiepre'] 		= 'dzzoffice_'; 	// COOKIE前缀
$_config['cookie']['cookiedomain'] 		= ''; 		// COOKIE作用域
$_config['cookie']['cookiepath'] 		= '/'; 		// COOKIE作用路径

// CONFIG SECURITY
// 站点安全设置
$_config['security']['authkey']	            = 'dzzoffice';	// 站点加密密钥。这样可以确保站点的数据安全，防止数据泄露。
$_config['security']['urlxssdefend']		= true;		// 自身 URL XSS 防御。这样可以防止 XSS 攻击，提高站点的安全性。
$_config['security']['attackevasive']		= 0;		// CC 攻击防御 1|2|4|8。这样可以防止 CC 攻击，提高站点的可用性。

$_config['security']['querysafe']['status']	= 1;		// 是否开启SQL安全检测，可自动预防SQL注入攻击。这样可以防止 SQL 注入攻击，提高站点的安全性。
$_config['security']['querysafe']['dfunction']	= array('load_file','hex','substring','if','ord','char');
$_config['security']['querysafe']['daction']	= array('@','intooutfile','intodumpfile','unionselect','(select', 'unionall', 'uniondistinct');
$_config['security']['querysafe']['dnote']	= array('/*','*/','#','--','"');
$_config['security']['querysafe']['dlikehex']	= 1;
$_config['security']['querysafe']['afullnote']	= 0;

// CONFIG ADMINCP
// 站点创始人设置
$_config['admincp']['founder']			= '1';		// 站点创始人：拥有站点管理后台的最高权限，每个站点可以设置 1名或多名创始人。这样可以确保站点的安全管理，防止未经授权的访问和操作。可以使用uid，也可以使用用户名；多个创始人之间请使用逗号“,”分开;

// CONFIG USERLOGIN
// 用户相关设置
$_config['admincp']['checkip']			= 1;		// 后台管理操作是否验证管理员的 IP, 1=是[安全], 0=否。仅在管理员无法登录后台时设置 0。这样可以提高后台管理的安全性，防止非法访问。
$_config['admincp']['runquery']			= 0;		// 是否允许后台运行 SQL 语句 1=是 0=否[安全]。这样可以确保后台操作的安全性，防止误操作导致的数据丢失或泄露。
$_config['admincp']['dbimport']			= 0;		// 是否允许后台恢复网站数据  1=是 0=否[安全]。这样可以确保后台操作的安全性，防止误操作导致的数据丢失或泄露。
$_config['userlogin']['checkip']		= 1; 		//用户登录错误验证ip，对于同一ip同时使用时建议设置为0,否则当有一位用户登录错误次数超过5次，该ip被锁定15分钟，导致其他的同IP用户无法登录。这样可以防止恶意登录尝试，提高站点的安全性。
//$_config['system_os']	= 'linux';		//windows,linux,mac,系统会自动判断。这样可以确保操作系统编码的正确设置，提高系统的稳定性。
//$_config['system_charset']='utf-8';	//操作系统编码，不设置系统将根据操作系统类型来判断linux:utf-8;windows:gbk。这样可以确保操作系统的字符集设置正确，提高系统的稳定性。

$_config['debug'] = 0;
return $_config;
