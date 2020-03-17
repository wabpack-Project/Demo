// 配置请求参数
var InterfaceData = {
	city : {
		reqUrl	: "themes/simplicity/js/json/cache_address.json",
		reqDevUrl	: "themes/simplicity/js/json/cache_address.json",
		reqJson : "json/cache_address.json",
		flag		: true
	},
	street : {
		reqUrl	: "themes/simplicity/js/json/cache_address.json",
		reqDevUrl	: "themes/simplicity/js/json/cache_address.json",
		reqJson : "json/street.json",
		flag		: true
	},
	village : {
		reqUrl	: "themes/simplicity/js/json/cache_address.json",
		reqDevUrl	: "themes/simplicity/js/json/cache_address.json",
		reqJson : "json/village.json",
		flag		: true
	},
	community : {
		reqUrl	: "themes/simplicity/js/json/cache_address.json",
		reqDevUrl	: "themes/simplicity/js/json/cache_address.json",
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

// 触犯插件方法
function onLinkage(data, obj) {
	// 判断数据是否存在, 不触发组件
	if (!data) {
 		console.log("请还没有配置插件数据~");
 		return;
	}
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
		level: 6,
		replaceTpl: function (tpl, d) {
			// console.log(tpl);
			// console.log(d);
			if (obj) {
				// 拼接省市区数据
				d.provinceId = obj.provinceId;
				d.provinceName = obj.provinceName;
				//
				d.cityId = obj.cityId;
				d.cityName = obj.cityName;
				//
				d.areaId = obj.areaId;
				d.areaName = obj.areaName;
			} else {
				// return;
				// // 拼接省市区数据
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
			console.log(obj);
			// 赋值到对应的位置
			var parentDom = document.getElementsByClassName("city_linkage")[0];
			// 显示赋值
			document.getElementsByClassName("city_text")[0].innerHTML = obj.province.name + " " + obj.city.name  + " " + obj.area.name;
			// 隐藏域赋值
			parentDom.getElementsByClassName("provinceId")[0].value = obj.province.id;
			parentDom.getElementsByClassName("provinceName")[0].value = obj.province.name;
			parentDom.getElementsByClassName("cityId")[0].value = obj.city.id;
			parentDom.getElementsByClassName("cityName")[0].value = obj.city.name;
			parentDom.getElementsByClassName("areaId")[0].value = obj.area.id;
			parentDom.getElementsByClassName("areaName")[0].value = obj.area.name;
			//
		},
	});
}

/** 本地json请求数据 */
function getJsonData(api, sort, callback) {
	var reqConfig = {};

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

// 触发请求
// /*
getJsonData(InterfaceData.city, "", function () {
	// 街道
	getJsonData(InterfaceData.street, "street");
	// 社区
	getJsonData(InterfaceData.village, "village");
	// 小区
	getJsonData(InterfaceData.community, "community");
});

// */

// 绑定联动点击事件
document.getElementsByClassName("city_linkage")[0].onclick = function () {
	// var this
	var obj = {
		provinceId		: this.getElementsByClassName("provinceId")[0].value,
		provinceName	: this.getElementsByClassName("provinceName")[0].value,
		cityId				: this.getElementsByClassName("cityId")[0].value,
		cityName			: this.getElementsByClassName("cityName")[0].value,
		areaId				: this.getElementsByClassName("areaId")[0].value,
		areaName			: this.getElementsByClassName("areaName")[0].value,
	};
	// var obj = {
	// 	provinceId		: "210000",
	// 	provinceName	: "辽宁省",
	// 	cityId				: "210100",
	// 	cityName			: "沈阳市",
	// 	areaId				: "210102",
	// 	areaName			: "和平区",
	// };
	onLinkage(global.city, obj);
	// onLinkage(global.city);
};



















