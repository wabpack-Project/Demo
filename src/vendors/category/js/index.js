// 配置请求参数
var InterfaceData = {
	city : {
		reqUrl	: "themes/simplicity/js/json/cache_address.json",
		reqDevUrl	: "themes/simplicity/js/json/cache_address.json",
		reqJson : "json/cache_address.json",
		flag		: true
	},
	street : {
		reqUrl	: "themes/simplicity/js/json/street.json",
		reqDevUrl	: "themes/simplicity/js/json/street.json",
		reqJson : "json/street.json",
		flag		: true
	},
	village : {
		reqUrl	: "themes/simplicity/js/json/village.json",
		reqDevUrl	: "themes/simplicity/js/json/village.json",
		reqJson : "json/village.json",
		flag		: true
	},
	community : {
		reqUrl	: "themes/simplicity/js/json/community.json",
		reqDevUrl	: "themes/simplicity/js/json/community.json",
		reqJson : "json/community.json",
		flag		: true
	},
};

// jsonp 数据存储
var jsonpData;
global = {};

// 统一调用方法和赋值方法
function reqData(config, sort, callback) {
	// console.log(config);
	// 请求data，并对数据进行处理（JQ调用方式）
	ajax.reqDataApi(config, function (res) {
		// 成功即数据正确
		// console.log(res);
		if (callback){
			global.city = res;
			callback();
		} else {
			global.city[sort] = res[sort];
		}
	}, function () {
		// console.log("completeCallback!");
	}, function () {
		// console.log("errorCallback!");
	});
};
/** 本地json请求数据 */
function getJsonData(api, sort, callback) {
	var reqConfig = {};
	// 请求方式
	reqConfig.type = "get";
	// 判断是请求本地json数据，请求方式设置为GET
	if (api.flag && ajax.isLocal()){
		// 请求方式
		reqConfig.type = "get";
	}
	// 是否异步
	// reqConfig.async = false;
	// 请求URL
	reqConfig.url = ajax.reqUrl(api);
	// 请求参数
	// reqConfig.data = {
	// 	user_id: "1",
	// };
	reqData(reqConfig, sort, callback);
}

// 触犯插件方法
function onLinkage(data, obj) {
	// 判断数据是否存在, 不触发组件
	if (!data) {
 		console.log("请还没有配置插件数据~");
 		return;
	}
	// console.log("当前城市信息：", obj);
	// console.log("城市信息：", data);
	// 输出联动数据
	var x = Object.keys(global.city);
	// console.log(x.length);
	// 判断数据不存在
	if (x.length < 1){
		return;
	}
	// 渲染数据
	linkage({
		data: global.city,
		curCityInfo: obj,
		level: 3,
		replaceTpl: function (tpl, d) {
			// console.log(tpl);
			// console.log(d);
			// 增加当前城市信息
			d = addCityInfo(obj, d);
			// 返回模板
			return miniTpl(tpl, d);
		},
		// onShow: function (el, a) {
		// 	console.log(el);
		// 	console.log(a);
		// 	var $(el).find("province").fin
		// },
		updateList: function (tpl, data) {
			// console.log(tpl);
			// console.log(data);
			return miniTpl(tpl, data);
		},
		assignmentHand: function (obj, dom) {
			// 打印联动选中信息
			// console.log(obj);
			// 赋值到对应的位置
			var parentDom = document.getElementsByClassName("city_linkage")[0];
			// 拼接城市字符串
			// console.log(getCityInfo(obj));
			// 显示赋值
			// document.getElementsByClassName("city_text")[0].innerHTML = obj.province.name + " " + obj.city.name  + " " + obj.area.name  + " " + obj.street.name  + " " + obj.village.name  + " " + obj.community.name;
			document.getElementsByClassName("city_text")[0].innerHTML = getCityInfo(obj);

			// 清空隐藏域值
			clearHiddenInputVal(parentDom, obj);
			// 隐藏域赋值
			hiddenInputAssignment(parentDom, obj);

		},
	});
}

/**
 * 城市数据拼接
 *
 * */

// 拼接省市区显示字符串
function getCityInfo(obj) {
	var str;
	// 拼接字符串
	if (obj.province){	// 省
		str = obj.province.name;
	}
	if (obj.city){	// 市
		str += " ";
		str += obj.city.name;
	}
	if (obj.area){	// 区
		str += " ";
		str += obj.area.name == "全部" ? "" : obj.area.name;
	}
	if (obj.street){	// 街道
		str += " ";
		str += obj.street.name == "全部" ? "" : obj.street.name;
	}
	if (obj.village){	// 社区
		str += " ";
		str += obj.village.name == "全部" ? "" : obj.village.name;
	}
	if (obj.community){	// 小区
		str += " ";
		str += obj.community.name == "全部" ? "" : obj.community.name;
	}
	console.log(str);
	return str;
}
// 获取初始化城市信息
function initCity(el) {
	// var obj = {
	// 	provinceId		: "210000",
	// 	provinceName	: "辽宁省",
	// 	cityId				: "210100",
	// 	cityName			: "沈阳市",
	// 	areaId				: "210102",
	// 	areaName			: "和平区",
	// };

	var obj = {
		province: {
			id				: el.getElementsByClassName("provinceId")[0].value,
			name			: el.getElementsByClassName("provinceName")[0].value,
		},
		city: {
			id				: el.getElementsByClassName("cityId")[0].value,
			name			: el.getElementsByClassName("cityName")[0].value,
		},
		area: {
			id				: el.getElementsByClassName("areaId")[0].value,
			name			: el.getElementsByClassName("areaName")[0].value,
		},
		street: {
			id				: el.getElementsByClassName("streetId")[0].value,
			name			: el.getElementsByClassName("streetName")[0].value,
		},
		village: {
			id				: el.getElementsByClassName("villageId")[0].value,
			name			: el.getElementsByClassName("villageName")[0].value,
		},
		community: {
			id				: el.getElementsByClassName("communityId")[0].value,
			name			: el.getElementsByClassName("communityName")[0].value,
		},
	};
	return obj;
}
// 增加当前城市信息
function addCityInfo(obj, d) {
	// 增加当前城市信息
	if (obj) {
		// 省
		d.provinceId = obj.province.id;
		d.provinceName = obj.province.name;
		// 市
		d.cityId = obj.city.id;
		d.cityName = obj.city.name;
		// 区
		d.areaId = obj.area.id;
		d.areaName = obj.area.name;
		// 街道
		d.streetId = obj.street.id;
		d.streetName = obj.street.name;
		// 社区
		d.villageId = obj.village.id;
		d.villageName = obj.village.name;
		// 小区
		d.communityId = obj.community.id;
		d.communityName = obj.community.name;
	} else {
		// 设置默认城市信息
		// d.provinceId = "210000";
		// d.provinceName = "辽宁省";
		// //
		// d.cityId = "210100";
		// d.cityName = "沈阳市";
		// //
		// d.areaId = "210102";
		// d.areaName = "和平区";
		//
		// d.streetId = "120000";
		// d.streetName = "天津市";
		//
		// d.villageId = "120000";
		// d.villageName = "天津市";
		//
		// d.communityId = "120000";
		// d.communityName = "天津市";
	}
	return d;
}
// 隐藏域赋值
function hiddenInputAssignment(parentDom, obj) {
	// 省
	if (obj.province) {
		parentDom.getElementsByClassName("provinceId")[0].value = obj.province.id;
		parentDom.getElementsByClassName("provinceName")[0].value = obj.province.name;
	}
	// 市
	if (obj.city) {
		parentDom.getElementsByClassName("cityId")[0].value = obj.city.id;
		parentDom.getElementsByClassName("cityName")[0].value = obj.city.name;
	}
	// 区
	if (obj.area) {
		parentDom.getElementsByClassName("areaId")[0].value = obj.area.id;
		parentDom.getElementsByClassName("areaName")[0].value = obj.area.name;
	}
	// 街道
	if (obj.street) {
		parentDom.getElementsByClassName("streetId")[0].value = obj.street.id;
		parentDom.getElementsByClassName("streetName")[0].value = obj.street.name;
	}
	// 社区
	if (obj.village) {
		parentDom.getElementsByClassName("villageId")[0].value = obj.village.id;
		parentDom.getElementsByClassName("villageName")[0].value = obj.village.name;
	}
	// 小区
	if (obj.community) {
		parentDom.getElementsByClassName("communityId")[0].value = obj.community.id;
		parentDom.getElementsByClassName("communityName")[0].value = obj.community.name;
	}
}
// 清空隐藏域值
function clearHiddenInputVal(parentDom, obj) {
	// 省
	parentDom.getElementsByClassName("provinceId")[0].value = "";
	parentDom.getElementsByClassName("provinceName")[0].value = "";
	// 市
	parentDom.getElementsByClassName("cityId")[0].value = "";
	parentDom.getElementsByClassName("cityName")[0].value = "";
	// 区
	parentDom.getElementsByClassName("areaId")[0].value = "";
	parentDom.getElementsByClassName("areaName")[0].value = "";
	// 街道
	parentDom.getElementsByClassName("streetId")[0].value = "";
	parentDom.getElementsByClassName("streetName")[0].value = "";
	// 社区
	parentDom.getElementsByClassName("villageId")[0].value = "";
	parentDom.getElementsByClassName("villageName")[0].value = "";
	// 小区
	parentDom.getElementsByClassName("communityId")[0].value = "";
	parentDom.getElementsByClassName("communityName")[0].value = "";
}

// 触发请求
// /*
getJsonData(InterfaceData.city, "", function () {
	// 街道
	getJsonData(InterfaceData.street, "street");
	// 社区
	getJsonData(InterfaceData.village, "village");
	// 小区
	getJsonData(InterfaceData.community, "community");
	console.log(global.city);

	// 延时模拟点击(不延时数据未请求完成报错)
	setTimeout(function(){
		// 模拟点击
		document.getElementsByClassName("city_linkage")[0].click();
	}, 1000);

});
// */

// 绑定联动点击事件
document.getElementsByClassName("city_linkage")[0].onclick = function () {
	//
	// 获取初始化城市信息
	var _city =  initCity(this);
	// 增加全部项
	// global.city.city = {
	//
	// }
	// 触发选择城市插件（是否传入城市信息）
	// onLinkage(global.city, _city); // 有城市信息
	onLinkage(global.city); // 无城市信息
};





















