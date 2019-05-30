$(function(){
	$(".logins").click(function(){
		var signFalg = false;
		var arr = localStorage.register;
		if(!arr){
			alert("请先注册");
			return;
		}
		var register = JSON.parse(arr);
		$.each(register, function(index,ele) {
			if((ele.username==$(".username").val()||ele.tel==$(".username").val())&&ele.password==$(".pass").val()){
				signFalg = true;
				return;
			}else{
				return;
			}
		});
		if(signFalg){
			alert("登录成功！");
			location.href = "index.html";
		}else{
			alert("帐号或密码错误！");
		}
		var obj = {
			"username":$(".username").val(),
			"password":$(".pass").val()
		}
		var signInArr = [];
		signInArr.push(obj);
		sessionStorage.signIn = JSON.stringify(signInArr);
	})
	$("#feet").load("footer.html",function(){
		$("#tail_guide_wrap").css("margin-top",0)
	})
})