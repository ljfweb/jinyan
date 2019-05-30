$(function(){
	//获取购物车
	var cartArr = localStorage.shoppingCar;
	if(!cartArr){
		localStorage.shoppingCar = "[]";
	}
	cartArr = JSON.parse(localStorage.shoppingCar);
	var str = "";
	$.each(cartArr, function(index,ele) {
		str += '<tr pid="'+ele.pid+'">'
					+'<td>'
						+'<input type="checkbox" class="checkbox" />'
						+'<img src="'+ele.img+'"/>'
					+'</td>'
					+'<td>'+ele.name+'</td>'
					+'<td>'+ele.shoppingMsg+'</td>'
					+'<td>'+ele.price+'</td>'
					+'<td>'
						+'<a class="reduce">-</a>'
						+'<input type="text" value="'+ele.num+'" class="total" />'
						+'<a class="plus">+</a>'
					+'</td>'
					+'<td>'+ele.purchaseMethod+'</td>'
					+'<td>'+ele.diccount+'</td>'
					+'<td class="total_price">8888.00元</td>'
					+'<td>'
						+'<p class="selected">[收藏]</p>'
						+'<p class="del">[删除]</p>'
					+'</td>'
				+'</tr>'
	});
	$(".wrap").html(str);
	//数量
	$.each(cartArr, function(index,ele) {
		$(".total").eq(index).blur(function(){
			if(Number($(".total").eq(index).val())<=1){
				Number($(".total").eq(index).val(1));
				$(".total_price").eq(index).html("￥"+(Number($(".total").eq(index).val())*Number(ele.price.substr(1))).toFixed(2));
				Total();
			}
			if(Number($(".total").eq(index).val())>=99){
				Number($(".total").eq(index).val(99));
				$(".total_price").eq(index).html("￥"+(Number($(".total").eq(index).val())*Number(ele.price.substr(1))).toFixed(2));
				Total();
			}
		})
		$(".reduce").eq(index).click(function(){
			if(Number($(".total").eq(index).val())<=1){
				Number($(".total").eq(index).val(1));
				$(".total_price").eq(index).html("￥"+(Number($(".total").eq(index).val())*Number(ele.price.substr(1))).toFixed(2));
				Total();
			}else{
				$(".total").eq(index).val(Number($(".total").eq(index).val())-1);
				$(".total_price").eq(index).html("￥"+(Number($(".total").eq(index).val())*Number(ele.price.substr(1))).toFixed(2));
				Total();
			}
		})
		$(".plus").eq(index).click(function(){
			if(Number($(".total").eq(index).val())>=99){
				Number($(".total").eq(index).val(99));
				$(".total_price").eq(index).html("￥"+(Number($(".total").eq(index).val())*Number(ele.price.substr(1))).toFixed(2));
				Total();
			}else{
				$(".total").eq(index).val(Number($(".total").eq(index).val())+1);
				$(".total_price").eq(index).html("￥"+(Number($(".total").eq(index).val())*Number(ele.price.substr(1))).toFixed(2));
				Total();
			}
		})
		$(".total_price").eq(index).html("￥"+(Number($(".total").eq(index).val())*Number(ele.price.substr(1))).toFixed(2));
		Total();
	});
	//继续购物
	$(".continue_shopping").click(function(){
		location.href = "list.html";
	})
	//去结算
	$(".settlement").click(function(){
		alert("共"+$(".commodity_totals_price:eq(1)").text().substr(1)+"元");
	})
//	删除选中项
	var delMore = document.getElementsByClassName("del_more")[0];
	delMore.onclick = function(){
		if(confirm("确定要删除所选商品吗？")){
			Click();
		}else{
			return;
		}
	};
	function Click(){
		var check = document.getElementsByClassName("checkbox");
		for(var i=0;i<check.length;i++){
			if(check[i].checked==true){
				var parent = check[i].parentNode.parentNode;
				var pid = parent.getAttribute("pid");
				parent.remove();
				parent = null;
				for(var j=0;j<cartArr.length;j++){
					if(cartArr[j].pid==pid){
						cartArr.splice(j,1);
						localStorage.shoppingCar = JSON.stringify(cartArr);
						Total();
						AllNum();
						Empty();
					}
				}
			}
			if(check[i].checked==true){
				Click();
			}
		}
	}
	//件数
	function AllNum(){
		var allNum = 0;
		var priceTotal = document.getElementsByClassName("total");
		var check = document.getElementsByClassName("checkbox");
		var commodityNumber = document.getElementsByClassName("commodity_number")[0];
		for(var i=0;i<check.length;i++){
			if(check[i].checked==true){
				allNum += Number(priceTotal[i].value);
			}
		}
		commodityNumber.innerHTML = allNum;
	}
	AllNum();
	//删除
	var delArr = document.getElementsByClassName("del");
	for(var i=0;i<delArr.length;i++){
		delArr[i].onclick = function(){
			if(confirm("确定要删除此商品吗？")){
				var parent = this.parentNode.parentNode;
				var pid = parent.getAttribute("pid");
				parent.remove();
				parent = null;
				for(var j=0;j<cartArr.length;j++){
					if(cartArr[j].pid==pid){
						cartArr.splice(j,1);
						localStorage.shoppingCar = JSON.stringify(cartArr);
					}
				}
				Total();
				AllNum();
				Empty();
			}else{
				return;
			}
		}
	}
	//全选
	var check = document.getElementsByClassName("checkbox");
	var checkAll = document.getElementsByClassName("checkAll")[0];
	var checkAll2 = document.getElementsByClassName("checkAll")[1];
	checkAll.onchange = function(){
		for(var i=0;i<check.length;i++){
			check[i].checked=checkAll.checked;
		}
		checkAll2.checked = checkAll.checked;
		Total();
		AllNum();
	}
	checkAll2.onchange = function(){
		for(var i=0;i<check.length;i++){
			check[i].checked=checkAll2.checked;
		}
		checkAll.checked = checkAll2.checked;
		Total();
		AllNum();
	}
	for(var i=0;i<check.length;i++){
		check[i].onchange = function(){
			Total();
			AllNum();
			var checkFalg = true;
			for(var j=0;j<check.length;j++){
				//全选跟随
				if(check[j].checked==false){
					checkFalg = false;
				}
			}
			if(checkFalg){
				checkAll.checked = true;
				checkAll2.checked = true;
			}else{
				checkAll.checked = false;
				checkAll2.checked = false;
			}
		}
	}
	
	//总价
	function Total(){
		var check = document.getElementsByClassName("checkbox");
		var totalPrice = document.getElementsByClassName("total_price");
		var commodityTotalsPrice = document.getElementsByClassName("commodity_totals_price");
		var priceNum = 0;
		for(var k=0;k<check.length;k++){
			if(check[k].checked==true){
				priceNum += Number(totalPrice[k].innerHTML.substr(1));
			}
		}
		for(var j=0;j<commodityTotalsPrice.length;j++){
			commodityTotalsPrice[j].innerHTML = "￥"+priceNum.toFixed(2);
		}
	}
	Total();
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
			location.href = "shoppingCart.html";
		}
	})
	//判断购物车是否为空
	function Empty(){
		var noCommodity = JSON.parse(localStorage.shoppingCar);
		if(noCommodity.length==0){
			$(".nocommodity").show();
		}else{
			$(".nocommodity").hide();
		}
	}
	Empty();
})