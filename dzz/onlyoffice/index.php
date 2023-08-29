<?php
/*
 * @copyright   QiaoQiaoShiDai Internet Technology(Shanghai)Co.,Ltd
 * @license     https://www.oaooa.com/licenses/
 * 
 * @link        https://www.oaooa.com
 * @author      zyx(zyx@oaooa.com)
 */
if(!defined('IN_DZZ')) {
	exit('Access Denied');
}


$path=dzzdecode(rawurldecode($_GET['path']));
if($_GET['do']=='savefile'){
	$result["error"] = 0;
	if (($body_stream = file_get_contents("php://input"))===FALSE){
    echo "Bad Request";
  }
	$data = json_decode($body_stream, TRUE);
  $uid=intval(dzzdecode($_GET['token']));
	$user=getuserbyuid($uid);
	include libfile('function/user','','user');
	setloginstatus($user,0);
	if ($data["status"] == 2 || $data['status']==6){
		$downloadUri = $data["url"];
		$new_data = curl_file_get_contents($downloadUri);
		if(empty($new_data)){
				//runlog('onlyoffice',' file_get_contents('.$downloadUri.') failure');
			echo "Bad Response";
		}else{
			$path=dzzdecode($_GET['path']);
			$re=IO::setFileContent($path,$new_data,true,true);
			if($re['error']){
				//runlog('onlyoffice',$re['error']);
				exit($re['error']);
			}
		}
	}
	echo "{\"error\":0}";
}elseif($_GET['path']){
	
	$app=C::t('app_market')->fetch_by_identifier('onlyoffice','dzz');
	$app['extra']=unserialize($app['extra']);
	$onlyDocumentUrl=rtrim(str_replace('web-apps/apps/api/documents/api.js','',$app['extra']['DocumentUrl']),'/').'/web-apps/apps/api/documents/api.js';
	$host=explode(':',$_SERVER['HTTP_HOST']);
	$onlyDocumentUrl=str_replace(array('localhost','127.0.0.1'),$host[0],$onlyDocumentUrl);
	if(empty($onlyDocumentUrl)) showmessage('onlyoffice_enable_failed');
	$dzzofficeurl=$_G['siteurl'];
	$docexts=array("doc", "docx", "docm","dot", "docxf","dotx", "dotm","odt", "fodt", "ott", "rtf", "txt","html", "htm", "mht", "xml","pdf", "djvu", "fb2", "epub", "xps", "oxps", "oform");
	$sheetexts=array("xls", "xlsx", "xlsm", "xlsb","xlt", "xltx", "xltm","ods", "fods", "ots", "csv");
	$showexts=array("pps", "ppsx", "ppsm","ppt", "pptx", "pptm","pot", "potx", "potm","odp", "fodp", "otp");

	$meta=IO::getMeta($path);
	if($meta['error']) showmessage($meta['error']);
	$navtitle=$meta['name'];
	if(in_array($meta['ext'],$docexts)){
		$documentType='word';
	}elseif(in_array($meta['ext'],$sheetexts)){
		$documentType='cell';
	}elseif(in_array($meta['ext'],$showexts)){
		$documentType='slide';
	}else{
		$documentType='word';
	}

	if(!perm_check::checkperm('edit',$meta)){
		$mode='view';
		$perm_edit=false;
	}else{
		$mode='edit';
		$perm_edit=true;
	}
	if(!perm_check::checkperm('download',$meta)){
		$perm_download=false;
		$perm_print=false;
	}else{
		$perm_download=true;
		$perm_print=true;
	}
	if(!perm_check::checkperm('copy',$meta)){
		$perm_copy=false;
	}else{
		$perm_copy=true;
	}
	if(helper_browser::ismobile()){
		$type="mobile";
	}else{
		$type="desktop";
	}
	if($meta['title']){
		$title=$meta['title'];
	}else{
		$title=$meta['name'];
	}
	if($app['extra']['modifyFilter']){
		$modifyFilter=true;
	}else{
		$modifyFilter=false;
	}
	if($app['extra']['autosave']){
		$autosave=true;
	}else{
		$autosave=false;
	}
	if($app['extra']['chat']){
		$chat=true;
	}else{
		$chat=false;
	}
	if($app['extra']['compactHeader']){
		$compactHeader=true;
	}else{
		$compactHeader=false;
	}
	if($app['extra']['compactToolbar']){
		$compactToolbar=true;
	}else{
		$compactToolbar=false;
	}
	if($app['extra']['comments']){
		$comments=true;
	}else{
		$comments=false;
	}
	if($app['extra']['macros']){
		$macros=true;
	}else{
		$macros=false;
	}
	if($app['extra']['macrosMode']=="1"){
		$macrosMode='disable';
	}elseif($app['extra']['macrosMode']=="2"){
		$macrosMode='enable';
	}else{
		$macrosMode='warn';
	}
	if($app['extra']['plugins']){
		$plugins=true;
	}else{
		$plugins=false;
	}
	if($app['extra']['toolbarNoTabs']){
		$toolbarNoTabs=true;
	}else{
		$toolbarNoTabs=false;
	}
	if($app['extra']['callback']=='2'){
		$forcesavetype='1';
		$forcesave=true;
	}elseif($app['extra']['callback']=='3'){
		$forcesavetype='2';
		$forcesave=true;
	}else{
		$forcesavetype='0';
		$forcesave=false;
	}
	$stream=IO::getFileUri($path);
	$saveurl=$dzzofficeurl.DZZSCRIPT.'?mod=onlyoffice&do=savefile&path='.dzzencode($path).'&token='.dzzencode($_G['uid']);
	function GenerateRevisionId($expected_key) {
    if (strlen($expected_key) > 20) $expected_key = crc32( $expected_key);
    $key = preg_replace("[^0-9-.a-zA-Z_=]", "_", $expected_key);
    $key = substr($key, 0, min(array(strlen($key), 20)));
    return $key;
  }
	if($meta['ext']=='oform'){
    $name=$_G['username'];
    $time=TIMESTAMP;
    $key=md5(''.$name.''.''.$time.'');
  }else{
		$key=$_GET['path'].'_'.$meta['md5'];
	}
	$Key=GenerateRevisionId($key);
	$config = [
        "type" => $type,
        "documentType" => $documentType,
        "document" => [
            "title" => $title,
            "url" => $stream,
            "fileType" => $meta['ext'],
            "key" => $Key,
            "permissions" => [
                "comment" => true,
                "copy" => $perm_copy,
                "download" => $perm_download,
                "edit" => $perm_edit,
                "print" => $perm_print,
                "fillForms" => true,
                "modifyFilter" => $modifyFilter,
                "modifyContentControl" => true,
                "review" => true
            ]
        ],
      "forcesavetype" => $forcesavetype,
        "editorConfig" => [
            "mode" => $mode,
            "lang" => $_G['language'],
            "callbackUrl" => $saveurl,
            "createUrl" => '',
            "user" => [ 
                "id" => $_G['uid'],
                "name" => $_G['username']
            ],
            "customization" => [
                "about" => true,
                "feedback" => false,
                "chat"=>$chat,
                "comments"=>$comments,
                "goback"=>false,
                "compactHeader"=>$compactHeader,
                "compactToolbar"=>$compactToolbar,
                "macros"=>$macros,
                "macrosMode"=>$macrosMode,
                "plugins"=>$plugins,
                "leftMenu"=>true,
                "rightMenu"=>false,
                "toolbar"=>true,
                "header"=>false,
                "autosave"=>$autosave,
                "showReviewChanges"=>true,
                "forcesave"=>$forcesave,
                "toolbarNoTabs"=>$toolbarNoTabs,
                "help"=>false,
            ]
        ]
    ];
	require_once( dirname(__FILE__) . '/jwt/BeforeValidException.php' );
  require_once( dirname(__FILE__) . '/jwt/ExpiredException.php' );
  require_once( dirname(__FILE__) . '/jwt/SignatureInvalidException.php' );
  require_once( dirname(__FILE__) . '/jwt/JWT.php' );
	$GLOBALS['DOC_SERV_JWT_SECRET'] = $app['extra']["token"];
	function isJwtEnabled() {
    return !empty($GLOBALS['DOC_SERV_JWT_SECRET']);
  }
  function jwtEncode($payload) {
      return \Firebase\JWT\JWT::encode($payload, $GLOBALS["DOC_SERV_JWT_SECRET"]);
  }
  if (isJwtEnabled()) {
      $config["token"] = jwtEncode($config);
  }
	if ($app['extra']['toubu']) {
      include_once template('main');
  }else{
		include_once template('index');
	}
}else{
	$app=C::t('app_market')->fetch_by_identifier('onlyoffice','dzz');
	$app['extra']=unserialize($app['extra']);
	$src=$app['extra']['DocumentUrl'];
	@header("Location: $src/example/");
}
?>
