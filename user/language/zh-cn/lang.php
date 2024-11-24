<?php
if(!defined('IN_DZZ')) {
	exit('Access Denied');
}
$lang=array (
	
  'username' => '用户名',
  'login_guest' => '没有帐号？<a href="user.php?mod={$_G[setting][regname]}">{$_G[setting][reglinkname]}</a>',
  'faq' => '帮助',
  'Modify_the_picture' => '修改头像',
  'password_and_security' => '密码与安全',
  'password_edit' => '修改密码',
  'current_my_space' => '当前我的头像',
  'setting_avatar_message' => '如果您还没有设置自己的头像，系统会显示为默认头像，您需要自己上传一张新照片来作为自己的个人头像 ',
  'setting_avatar_message1' => '拖动下面的图片来需要头像位置，点击保存头像按钮保存当前头像',
  'setting_my_new_avatar' => '设置我的新头像',
  'setting_my_new_avatar_message' => '请选择一个新照片进行上传编辑。<br />头像保存后，您可能需要刷新一下本页面(按F5键)，才能查看最新的头像效果 ',
  'security_question' => '安全提问(未设置请忽略)',
  'security_question_0' => '安全提问',
  'security_question_1' => '母亲的名字',
  'security_question_2' => '爷爷的名字',
  'security_question_3' => '父亲出生的城市',
  'security_question_4' => '您其中一位老师的名字',
  'security_question_5' => '您个人计算机的型号',
  'security_question_6' => '您最喜欢的餐馆名称',
  'security_question_7' => '驾驶执照最后四位数字',
  'check_date_item' => '请检查该资料项',
  'profile_message1' => '以下信息通过审核后将不能再次修改，提交后请耐心等待核查 ',
  'profile_message2' => '恭喜您，您的认证审核已经通过，下面的资料项已经不允许被修改 ',
  'time_zone' => '时区',
  'time_zone_state' => '如果发现当前显示的时间与您本地时间相差几个小时，那么您需要更改自己的时区设置 ',
  'current_time' => '当前时间',
  'update_date_success' => '资料更新成功',
  'language_update_success' => '资料更新成功<br>由于您改变了语言选项，系统将刷新页面！',
  'validator_comment' => '管理员否决了您的注册申请，请完善注册原因，重新提交申请',
  'validator_message' => '注册原因',
  'validator_remark' => '否决原因',
  'validator_submit' => '重新提交申请',
  'preview' => '预览',
  'reminder' => '提示信息',
  'required' => '必填',
  'language' => '语言',
  'language_auto'=>'自动',
  'desktop_usesize' => '已用空间',
  'desktop_totalsize' => '总空间',
  'desktop_sum_folder' => '文件夹',
  'desktop_sum_link' => '网址数',
  'desktop_sum_app' => '应用数',
  'desktop_sum_image' => '图片数',
  'desktop_sum_video' => '视频数',
  'desktop_sum_attach' => '附件数',
  'head_save_mistakes' => '头像保存错误，请稍候重试',
  'use_Email_user_not_exist' => '抱歉，使用此 Email 的用户不存在，不能使用取回密码功能',
  'apology_account_data_mismatching' => '抱歉，您填写的账户资料不匹配，不能使用取回密码功能，如有疑问请与管理员联系',
  'password_has_been_sent_email' => '取回密码的方法已通过 Email 发送到您的信箱：<br /><b>{email}</b><br />',
  'please_tree_edit_password' => '请在 3 天之内修改您的密码',
  'administrator_account_not_allowed_find' => '管理员帐号不允许找回',
  'original_password' => '原密码',
  'original_password_mistake' => '原密码错误',
  'WeChat_id_illegal' => '微信号不合法',
  'WeChat_already_registered' => '该微信号已经被注册',
  'username_already_registered' => '用户名已经被注册',
  'user_phone_illegal' => '用户手机号码不合法',
  'phone_illegal' => '手机号码不合法',
  'user_phone_registered' => '用户手机号码已经被注册',
  'sendmail_examine_correct_not' => '邮件发送失败！请检查您的登录邮箱是否正确，或者更换登录邮箱',
  'email_been_sent_wait_few_minutes' => '邮件已发送，可能需要等几分钟才能收到邮件',
  'cancel_qq_bound_succeed' => '取消QQ绑定成功！',
  'qq_log_close' => 'QQ登录功能已关闭！',
  'qq_login' => 'QQ登录！',
  'user_stopped_please_admin' => '此用户已停用，请联系管理员',
  'site_closed_please_admin' => '站点关闭中，请联系管理员',
  'congratulations' => '恭喜您',
  'login_success' => '登录成功！',
  'password_error' => '密码不正确！',
  'username_or_password_error' => '用户名或密码不正确！',
  'password_not_match' => '两次密码不匹配！',
  'please_input_password' => '请输入密码！',
  'qq_shortcut_login_binding_success' => 'QQ快捷登录绑定成功！',
  'user_password_not_correct' => '用户密码不正确，请重试',
  'space_usage' => '空间使用',
  'category_department' => '所属部门',
  'registration_time' => '注册时间',
  'usergroup' => '用户组',
  'not_join_agency_department' => '未加入机构或部门',
  'unallocated_space' => '未分配空间',
  'set_avatar' => '设置头像',
  'save_avatar' => '保存头像',
  'drag_move' => '拖动移动位置',
  'avatar_uploaded_successfully_time' => '头像上传成功,由于缓存问题，可能新头像需要过段时间才能显示',
  'identify_changes' => '确定更改',
  'back_homepage' => '返回首页',
  'other_login' => '其他登录',
  'qq_login' => 'QQ登录',
  'automatic_login_within_thirtydays' => '30天内自动登录',
  'email_username' => '邮箱或用户名',
  'binding_for_account' => '绑定已有账号',
  'register_new_account_bound' => '注册新账号并绑定',
  'register_new_account' => '注册新账号',
  'no_account_yet' => '还没有帐号？',
  'fill_your_login_email' => '填写您的登录邮箱',
  'real_name' => '真实姓名',
  'names_fill_registration' => '填写注册时使用的用户名',
  'sure_find' => '确定找回',
  'back_login' => '返回登录',
  'lostpassword'=>'找回密码',
   'lostpassword_tip'=>'输入注册时邮箱和用户名来找回密码',
	
  'now_your_email' => '现在去邮箱',
  'fill_email_here' => '这里输入邮箱',
  'bind_email_tips' => '若输入邮箱和登录邮箱不一致，将替代登录邮箱',
  'change_bindemail_tips' => '更改后，此邮箱将作为登录邮箱',
  'password_back_email_sent_successfully' => '密码找回邮件发送成功',
  'verify_account_limited' => '等待验证中...。帐号功能受限',
  'user_send_activation_email' => '系统已经向该邮箱发送了一封验证激活邮件，请查收邮件，进行验证激活。',
  'receive_verification_email' => '如果没有收到验证邮件，您可以',
  'change_login_email' => '更换登录邮箱',
  'maybe' => '或者',
  'receive_validation_email' => '重新接收验证邮件',
  'blank_not_set' => '留空，不设置',
  'phone_number' => '手机号码',
  'weixin_binding_mobile_phone' => '微信绑定手机号',
  'phone_number_state' => '选填，微信绑定的手机号码，员工关注企业号时，会根据员工微信绑定的手机来匹配。',
  'weixin' => '微信号',
  'weixin_state' => '选填，员工微信号，员工关注企业号时，会根据员工的微信号来匹配。如果已经关注，此项不能修改。',
  'input_original_password' => '这里输入原密码',
  'please_input_original_password' => '请输入原密码',
  'not_edit_please_blank' => '不修改请留空',
  'verification_code' => '验证码',
  'save_changes' => '保存更改',

  'password_short' => '密码太短，不得少于',
  'cryptographic_strength' => '密码强度',
  'submit_audit' => '提交审核',
  'Information_complete' => '资料完成',
  'compellation' => '姓 名',
  'have_binding_qq' => '已经绑定QQ',
  'unbind' => '取消绑定',
  'landing_directly' => '直接登录',
  'register_binding' => '注册并绑定',
  'login_bound' => '登录并绑定',
  'login_password' => '登录密码',
  'please_bound_then_account' => '为了您更好的使用服务，请绑定已有账号。',
  'login_username_placeholder' => '登录用户名（选填）',
  'terms_service' => '服务条款',
  'merge_bound' => '并绑定',
  'edit_data' => '编辑资料',
  'user_change_lang'=>'更换语言需要重新加载，<a href="#" onclick="window.location.reload()">立即重新加载</a>',
  'qq_unbind_success'=>'取消QQ绑定成功！',
  'qq_unbind_success'=>'取消QQ绑定成功！',
  'qq_bind_success'=>'QQ绑定成功！',
  'qq_bind_failed'=>'QQ绑定失败！',
  'qq_binded'=>'该账号户已经绑定过了！',
  'qq_bind'=>'QQ已绑定',
  'do_unbind'=>'解除绑定！',
  'qq_occupy'=>'QQ已被占用',
  'unbind'=>'未绑定',
  'bind'=>'绑定',
  'update_password_success'=>'更改密码成功！',
  'bindemail_subject'=>'绑定邮箱',
  'qq_quick_login'=>'恭喜您{username}，QQ快捷登录绑定成功！',
  'registe_failed'=>'注册失败',
  'perform_security_verification'=>'进行安全验证',
  'set_user_email'=>'设置邮箱',
  'change_user_email'=>'修改邮箱',
  'email_bind_success'=>'绑定成功',
  'email_edit_success'=>'修改成功',
  'email_new'=>'新邮箱',
  'set'=>'设置',
  'change'=>'更改',
  'verify_email_send'=>'验证邮件已发送',
  'verify_email'=>'验证邮件',
  'email_sended'=>'已发送至您的邮箱',
  'validator_send'=>'重新发送',
  'click_link'=>'点击邮件中的链接完成操作',
  'getpassword_email_sound'=>'找回密码邮件发送成功',
  'system_busy'=>'系统繁忙!',
  'verify_email_tips'=>'<p>验证邮件24小时内有效，请尽快验证。</p>
        <p>邮件可能会进入推广邮件或垃圾邮件中，请注意查收。</p>',
   'sending_wait'=>'发送中，请稍后...',
	'myCountCenter'=>'个人中心',
	'register_welcome_tip'=>'欢迎注册'

);