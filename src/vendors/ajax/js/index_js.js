// 统一调用方法和赋值方法
function dataAjaxInit() {

	console.log("ajaxConfig", ajax.config);

	ajax.reqDataApi({
		type: "get",
		url: ajax.reqUrl(data.vacc_getbabylist, true),
		// jsonp: 'callback11',
		// jsonpCallback: 'jsonpCallback',
		// async : false,
		dataType: "json",
		data: {
			// child_id: "00BC0A71-AAC2-4ADD-B117-527BBAACD3A2"
		},
		beforeSend: function () {
			console.log("beforeSend");
		},
		success: function (data) {
			console.log("success");
			// console.log(res);
			console.log(data);
			// 判断返回数据不存在，或数据长度为0
			if (!data || data.length<1) return;
			for (var i=data.length-1; i>=0; i--){
				document.write("<p>"+"姓名：" + data[i].chil_name + data[i].chil_id + "</p>");
			}
		},
		error: function () {
			console.log("error");
		},
		complete: function () {
			console.log("complete");
		}
	});
};

// JSONP请求
function dataJsonpAjaxInit() {

	console.log("ajaxConfig", ajax.config);

	ajax.reqDataApi({
		type: "get",
		url: ajax.reqUrl(data.jsonp, true),
		// jsonp: 'callback11',
		jsonpCallback: 'jsonpCallback',
		// async : false,
		dataType: "jsonp",
		data: {
			// child_id: "00BC0A71-AAC2-4ADD-B117-527BBAACD3A2"
		},
		beforeSend: function () {
			console.log("beforeSend");
		},
		success: function (data) {
			console.log("success");
			// console.log(res);
			console.log(data);
			// 判断返回数据不存在，或数据长度为0
			if (!data || data.length<1) return;
			for (var i=data.length-1; i>=0; i--){
				document.write("<p>"+"姓名：" + data[i].chil_name + data[i].chil_id + "</p>");
			}
		},
		error: function () {
			console.log("error");
		},
		complete: function () {
			console.log("complete");
		}
	});
};

// 获取宝宝列表
function getBabyList() {
	// GET 无参测试通过
	ajax.reqDataApi({
		type: "get",
		url: ajax.reqUrl(data.vacc_getbabylist, true),
		// async : false,
		dataType: "html",
		data: {
			child_id: "00BC0A71-AAC2-4ADD-B117-527BBAACD3A2"
		},
		beforeSend: function () {
			console.log("beforeSend");
		},
		success: function (data) {
			console.log("success");
			// console.log(res);
			console.log(data);
			for (var i=data.length-1; i>=0; i--){
				document.write("<p>"+"姓名：" + data[i].chil_name + data[i].chil_id + "</p>");
			}
		},
		error: function () {
			console.log("error");
		},
		complete: function () {
			console.log("complete");
		}
	});
}

// 获取宝宝信息
function getBabyInfo() {
	// GET 有参测试通过
	// 设置请求Url
	ajax.config.url = ajax.reqUrl(data.vacc_getbabyinfo, true);
	// 请求方式
	ajax.config.type = "get";
	// 请求参数
	ajax.config.data = {
		child_id: "0036E9C5-076B-4D98-B89D-3AA136B00381"
	};
	// 请求data，并对数据进行处理（原生JS方式）
	ajax.reqAjaxDataApi(ajax.config,function (data) {
		console.log(data);
		if (!data) return;
		// for (var i=data.length-1; i>=0; i--){
		document.write("<p>"+"姓名：" + data.chil_name + data.groups_name + "</p>");
		// }
	});
}

// 绑定宝宝信息
function addBaby() {
	// GET 有参测试通过
	// 设置请求Url
	ajax.config.url = ajax.reqUrl(data.vacc_addbaby, true);
	// 请求方式
	// com.ajaxConfig.type = "post";
	// 请求参数
	ajax.config.data = {
		user_child_rel: "1",
		child_birthday: "2014-02-02",
		child_cardno: "0018804942",
		cityid: "120100",
		areaid: "120116",
		child_userid: "7200383",
		child_id: "00BC0A71-AAC2-4ADD-B117-527BBAACD3A2",
		child_nickname:"",
		child_headsrc:""
	};
	// 请求data，并对数据进行处理（原生JS方式）
	ajax.reqAjaxDataApi(ajax.config,function (data) {
		console.log(data);
		if (!data) return;
		if (data.res == 1){
			// for (var i=data.length-1; i>=0; i--){
			document.write("<p>"+"姓名：" + data.chil_name + data.groups_name + "</p>");
			// }
		} else {
			console.log(data.msg);
		}

	});
}

// 请求纯文本数据
function getTxtCon() {
	// GET 请求纯文本数据
	// 设置请求Url
	ajax.config.url = ajax.reqUrl(data.getTxt);
	// 请求方式
	ajax.config.type = "get";
	// 请求data，并对数据进行处理（原生JS方式）
	ajax.reqAjaxDataApi(ajax.config,function (data) {
		console.log(data);
		document.write("<p>"+"文本内容：" + data + "</p>");
	});
}

// 请求json数据
function getJsonCon() {
	// GET 请求纯文本数据
	// 设置请求Url
	ajax.config.url = ajax.reqUrl(data.getJson);
	// 请求方式
	ajax.config.type = "get";
	// 请求data，并对数据进行处理（原生JS方式）
	ajax.reqAjaxDataApi(ajax.config,function (data) {
		console.log(data);
		for (var i=data.length-1; i>=0; i--){
			document.write("<p>"+"姓名：" + data[i].chil_name + data[i].chil_id + "</p>");
		}
	});
}

// 判断本地环境配置参数
// if (com.isLocal()){
// 	console.log(com.domain);
// 	web_domain = "//www.lancare.cc/";
// 	web_siteUrl = "//m.lancare.cc/";
// }


// 自执行方法
(function init() {
	/**
	 * 原生ajax调用形式
	 * 1. GET 请求API  a. 有参		b. 无参
	 * 2. GET 请求纯文本数据
	 * */
	// console.log("初始化方法！");
	// 原生ajax
	dataAjaxInit();
	// GET 请求API有参和无参两种形式
	// getBabyList();
	// getBabyInfo();
	// GET 请求txt纯文本
	// getTxtCon();
	// GET 请求json数据
	// getJsonCon();
	// POST 请求API有参
	// addBaby();
// /*
	// ajax封装
	ajax.reqDataApi({
		url: ajax.reqUrl(data.vacc_addbaby, true),
		// async : false,
		// cache: false,
		data: {
			user_child_rel: "1",
			child_birthday: "2014-02-02",
			child_cardno: "0018804942",
			cityid: "120100",
			areaid: "120116",
			child_userid: "7200383",
			child_id: "00BC0A71-AAC2-4ADD-B117-527BBAACD3A2",
			child_nickname:"",
			child_headsrc:""
		},
		beforeSend: function (obj) {
			console.log("beforeSend", obj);
			// obj.setRequestHeader("If-Modified-Since","0");
			// obj.setRequestHeader("Cache-Control","no-cache");
		},
		success: function (res, xhr) {
			console.log("success");
			console.log(res);
			// xhr.setRequestHeader("Cache-Control","no-cache");
		},
		error: function (obj, xhr) {
			console.log("error", obj, xhr);
		},
		complete: function (obj) {
			console.log("complete", obj);

		}
	});
// */
	// console.log("原生ajax！");
}());