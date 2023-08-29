<?php
namespace dzz\onlyoffice\classes;

use \core as C;
use \DB as DB;
use \IO as IO;
require_once libfile('class/xml');
class thumb{
   // private $exts=array('txt','html','css','');
	public function run(&$fileurls, $path){
		$meta=IO::getMeta($path);
		$meta['stream']=IO::getFileUri($path);
		$app=C::t('app_market')->fetch_by_identifier('onlyoffice','dzz');
		$app['extra']=unserialize($app['extra']);
		$exts=explode(',',$app['extra']['exts']);
		if($meta['size']<1) return;
		if(!in_array($meta['ext'],$exts)){
			return;
		}else{
			
			if($url=$this->getThumb($meta,993,1043)){
				if($info=getimagesize($url)){
					$attr=array('imageWidth'=>$info[0],'imageHeight'=>$info[1]);
					C::t('resources_attr')->update_by_skey($meta[rid],0,$attr);
					
					$fileurls['fileurl']=$url;
					$fileurls['filedir']=$url;
				}
				
			}		
		 }
	}
	function textEncode($data){
		$mime=\dzz_mime::get_type($data['ext']);
		list($pre)=explode('/',$mime);
		if($pre!='text') return $data['stream'];
		
		$str = IO::getFileContent($data['path']);
		require_once DZZ_ROOT . './dzz/class/class_encode.php';
		$p = new \Encode_Core();
		$code = $p -> get_encoding($str);
		if ($code!=CHARSET)
			$str = diconv($str, $code, CHARSET);
		$cachekey=md5($meta[$path]).$data['ext'];
		$file=getglobal('setting/attachdir').'./'.$cachekey;
		if(file_put_contents($file,$str)){
			 $data['stream']=getglobal('siteurl').getglobal('setting/attachurl').'/'.$cachekey;
		}
		return $data['stream'];
		
		
	}
	function getThumb($data,$width=993,$height=1043){
		$stream=$this->textEncode($data);
		$post_data = '{	"async":false,
						"filetype": "'.$data['ext'].'",
						"key": "'.$data['path'].'_'.$data['md5'].'",
						"outputtype": "png",
						"thumbnail": {
							"aspect": 1,
							"first": true,
							"height": '.$width.',
							"width": '.$height.'
						},
						"title": "'.$data['name'].'",
						"url": "'.$stream.'"
					}';
		$conversion_url=$this->getCUrl();
		$ret = ($this->getConvertUrl($conversion_url, $post_data));
		if($url=$ret['FileUrl']){
			return $url;
		}
		return false;
	}
	private function getCUrl(){
		global $_SERVER;
		$app=C::t('app_market')->fetch_by_identifier('onlyoffice','dzz');
		$app['extra']=unserialize($app['extra']);
		$host=explode(':',$_SERVER['HTTP_HOST']);
		$onlyDocumentUrl=str_replace(array('localhost','127.0.0.1'),$host[0],$app['extra']['DocumentUrl']);
		$onlyDocumentUrl=rtrim(str_replace('web-apps/apps/api/documents/api.js','',$onlyDocumentUrl),'/').'/ConvertService.ashx';
		return $onlyDocumentUrl;
		
	}
	public function getConvertUrl($posturl, $post_data) {
		//CURLOPT_URL 是指提交到哪里？相当于表单里的“action”指定的路径
		//$url = "http://local.jumei.com/DemoIndex/curl_pos/";
		//$posturl.='?'.http_build_query($post_data);
		$ch = curl_init();
		//    设置变量
		curl_setopt($ch, CURLOPT_URL, $posturl);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		//执行结果是否被返回，0是返回，1是不返回
		//curl_setopt($ch, CURLOPT_HEADER, 0);//参数设置，是否显示头部信息，1为显示，0为不显示

		//伪造网页来源地址,伪造来自百度的表单提交
		//curl_setopt($ch, CURLOPT_REFERER, '');

		//表单数据，是正规的表单设置值为非0
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
		curl_setopt($ch, CURLOPT_TIMEOUT, 300);
		//设置curl执行超时时间最大是多少

		//使用数组提供post数据时，CURL组件大概是为了兼容@filename这种上传文件的写法，
		//默认把content_type设为了multipart/form-data。虽然对于大多数web服务器并
		//没有影响，但是还是有少部分服务器不兼容。本文得出的结论是，在没有需要上传文件的
		//情况下，尽量对post提交的数据进行http_build_query，然后发送出去，能实现更好的兼容性，更小的请求数据包。
		curl_setopt($ch, CURLOPT_POSTFIELDS, ($post_data));

		//执行并获取结果
		if (!$r = curl_exec($ch)) {
			return ( array('error' => curl_error($ch)));
		}
		curl_close($ch);
		return $ret=xml2array($r,true,'utf-8');
	}
}