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
class dzz_notification {


	public static function notification_add($touid, $type, $note, $notevars = array(), $category = 0,$langfolder='') {
		global $_G;

		if(!($tospace = getuserbyuid($touid))) {
			return false;
		}

		$notestring = lang($note, $notevars,'',$langfolder);
		$notestring_wx = lang($note.'_wx', $notevars,'',$langfolder);
		$redirect=lang( $note.'_redirecturl', $notevars,'',$langfolder);


		$title=lang($note.'_title',$notevars,'',$langfolder);
		$oldnote = array();
		
		if(!$_G['setting']['Duplicatenotification']) {
			$oldnote = C::t('notification')->fetch_by_fromid_uid_type($notevars['from_id'], $notevars['from_idtype'], $touid,$type);
		}

		if(empty($oldnote['from_num'])) $oldnote['from_num'] = 0;
		$notevars['from_num'] = (isset($notevars['from_num'])&& $notevars['from_num']) ? $notevars['from_num'] : 1;
		$setarr = array(
			'uid' => $touid,
			'type' => $type,
			'new' => 1,
			'wx_new' =>1,
			'wx_note'=>$notestring_wx,
			'redirecturl'=>$redirect,
			'title'=>$title,
			'authorid' => $_G['uid'],
			'author' => $_G['username'],
			'note' => $notestring,
			'dateline' => $_G['timestamp'],
			'from_id' => $notevars['from_id'],
			'from_idtype' => $notevars['from_idtype'],
			'from_num' => ($oldnote['from_num']+$notevars['from_num']),
			'category'=>$category
		);
		$redirect = (strpos($redirect, 'http://') === 0 || strpos($redirect, 'https://') === 0) 
             ? $redirect 
             : $_G['siteurl'] . $redirect;
		$_G['setting']['mail'] = dunserialize($_G['setting']['mail']);
		if($_G['setting']['mail']['tzxxyjtz']) {
		//发送邮件
        require_once libfile('function/mail');
        $member = C::t('user')->fetch_by_uid($touid);
        $member1=C::t('user')->fetch_by_uid($_G['uid']);
        $youjiantz = <<<EOT
        <p style="font-size:14px;color:#333; line-height:24px; margin:0;">尊敬的用户$member[username],您好！</p>
        <p style="line-height: 24px; margin: 6px 0px 0px; overflow-wrap: break-word; word-break: break-all;"><span style="color: rgb(51, 51, 51); font-size: 14px;">$notestring</span></p>
        <p style="line-height: 24px; margin: 6px 0px 0px; overflow-wrap: break-word; word-break: break-all;"><span style="color: rgb(51, 51, 51); font-size: 14px;">链接：</span></p>
        <p style="line-height: 24px; margin: 6px 0px 0px; overflow-wrap: break-word; word-break: break-all;"><span style="color: rgb(51, 51, 51); font-size: 12px;"><a href="$redirect" title="$redirect" style="text-decoration-line: none; word-break: break-all; overflow-wrap: normal; color: rgb(51, 51, 51); font-size: 12px;" rel="noopener" target="_blank"><span style="color: rgb(0, 164, 255);">$redirect</span></a><span style="font-size: 12px; color: rgb(51, 51, 51);">,(如果上面不是链接形式，请将该地址手工粘贴到浏览器地址栏再访问)</span></p>															
EOT;
        ;
        if(!sendmail("$member[username] <$member[email]>", $title, $youjiantz)) {
          runlog('sendmail', "$member[email]  发送失败");
        }
		}
		if($oldnote['id']) {
			$setarr['id']=$oldnote['id'];
			C::t('notification')->update($oldnote['id'], $setarr);
		} else {
			$oldnote['new'] = 0;
			$setarr['id']=C::t('notification')->insert($setarr, true);
		}
		$noteid=$setarr['id'];
		Hook::listen('online_notification', $noteid);
		//self::wx_notification($setarr);
		//$banType = array('task');
		if(empty($oldnote['new'])) {
			C::t('user')->increase($touid, array('newprompt' => 1));
			
			/*require_once libfile('function/mail');
			$mail_subject = lang('notification', 'mail_to_user');
			sendmail_touser($touid, $mail_subject, $notestring,  $type);*/
		}
	}
	
	public function wx_sendMsg($data){
		if(!getglobal('setting/CorpID') || !getglobal('setting/CorpSecret')) return false;
		$user=C::t('user')->fetch($data['uid']);
		if(!$user['wechat_userid'] || $user['wechat_status']!=1){ 
			C::t('notification')->update($data['id'],array('wx_new'=>$data['wx_new']+1));
			return false;
		}
		$agentid=0;
		if($data['from_idtype']=='app' && $data['from_id'] && ($wxapp=C::t('wx_app')->fetch($data['from_id']))){
			if($wxapp['agentid'] && $wxapp['status']<1) $agentid=$wxapp['agentid'];
		}
		$appsecret=getglobal('setting/CorpSecret');
		if(isset($wxapp['secret']) && $wxapp['secret']){
			$appsecret=$wxapp['secret'];
		}
		$wx=new qyWechat(array('appid'=>getglobal('setting/CorpID'),'appsecret'=>$appsecret));
		$msg=array(
			   	  "touser" =>$user['wechat_userid'], //"dzz-".$data['uid'],
				  //"toparty" => "1",
				  "safe"=>0,			//是否为保密消息，对于news无效
				  "agentid" => $agentid,	//应用id
				  "msgtype" => "news",  //根据信息类型，选择下面对应的信息结构体
				  "news" => array(			//不支持保密
							  "articles" => array(    //articles  图文消息，一个图文消息支持1到10个图文
								  array(
									  "title" => $data['title'],             //标题
									  "description" => getstr($data['wx_note'],0,0,0,0,-1), //描述
									  "url" => $wx->getOauthRedirect(getglobal('siteurl').'index.php?mod=system&op=wxredirect&url='.dzzencode($data['redirecturl'])) //点击后跳转的链接。可根据url里面带的code参数校验员工的真实身份。
									 // "picurl" => "http://cs.286.com.cn/data/attachment/appimg/201409/15/161401bmtrmxlmjtlfllkr.png", //图文消息的图片链接,支持JPG、PNG格式，较好的效果为大图640320，小图8080。如不填，在客户端不显示图片
								  )
							  )
							)
		 		);
		if($ret=$wx->sendMessage($msg)){
			C::t('notification')->update($data['id'],array('wx_new'=>0));
			return true;
		}else{
			C::t('notification')->update($data['id'],array('wx_new'=>$data['wx_new']+1));
			$message='wx_notification：errCode:'.$wx->errCode.';errMsg:'.$wx->errMsg;
			runlog('wxlog',$message);
			return false;
		}
	}
	
	 
	public function update_newprompt($uid, $type) {
		global $_G;
		if($_G['member']['newprompt_num']) {
			$tmpprompt = $_G['member']['newprompt_num'];
			$num = 0;
			$updateprompt = 0;
			if(!empty($tmpprompt[$type])) {
				unset($tmpprompt[$type]);
				$updateprompt = true;
			}
			foreach($tmpprompt as $key => $val) {
				$num += $val;
			}
			if($num) {
				if($updateprompt) {
					C::t('user')->update($uid, array('newprompt'=>$num));
				}
			} else {
				C::t('user')->update($_G['uid'], array('newprompt'=>0));
			}
		}
	}
}

?>
