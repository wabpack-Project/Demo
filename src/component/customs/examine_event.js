/*
 * 业务依赖组件
 */
// import $ from "../vendors/jquery/jquery-1.10.2.min";
// JQ引用第一种方式
// var $ = require("../vendors/jquery/jquery-1.10.2.min");
// window.jQuery = $;
// window.$ = $;
/*
import "../../vendors/Js/Array.extension";
// import "../vendors/Js/tool";
var tool = require("../../vendors/Js/tool");
// import ajax from "../vendors/ajax/config";
var ajax = require("../../vendors/ajax/config");
// import miniTpl from "../vendors/mini-tpl/mini-tpl";
var miniTpl = require("../../vendors/mini-tpl/mini-tpl");
// import draw from "../vendors/drawer/drawer_m";
var draw = require("../../vendors/drawer/drawer_m");
// import quantity from "../vendors/Quantity/quantityOpt";
var quantity = require("../../vendors/Quantity/quantityOpt");

// <!-- 模板-->
// import examine from "./tpl";
var tpl = require("./tpl");
// 图片引用
// import '../../images/customs/drugBox.png';
var imgSrc = require('../../asset/images/customs/drugBox.png');
// var imgBanner = require('../../images/customs/banner.jpg');
console.log(imgSrc);
// console.log(imgBanner);
*/
// 引入组件
import ajax from '../../vendors/ajax/config';
import miniTpl from "../../vendors/mini-tpl/mini-tpl";
import draw  from "../../vendors/drawer/js/drawer_m";
import tool  from "../../vendors/Js/tool";

// 渲染模板
import tpl from "./tpl";

// require('jquery');

// const $ = require("jQuery");
// import $ from "../../vendors/jquery/jquery-1.10.2.min";



/**
 * 业务逻辑
 *
 * */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(factory);
	} else if (typeof exports === 'object') {
		// Node, CommonJS-like
		// es6 module , typescript
		var mo = factory();
		mo.__esModule = true;
		mo['default'] = mo;
		module.exports = mo;
	} else {
		// browser
		root.examine = factory();
	}
}(this, function () {

	/**
	 * 工具类
	 *
	 * */
	// 判断对象是否为空
	var isEmptyObj = function (obj) {
		if (JSON.stringify(obj) === "{}"){
			return true;
		}
		return false;
	};

	// 赋值对象
	// Json序列化克隆对象
	var deepClone = function(obj){
		return JSON.parse(JSON.stringify(obj));
	};

	// 新建对象
	function newObj(obj) {
		var datas = [];
		for (key in obj) {
			var data = {};//每次循环的时候，新建对象
			data.name = key;
			datas.push(data);
		}
		console.log(datas);
		return datas;
	};

	/**
	 * 模板
	 */
	// var _tpl = "";
	/**
	 * 数据
	 */
	// 接口参数和返回数据
	var data = {
		examine: {
			reqUrl	: "2/lancare_customhouse_interface_Tianjin/api:examination_registration",
			reqDevUrl	: "2/lancare_customhouse_interface_Tianjin/api:examination_registration",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
		submitExamine: {
			reqUrl	: "2/lancare_customhouse_interface_Tianjin/api:add_purchase_sale_item",
			reqDevUrl	: "2/lancare_customhouse_interface_Tianjin/api:add_purchase_sale_item",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
		shop_cart_batch: {
			reqUrl	: "ajax_customs_shop_cart/act:batch",
			reqDevUrl	: "ajax_customs_shop_cart/act:batch",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
		shop_cart_delall: {
			reqUrl	: "ajax_customs_shop_cart/act:delall",
			reqDevUrl	: "ajax_customs_shop_cart/act:delall",
			reqJson : "../../src/data/customs.json",
			flag		: false
		},
		cacheCustoms: "",
		routes: [],
		signArr: ['1', '2', '3'],
	};
	// 本地数据
	var global = {
		total: 0,
		price: {},
		recordEl:"",
		data: {
			vaccArr: [],
			selectArr: {},
			physicalsArr: [],
			visitsInfo: {},
		},
		signPrice: 0,
	};

	/**
	 * 页面操作（1. 插入DOM）
	 */
	// 载入预约主界面
	var loadCustoms = function (id) {
		// console.log(data.cacheCustoms);
		// console.log(data.cacheCustoms.sale_list);
		// console.log(tpl);
		// 模板替换
		var _html = miniTpl(tpl.customs, data.cacheCustoms);
		// 插入DOM
		$(".wui_wrapper").append(_html);
		// 显示底部按钮
		$(".footer").show();
		// 绑定事件
		bindEvent(id);
	};

	// 载入出入境项目
	var loadSign = function () {
		console.log(data.cacheCustoms);
		console.log(tpl);
		// 模板替换
		// var _html = miniTpl(tpl.customs, data.cacheCustoms);
		// 插入DOM
		// $(".wui_wrapper").append(_html);
		// 绑定事件
		// bindEvent();
	};

	// 载入弹出层
	var loadDraw = function (_tpl, _data, callback, n, id, sureCallback, cancelCallback) {
		// console.log(_data);
		// console.log(_tpl);
		// 显示模板
		draw({
			innerText: _tpl,
			data: _data,
			onShow: function (el) {
				// console.log("弹窗显示后触发事件");
				// 触发回调方法
				callback && callback(el);
			},
			onSure: function (el, obj) {		// 触发确认后事件
				// console.log("确认！");
				sureCallback && sureCallback(el, obj, n, id, _data);
			},
			onCancel: function (el, obj) {		// 触发取消或关闭后事件
				// console.log("取消！");
				cancelCallback && cancelCallback(el, obj);
			},
		});
	};

	// 可配置参数载入弹出层
	var loadBaseDraw = function (opts, callback) {
		// console.log(_data);
		// console.log(_tpl);
		// 显示模板
		draw({
			innerText: opts.tpl,
			data: opts.data,
			maskClose: opts.maskClose,
			onCancel: opts.onCancel,
			onShow: function (el) {
				// console.log("弹窗显示后触发事件");
				// 触发回调方法
				callback && callback(el);
			},
		});
	};

	// 载入药品列表
	var loadDrug = function (_tpl, _data) {
		// console.log(_data);
		// console.log(_tpl);
		// 渲染模板
		var _Html = miniTpl(_tpl, _data);
		// 插入HTML
		$("body").append(_Html);
		// 替换购物车图片
		if (imgSrc){
			$(".drug_box").attr("src", imgSrc);
		}

	};

	/**
	 * DOM事件绑定
	 */
	var bindEvent = function (id) {
		// 获取元素
		var $cp_select = $(".cp_list").find("li").not(".opt_drop"),
			$p_drop = $(".p_drop"),
			$appointment = $("#appointment");

		// 绑定点击下拉事件
		$p_drop.click(dropClickHand);

		// 绑定点击选中事件
		$cp_select.click(selectClickHand);

		// 根据hash进行跳转
		if (location.hash.indexOf("drug") >= 0){
			// $cp_select.eq(5).click();
		}

		// 模拟点击
		// $cp_select.eq(5).click();

		// 绑定立即预约
		$appointment.click(function () {
			appointmentHand(id, $cp_select);
		});

		// 把当前url添加到历史记录
		history.pushState(null,null,location.href);
		// 绑定后退事件
		window.addEventListener("popstate", function(e){
			if (typeof ios_app != 'undefined' && ios_app) {
				history.go(-1);
			}
			$(".drug").remove();
		}, false);

	};

	// 绑定弹出层点击事件
	var bindDrawEvent = function (el, callback) {
		// 获取元素
		var $p_select = el.find("li");

		// 绑定点击多选选中事件
		$p_select.click(function () {
			callback && callback(selectDrawClickHand(this));
		});

	};

	// 立即预约事件
	var appointmentHand = function (id, el) {
		// console.log("立即预约事件");
		// 判断是否需要预约
		if ($("[attr_related='1']").find(".iconiconfontxuanzhong4").length > 0){
			// console.log("需要预约！");
			global.related = true;
		}
		// global.related = false;
		// 需要预约时间操作
		if (global.related){
			timeHand(id);
			return;
		}
		console.log(global.data);
		// 提交预约
		submitExamine(id);

	};

	// 点击下拉事件
	var dropClickHand = function (e) {
		e.stopPropagation();
		if ($(this).hasClass("iconxiangxia")){
			// 判断是否有项目介绍
			if ($(this).hasClass("noCon")){
				return;
			}
			// 展开下拉
			$(this).removeClass("iconxiangxia").addClass("iconxiangshang");
			// todo: 相关操作
			$(this).parents(".p_item").find(".p_item_des").show();

		} else if ($(this).hasClass("iconxiangshang")){
			$(this).removeClass("iconxiangshang").addClass("iconxiangxia");
			// todo: 相关操作
			$(this).parents(".p_item").find(".p_item_des").hide();
		}
	};

	// 点击选中事件
	var selectClickHand = function (e) {
		e.stopPropagation();
		selectOpt(this);
	};

	// 弹出层点击选中事件
	var selectDrawClickHand = function (el) {
		var flag = false,
				$s_select = $(el).find(".s_select");

		if ($s_select.hasClass("iconxuanzhong")){
			$s_select.removeClass("iconxuanzhong").addClass("iconiconfontxuanzhong4");
			flag = true;
		} else {
			$s_select.removeClass("iconiconfontxuanzhong4").addClass("iconxuanzhong");
			flag = false;
		}
		return flag;
	};

	// 判断多选是否选中
	var isMulSelect = function (el, str) {
		// 获取是否选中
		var $_select = $(el).find(str);
		if ($_select.hasClass("iconiconfontxuanzhong4")){
			// console.log("移除选中！");
			$_select.removeClass("iconiconfontxuanzhong4").addClass("iconxuanzhong")
			return true;
		}
		return false;
	};

	// 判断选中操作
	var selectOpt = function (el) {
		// 获取选中id
		var _id = $(el).attr("attr_id");
		// console.log($(el).attr("attr_id"));
		switch (_id) {
			case "1":
				signHand(el);
				break;
			case "12":
				vaccHand(el);
				break;
			case "4":
				physicalsHand(el);
				break;
			case "5":
				visitsHand(el);
				break;
			case "10":
				drugHand(el);
				// matchHashHand(el);
				break;
			case "2":
				signHand(el);
				break;
			case "3":
				signHand(el);
				break;
			case "11":
				familyDoctorHand(el);
				break;
			default:
				otherHand(el);
		}
	};

	// 选中事件
	var selectHand = function (el) {
		$(el).removeClass("iconxuanzhong").addClass("iconiconfontxuanzhong4");
	};

	// 取消选中事件
	var removeSelectHand = function (el) {
		$(el).removeClass("iconiconfontxuanzhong4").addClass("iconxuanzhong");
	};

	// 选中其他项操作
	var otherHand = function (el) {
		// console.log(el);
		var sale_list = data.cacheCustoms.sale_list;
		// 获取循环编号和id
		var n = $(el).attr("attr_num"),
				id = $(el).attr("attr_id");
		// 获取是取消选中
		if (isMulSelect(el, ".p_select")) {
			// 清空价格
			// global.price.remove(data.cacheCustoms.sale_list[n].price);
			delete global.price[id];
			// 移除取消选中项
			delete global.data.selectArr[id];
			// 计算总价
			totalPrice();
			return;
		};

		// 获取价格
		global.price[id] = data.cacheCustoms.sale_list[n].price;
		// 选中该项
		selectHand($("#cp_"+id).find(".p_select"));

		// 拷贝数据
		var selectArr = deepClone(sale_list[n]);
		// 清空子数据
		selectArr.children = {};
		// 存储数据
		global.data.selectArr[id] = selectArr;

		// 计算总价
		totalPrice();

	};

	// 家庭医生事件
	var familyDoctorHand = function (el) {
		// console.log("家庭医生事件");
		var sale_list = data.cacheCustoms.sale_list;
		// 获取循环编号和id
		var n = $(el).attr("attr_num"),
			id = $(el).attr("attr_id");
		// 获取是取消选中
		if (isMulSelect(el, ".p_select")) {
			// 清空价格
			// global.price.remove(data.cacheCustoms.sale_list[n].price);
			delete global.price[id];
			// 移除取消选中项
			delete global.data.selectArr[id];
			// 计算总价
			totalPrice();
			return;
		};

		// 获取价格
		global.price[id] = data.cacheCustoms.sale_list[n].price;
		// 选中该项
		selectHand($("#cp_"+id).find(".p_select"));
		// 拷贝数据
		var selectArr = deepClone(sale_list[n]);
		// 清空子数据
		selectArr.children = {};
		// 存储数据
		global.data.selectArr[id] = selectArr;

		// 计算总价
		totalPrice();
	};

	// 出入境登记事件
	var signHand = function (el) {
		// console.log("选择预约关联登记");
		// console.log(data.cacheCustoms);
		// 获取循环编号
		var n = $(el).attr("attr_num");
		// 获取id
		var id_ = $(el).attr("attr_id");
		// 获取是取消选中
		if (isMulSelect(el, ".p_select")) {
			// 清空价格
			// global.price.vacc = 0;
			// global.price.remove(data.cacheCustoms.sale_list[n].price);
			delete global.price[id_];
			// 移除取消选中项
			delete global.data.selectArr[id_];
			// 计算总价
			totalPrice();
			// 移除关联登记信息
			$(".related_sign").text("");
			return;
		};

		console.log(data.cacheCustoms.application_complete_unregistered);
		var signData = data.cacheCustoms.application_complete_unregistered;
		// 判断是否登记
		if (!signData.list){
			// global.application_related = data.cacheCustoms.is_application_related;
			console.log(signData.string);
			console.log(signData.application_url);
			alert(signData.string);
			// 需要配置跳转去登记页面

		} else {
			// 载入登记记录
			loadDraw(tpl.signList, signData.list, function (el) {
				// 绑定事件
				bindSignHand(el, signData.is_application_related_string, signData.list, id_, n);
			});
		}
	};
	// 绑定登记列表点击事件
	var bindSignHand = function (el, txt, d, id, n) {
		// 获取登记列表
		var $s_sign = el.find("li"),				// 登记列表
				$related_sign = $(".related_sign");		// 页面文字信息展示
		// 绑定点击事件
		$s_sign.click(function () {
			// 获取登记id和循环编号
			var id_ = this.getAttribute("data-id");
			// console.log(id_);
			// console.log(d);
			// 存储选中登记信息
			global.data.application_complete_unregistered = d[id_];
			// console.log(global.data.application_complete_unregistered);
			// 更新页面显示状态
			$related_sign.text(txt);
			// 关闭弹出层
			el.remove();
			// 选中当前项目，取消其他项目登记关联
			onlySelectOpt(id, n);

			// 计算总价
			totalPrice();

		});

	};
	// 判断关联登记只能选中一个项目
	var onlySelectOpt = function (id, n) {
		var sale_list = data.cacheCustoms.sale_list;
		// 判断关联登记只能选中一个
		var k=0, len=data.signArr.length;
		for (; k<len; k++) {
			var signId = data.signArr[k];
			if (signId == id){
				// 选中套餐
				selectHand($("#cp_" + signId).find(".p_select"));
				// 存储选中信息
				// global.data.selectArr.push(sale_list[k]);
				global.data.selectArr[signId] = sale_list[k];
				// 获取价格
				// global.signPrice = sale_list[n].price;
				global.price[signId] = sale_list[n].price;
			} else {
				// 取消选中套餐
				removeSelectHand($("#cp_" + signId).find(".p_select"));
				// 删除选中信息
				// global.data.selectArr.remove(sale_list[k]);
				delete global.data.selectArr[signId];
				// 获取价格
				// global.price.remove(sale_list[n].price);
				delete global.price[signId];
			}
		}
	};

	// 预约时间事件
	var timeHand = function (id) {
		// console.log("预约时间事件");
		// console.log(data.cacheCustoms.register_list.date);
		// 获取预约时间数据
		var timeData = data.cacheCustoms.register_list.date;
		// 载入预约时间
		loadDraw(tpl.timeList, timeData, function (el) {
			// 绑定事件
			bindTimeHand(el, timeData, id);
		});
	};
	// 绑定登记列表点击事件
	var bindTimeHand = function (el, d, id) {
		// 获取登记列表
		var $s_sign = el.find("li"),				// 登记列表
			$related_sign = $(".related_sign");		// 页面文字信息展示
		// 绑定点击事件
		$s_sign.click(function () {
			// 获取登记id和循环编号
			var n = this.getAttribute("data-id");
			// console.log(n);
			// console.log(d);
			// 存储选中登记信息
			global.data.timeArr = d[n];
			// console.log(global.data.timeArr);
			console.log(global.data);
			// 提交预约
			submitExamine(id);
			// 关闭弹出层
			el.remove();
		});

	};

	// 选择接种疫苗
	var vaccHand = function (el) {
		// console.log("选择接种疫苗");
		// 获取数据编号
		var n = $(el).attr("attr_num");
		// 获取id
		var _id = $(el).attr("attr_id");
		// 获取是取消选中
		if (isMulSelect(el, ".p_select")) {
			// 清空价格
			delete global.price[_id];
			// 清空疫苗数组
			global.data.vaccArr = [];
			// 移除取消选中项
			delete global.data.selectArr[_id];
			// 更新自选药价格
			$("#cp_"+_id).find(".p_price").html("");
			// 计算总价
			totalPrice();
			return;
		};
		// 载入疫苗页面
		loadDraw(tpl.vacc, data.cacheCustoms.sale_list[n].children, function (el) {
			// 勾选已选中项
			for (var k in global.data.vaccArr){
				// 选中已选中项
				selectHand($(".select_list").find("[attr_id='"+ k +"']"));
			}

			// 显示弹出
			el.show();

			// 绑定事件
			bindDrawEvent(el, vaccOpt);

		}, n, _id, sureVaccHand, cancelVaccHand);

	};
	// 疫苗确认事件
	var sureVaccHand = function (el, obj, n, id) {
		// console.log("sureVaccHand");
		var sale_list = data.cacheCustoms.sale_list;

		// var sale_list = Object.assign({}, data.cacheCustoms.sale_list);
		// 获取所有选中项
		var $p_select = el.find(".iconiconfontxuanzhong4"), vaccPrice = 0, selectArr = [];
			// global.data.vaccArr = [];
		// 遍历选中项获取数据
		$p_select.each(function (index, Element) {
			// 存储数据
			global.data.vaccArr.push(obj.opts.data[$(this).attr("attr_id")]);
			vaccPrice += parseFloat(obj.opts.data[$(this).attr("attr_id")].price);
		});
		// console.log(global.data.vaccArr);
		// console.log(vaccPrice);
		// 页面赋值价格
		if (global.data.vaccArr.length > 0){
				// global.vaccPrice = vaccPrice.toString();
				// global.price.push(global.vaccPrice);
			global.price[id] = vaccPrice.toString();
			// 疫苗价格
			$("#cp_"+id).find(".p_price").html("<em>￥</em>"+vaccPrice.toFixed(2));
			// 选中该项
			selectHand($("#cp_"+id).find(".p_select"));
			// 拷贝数据
			var selectArr = deepClone(sale_list[n]);
			// 清空子数据
			selectArr.children = {};
			// 存储数据
			global.data.selectArr[id] = selectArr;
		} else {
			alert("请选择接种疫苗~");
			return;
		}
		// 计算总价
		totalPrice();
		// 销毁弹出层
		obj.destroyDraw(el);
	};
	// 疫苗取消事件
	var cancelVaccHand = function (el) {
		// console.log("cancelVaccHand");

	};
	// 疫苗选中操作
	var vaccOpt = function (flag) {
		if (flag) {
			// console.log("选中");
		} else {
			// console.log("取消选中");
		}
	};

	// 选择体检项目
	var physicalsHand = function (el) {
		console.log("选择体检项目");
		// 获取数据编号
		var n = $(el).attr("attr_num");
		// 获取id
		var _id = $(el).attr("attr_id");
		// 获取是取消选中
		if (isMulSelect(el, ".p_select")) {
			// 清空价格
			delete global.price[_id];
			// 清空体检项目数组
			global.data.physicalsArr = [];
			// 移除取消选中项
			delete global.data.selectArr[_id];
			// 更新自选药价格
			$("#cp_"+_id).find(".p_price").html("");
			// 计算总价
			totalPrice();
			return;
		};

		console.log(data.cacheCustoms.sale_list[n]);
		// 载入疫苗页面
		loadDraw(tpl.physicalsList, data.cacheCustoms.sale_list[n], function (el) {

			// 绑定事件
			bindDrawEvent(el, physicalOpt);
			// 绑定类别匹配事件
			$(".select_list_category dt").click(sortOpt);

		}, n, _id, surePhysicalsHand, cancelPhysicalsHand);
	};
	// 深度体检确认事件
	var surePhysicalsHand = function (el, obj, n, id) {
		// console.log("sureVaccHand");
		var sale_list = data.cacheCustoms.sale_list;

		// var sale_list = Object.assign({}, data.cacheCustoms.sale_list);
		// 获取所有选中项
		var $p_select = el.find(".iconiconfontxuanzhong4"), physicalsPrice = 0, selectArr = [];
		// global.data.vaccArr = [];
		// 遍历选中项获取数据
		$p_select.each(function (index, Element) {
			// 存储数据
			global.data.physicalsArr.push(obj.opts.data.children[$(this).attr("attr_id")]);
			physicalsPrice += parseFloat(obj.opts.data.children[$(this).attr("attr_id")].price);
		});
		// console.log(global.data.vaccArr);
		// console.log(physicalsPrice);
		// 页面赋值价格
		if (global.data.physicalsArr.length > 0){
			global.price[id] = physicalsPrice.toString();
			// 疫苗价格
			$("#cp_"+id).find(".p_price").html("<em>￥</em>"+physicalsPrice.toFixed(2));
			// 选中该项
			selectHand($("#cp_"+id).find(".p_select"));
			// 拷贝数据
			var selectArr = deepClone(sale_list[n]);
			// 清空子数据
			selectArr.children = {};
			// 存储数据
			global.data.selectArr[id] = selectArr;
		} else {
			alert("请选择体检项目~");
			return;
		}
		// 计算总价
		totalPrice();
		// 销毁弹出层
		obj.destroyDraw(el);
	};
	// 深度体检取消事件
	var cancelPhysicalsHand = function (el) {
		// console.log("cancelVaccHand");

	};
	// 深度体检选中操作
	var physicalOpt = function (flag) {
		if (flag) {
			// console.log("选中");
		} else {
			// console.log("取消选中");
		}
	};
	// 类别匹配操作
	var sortOpt = function () {
		// 获取类别
		var cur_Sort = $(this).attr("attr_sort");
		console.log(cur_Sort);
		// 选中当前项，移除其他项
		$(this).addClass("cur").siblings().removeClass("cur");
		// 隐藏所有项
		$("[attr_sex]").hide();
		// 判断选中类别并显示
		if (cur_Sort === "MALE"){
			$("[attr_sex='MALE']").show();
		} else if (cur_Sort === "FEMALE"){
			$("[attr_sex='FEMALE']").show();
		} else {
			$("[attr_sex]").show();
		}

	};

	// 请选择陪诊时间
	var visitsHand = function (el) {
		// console.log("请选择陪诊时间");
		// 获取数据编号
		var n = $(el).attr("attr_num");
		// 获取id
		var _id = $(el).attr("attr_id");
		// 获取陪诊数据
		var visitsData = data.cacheCustoms.sale_list[n];
		// console.log(visitsData);
		// 获取是取消选中
		if (isMulSelect(el, ".p_select")) {
			// 清空价格
			delete global.price[_id];
			// 清空陪诊数组
			global.data.visitsInfo = {};
			// 移除取消选中项
			delete global.data.selectArr[_id];
			// 更新自选药价格
			$("#cp_"+_id).find(".p_price").html("");
			// 计算总价
			totalPrice();
			return;
		};
		// 载入陪诊选项
		loadDraw(tpl.visitsList, visitsData, function (el) {
			// 绑定事件
			bindVisitsEvent(el, visitsData);
			// 绑定类别匹配事件
			// $(".select_list_category dt").click(sortOpt);
		}, n, _id, sureVisitsHand, cancelVisitsHand);

	};
	// 绑定弹出层点击事件
	var bindVisitsEvent = function (el, d) {
		// 获取元素
		var $p_select = el.find("li");
		// 获取默认值id
		var def_id = $p_select.eq(0).attr("data-id");
		// 获取时间范围
		var visitsTime = d.accompany_duration_minandmax;

		// 绑定点击多选选中事件
		$p_select.click(function () {
			// 当前状态设为选中
			$(this).find(".s_select").removeClass("iconxuanzhong").addClass("iconiconfontxuanzhong4");
			// 取消其他项选中状态
			$(this).siblings().find(".s_select").removeClass("iconiconfontxuanzhong4").addClass("iconxuanzhong");
			// 获取陪诊id
			var _id = $(this).attr("data-id");
			// 更新陪诊信息
			global.data.visitsInfo.cont = d.children[_id];
			// console.log(global.data.visitsInfo);
		});
		// 绑定数量事件
		quantity(document.getElementsByClassName("visit_count"), {
			isTpl: false,
			minNum: visitsTime.min,
			maxNum: visitsTime.max,
			addHandle: function (el, v) {
				el.value = v + "小时";
				global.data.visitsInfo.time = v;
			},
			cutHandle: function (el, v) {
				el.value = v + "小时";
				global.data.visitsInfo.time = v;
			},
		});

	};
	// 陪诊时间确认事件
	var sureVisitsHand = function (el, obj, n, id, d) {
		// console.log("sureVaccHand");
		var sale_list = data.cacheCustoms.sale_list;
		// 获取元素
		var $p_select = el.find("li");
		// 获取默认值id
		var def_id = $p_select.eq(0).attr("data-id");
		// 判断陪诊信息是否存在
		if (!global.data.visitsInfo.cont){
			// 获取默认陪诊信息
			global.data.visitsInfo.cont = d.children[def_id];
		}
		if (!global.data.visitsInfo.time){
			// 获取默认陪诊时间
			global.data.visitsInfo.time = d.accompany_duration_minandmax.min;
		}
		// console.log(global.data.visitsInfo);
		// 获取价格和时间
		var visitsPrice, _t = global.data.visitsInfo.time,
			_price = global.data.visitsInfo.cont.price;
		// console.log(_t, _price);
		// 计算价格
		visitsPrice = _t*_price;
		// console.log(visitsPrice);

		// 页面赋值价格
		global.price[id] = visitsPrice.toString();
		// 陪诊价格
		$("#cp_"+id).find(".p_price").html("<em>￥</em>"+visitsPrice.toFixed(2));
		// 选中该项
		selectHand($("#cp_"+id).find(".p_select"));
		// 拷贝数据
		var selectArr = deepClone(sale_list[n]);
		// 清空子数据
		selectArr.children = {};
		// 存储数据
		global.data.selectArr[id] = selectArr;
		// 计算总价
		totalPrice();
		// 销毁弹出层
		obj.destroyDraw(el);
	};
	// 陪诊时间取消事件
	var cancelVisitsHand = function (el) {
		// console.log("cancelVaccHand");

	};
	// 陪诊时间选中操作
	var visitsOpt = function (flag) {
		if (flag) {
			// console.log("选中");
		} else {
			// console.log("取消选中");
		}
	};

	// 通过HASH匹配药品列表
	var matchHashHand = function (el) {
		// 设置hash跳转和回调方法
		hashUrl("drug", function (url) {
			// 存储旧的URL
			global.oldUrl = url;
			drugHand(el);
		});
	};
	// 药品列表
	var drugHand = function (el) {
		// console.log("药品列表");
		// 获取数据编号
		var n = $(el).attr("attr_num");
		// 获取id
		var _id = $(el).attr("attr_id");
		// 获取是取消选中
		if (isMulSelect(el, ".p_select")) {
			// 清空价格
			delete global.price[_id];
			// 清空陪诊数组
			// global.data.drugInfo = {};
			// 更新自选药价格
			$("#cp_"+_id).find(".p_price").html("");
			// 移除取消选中项
			delete global.data.selectArr[_id];
			// 计算总价
			totalPrice();
			return;
		};
		// 设置hash跳转和回调方法
		// 设置hash跳转
		window.location.hash = "drug";
		// 载入药品列表
		loadDrug(tpl.drug, data.cacheCustoms.sale_list[n].children);

		// 绑定事件
		bindDrugEvent(data.cacheCustoms.sale_list[n], _id);

	};
	// 绑定药品列表点击事件
	var bindDrugEvent = function (d, id) {
		var $cat = $(".d_category").find("[data-v]"),		// 获取药品分类
			$drug_list = $(".d_list li"),		// 药品列表
			$drug_cart = $("#drug_cart"),		// 药品购物车
			$sure_drug = $("#sure_drug");		// 确认购物
		console.log(d.children);
		// 获取自选记录
		global.data.drugInfo = d.children.shop_cart;
		// 有自选记录时，更新药品数量
		if (!isEmptyObj(global.data.drugInfo.data)){
			setDrugListNum(d.children);
		}
		// 判断自选记录是否存在
		// if (isEmptyObj(global.data.drugInfo)){
		// 	global.data.drugInfo = {};
		// }
		console.log(global.data.drugInfo);
		// 触发数量加减插件
		quantity(document.getElementsByClassName("quantity_count"), {
			isTpl: false,
			minNum: 0,
			maxNum: 999,
			addHandle: function (el, v, cutEl) {
				// el.value = v + "小时";
				// console.log(cutEl);
				// 显示减号按钮
				cutEl.style.display = "block";
				// console.log(v);
				// 数量增加操作
				addDrugOpt(el, v, d.children, id);
			},
			cutHandle: function (el, v, cutEl) {
				// el.value = v + "小时";
				// 数量为0时，隐藏减号按钮
				if (v == 0){
					// 隐藏减号按钮
					cutEl.style.display = "none";
					// 输入框值为空
					el.value = "";
				}
				// 数量减少操作
				cutDrugOpt(el, v, d.children, id);
			}
		});

		// 药品类别点击事件
		$cat.click(function () {
			// 获取分类id
			var _id = $(this).attr("data-v");
			// 选中点击分类, 取消其他选中
			$(this).addClass("cur").siblings().removeClass("cur");
			// 滑动到分类对应药品列表
			$('.v_'+_id)[0].scrollIntoView(true);
		});
		// 药品购物车点击事件
		$drug_cart.click(function () {
			console.log("药品购物车点击事件");
			// 判断购物车没有商品，不触发自选记录
			if (isEmptyObj(global.data.drugInfo.data)){
				return;
			}
			// 判断自选记录已经显示
			if (global.recordEl){
				global.recordEl.remove();		// 移除自选记录
				global.recordEl = "";				// 清除自选记录标识
				return;
			}
			// console.log(data.drugArr);
			drugCartHand(global.data.drugInfo, d.children.shop_cart);
		});

		// 确认点击事件
		$sure_drug.click(function () {
			// 判断没有自选记录，不请求接口
			if (isEmptyObj(global.data.drugInfo.data)){
				alert("请选择药品！");
				// $(".drug").remove();
				return;
			}
			// 判断自选记录已经显示
			if (global.recordEl){
				global.recordEl.remove();		// 移除自选记录
				global.recordEl = "";				// 清除自选记录标识
			}
			// 请求同步自选记录接口
			customs_shop_cart(global.data.drugInfo);
			// 确认购物操作
			drugSureHand(global.data.drugInfo, id, d);
		});

		return;
		// 药品点击事件
		$drug_list.click(function () {
			// 获取药品id和类别
			var drug_n = $(this).attr("data-v"),
				cat_n = $(this).attr("data-cat");
			// 存储数据
			d.drug[cat_n].goods_list[drug_n].num = 1;
			data.drugArr.total_num = d.drug[cat_n].goods_list[drug_n].num;
			data.drugArr.total_price = d.drug[cat_n].goods_list[drug_n].price * d.drug[cat_n].goods_list[drug_n].num;
			data.drugArr.data.push(d.drug[cat_n].goods_list[drug_n]);
			console.log(data.drugArr);
			// 赋值数量和价格
			setShopCartHtml(data.drugArr);
		});

	};
	// 更新药品列表数量（多个同时更新）
	var setDrugListNum = function (d) {
		// console.log(d);
		// 获取购物车信息和药品列表信息
		var shopCat = d.shop_cart.data,
			drugList = d.drug;
		// 遍历自选药品
		for (var i in shopCat){
			// console.log(d[i]);
			// 更新指定药品数量
			setDrugNum(shopCat[i], i);
		}
	};
	// 更新指定药品数量
	var setDrugNum = function (obj, id) {
		// 更新匹配药品列表
		$(".drug_"+id).find(".text_change").val(obj.num);		// 设置数量
		$(".drug_"+id).find(".cut").show();									// 显示减号操作
		// 判断药品数量为0操作
		if (obj.num == 0){
			// 隐藏减号按钮
			$(".drug_"+id).find(".cut").hide();
			// 输入框值为空
			$(".drug_"+id).find(".text_change").val("");
		}
		// 更新药品数量
		// drugList[i].num = shopCat[i].num;
	};
	// 药品加入购物车减少数量操作
	var cutDrugOpt = function (el, v, d, id) {
		// 获取当前药品信息
		var drugArr = d.drug,
			$drug = $(el).parents("li"),	// 当前药品
			id_ = $drug.attr("data-v"),			// 药品id
			cat = $drug.attr("data-cat");		// 药品分类
		// console.log(0, $drug, 1, id_, 2, cat, 3, d, 4, v, 5, el);
		// 更新购物总数
		global.data.drugInfo.total_num -= 1;
		var n = global.data.drugInfo.total_num;
		// 获取药品价格
		var drugPrice = drugArr[cat].goods_list[id_].price;
		// 更新总价
		global.data.drugInfo.total_price = (parseFloat(global.data.drugInfo.total_price) - parseFloat(drugPrice)).toFixed(2);
		// 更新药品数量
		drugArr[cat].goods_list[id_].num = v;
		// 更新购物车信息(已存在该商品可以不更新)
		// global.data.drugInfo.data[id_] = drugArr[cat].goods_list[id_];
		// console.log(global.data.drugInfo.data[id_]);
		console.log(global.data.drugInfo);
		// 赋值数量和价格
		setShopCartHtml(global.data.drugInfo);
	};
	// 药品加入购物车增加数量操作
	var addDrugOpt = function (el, v, d, id) {
		// 获取当前药品信息
		var drugArr = d.drug,
			$drug = $(el).parents("li"),	// 当前药品
			id_ = $drug.attr("data-v"),			// 药品id
			cat = $drug.attr("data-cat");		// 药品分类
		// console.log(0, $drug, 1, id_, 2, cat, 3, d, 4, v, 5, el);
		// 更新购物总数
		global.data.drugInfo.total_num += 1;
		var n = global.data.drugInfo.total_num;
		// 获取药品价格
		var drugPrice = drugArr[cat].goods_list[id_].price;
		// 更新总价
		global.data.drugInfo.total_price = (parseFloat(drugPrice)+parseFloat(global.data.drugInfo.total_price)).toFixed(2);
		// 更新药品数量
		drugArr[cat].goods_list[id_].num = v;
		// 更新购物车信息
		global.data.drugInfo.data[id_] = drugArr[cat].goods_list[id_];
		// 判断是不是第一次添加,第一次添加新增药品信息，否则购车增加数量
		if (v == 1){
			// 拷贝数据
			var newDrugArr = deepClone(drugArr[cat].goods_list[id_]);
			// 更新购物车药品
			// global.data.drugInfo.drugArr.push(drugArr[cat].goods_list[id_]);
			// global.data.drugInfo.data[id_] = drugArr[cat].goods_list[id_];

		} else if (v > 1) {
			// 更新购物车药品
			// global.data.drugInfo.drugArr.push(drugArr[cat].goods_list[id_]);
			// global.data.drugInfo.data[id_] = drugArr[cat].goods_list[id_];
			// global.data.drugInfo.data[id_].num = drugArr[cat].goods_list[id_];
		}
		// console.log(drugArr[cat].goods_list[id_]);
		// console.log(global.data.drugInfo.data[id_]);
		console.log(global.data.drugInfo);
		// 赋值数量和价格
		setShopCartHtml(global.data.drugInfo);
	};
	// 设置页面数量和总价
	var setShopCartHtml = function (d) {
		$("#cart_count").text(d.total_num);
		$("#total_price").html("<em>￥</em>" + d.total_price);
	};
	// 药品购物车点击事件
	var drugCartHand = function (d, catData) {
		console.log(d, catData);
		// 配置插件参数
		var obj = {
			tpl: tpl.card_record,
			data: d.data,
			maskClose: true,
			onCancel: function () {
				console.log("阴影关闭");
				// 判断自选记录已经显示
				if (global.recordEl){
					global.recordEl = "";				// 清除自选记录标识
				}
			}
		};
		// 载入自选记录页面
		loadBaseDraw(obj, function (el) {
			global.recordEl = el;
			// console.log(global.recordEl);
			// 变更自选记录样式
			$(el).css("bottom", "2.2rem");
			// 添加class，设置样式
			// $(el).addClass("r_box_shadow");
			// 获取清空自选记录按钮
			var $clearRecord = $(el).find(".clear_record");
			// 绑定清除记录事件
			$clearRecord.click(function () {
				// 判断购物车
				// 请求清空自选记录接口
				clear_shop_cart(el, d);
			});
			// 触发数量加减插件
			quantity(document.getElementsByClassName("r_quantity"), {
				isTpl: false,
				minNum: 0,
				maxNum: 999,
				addHandle: function (el, v, cutEl) {
					// 数量增加操作
					addDrugCartOpt(el, v, d);
				},
				cutHandle: function (el, v, cutEl) {
					// 数量减少操作
					cutDrugCartOpt(el, v, d);
				}
			});
		});
	};
	// 自选记录药品减少数量操作
	var cutDrugCartOpt = function (el, v, d, id) {
		// 获取当前药品信息
		var drugArr = d.drug,
			$drug = $(el).parents("li"),	// 当前药品
			id_ = $drug.attr("data-v"),			// 药品id
			cat = $drug.attr("data-cat");		// 药品分类
		// 更新购物总数
		global.data.drugInfo.total_num -= 1;
		var n = global.data.drugInfo.total_num;
		// 获取药品价格
		var drugPrice = global.data.drugInfo.data[id_].price;
		// 更新总价
		global.data.drugInfo.total_price = (parseFloat(global.data.drugInfo.total_price) - parseFloat(drugPrice)).toFixed(2);
		// 更新药品数量
		global.data.drugInfo.data[id_].num -= 1;

		// 更新指定药品数量
		setDrugNum(global.data.drugInfo.data[id_], id_);

		// 判断数量为空，移除该商品
		if (v == 0){
			// 拷贝数据
			// newDrugArr = deepClone(drugArr[cat].goods_list[id_]);
			// 更新购物车药品数据
			// global.data.drugInfo.drugArr.push(drugArr[cat].goods_list[id_]);
			delete global.data.drugInfo.data[id_];
			// 移除购物车
			$drug.remove();
		}
		// console.log(global.data.drugInfo.data[id_]);
		console.log(global.data.drugInfo);
		// 判断购物车没有药品
		if (isEmptyObj(global.data.drugInfo.data) && global.recordEl){
			// console.log(global.recordEl);
			global.recordEl.remove();		// 移除自选记录
			global.recordEl = "";				// 清除自选记录标识
		}

		// 赋值数量和价格
		setShopCartHtml(global.data.drugInfo);
	};
	// 自选记录药品增加数量操作
	var addDrugCartOpt = function (el, v, d, id) {
		// 获取当前药品信息
		var drugArr = d.drug,
			$drug = $(el).parents("li"),	// 当前药品
			id_ = $drug.attr("data-v"),			// 药品id
			cat = $drug.attr("data-cat");		// 药品分类
		// 更新购物总数
		global.data.drugInfo.total_num += 1;
		var n = global.data.drugInfo.total_num;
		// 获取药品价格
		var drugPrice = global.data.drugInfo.data[id_].price;
		// 更新总价
		global.data.drugInfo.total_price = (parseFloat(drugPrice)+parseFloat(global.data.drugInfo.total_price)).toFixed(2);
		// 更新药品数量
		global.data.drugInfo.data[id_].num = v;
		// 更新指定药品数量
		setDrugNum(global.data.drugInfo.data[id_], id_);
		console.log(global.data.drugInfo);
		// 赋值数量和价格
		setShopCartHtml(global.data.drugInfo);
	};
	// 确认购物操作
	var drugSureHand = function (d, id, selectD) {
		console.log(d, id);
		$(".drug").remove();
		// 确认后计算价格，页面赋值
		// 更新药品价格
		global.price[id] = d.total_price.toString();
		// 自选药价格
		$("#cp_"+id).find(".p_price").html("<em>￥</em>"+global.price[id]);
		// 选中该项
		selectHand($("#cp_"+id).find(".p_select"));
		// 拷贝数据
		var selectArr = deepClone(selectD);
		// 清空子数据
		selectArr.children = {};
		// 存储数据
		global.data.selectArr[id] = selectArr;
		// 计算总价
		totalPrice();
		// 返回上一页
		// history.back();
		// 清空Hash
		// window.location.hash = "";
	};

	/**
	 * 计算总价（统计price里所有价钱）
	 * */
	var totalPrice = function () {
		console.log(global.price);
		global.total = 0;
		// 计算价钱
		for (var i in global.price) {
			if (tool.isString(global.price[i])){
				global.total += parseFloat(global.price[i]);
			}
		}

		// 页面赋值
		$(".foot_info").html("<span>合计:</span><em>￥</em>"+global.total.toFixed(2));
	};

	/**
	 * 请求数据
	 * @param {Function} examine 		请求初始化信息
	 */
	// 请求预约信息接口
	var examine = function (id) {
		// 请求URL
		ajax.config.url = ajax.reqUrl(data.examine, siteUrl);
		// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
		// 请求参数
		ajax.config.data = {
			user_id: id,
			application_form_context_identifier: ""
		};
		console.log(ajax.config.data);
		// 请求数据
		ajax.reqDataApi(ajax.config,function (res) {
			console.log(res);
			if (res.ResultCode == 1) {
				// console.log(res.ResultDescription);
				// 缓存数据
				data.cacheCustoms = res.Result;
				// 载入预约
				loadCustoms(id);
				// alert(res.msg);
			} else {
				console.log(res.ResultDescription);
				// alert(res.msg);
			}
		});
	};

	// 提交预约信息接口
	var submitExamine = function (id) {
		// 请求URL
		ajax.config.url = ajax.reqUrl(data.submitExamine, siteUrl);
		// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
		// 拼接请求参数
		var _obj = {
			// 登录id
			user_id: id,
			// 海关体检
			sale_list: global.data.selectArr,
			// 疫苗信息
			vaccine: global.data.vaccArr,
			// 药品信息
			drugpackage: [],
			// 海关体检
			// healthexam_all: global.data.selectArr,
			// 深度体检
			deeplyexam: global.data.physicalsArr,
			// 家庭医生
			familydoctor: [],
			// 陪诊
			accompany: global.data.visitsInfo,
			// 登记信息
			application: global.data.application_complete_unregistered,
			// 预约时间
			register:  global.data.timeArr,
		};
		console.log(_obj);
		// 对象转字符串
		// ajax.config.data = JSON.stringify(_obj);
		ajax.config.data = {
			data: JSON.stringify(_obj)
		};
		// console.log(ajax.config.data);
		// return;
		// 请求数据
		ajax.reqDataApi(ajax.config,function (res) {
			console.log(res);
			if (res.ResultCode == 1) {
				console.log(res.ResultDescription);
				alert(res.ResultDescription);
				location.href = res.Result.pay_url;
			} else {
				console.log(res.ResultDescription);
				alert(res.ResultDescription);
			}
		});
	};

	// 同步自选记录接口
	var customs_shop_cart = function (d) {
		// 请求URL
		ajax.config.url = ajax.reqUrl(data.shop_cart_batch, siteUrl);
		// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
		console.log(d.data);
		// 请求参数
		ajax.config.data = {
			shop_cart: JSON.stringify(d.data)
		};
		console.log(ajax.config.data);
		// return;
		// 请求数据
		ajax.reqDataApi(ajax.config,function (res) {
			// console.log(res);
			if (res.res == 1) {
				console.log(res.msg);
			} else {
				console.log(res.msg);
			}
		});
	};

	// 清空自选记录接口
	var clear_shop_cart = function (el, d) {
		// 请求URL
		ajax.config.url = ajax.reqUrl(data.shop_cart_delall, siteUrl);
		// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document
		// 请求参数
		ajax.config.data = {
			// shop_cart: d.data
		};
		// console.log(ajax.config.data);
		// 请求数据
		ajax.reqDataApi(ajax.config,function (res) {
			// console.log(res);
			// 判断清空是否成功
			if (res.res === 1){
				console.log(res.msg);
			} else {
				console.log(res.msg);
			}
			// 移除自选记录
			$(el).remove();
			// 清除自选记录标识
			global.recordEl = "";
			// 更新药品列表
			$(".d_list").find(".text_change").val("");
			$(".d_list").find(".cut").hide();
			// 更新购物车数据
			d.total_num = 0;
			d.total_price = 0;
			d.data = {};
			console.log(global.data.drugInfo);
			// 清空总价和数量
			setShopCartHtml(d);

		});
	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (id) {
		// console.log("初始化！！！");
		// _tpl = tpl;
		examine(id);
	};

	// 提供外部调用的参数和方法
	return init;
}));
