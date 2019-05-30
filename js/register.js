//用户名：user  密码：password  确认密码：confirm_password  验证码：code  电话：tel
$(function(){
	var userReg = /^[a-zA-Z][A-Za-z0-9_]{5,31}$/;
	var passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
	var telReg = /^1(3|4|5|7|8)\d{9}$/;
	var userfalg = false;
	var passfalg = false;
	var confirmfalg = false;
	var codefalg = false;
	var telfalg = false;
	function check(ele,sonele,yes,no,txt,falsetxt,falg,reg){
		$(ele).focus(function(){
			if(ele == "#user"){
				userfalg = false;
				console.log(userfalg)
			}
			if(ele == "#password"){
				passfalg = false;
			}
			if(ele == "#tel"){
				telfalg = false;
			}
			$(yes).hide();
			$(no).hide();
			$(sonele).html(txt);
			$(sonele).css({"color":"#A8A8A8","paddingLeft":0});
		}).blur(function(){
			if(!$(ele).val()){
				$(sonele).html("");
				if(ele == "#user"){
					userfalg = false;
					console.log(userfalg)
				}
				if(ele == "#password"){
					passfalg = false;
				}
				if(ele == "#tel"){
					telfalg = false;
				}
			}else{
				if(reg.test($(ele).val())){
					$(sonele).html("");
					$(yes).show();
					if(ele == "#user"){
						userfalg = true;
						console.log(userfalg)
					}
					if(ele == "#password"){
						passfalg = true;
					}
					if(ele == "#tel"){
						telfalg = true;
					}
				}else{
					$(sonele).html(falsetxt+"格式错误");
					$(sonele).css({"color":"red","paddingLeft":"30px"});
					$(no).show();
					if(ele == "#user"){
						userfalg = false;
						console.log(userfalg)
					}
					if(ele == "#password"){
						passfalg = false;
					}
					if(ele == "#tel"){
						telfalg = false;
					}
				}
			}
		})
	}
	//用户名
	check("#user","#user_tips",".userRight",".userFalse",'6-32位字符，支持数字、字母及"_"组合',"用户名",userfalg,userReg);
	//密码
	check("#password","#password_tips",".passRight",".passFalse",'8-20位字符，英文区分大小写',"密码",passfalg,passReg);
	//电话
	check("#tel","#tel_tips",".telRight",".telFalse","请输入正确的手机号","手机号",telfalg,telReg);
	//确认密码
	$("#confirm_password").focus(function(){
		confirmfalg = false;
		$(".confirmRight").hide();
		$(".confirmFalse").hide();
		$("#confirm_password_tips").html("请再次输入密码");
		$("#confirm_password_tips").css({"color":"#A8A8A8","paddingLeft":0});
	}).blur(function(){
		if(!$("#confirm_password").val()){
			$("#confirm_password_tips").html("");
			confirmfalg = false;
		}else{
			if(passReg.test($("#confirm_password").val())){
				if($("#confirm_password").val()==$("#password").val()){
					$("#confirm_password_tips").html("");
					$(".confirmRight").show();
					confirmfalg = true;
				}else{
					$("#confirm_password_tips").html("两次输入的密码不一致");
					$("#confirm_password_tips").css({"color":"red","paddingLeft":"30px"});
					$(".confirmFalse").show();
					confirmfalg = false;
				}
			}else{
				$("#confirm_password_tips").html("密码格式错误");
				$("#confirm_password_tips").css({"color":"red","paddingLeft":"30px"});
				$(".confirmFalse").show();
				confirmfalg = false;
			}
		}
	})
	//检验验证码
	$("#code").focus(function(){
		codefalg = false;
		$(".codeRight").hide();
		$(".codeFalse").hide();
		$("#code_tips").html("请输入验证码");
		$("#code_tips").css({"color":"#A8A8A8","paddingLeft":0});
	}).blur(function(){
		if(!$("#code").val()){
			$("#code_tips").html("");
			codefalg = false;
		}else{
			if($("#code").val()==$(".code_box").text()){
				$("#code_tips").html("");
				$(".codeRight").show();
				codefalg = true;
			}else{
				$("#code_tips").html("验证码错误");
				$("#code_tips").css({"color":"red","paddingLeft":"30px"});
				$(".codeFalse").show();
				codefalg = false;
			}
		}
	})
	//生成验证码
	var codeBox = document.getElementsByClassName("code_box")[0];
	var codeBoxTxt = document.getElementsByClassName("code_box_txt")[0];
	function getCode(){
		var str = "";
		var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
		        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
		        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
		for(var i=0;i<4;i++){
			var random = Math.floor(Math.random()*codeChars.length)
			str += codeChars[random];
		}
		codeBox.innerHTML = str;
	}
	getCode();
	codeBox.onclick = function(){getCode();}
	codeBoxTxt.onclick = function(){getCode();}
	//点击提交
	$("#submission").click(function(){
		if(userfalg&&passfalg&&confirmfalg&&codefalg&&telfalg){
			var register = localStorage.register;
			if(!register){
				localStorage.register = "[]";
			}
			register = JSON.parse(localStorage.register);
			var obj = {
				"username":$("#user").val(),
				"password":$("#password").val(),
				"tel":$("#tel").val()
			}
			for(var i=0;i<register.length;i++){
				if(obj.username == register[i].username){
					alert("用户名已存在");
					return;
				}
			}
			register.push(obj);
			localStorage.register = JSON.stringify(register);
			if(confirm("您已成功注册，是否进入登录界面？")){
				location.href = "login.html";
			}else{
				return;
			}
		}else{
			alert("有错误")
		}
	})
})