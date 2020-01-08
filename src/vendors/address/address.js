/**
 * 记录收货地址功能实现方式
 * 1. 接口数据配置
 * 2. 接口请求配置
 * 3. 业务实现
 * */
/**
 * 数据
 */
// 接口参数和返回数据
var data = {
		// 地址列表(添加和地址列表接口一样，tab区别)
		deliver_address : {
			reqUrl	: "ajax_customs_deliver_address",
			reqDevUrl	: "ajax_customs_deliver_address",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
		// 省列表
		province : {
			reqUrl	: "2/api_get_addressinfo/tab:province",
			reqDevUrl	: "2/api_get_addressinfo/tab:province",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
		// 市列表
		provinceCode : {
			reqUrl	: "2/api_get_addressinfo/tab:city/provinceCode",
			reqDevUrl	: "2/api_get_addressinfo/tab:city/provinceCode",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
		// 区列表
		cityCode : {
			reqUrl	: "2/api_get_addressinfo/tab:area/cityCode",
			reqDevUrl	: "2/api_get_addressinfo/tab:area/cityCode",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
		// 街道列表
		areaCode : {
			reqUrl	: "2/api_get_addressinfo/tab:street/areaCode",
			reqDevUrl	: "2/api_get_addressinfo/tab:street/areaCode",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
	};

// 本地数据
var global = {
	// 添加地址对象
	addrInfo: {},
	// 省市区对象
	provinceInfo: {
		province: {},
		city: {},
		area: {},
		street: {}
	},
	// 自取地址信息
	takingSelf: {},
	// 邮寄地址信息
	delivery: {},
	// 总价
	totalPrice: 0,
	orderPrice: 0,
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

	// 绑定取货方式事件
	$tg_list.click(function (){
		selectClickHand(id, url, this);
	});

	// 模拟点击
	// $tg_list.eq(1).click();
};

// 取货方式点击选中事件
var selectClickHand = function (id, url, el) {
	// 判断是否已选中
	if ($(el).find(".s_select").hasClass("iconiconfontxuanzhong4")){
		return;
	}
	// 获取取货方式id
	var id_ = $(el).attr("data-id");
	// 存储取货方式
	global.way = id_;
	// 判断取货方式, 2 是自取 0是邮寄
	if (id_ === "2") {
		// 自取操作
		setAddrOpt(global.takingSelf, tpl.takingSelfAddrInfo, id_, true);
	} else {
		// 判断已有收货地址，只展示数据
		if (Object.keys(global.delivery).length > 0) {
			// 设置地址信息
			setAddrOpt(global.delivery, tpl.deliveryAddrInfo, id_);
			// 绑定地址点击事件
			bindAddrInfoEvent();
		} else {
			// 获取地址列表
			getDeliverAddress(id, url, el);
		}
	}
};
// 绑定地址信息点击事件
var bindAddrInfoEvent = function () {
	// 获取地址信息元素
	var $addrInfo = $(".addr_info");
	// 绑定点击事件
	$addrInfo.click(function () {
		// 获取地址列表
		getDeliverAddress(global.userId, global.siteUrl);
	});
};
// 设置收货地址
var setAddrOpt = function (d, t, id, flag) { // 1.d 数据 	2.t 模板 3. flag 标记是自取
	// 获取绑定元素
	var $addr = $(".tg_addr"),
		$order_info = $(".of_con"),
		$tg_way = $(".tg_list li");
	// 更新地址id
	global.deliver_id = d.id;
	// 设置自取地址
	setAddrInfo($addr, t, d);
	// 判断取货方式是否存在
	if ($tg_way.length > 0) {
		setTakingGoods($tg_way, id);
	}
	// 设置运费
	setFare($order_info, d, flag);
	// 统计价格
	totalPrice();
};

// 载入收货地址列表模板
var loadAddrList = function (d, callback, sureCallback) {
	// 显示模板
	draw({
		innerText: tpl.addrList,
		data: d,
		onShow: function (el) {
			// console.log("弹窗显示后触发事件");
			// 触发回调方法
			callback && callback(el);
		},
		onSure: function (el, obj) {		// 触发确认后事件
			// console.log("确认！sureCallback");
			// 设置请求方式
			// ajax.config.type = "POST";
			// console.log(ajax.config.type);
			sureCallback && sureCallback(el);
			// global
		},
		onCancel: function (el, obj) {		// 触发取消或关闭后事件
			console.log("取消！");
			// 设置请求方式
			ajax.config.type = "POST";
			console.log(ajax.config.type);
			// cancelCallback && cancelCallback(el, obj);
		},
	});
};
// 载入收货地址页面绑定事件
var bindAddrListEvent = function (el) {
	// 获取绑定元素
	var $addrInfo = $(el).find("li");
	// 绑定选择地址事件
	$addrInfo.click(function () {
		// 获取参数
		var id_ = $(this).attr("data-id"),
			uid_ = $(this).attr("data-uid");
		// 验证选择地址是否合法
		checkAddress(id_, uid_, el);
	});
};
// 选择地址后更新页面信息
var setPageInfo = function (d, el, preEl) {
	// 获取绑定元素
	var $addr = $(".tg_addr"),
		$order_info = $(".of_con"),
		$tg_way = $(".tg_list li");
	// 设置邮寄地址
	setAddrInfo($addr, tpl.deliveryAddrInfo, d);
	// 移除地址列表
	$(el).remove();
	// 判断有上一级弹出，移除上一级
	if (preEl){
		preEl.remove();
	}
	// 绑定地址点击事件
	bindAddrInfoEvent();
	// 判断取货方式是否存在
	if ($tg_way.length > 0) {
		setTakingGoods($tg_way, global.way);
	}
	// 设置运费
	setFare($order_info, d);
	// 统计价格
	totalPrice();
};
// 设置地址信息
var setAddrInfo = function (el, t, d) {
	// 设置邮寄地址，模板替换
	var addrHtml = miniTpl(t, d);
	// 插入DOM
	el.html(addrHtml);
};
// 设置收货方式
var setTakingGoods  = function (el, way) {
	// 遍历收货方式，并选中当前邮寄方式
	el.each(function (index, ele) {
		var $curEl = $(this).find(".s_select");
		if ($(this).attr("data-id") == way) {
			// $curEl.removeClass("iconxuanzhong").addClass("iconiconfontxuanzhong4");
			selectOpt($curEl);
		} else {
			$curEl.removeClass("iconiconfontxuanzhong4").addClass("iconxuanzhong");
		}
	});
};
// 选中操作
var selectOpt = function (el) {
	el.removeClass("iconxuanzhong").addClass("iconiconfontxuanzhong4");
};
// 设置运费
var setFare = function (el, d, flag) {
	var $fare = $("#fare");
	// 判断是否已设置运费, 已设置清除并把运费设为0
	if ($fare.length > 0) {
		$fare.remove();
		global.deliver_fee = 0;
	}
	// 判断是否设置运费, true 为不设置
	if (flag) return;
	// 设置运费，模板替换
	var fareHtml = miniTpl(tpl.fareHtml, d);
	// 插入DOM
	el.append(fareHtml);
	// 更新运费
	global.deliver_fee = d.deliver_fee;
};

// 统计价格
var totalPrice = function () {
	console.log("运费", global.deliver_fee, "id_", global.deliver_id);
	// 计算总价
	var _total = parseFloat(global.orderPrice) + parseFloat(global.deliver_fee);
	// 更新页面价格
	$(".of_total").find("span").html("<em>￥</em>"+_total.toFixed(2));
};

// 载入新增收货地址模板
var loadAddAddr = function (callback, sureCallback, preEl) {
	// 显示模板
	draw({
		innerText: tpl.addAddr,
		// data: _data,
		onShow: function (el) {
			// console.log("弹窗显示后触发事件");
			// 触发回调方法
			callback && callback(el);
		},
		onSure: function (el, obj) {		// 触发确认后事件
			// console.log("确认！sureCallback");
			// 设置请求方式
			// ajax.config.type = "POST";
			// console.log(ajax.config.type);
			sureCallback && sureCallback(el, preEl);
			// global
		},
		onCancel: function (el, obj) {		// 触发取消或关闭后事件
			console.log("取消！");
			// 设置请求方式
			ajax.config.type = "POST";
			console.log(ajax.config.type);
			// cancelCallback && cancelCallback(el, obj);
		},
	});
};
// 新增收货地址页面绑定事件
var bindAddEvent = function (el) {
	// 获取绑定元素
	var $region = $("#region"),
		$uname = $("#uname"),
		$detail = $("#detail"),
		$confirm = $(el).find(".confirm");
	// 绑定选择地区事件
	$region.click(getProvince);
	// 绑定收货人输入事件
	$uname.bind('input propertychange', function () {
		// 验证非法输入
		checkIllegalInput(this);
	});
	// 绑定详细地址输入事件
	$detail.bind('input propertychange', function () {
		// 验证非法输入
		checkIllegalInput(this);
	});
};
// 新增收货地址验证
var checkNewAddr = function () {
	// 获取页面输入值
	var flag = true, _uname = $("#uname").val(),
		_mobile = $("#mobile").val(),
		_detail = $("#detail").val();
	// 判断是否输入收货人
	if (!_uname) {
		alert("请输入收货人~");
		flag = false;
		return flag;
	}
	// 判断是否输入手机号
	if (!_mobile) {
		alert("请输入收货人的手机号~");
		flag = false;
		return flag;
	}
	// 判断联系电话是否合法
	if (!checkMobile(_mobile)){
		alert("请输入正确的手机号~");
		flag = false;
		return flag;
	}
	// 判断是否输入详细地址
	if (!_detail) {
		alert("请输入收货人的详细地址~");
		flag = false;
		return flag;
	}
	// 判断是否选择省市区
	if (!global.addrInfo.aid){
		alert("请选择所在地区~");
		flag = false;
		return flag;
	}
	// 判断通过验证进行赋值
	if (flag) {
		// 配置页面输入参数
		global.addrInfo.uname = _uname;
		global.addrInfo.mobile = _mobile;
		global.addrInfo.detail = _detail;
		// 固定值配置
		global.addrInfo.tab = "save";
		global.addrInfo.uid = global.userId;
	}
	return flag;
};
// 验证手机号
var checkMobile = function (tel) {
	var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	if (!myreg.test(tel)) {
		return false;
	} else {
		return true;
	}
};
// 验证非法输入
var checkIllegalInput = function (el) {
	// 非法输入正则
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
	// 获取输入框值
	var inputTxt = $(el).val();
	// 替换输入框获取的字符
	var str = inputTxt.replace(pattern, '');
	// 替换输入框值
	$(el).val(str);
};

// 载入省市区列表模板
var loadProvince = function (d, tit, callback) {
	// console.log(d);
	// 显示模板
	draw({
		innerText: tpl.province,
		title: tit,
		data: d,
		onShow: function (el) {
			// console.log("弹窗显示后触发事件");
			// 给省市区列表设置高度
			el.find(".dw_body").height("16rem");
			// 触发回调方法
			callback && callback(el);
		},
		onSure: function (el, obj) {		// 触发确认后事件
			console.log("确认！");
			// sureCallback && sureCallback(el, obj, n, id, _data);
		},
		onCancel: function (el, obj) {		// 触发取消或关闭后事件
			console.log("取消！");
			// cancelCallback && cancelCallback(el, obj);
		},
	});
};
// 绑定省市区点击事件
var bindProvinceHand = function (el, flag) {
	// 获取绑定元素
	var $prov_item = el.find(".prov_item");

	// 绑定选择地区事件
	$prov_item.click(function () {
		console.log(this);
		var id_ = $(this).attr("data-id");
		// 判断请求对应事件
		switch (flag) {
			case 1:
				// 存储省id和name
				global.provinceInfo.province.id = id_;
				global.provinceInfo.province.name = $(this).text();
				// 获取市事件
				getCity(id_);
				break;
			case 2:
				// 存储市id和name
				global.provinceInfo.city.id = id_;
				global.provinceInfo.city.name = $(this).text();
				// 获取区事件
				getArea(id_);
				break;
			case 3:
				// 存储区id和name
				global.provinceInfo.area.id = id_;
				global.provinceInfo.area.name = $(this).text();
				// 获取街道事件
				// getStreet(id_);
				selectAreaHand();
				break;
			case 4:
				// 存储街道id和name
				global.provinceInfo.street.id = id_;
				global.provinceInfo.street.name = $(this).text();
				// 绑定街道事件
				selectStreetHand(id_);
				break;
			default:
				break;
		}
	});
};
// 绑定街道点击事件（有街道时使用）
var selectStreetHand = function (id) {
	var provinceName = "";
	// 遍历省市区弹出层并隐藏
	for (var m in global.provinceInfo){
		// 移除省市区弹出层
		global.provinceInfo[m].ele.remove();
		// 拼接字符串
		provinceName += global.provinceInfo[m].name;
	}
	// 设置页面显示
	// console.log(provinceName);
	$("#region").find("em").text(provinceName);
	// 拼接地址信息
	global.addrInfo.pid = global.provinceInfo.province.id;
	global.addrInfo.cid = global.provinceInfo.city.id;
	global.addrInfo.aid = global.provinceInfo.area.id;
	global.addrInfo.sid = global.provinceInfo.street.id;
	console.log(global.addrInfo);
};
// 绑定区点击事件（没有街道时使用）
var selectAreaHand = function (id) {
	var provinceName = "";
	// 遍历省市区弹出层并隐藏
	for (var m in global.provinceInfo){
		// 判断没有内容跳出循环
		if (Object.keys(global.provinceInfo[m]).length == 0){
			break;
		}
		// 移除省市区弹出层
		global.provinceInfo[m].ele.remove();
		// 拼接字符串
		provinceName += global.provinceInfo[m].name;
	}
	// 设置页面显示
	// console.log(provinceName);
	$("#region").find("em").text(provinceName);
	// 拼接地址信息
	global.addrInfo.pid = global.provinceInfo.province.id;
	global.addrInfo.cid = global.provinceInfo.city.id;
	global.addrInfo.aid = global.provinceInfo.area.id;
	// console.log(global.addrInfo);
};

/**
 * 请求数据
 * @param {Function} examine 		请求初始化信息
 */
// 请求保存收货地址接口
var saveAddress = function (el, preEl) {
	// 新增收货地址验证
	if (!checkNewAddr()) return;
	// 请求方式
	ajax.config.type = "POST";
	// 请求URL
	ajax.config.url = ajax.reqUrl(data.deliver_address, global.siteUrl);
	// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
	// 请求参数
	// uname ： 收货人姓名
	// pid ：省编号
	// cid ：市编号
	// aid ：区编号
	// sid ：街道编号
	// uid ： 用户id
	// detail：详细地址
	// mobile ：手机号
	// tab : save
	ajax.config.data = global.addrInfo;
	console.log(ajax.config.data);
	// 请求数据
	ajax.reqDataApi(ajax.config,function (res) {
		console.log(res);
		if (res.res == 1) {
			console.log(res.msg);
			// 存储邮寄地址
			global.delivery = res.data;
			// 存储地址id
			global.deliver_id = global.delivery.id;
			console.log("邮寄", global.delivery);
			// 选择地址成功操作
			setPageInfo(res.data, el, preEl);
		} else {
			console.log(res.msg);
			alert(res.msg);
		}
	});
};

// 请求收货地址列表接口
var getDeliverAddress = function (id, url, el) {
	// 请求URL
	ajax.config.url = ajax.reqUrl(data.deliver_address, url);
	// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
	// 请求参数  uid=2124895&tab=list
	ajax.config.data = {
		uid: id,
		tab: "list"
	};
	console.log(ajax.config.data);
	// 请求数据
	ajax.reqDataApi(ajax.config,function (res) {
		console.log(res);
		if (res.res == 1) {
			console.log(res.msg);
			// 载入收货地址列表
			loadAddrList(res.data, bindAddrListEvent, function (el) {
				// 载入新增收货地址
				loadAddAddr(bindAddEvent, saveAddress, el);
			});
		} else if (res.res == 0){
			// 判断没有收货地址
			console.log(res.msg);
			// 载入新增收货地址
			loadAddAddr(bindAddEvent, saveAddress);
		} else {
			console.log(res.ResultDescription);
			// alert(res.msg);
		}
	});
};

// 请求判断选择的收货地址是否合法接口
var checkAddress = function (id, uid, el) {
	// 请求URL
	ajax.config.url = ajax.reqUrl(data.deliver_address, global.siteUrl);
	// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
	// 请求参数  uid=2124895&tab=list
	ajax.config.data = {
		id: id,
		uid: uid,
		tab: "check"
	};
	console.log(ajax.config.data);
	// 请求数据
	ajax.reqDataApi(ajax.config,function (res) {
		console.log(res);
		if (res.res == 1) {
			console.log(res.msg);
			// alert(res.msg);
			// 存储邮寄地址
			global.delivery = res.data;
			// 存储地址id
			global.deliver_id = global.delivery.id;
			console.log("邮寄", global.delivery);
			// 选择地址成功操作
			setPageInfo(res.data, el);
		} else {
			console.log(res.msg);
			alert(res.msg);
		}
	});
};

// 请求省列表接口
var getProvince = function (id, url, el) {
	// 请求方式
	ajax.config.type = "get";
	// 请求URL
	ajax.config.url = ajax.reqUrl(data.province, url);
	// console.log(ajax.config.data);
	console.log(ajax.config);
	// 请求数据
	ajax.reqDataApi(ajax.config,function (res) {
		// console.log(res);
		if (res.res == 1) {
			// 载入省列表
			loadProvince(res.data, "请选择省", function (el) {
				// 绑定省市区事件
				bindProvinceHand(el, 1);
				// 存储省列表
				global.provinceInfo.province.ele = el;

			});
		};
	});
};

// 请求市列表接口
var getCity = function (code) {
	// 请求方式
	ajax.config.type = "get";
	// 请求URL
	ajax.config.url = ajax.reqUrl(data.provinceCode) + ":" + code;
	// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
	// console.log(ajax.config.data);
	console.log(ajax.config);
	// 请求数据
	ajax.reqDataApi(ajax.config,function (res) {
		// console.log(res);
		if (res.res == 1) {
			// 载入市列表
			loadProvince(res.data, "请选择市", function (el) {
				// 绑定省市区事件
				bindProvinceHand(el, 2);
				// 存储省列表
				global.provinceInfo.city.ele = el;

			});
		};
	});
};

// 请求区列表接口
var getArea = function (code) {
	// 请求方式
	// ajax.config.type = "get";
	// 请求URL
	ajax.config.url = ajax.reqUrl(data.cityCode) + ":" + code;
	// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
	// console.log(ajax.config.data);
	console.log(ajax.config);
	// 请求数据
	ajax.reqDataApi(ajax.config,function (res) {
		// console.log(res);
		if (res.res == 1) {
			// 载入区列表
			loadProvince(res.data, "请选择区", function (el) {
				// 绑定省市区事件
				bindProvinceHand(el, 3);
				// 存储省列表
				global.provinceInfo.area.ele = el;

			});
		};
	});
};

// 请求街道列表接口
var getStreet = function (code) {
	// 请求方式
	// ajax.config.type = "get";
	// 请求URL
	ajax.config.url = ajax.reqUrl(data.areaCode) + ":" + code;
	// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
	// console.log(ajax.config.data);
	console.log(ajax.config);
	// 请求数据
	ajax.reqDataApi(ajax.config,function (res) {
		// console.log(res);
		if (res.res == 1) {
			// 载入街道列表
			loadProvince(res.data, "请选择街道", function (el) {
				// 存储省列表
				global.provinceInfo.street.ele = el;
				// 绑定省市区事件
				bindProvinceHand(el, 4);

			});
		};
	});
};