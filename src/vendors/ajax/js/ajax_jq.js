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
		root.ajax = factory();
	}
}(this, function () {
	/**
	 * 项目基本参数
	 * */
	var global = {};

	/**
	 * Ajax 基本参数配置
	 * @param {string} url 模板
	 * @param {string} type 模板
	 * @param {string} dataType 模板
	 * @param {Object} data 模板
	 *
	 * */
	var ajaxConfig = {
		url: '',
		type: 'POST',
		dataType: 'json',
		data: null,
	};

	/**
	 * 判断开发环境, 配置主域名domain和接口请求域名siteUrl
	 * @param {string} domain 	主域名
	 * @param {string} siteUrl 	请求域名
	 *
	 * */
	var isLocalhost = function(siteUrl, domain){
		// 初始化标记、获取当前 URL 的主域名
		var flag, hostname = location.hostname;
		// 判断全局变量是否存在domain和siteUrl
		if(typeof domain == 'undefined'){
			domain = "/";
		}
		if(typeof siteUrl == 'undefined'){
			siteUrl = "//www.lk.cn/";
		}
		// 判断是不是本地环境
		if (hostname.indexOf('localhost') != -1) {
			// 本地开发
			global.domain = domain;
			global.siteUrl = siteUrl;
			// console.log("本地开发");
			flag = true;
		} else {
			// 其他
			global.domain = domain;
			global.siteUrl = "/";
			// console.log("其他");
			flag = false;
		}
		// this.domain = global.domain;
		// console.log(global);
		return flag;
	};

	/**
	 * AJAX统一请求接口（JQ）
	 * @param {Object} obj 			Ajax 请求参数
	 * @param {function} callback Ajax 请求回调函数
	 * */
	var reqDataApi = function (obj, callback, completeCallback, errorCallback, beforeCallback) {
		$.ajax({
			url: obj.url || '',
			type: obj.type || 'post',
			dataType: obj.dataType || "json",
			data: obj.data || null,
			async: obj.async && true,
			jsonpCallback: obj.jsonpCallback || 'jQuery' + ('v1.11.1' + Math.random()).replace(/\D/g,'') + '_' + new Date().getTime(), //服务端用于接收callback调用的function名的参数
			contentType: obj.contentType || "application/x-www-form-urlencoded; charset=utf-8",
			beforeSend: function(res){
				console.log("beforeSend");
				if (beforeCallback) {
					beforeCallback(res);
				}
			},
			success: function (res) {
				console.log("success");
				if (callback) {
					callback(res);
				}
			},
			complete: function (res) {
				console.log("complete");
				if (completeCallback) {
					completeCallback(res);
				}
			},
			error: function(XMLHttpRequest,textStatus,errorThrown){
				console.log("error");
				//通常情况下textStatus和errorThrown只有其中一个包含信息
				// this;    //调用本次ajax请求时传递的options参数
				// console.log(this);
				console.log(XMLHttpRequest);
				if (errorCallback) {
					errorCallback();
				}
			}
		});
	};

	/**
	 * 配置请求接口地址（1.开发环境不同地址不同	2.本地json文件）
	 * @param {Object} obj 			data.js 配置对应接口对象
	 * @param {boolean} flag 			是否请求本地json文件,默认为false
	 * */
	var reqUrl = function(obj, siteUrl, domain) {
		var reqUrl;
		// 判断是否有数据
		if (!obj) {
			console.log("请配置数据对象！");
			return;
		}
		if (isLocalhost(siteUrl, domain)) {
			// 本地开发
			// console.log("本地开发");
			// 默认
			// if (obj.reqDevUrl)
			// 	reqUrl = global.siteUrl + obj.reqDevUrl;
			// console.log(global, domain);
			// 判断是否请求本地json文件
			if (obj.flag){
				reqUrl = obj.reqJson;
			} else if (obj.reqDevUrl && obj.reqDevUrl.indexOf("//")!=-1){
				reqUrl = obj.reqDevUrl;
			} else if (obj.reqDevUrl) {
				reqUrl = global.siteUrl + obj.reqDevUrl;
			} else {
				console.log("数据对象配置错误！");
			}
		} else {
			// 其他(非本地环境)
			// console.log("其他");
			reqUrl = '/' + obj.reqUrl;
			console.log(global);
			if (obj.reqUrl.indexOf("//")!=-1){
				reqUrl = obj.reqUrl;
			}
		}
		// console.log(global);
		return reqUrl;
	};

	// 提供外部调用的参数和方法
	return {
		isLocal						: isLocalhost,
		config						: ajaxConfig,
		reqDataApi				: reqDataApi,
		reqUrl						: reqUrl,
	};
}));
