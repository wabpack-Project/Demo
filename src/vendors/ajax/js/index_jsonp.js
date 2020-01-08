// 统一调用方法和赋值方法
function dataInit() {

	// 判断是请求本地json数据，请求方式设置为GET
	if (data.vacc_getbabylist.flag && ajax.isLocal()){
		// 请求方式
		ajax.config.type = "get";
	}

	ajax.config.async = false;

	ajax.config.dataType = "jsonp"; //数据类型为jsonp
	ajax.config.jsonpCallback = "jsonpCallback"; //服务端用于接收callback调用的function名的参数  ;

	// 请求URL
	// ajax.config.url = ajax.reqUrl(data.examine, siteUrl);
	ajax.config.url = ajax.reqUrl(data.vacc_getbabylist);
	// http://h.lk.cn/drugstore/tab:stock_adjust/adjust:output/act:del_document

	// 请求参数
	// ajax.config.data = global.reqUrlInfo;
	// console.log(ajax.config.data);

	// 请求参数  uid=2124895&tab=list
	// ajax.config.data = {
	// 	uid: id,
	// 	tab: "list"
	// };

	// 对象转字符串
	// ajax.config.data = JSON.stringify(_obj);
	// ajax.config.data = {
	// 	data: JSON.stringify(_obj)
	// };

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
	}, function () {
		console.log("beforeCallback!");
	});
};

// dataInit();
console.log(11);