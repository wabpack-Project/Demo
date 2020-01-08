/**
 * 数据
 */
	// 接口参数和返回数据
var data = {
		// 使用积分
		useIntegral : {
			reqUrl	: "ajax/orderjifenpay",
			reqDevUrl	: "ajax/orderjifenpay",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
		// 取消使用积分
		cancelUseIntegral : {
			reqUrl	: "ajax/orderjfcancel",
			reqDevUrl	: "ajax/orderjfcancel",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
	};

// 本地数据
var global = {

};

/**
 * DOM事件绑定
 */
var bindEvent = function (id, url) {
	// 获取元素
	var $tg_list = $(".tg_list").find("li"),
		$pay_list = $(".pay_list").find("li"),
		$pay_sure = $(".pay_sure"),
		$ig_recharge = $(".ig_recharge "),
		$ig_user = $(".ig_user ");

	// 绑定充值点击事件
	$ig_recharge.click(function () {
		// 跳转充值地址
		location.href = global.siteUrl + "/recharge";
	});

	// 绑定使用积分事件
	$ig_user.click(function () {
		// 触发使用积分接口
		useIntegral($(".text_change").val());
	});

	// 绑定积分使用数量事件
	prices(document.getElementsByClassName("quantity"), {
		isTpl: false,
		minNum: 0,
		maxNum: 10.5,
		digit	: 2,
		isDisabled: false,
		addHandle: function (el, v) {
			// el.value = v + "小时";
		},
		cutHandle: function (el, v) {
			// el.value = v + "小时";
		},
	});

	// 模拟点击
	// $tg_list.eq(1).click();
};


// 请求使用积分接口
var useIntegral = function (v) {
	// 请求URL
	ajax.config.url = ajax.reqUrl(data.useIntegral, global.siteUrl);
	ajax.config.data = {
		jf: v,
		oid: "231527,231528,231529,231530,231531,231532",
	};
	console.log(ajax.config.data);
	// 请求数据
	ajax.reqDataApi(ajax.config,function (res) {
		console.log(res);
		if (res.res == 1) {
			console.log(res.msg);
		} else {
			console.log(res.msg);
			alert(res.msg);
		}
	});
};

// 请求使用积分接口
var cancelUseIntegral = function () {
	// 请求URL
	ajax.config.url = ajax.reqUrl(data.cancelUseIntegral, global.siteUrl);
	ajax.config.data = global.deliveryAddrInfo;
	console.log(ajax.config.data);
	// 请求数据
	ajax.reqDataApi(ajax.config,function (res) {
		console.log(res);
		if (res.res == 1) {
			console.log(res.msg);
		} else {
			console.log(res.msg);
			alert(res.msg);
		}
	});
};