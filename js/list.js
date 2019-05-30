$(function(){
	$.ajax({
		url:"css/list.json",
		type:"get",
		dataType:"json",
		async:true,
		success:function(res){
			var dataArr = res.data;
			//价格排行
			var rankFalg = true;
			$(".price_ranking").click(function(){
				$(".min").val("");
				$(".max").val("");
				if(rankFalg){
					$(".price_ranking").html("价格↓");
					for(var i=0;i<dataArr.length;i++){
						for(var j=0;j<dataArr.length;j++){
							if(Number(dataArr[i].jp)>dataArr[j].jp){
								var temp = dataArr[i];
								dataArr[i] = dataArr[j];
								dataArr[j] = temp;
							}
						}
					}
					//生成降序列表
					var dataStrs = "";
					$.each(dataArr, function(index,ele) {
						dataStrs += '<li pid="'+ele.pid+'">'
										+'<img src="'+ele.img+'"/>'
										+'<p>'
											+'<span class="now_price">￥'+ele.jp+'</span>'
											+'<span>￥'+ele.mp+'</span>'
										+'</p>'
										+'<p class="mytxts">'+ele.pname+'</p>'
									+'</li>'
					});
					$(".commodity ul").html(dataStrs);
					rankFalg = false;
				}else{
					$(".price_ranking").html("价格↑");
					for(var i=0;i<dataArr.length;i++){
						for(var j=0;j<dataArr.length;j++){
							if(Number(dataArr[i].jp)<Number(dataArr[j].jp)){
								var temp = dataArr[i];
								dataArr[i] = dataArr[j];
								dataArr[j] = temp;
							}
						}
					}
					//生成升序列表
					var datasStr = "";
					$.each(dataArr, function(index,ele) {
						datasStr += '<li pid="'+ele.pid+'">'
										+'<img src="'+ele.img+'"/>'
										+'<p>'
											+'<span class="now_price">￥'+ele.jp+'</span>'
											+'<span>￥'+ele.mp+'</span>'
										+'</p>'
										+'<p class="mytxts">'+ele.pname+'</p>'
									+'</li>'
					});
					$(".commodity ul").html(datasStr);
					rankFalg = true;
				}
			})
			//初始生成列表
			var dataStr = "";
			$.each(dataArr, function(index,ele) {
				dataStr += '<li pid="'+ele.pid+'">'
								+'<img src="'+ele.img+'"/>'
								+'<p>'
									+'<span class="now_price">￥'+ele.jp+'</span>'
									+'<span>￥'+ele.mp+'</span>'
								+'</p>'
								+'<p class="mytxts">'+ele.pname+'</p>'
							+'</li>'
			});
			$(".commodity ul").html(dataStr);
			//生成价格区间列表
			$(".sure").click(function(){
				var sureStr = "";
				var minPrice = $(".min").val();
				var maxPrice = $(".max").val();
				$.each(dataArr, function(index,ele) {
					if(ele.jp>=Number(minPrice)&&ele.jp<=Number(maxPrice)){
						sureStr += '<li pid="'+ele.pid+'">'
										+'<img src="'+ele.img+'"/>'
										+'<p>'
											+'<span class="now_price">￥'+ele.jp+'</span>'
											+'<span>￥'+ele.mp+'</span>'
										+'</p>'
										+'<p class="mytxts">'+ele.pname+'</p>'
									+'</li>'
					}
				});
				$(".commodity ul").html(sureStr);
			})
		}
	})
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
			location.href = "list.html";
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
	$("footer").load("footer.html",function(){
		$("#tail_guide_wrap").css("margin-top","30px")
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
	//悬浮导航
	$(window).scroll(function(){
		if($(window).scrollTop()>=450){
			$(".ranking").css({
				"position":"fixed",
				"top":0,
				"marginTop":0
			})
		}else{
			$(".ranking").css({
				"position":"",
				"top":0,
				"marginTop":"30px"
			})
		}
	})
	$(".commodity ul").on("click","li",function(){
		location.href = "commodityDetails.html?pid="+$(this).attr("pid");
	})
	//获取search写入
	var txt = decodeURIComponent(location.search);
	var mytxt = txt.substr(txt.indexOf("=")+1,4);
	$(".second_tip").html(mytxt);
	//跳转列表页
	$(".nav_bottom_left>ul>li").click(function(){
		var index = $(this).index();
		location.href = "list.html?tip="+encodeURIComponent($(".one").eq(index).text());
	})
	//我的收藏
	$(".mylist span").eq(1).click(function(){
		location.href = "selected.html";
	})
})