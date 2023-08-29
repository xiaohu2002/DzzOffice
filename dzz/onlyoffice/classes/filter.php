<?php
namespace dzz\onlyoffice\classes;

use \core as C;
use \DB as DB;
use \IO as IO;
class filter{
    //private $exts=array('pdf','doc','docx','ppt','pptx','xls','xlsx');
	public function run(&$data,$extra){
		$app=C::t('app_market')->fetch_by_identifier('onlyoffice','dzz');
		$app['extra']=unserialize($app['extra']);
		$exts=explode(',',$app['extra']['exts']);
		if($data['size']<1) return;
		if(!in_array($data['ext'],$exts)){
			return;
		}else{
			$data['img']='index.php?mod=io&op=thumbnail&size=small&path='.$data['dpath'].'&t='.VERHASH;
		 }
	}
}