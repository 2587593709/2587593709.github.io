$(function(){
	$("#login_text").val($.cookie("user"));
	 $('#login_pass').val($.cookie("passwd"))
	$('.login_determine').click(function() {
		login();
	});
	$(document).keydown(function(event) { //enter执行事件
		if(event.keyCode == 13) {
			login();
		}
	});

	function login() {
		var user = $('#login_text').val();
		var passwd = $('#login_pass').val();
		layer.load(2);
		$.ajax({
			url: 'http://47.97.196.94:8080/wms/jf/login/login',
 			type: "POST",
			data: {
				user_name : user,									
				password : passwd
			},
			xhrFields : {
				withCredentials : true
			},
			//contentType: "application/json;charset=UTF-8",
			success: function(data) {
				layer.closeAll('loading');
				if(data.success) {
					$.cookie("user", user);
					$.cookie("passwd", passwd);
//					$.cookie("userName", data.context.userName);
//					$.cookie("shopId", data.context.shopId);
//					$.cookie("oa_token", data.context.token);
					location.href = "index.html";
				} else {
					layer.msg('账号或密码错误',{icon: 5})
				}
			},
			error: function() {
				layer.closeAll('loading');
				layer.msg('接口调用失败', {icon: 5});
			}
		})
		}
})
