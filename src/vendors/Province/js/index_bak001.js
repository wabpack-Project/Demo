// 配置请求参数
var InterfaceData = {
	province : {
		reqUrl	: "themes/simplicity/js/json/cache_address.json",
		reqDevUrl	: "themes/simplicity/js/json/cache_address.json",
		reqJson : "json/street.json",
		flag		: true
	},
};

// jsonp 数据存储
var jsonpData;

// 统一调用方法和赋值方法
function dataInit(Interface) {

	// 判断是请求本地json数据，请求方式设置为GET
	if (Interface.flag && ajax.isLocal()){
		// 请求方式
		ajax.config.type = "get";
	}
	ajax.config.async = false;

	// 请求URL
	// ajax.config.url = ajax.reqUrl(data.examine, siteUrl);
	ajax.config.url = ajax.reqUrl(Interface);

	console.log(ajax.config);
	// 请求data，并对数据进行处理（JQ调用方式）
	ajax.reqDataApi(ajax.config, function (res) {
		console.log(res);
		let code = res.res;
		if (code == 1) {
			// 渲染数据
			// _this.detailInfo = _this.formatDetailData(res.data);
		}
	}, function () {
		console.log("completeCallback!");
	}, function () {
		console.log("errorCallback!");
	});
};

function ajaxInit() {
	$.ajax({
		url: "json/street.json", //json文件位置
		type: "GET", //请求方式为get
		dataType: "json", //返回数据格式为json
		success: function(data) { //请求成功完成后要执行的方法
			console.log(data);
		},
		error: function (XMLHttpRequest,textStatus,errorThrown) {
			console.log("error");
			console.log(XMLHttpRequest,textStatus,errorThrown);
		},
	});
}


// jsonp回调方法
function cityJson(data) {
	console.log("jsonp数据-", data);
	jsonpData = data;
	// 操作数据
	// getData(3, data);

}

function streetJson(data) {
	console.log("jsonp数据-", data);
	jsonpData.street = data;
	// 操作数据
	// getData(3, data);
	console.log(jsonpData);

}

// 判断变量是否存在
var isUndefined = function (v) {
	if (typeof v == 'undefined')
		return true;
	else
		return false;
};

// 获取数据源
var getData = function (sourceFlag, d) {
	// 判断数据来源
	if (sourceFlag == 1) { // js引用方式
		/**
		 * 第一种通过引用js文件方式获取数据
		 * */
		// 判断数据不存在
		if(typeof cityData == "undefined"){
			console.log("未引用js文件，数据不存在~");
			return;
		}
		console.log("已引用js文件，数据完整~");
		// 省市区默认值是 cityData，需要哪个参数增加变量即可
		// 街道
		cityData.street = typeof street == "undefined" ? [] : street;
		// 社区
		cityData.village = typeof village == "undefined" ? [] : village;
		// 小区
		cityData.community = typeof community == "undefined" ? [] : community;
		console.log("js数据-", cityData);

	} else if (sourceFlag == 2) { // 本地json数据方式
		// isUndefined();
		// 请求数据
		dataInit(InterfaceData.province);

	} else if (sourceFlag == 3) {
		// jsonp 没必要处理
		cityData = d;
	}
	// return cityData;
};

var flag = 2;
// var data = getData(flag);

ajaxInit();
// console.log(data);



/*
// 判断是否有数据
if (cityData) {
	// console.log(cityData);


	// 触发省市区联动事件
	linkage("11", {

		data: cityData,

		noData: "暂无省市区数据！",
	});


} else {
	console.log("请输入联动数据！");
}
*/




















