$(function(){
	//登录判断
	var registerArr = localStorage.register;
	var signInArr = sessionStorage.signIn;
	if(!registerArr){
		localStorage.register = "[]";
	}
	if(!signInArr){
		sessionStorage.signIn = "[]";
	}
	registerArr = JSON.parse(localStorage.register);
	signInArr = JSON.parse(sessionStorage.signIn);
	$.each(registerArr, function(index,ele) {
		$.each(signInArr, function(ind,eles) {
			if(ele.username==eles.username||ele.tel==eles.username){
				$(".sign_in_txt").html("您好，");
				$(".sign_in").html(eles.username);
				$(".register").html("[退出]");
			}
		});
	});
	//注册登录
	$(".sign_in").click(function(){
		location.href = "login.html";
	})
	$(".register").click(function(){
		if($(".register").text()=="[注册]"){
			location.href = "register.html";
		}else{
			//退出登录
			sessionStorage.signIn = "";
			location.href = "commodityDetails.html?pid="+sear[1];
		}
	})
	//分类显示
	$(".nav_left").mouseover(function(){
		$(".nav_bottom_left").show();
	}).mouseout(function(){
		$(".nav_bottom_left").hide();
	})
	$(".nav_bottom_left").mouseover(function(){
		$(".nav_bottom_left").show();
	}).mouseout(function(){
		$(".nav_bottom_left").hide();
	})
	//加载尾部
	$("#foot").load("footer.html",function(){
		$("#tail_guide_wrap").css("margin-top",0);
	})
	//商品详细分类显示
	var lis = $(".nav_bottom_left ul li");
	var x = -1;
	var index;
	lis.mouseover(function(){
		index = lis.index(this);
		$(".nav_bottom>ul").show();
		$(".nav_bottom>ul li").eq(index).addClass("active");
		$(this).css({"padding-left":"8px","background":"#1f1f1f","transition":"0.5s"});
		$(".nav_bottom>ul li").eq(index).siblings().removeClass("active");
	}).mouseout(function(){
		$(".nav_bottom>ul").hide();
		$(".nav_bottom>ul li").removeClass("active");
		$(this).css({"padding-left":"0","background":"#000","transition":"0.5s"});
	})
	$(".nav_bottom>ul").mouseover(function(){
		$(".nav_bottom_left ul li").eq(index).css({"padding-left":"8px","background":"#1f1f1f","transition":"0.5s"});
		$(".nav_bottom>ul").show();
		$(".nav_bottom_left").show();
		$(".nav_bottom>ul li").eq(index).addClass("active");
		$(".nav_bottom>ul li").eq(index).siblings().removeClass("active");
	}).mouseout(function(){
		$(".nav_bottom_left").hide();
		$(".nav_bottom>ul").hide();
		$(".nav_bottom>ul li").removeClass("active");
		$(".nav_bottom_left ul li").eq(index).css({"padding-left":"0","background":"#000","transition":"0.5s"});
	})
	//购物车数量
	var shopCartArr = localStorage.shoppingCar;
	if(!shopCartArr){
		localStorage.shoppingCar = "[]";
	}
	shopCartArr = JSON.parse(localStorage.shoppingCar);
	$(".commodity_num").html(shopCartArr.length);
	//跳转列表页
	$(".nav_bottom_left>ul>li").click(function(){
		var index = $(this).index();
		location.href = "list.html?tip="+encodeURIComponent($(".one").eq(index).text());
	})
})