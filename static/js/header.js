var _header = {};
_header.init = function(formhash){
	_header.formhash=formhash;
	/*if(jQuery('.bs-left-container').length<1){
		jQuery('.resNav .leftTopmenu').hide();
	}*/
};

_header.loging_close = function(){
	var msg ='<span style="font-size:1.28rem">您确定要注销登录？</span>';
	if(msg){		
		showDialog( msg, 'confirm','', function(){		
		jQuery.get('user.php?mod=login&op=logging&action=logout&formhash='+_header.formhash+'&t='+new Date().getTime(),function(data){
			window.location.reload();
		});
	});
	}
};
_header.leftTopmenu=function(obj,flag){
	var clientWidth=document.documentElement.clientWidth;
	if(!flag){
		if(jQuery('.bs-left-container').is(':visible')){
			flag='hide';
		}else{
			flag='show';
		}
	}
	if(flag==='hide'){
		jQuery('.bs-left-container').hide();
		jQuery('.left-drager').hide();
		jQuery('.bs-main-container').css('marginLeft',0);
		jQuery(obj).removeClass('leftTopmenu');
	}else if(flag==='show'){
		jQuery('.bs-left-container').show();
		var leftWidth=jQuery('.bs-left-container').outerWidth(true);
		if(leftWidth<20){
			leftWidth=20;
			jQuery('.bs-left-container').width(leftWidth);
			jQuery('.left-drager').css({'left':leftWidth,'cursor':'w-resize'});
		}
		jQuery('.left-drager').show();
		jQuery('.bs-main-container').css('marginLeft',clientWidth<768?0:leftWidth);
		jQuery(obj).addClass('leftTopmenu');
	}
};