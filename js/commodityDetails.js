$(function(){
	var search = location.search;
	var sear = search.substr(1).split("=");
	$.ajax({
		type:"get",
		url:"css/commodity.json",
		async:true,
		success:function(res){
			var dataArr = res.data;
			$.each(dataArr, function(index,ele) {
				if(ele.pid==sear[1]){
					var bimgStr = "";
					$.each(ele.bimg, function(bimgindex,bimgele) {
						if(bimgindex==0){
							bimgStr += '<img src="'+bimgele+'" class="active"/>';
						}else{
							bimgStr += '<img src="'+bimgele+'"/>';
						}
					});
					$(".small_img").html(bimgStr+'<div class="mark"></div>');
					var simgStr = "";
					$.each(ele.simg, function(simgindex,simgele) {
						if(simgindex==0){
							simgStr += '<li class="active">'
											+'<img src="'+simgele+'"/>'
										+'</li>'
						}else{
							simgStr += '<li>'
											+'<img src="'+simgele+'"/>'
										+'</li>'
						}
					});
					$(".img_box").html('<a><</a>'+simgStr+'<a>></a>')
					var showStr = "";
					$.each(ele.showimg, function(showimgindex,showimgele) {
						if(showimgindex==0){
							showStr += '<img src="'+showimgele+'" class="active"/>'
						}else{
							showStr += '<img src="'+showimgele+'"/>'
						}
					});
					$(".big_img").html(showStr);
					$(".msg>h1").html(ele.pname);
					$(".proposal>span").html(ele.mp);
					$(".lmmediate_price").html("￥"+ele.jp);
					var styleStr = "";
					$.each(ele.styles.img, function(styleindex,styleele) {
						if(styleindex==0){
							styleStr += '<li class="active">'
											+'<img src="'+styleele+'"/>'
											+'<span>'+ele.styles.color[styleindex]+'</span>'
											+'<i></i>'
										+'</li>'
						}else{
							styleStr += '<li>'
											+'<img src="'+styleele+'"/>'
											+'<span>'+ele.styles.color[styleindex]+'</span>'
											+'<i></i>'
										+'</li>'
						}
					});
					$(".colorType_wrap").html(styleStr);
					var limgStr = "";
					$.each(ele.limg, function(limgindex,limgele) {
						limgStr += '<img src="'+limgele+'"/>'
					});
					$(".commodity_description").html(limgStr);
					if(ele.styles.size==undefined){
						$(".size").html("");
						$(".size_wrap").hide();
					}else{
						$(".size_wrap").show();
						var sizeStr = "";
						$.each(ele.styles.size, function(sizeindex,sizeele) {
							if(sizeindex==0){
								sizeStr += '<li class="active">'
												+'<span>'+sizeele+'</span>'
												+'<i></i>'
											+'</li>'
							}else{
								sizeStr += '<li>'
												+'<span>'+sizeele+'</span>'
												+'<i></i>'
											+'</li>'
							}
						});
						$(".size").html(sizeStr);
					}
					if(ele.styles.capacity==undefined){
						$(".capacity").html("");
						$(".capacity_wrap").hide();
					}else{
						$(".capacity_wrap").show();
						var capacityStr = "";
						$.each(ele.styles.capacity, function(capacityindex,capacityele) {
							if(capacityindex==0){
								capacityStr += '<li class="active">'
												+'<span>'+capacityele+'</span>'
												+'<i></i>'
											+'</li>'
							}else{
								capacityStr += '<li>'
												+'<span>'+capacityele+'</span>'
												+'<i></i>'
											+'</li>'
							}
						});
						$(".capacity").html(capacityStr);
					}
					//价格
					$(".payment_method li").eq(1).html("￥"+(Number($(".lmmediate_price").text().substr(1))/3).toFixed(2)+"×3期"+"<i></i>");
					$(".payment_method li").eq(2).html("￥"+(Number($(".lmmediate_price").text().substr(1))/6).toFixed(2)+"×6期"+"<i></i>");
					$(".payment_method li").eq(3).html("￥"+(Number($(".lmmediate_price").text().substr(1))/12).toFixed(2)+"×12期"+"<i></i>");
					$(".payment_method li").click(function(){
						$(this).addClass("active").siblings().removeClass("active");
					});
					//已选
					$(".choice_txt").html($(".active:eq(3)").text()+" "+$(".active:eq(4)").text()+" "+$(".active:eq(5)").text());
				}
			});
//			放大镜
			$(".small_img").mouseover(function(){
				$(".mark").show();
				$(".big_img").show();
				$(".small_img").mousemove(function(e){
					var e = e||window.event;
					var sctop = $(window).scrollTop();
					var lenX = e.clientX-$(".small_img").offset().left-$(".mark").width()/2;
					var lenY = e.clientY-$(".small_img").offset().top-$(".mark").height()/2+sctop;
					$(".mark").css({
						"left":lenX+"px",
						"top":lenY+"px"
					});
					$(".big_img").scrollLeft(2*lenX);
					$(".big_img").scrollTop(2*lenY);
					if($(".mark").position().left<0){
						$(".mark").css("left",0);
					}
					if($(".mark").position().top<0){
						$(".mark").css("top",0);
					}
					var disX = $(".small_img").width()-$(".mark").width();
					var disY = $(".small_img").height()-$(".mark").height();
					if($(".mark").position().left>disX){
						$(".mark").css("left",disX+"px");
					}
					if($(".mark").position().top>disY){
						$(".mark").css("top",disY+"px");
					}
				})
			}).mouseout(function(){
				$(".mark").hide();
				$(".big_img").hide();
			})
			$(".img_box li").mouseover(function(){
				var ind = $(this).index();
				$(this).addClass("active");
				$(this).siblings().removeClass("active");
				$(".small_img img").eq(ind).addClass("active");
				$(".small_img img").eq(ind).siblings().removeClass("active");
				$(".big_img img").eq(ind).addClass("active");
				$(".big_img img").eq(ind).siblings().removeClass("active");
			})
			//加入购物车
			$(".addToCar").click(function(){
				var judgeFalg = true;
				var arr = localStorage.shoppingCar;
				if(!arr){
					localStorage.shoppingCar = "[]";
				}
				arr = JSON.parse(localStorage.shoppingCar);
				var obj = {
					"name":$(".msg>h1").text(),
					"pid":sear[1],
					"img":$(".colorType_wrap>li>img:eq(0)").attr("src"),
					"shoppingMsg":$(".active:eq(3)").text()+" "+$(".active:eq(4)").text()+" "+$(".active:eq(5)").text(),
					"price":$(".lmmediate_price").text(),
					"num":$(".total").val(),
					"purchaseMethod":"全额付款",
					"diccount":"无"
				}
				$.each(arr, function(index,ele) {
					if(ele.pid==obj.pid){
						judgeFalg = false;
						ele.num = Number(ele.num)+Number($(".total").val());
						localStorage.shoppingCar = JSON.stringify(arr);
						alert("您已成功加入购物车！");
						if(confirm("是否继续购物")){
							//购物车数量
							$(".commodity_num").html(arr.length);
							return;
						}else{
							//购物车数量
							$(".commodity_num").html(arr.length);
							location.href = "shoppingCart.html";
						}
						
					}
				});
				if(judgeFalg){
					arr.push(obj);
					localStorage.shoppingCar = JSON.stringify(arr);
					alert("您已成功加入购物车！");
					if(confirm("是否继续购物")){
						//购物车数量
						$(".commodity_num").html(arr.length);
						return;
					}else{
						//购物车数量
						$(".commodity_num").html(arr.length);
						location.href = "shoppingCart.html";
					}
				}
			})
		}
	});
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
				if(ele.username==eles.username){
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
	//选择样式
	$(".colorType_wrap").on("click","li",function(){
		$(this).addClass("active").siblings().removeClass("active");
		//已选
		$(".choice_txt").html($(".active:eq(3)").text()+" "+$(".active:eq(4)").text()+" "+$(".active:eq(5)").text());
	})
	$(".size").on("click","li",function(){
		$(this).addClass("active").siblings().removeClass("active");
		//已选
		$(".choice_txt").html($(".active:eq(3)").text()+" "+$(".active:eq(4)").text()+" "+$(".active:eq(5)").text());
	})
	$(".capacity").on("click","li",function(){
		$(this).addClass("active").siblings().removeClass("active");
		//已选
		$(".choice_txt").html($(".active:eq(3)").text()+" "+$(".active:eq(4)").text()+" "+$(".active:eq(5)").text());
	})
	//数量
	$(".total").blur(function(){
		if(Number($(".total").val())<=1){
			Number($(".total").val(1));
		}
		if(Number($(".total").val())>=99){
			Number($(".total").val(99));
		}
	})
	$(".reduce").click(function(){
		if(Number($(".total").val())<=1){
			Number($(".total").val(1));
		}else{
			$(".total").val(Number($(".total").val())-1);
		}
	})
	$(".plus").click(function(){
		if(Number($(".total").val())>=99){
			Number($(".total").val(99));
		}else{
			$(".total").val(Number($(".total").val())+1);
		}
	})
	$(window).scroll(function(){
		if($(window).scrollTop()>=750){
			$(".commodity_details_tip").css({
				position:"fixed",
				top:"0",
				zIndex:"999"
			})
		}else{
			$(".commodity_details_tip").css({
				position:"",
				top:"",
				zIndex:""
			})
		}
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
	//我的收藏
	$(".mylist span").eq(1).click(function(){
		location.href = "selected.html";
	})
})