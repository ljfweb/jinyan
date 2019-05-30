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
	//退出登录
	$(".register").click(function(){
		if($(".register:eq(0)").text()!="[注册]"){
			sessionStorage.signIn = "";
			location.href = "index.html";
		}
	})
	//跳转购物车
	$(".shop_car").click(function(){
		var shopCartFlag = true;
		$.each(registerArr, function(index,ele) {
			$.each(signInArr, function(ind,eles) {
				if(ele.username==eles.username||ele.tel==eles.username){
					location.href = "shoppingCart.html";
					shopCartFlag = false;
					return;
				}
			});
		});
		if(shopCartFlag){
			alert("请先登录！");
		}
	})
	//购物车数量
	var shopCartArr = localStorage.shoppingCar;
	if(!shopCartArr){
		localStorage.shoppingCar = "[]";
	}
	shopCartArr = JSON.parse(localStorage.shoppingCar);
	$(".commodity_num").html(shopCartArr.length);
	//悬浮搜索栏
	var timer = null;
	$(window).scroll(function(){
		if($(window).scrollTop()>=300){
			$("#suspension").slideDown();
		}else{
			$("#suspension").hide();
		}
		judge();
	})
	judge();
	function judge(){
		if($(window).scrollTop()>1000){
			$("#hierarchical_jump").fadeIn();
		}else{
			$("#hierarchical_jump").fadeOut();
		}
		if($(window).scrollTop()>=1010&&$(window).scrollTop()<1880){
			$("#hierarchical_jump li").eq(0).addClass("active").siblings().removeClass("active");
		}
		if($(window).scrollTop()>=1880&&$(window).scrollTop()<2400){
			$("#hierarchical_jump li").eq(1).addClass("active").siblings().removeClass("active");
		}
		if($(window).scrollTop()>=2400&&$(window).scrollTop()<2890){
			$("#hierarchical_jump li").eq(2).addClass("active").siblings().removeClass("active");
		}
		if($(window).scrollTop()>=2890&&$(window).scrollTop()<3380){
			$("#hierarchical_jump li").eq(3).addClass("active").siblings().removeClass("active");
		}
		if($(window).scrollTop()>=3380){
			$("#hierarchical_jump li").eq(4).addClass("active").siblings().removeClass("active");
		}
	}
	$("#hierarchical_jump li").eq(0).click(function(){
		$(window).scrollTop(1010);
		$(this).addClass("active").siblings().removeClass("active");
	})
	$("#hierarchical_jump li").eq(1).click(function(){
		$(window).scrollTop(1880);
		$(this).addClass("active").siblings().removeClass("active");
	})
	$("#hierarchical_jump li").eq(2).click(function(){
		$(window).scrollTop(2400);
		$(this).addClass("active").siblings().removeClass("active");
	})
	$("#hierarchical_jump li").eq(3).click(function(){
		$(window).scrollTop(2890);
		$(this).addClass("active").siblings().removeClass("active");
	})
	$("#hierarchical_jump li").eq(4).click(function(){
		$(window).scrollTop(3380);
		$(this).addClass("active").siblings().removeClass("active");
	})
	$("#hierarchical_jump li").eq(5).click(function(){
		var disTop = $(window).scrollTop()/20;
		timer = setInterval(function(){
			window.scrollBy(0,-disTop);
			if($(window).scrollTop()<=0){
				clearInterval(timer);
			}
		},10)
	})
	//商品分类
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
		$(".nav_bottom>ul li").eq(index).addClass("active");
		$(".nav_bottom>ul li").eq(index).siblings().removeClass("active");
	}).mouseout(function(){
		$(".nav_bottom>ul").hide();
		$(".nav_bottom>ul li").removeClass("active");
		$(".nav_bottom_left ul li").eq(index).css({"padding-left":"0","background":"#000","transition":"0.5s"});
	})
	//轮播图
	var picN = 0;
	var cirN = 0;
	var flag = true;
	var width = $(".show").width();
	$(".img_warp").css("width",$(".img_warp li").length*width+"px")
	var timer = null;
	function run(){
		if(flag){
			flag = false;
			picN++;
			cirN++;
			if(picN>$(".img_warp li").length-1){
				picN = 1;
				$(".img_warp").css("left",0);
				$(".img_warp").animate({left:-width*picN+"px"},500,function(){flag=true;});
			}else{
				$(".img_warp").animate({left:-width*picN+"px"},500,function(){flag=true;});
			}
			if(picN>$(".img_warp li").length-2){
				cirN = 0;
				$(".cir li").eq(cirN).addClass("active").siblings().removeClass("active");
			}else{
				$(".cir li").eq(cirN).addClass("active").siblings().removeClass("active");
			}
		}
	}
	timer = setInterval(run,5000);
	$(".show").mouseover(function(){clearInterval(timer)}).mouseout(function(){timer = setInterval(run,5000)})
	$(".next").click(run);
	$(".prov").click(function(){
		if(flag){
			flag=false;
			picN--;
			cirN--;
			if(picN<0){
				picN=$(".img_warp li").length-2;
				cirN=$(".img_warp li").length-2;
				$(".img_warp").css("left",-(picN+1)*width);
				$(".img_warp").animate({left:-width*picN+"px"},500,function(){flag=true;});
				$(".cir li").eq(cirN).addClass("active").siblings().removeClass("active");
			}else{
				$(".img_warp").animate({left:-width*picN+"px"},500,function(){flag=true;});
				$(".cir li").eq(cirN).addClass("active").siblings().removeClass("active");
			}
		}
	})
	//小点点击
	$(".cir>li").click(function(){
		picN = cirN = $(this).index();
		$(".img_warp").animate({left:-width*picN+"px"},500,function(){flag=true;});
		$(".cir li").eq(cirN).addClass("active").siblings().removeClass("active");
	})
	//内容轮播
	var lifePicN = 0;
	var lifewidth = $(".life_show").width();
	$(".life_left:eq(0) .life_prov").click(function(){
		if(flag){
			flag=false;
			lifePicN--;
			if(lifePicN<0){
				lifePicN=$(".life_left:eq(0) .life_move li").length-2;
				$(".life_left:eq(0) .life_move").css("left",-(lifePicN+1)*lifewidth);
				$(".life_left:eq(0) .life_move").animate({left:-lifewidth*lifePicN+"px"},500,function(){flag=true;});
			}else{
				$(".life_left:eq(0) .life_move").animate({left:-lifewidth*lifePicN+"px"},500,function(){flag=true;});
			}
		}
	})
	$(".life_left:eq(0) .life_next").click(function(){
		if(flag){
			flag=false;
			lifePicN++;
			if(lifePicN>$(".life_left:eq(0) .life_move li").length-1){
				lifePicN=1;
				$(".life_left:eq(0) .life_move").css("left",0);
				$(".life_left:eq(0) .life_move").animate({left:-lifewidth*lifePicN+"px"},500,function(){flag=true;});
			}else{
				$(".life_left:eq(0) .life_move").animate({left:-lifewidth*lifePicN+"px"},500,function(){flag=true;});
			}
		}
	})
	var lifepicN1 = 0;
	$(".life_right:eq(0) .life_prov").click(function(){
		if(flag){
			flag=false;
			lifepicN1--;
			if(lifepicN1<0){
				lifepicN1=$(".life_right:eq(0) .life_move li").length-2;
				$(".life_right:eq(0) .life_move").css("left",-(lifepicN1+1)*lifewidth);
				$(".life_right:eq(0) .life_move").animate({left:-lifewidth*lifepicN1+"px"},500,function(){flag=true;});
			}else{
				$(".life_right:eq(0) .life_move").animate({left:-lifewidth*lifepicN1+"px"},500,function(){flag=true;});
			}
		}
	})
	$(".life_right:eq(0) .life_next").click(function(){
		if(flag){
			flag=false;
			lifepicN1++;
			if(lifepicN1>$(".life_right:eq(0) .life_move li").length-1){
				lifepicN1=1;
				$(".life_right:eq(0) .life_move").css("left",0);
				$(".life_right:eq(0) .life_move").animate({left:-lifewidth*lifepicN1+"px"},500,function(){flag=true;});
			}else{
				$(".life_right:eq(0) .life_move").animate({left:-lifewidth*lifepicN1+"px"},500,function(){flag=true;});
			}
		}
	})
	//美妆美食部分
	var lifePicN2 = 0;
	var lifePicN3 = 0;
	$(".life_left:eq(1) .life_prov").click(function(){
		if(flag){
			flag=false;
			lifePicN2--;
			if(lifePicN2<0){
				lifePicN2=$(".life_left:eq(1) .life_move li").length-2;
				$(".life_left:eq(1) .life_move").css("left",-(lifePicN2+1)*lifewidth);
				$(".life_left:eq(1) .life_move").animate({left:-lifewidth*lifePicN2+"px"},500,function(){flag=true;});
			}else{
				$(".life_left:eq(1) .life_move").animate({left:-lifewidth*lifePicN2+"px"},500,function(){flag=true;});
			}
		}
	})
	$(".life_left:eq(1) .life_next").click(function(){
		if(flag){
			flag=false;
			lifePicN2++;
			if(lifePicN2>$(".life_left:eq(1) .life_move li").length-1){
				lifePicN2=1;
				$(".life_left:eq(1) .life_move").css("left",0);
				$(".life_left:eq(1) .life_move").animate({left:-lifewidth*lifePicN2+"px"},500,function(){flag=true;});
			}else{
				$(".life_left:eq(1) .life_move").animate({left:-lifewidth*lifePicN2+"px"},500,function(){flag=true;});
			}
		}
	})
	$(".life_right:eq(1) .life_prov").click(function(){
		if(flag){
			flag=false;
			lifePicN3--;
			if(lifePicN3<0){
				lifePicN3=$(".life_right:eq(1) .life_move li").length-2;
				$(".life_right:eq(1) .life_move").css("left",-(lifePicN3+1)*lifewidth);
				$(".life_right:eq(1) .life_move").animate({left:-lifewidth*lifePicN3+"px"},500,function(){flag=true;});
			}else{
				$(".life_right:eq(1) .life_move").animate({left:-lifewidth*lifePicN3+"px"},500,function(){flag=true;});
			}
		}
	})
	$(".life_right:eq(1) .life_next").click(function(){
		if(flag){
			flag=false;
			lifePicN3++;
			if(lifePicN3>$(".life_right:eq(1) .life_move li").length-1){
				lifePicN3=1;
				$(".life_right:eq(1) .life_move").css("left",0);
				$(".life_right:eq(1) .life_move").animate({left:-lifewidth*lifePicN3+"px"},500,function(){flag=true;});
			}else{
				$(".life_right:eq(1) .life_move").animate({left:-lifewidth*lifePicN3+"px"},500,function(){flag=true;});
			}
		}
	})
	//箱包配饰，投资收藏部分
	var lifePicN4 = 0;
	var lifePicN5 = 0;
	$(".life_left:eq(2) .life_prov").click(function(){
		if(flag){
			flag=false;
			lifePicN4--;
			if(lifePicN4<0){
				lifePicN4=$(".life_left:eq(2) .life_move li").length-2;
				$(".life_left:eq(2) .life_move").css("left",-(lifePicN4+1)*lifewidth);
				$(".life_left:eq(2) .life_move").animate({left:-lifewidth*lifePicN4+"px"},500,function(){flag=true;});
			}else{
				$(".life_left:eq(2) .life_move").animate({left:-lifewidth*lifePicN4+"px"},500,function(){flag=true;});
			}
		}
	})
	$(".life_left:eq(2) .life_next").click(function(){
		if(flag){
			flag=false;
			lifePicN4++;
			if(lifePicN4>$(".life_left:eq(2) .life_move li").length-1){
				lifePicN4=1;
				$(".life_left:eq(2) .life_move").css("left",0);
				$(".life_left:eq(2) .life_move").animate({left:-lifewidth*lifePicN4+"px"},500,function(){flag=true;});
			}else{
				$(".life_left:eq(2) .life_move").animate({left:-lifewidth*lifePicN4+"px"},500,function(){flag=true;});
			}
		}
	})
	$(".life_right:eq(2) .life_prov").click(function(){
		if(flag){
			flag=false;
			lifePicN5--;
			if(lifePicN5<0){
				lifePicN5=$(".life_right:eq(2) .life_move li").length-2;
				$(".life_right:eq(2) .life_move").css("left",-(lifePicN5+1)*lifewidth);
				$(".life_right:eq(2) .life_move").animate({left:-lifewidth*lifePicN5+"px"},500,function(){flag=true;});
			}else{
				$(".life_right:eq(2) .life_move").animate({left:-lifewidth*lifePicN5+"px"},500,function(){flag=true;});
			}
		}
	})
	$(".life_right:eq(2) .life_next").click(function(){
		if(flag){
			flag=false;
			lifePicN5++;
			if(lifePicN5>$(".life_right:eq(2) .life_move li").length-1){
				lifePicN5=1;
				$(".life_right:eq(2) .life_move").css("left",0);
				$(".life_right:eq(2) .life_move").animate({left:-lifewidth*lifePicN5+"px"},500,function(){flag=true;});
			}else{
				$(".life_right:eq(2) .life_move").animate({left:-lifewidth*lifePicN5+"px"},500,function(){flag=true;});
			}
		}
	})
	//限时抢购
	$(".limited_time ul li").click(function(){
		location.href = "commodityDetails.html";
	})
	//内容部分
	$(".life_move li").click(function(){
		location.href = "commodityDetails.html";
	})
	//登录
	$(".sign_in").click(function(){
		location.href = "login.html";
	})
	//注册
	$(".register").click(function(){
		if($(".register:eq(0)").text()!="[退出]"){
			location.href = "register.html";
		}
	})
	//跳转列表页
	$(".nav_bottom_left ul li").click(function(){
		var index = $(this).index();
		location.href = "list.html?tip="+encodeURIComponent($(".one").eq(index).text());
	})
	//猜你喜欢
	$.ajax({
		type:"get",
		url:"css/list.json",
		async:true,
		success:function(res){
			var youlikeArr = res.data;
			var youlikeStr = "";
			$.each(youlikeArr, function(index,ele) {
				youlikeStr += '<li pid="'+ele.pid+'">'
									+'<div class="youlike_img">'
										+'<img src="'+ele.img+'"/>'
									+'</div>'
									+'<div class="youlike_txt">'
										+'<p>'+ele.pname+'</p>'
									+'</div>'
									+'<div class="youlike_price">'
										+'<span>￥'+ele.jp+'</span>'
									+'</div>'
								+'</li>'
			});
			$(".youlike_show").html(youlikeStr);
		}
	});
	//猜你喜欢
	$(".youlike_show").on("click","li",function(){
		location.href = "commodityDetails.html?pid="+$(this).attr("pid");
	})
	//我的收藏
	$(".mylist span").eq(1).click(function(){
		location.href = "selected.html";
	})
})