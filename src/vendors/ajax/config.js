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
	 * AJAX统一请求接口（JQ）
	 * @param {Object} obj 			Ajax 请求参数
	 * @param {function} callback Ajax 请求回调函数
	 * */
	var reqDataApi = function (obj, callback) {
		$.ajax({
			url: obj.url,
			type: obj.type,
			dataType: obj.dataType,
			data: obj.data,
			
			success: function (data, textStatus) {
				if (callback) {
					callback(data, textStatus);
				}
			},
			complete: function (XMLHttpRequest, textStatus) {
				if (obj.complete) {
					obj.complete(XMLHttpRequest, textStatus);
				}
			},
			error: function(XMLHttpRequest,textStatus,errorThrown){
				//通常情况下textStatus和errorThrown只有其中一个包含信息
				// this;    //调用本次ajax请求时传递的options参数
				// console.log(this);
				console.log(XMLHttpRequest);
				if (obj.error) {
					obj.error(XMLHttpRequest,textStatus,errorThrown);
				}
			}
		});
	};

	/**
	 * AJAX函数封装（原生JS）
	 * @param {Object} obj 			Ajax 请求参数
	 * @param {function} callback Ajax 请求回调函数
	 * */
	var reqAjax = function (opts) {
		// 配置参数
		opts = {
			type	: (opts.type||'GET').toUpperCase(),	// ajax请求方式，GET和POST（必须大写，此处默认把小写转大写）
			url		: opts.url||"",
			async	: opts.async||true,
			data 	: opts.data||null,
			cache	: opts.cache||true,
			dataType		:	opts.dataType || "text",
			contentType	:	opts.contentType || "application/x-www-form-urlencoded",
			beforeSend	:	opts.beforeSend || function(){},
			complete		: opts.complete || function(){},
			success			:	opts.success || function(){},
			error				:	opts.error || function(){}
		};
		// 判断返回数据类型为Script时，cache为false
		if (opts.dataType === "Script"){
			opts.cache = false;
		}
		// 格式化参数
		opts.data = formatParams(opts.data);
		console.log(opts);

		//创建-第一步(创建XMLHttpRequest对象用于在后台与服务器交换数据)
		var xhr;
		//非IE6
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}else{
			//ie6及其以下版本浏览器
			xhr=ActiveXObject('Microsoft.XMLHTTP');
		}

		//连接和发送-第二步(1.设置请求	2. 发送请求)
		if(opts.type=='GET'){
			// 判断是否存在请求参数
			if (opts.data){
				opts.url = opts.url + "?" + formatParams(opts.data);
			}
			xhr.open(opts.type, opts.url, opts.async);
			xhr.send(null);
		}else if(opts.type=='POST'){
			opts.data = formatParams(opts.data);
			xhr.open(opts.type, opts.url, opts.async);
			//设置表单提交时的内容类型
			xhr.setRequestHeader("Content-Type", opts.contentType);

			xhr.send(opts.data);
		}
		// onload 事件绑定函数
		/*
		xhr.onload = function(){
			//输出一下请求返回的文本
			console.log("onload", this.responseText);
		}
		*/
		// readystatechange 事件绑定函数
		xhr.onreadystatechange = function () {
			// 判断请求是否完成(readyState == 4说明请求已完成)
			//
			if ((xhr.readyState == 4 && xhr.status == 200) || xhr.status == 304) {
				// 从服务器获得数据
				console.log(xhr.responseText);
				// 判断请求文件类型是txt文件,不是将json字符串装换成json对象
				if (opts.url.indexOf(".txt")!=-1){
					// 将文本字符串装换成json对象
					var data = this.responseText;
				} else {
					// 将json字符串装换成json对象
					var data = JSON.parse(this.responseText);
				}

				// console.log(res);
				opts.success(data);

			} else {
				console.log("Request was unsuccessful: " + xhr.status);
			}

			// if (xhr.readyState == 4) {
			// 	if(xhr.status == 200){
			// 		ajaxData.success(xhr.response)
			// 	}else{
			// 		ajaxData.error()
			// 	}
			// }

		};
	};
	/**
	 * AJAX统一请求接口（原生JS）
	 * @param {Object} obj 			Ajax 请求参数
	 * @param {function} callback Ajax 请求回调函数
	 * */
	var reqAjaxDataApi = function (obj, callback) {
		reqAjax({
			url: obj.url,
			type: obj.type,
			dataType: obj.dataType,
			data: obj.data,
			success: function (res) {
				if (callback) {
					callback(res);
				}
			},
			error: function(XMLHttpRequest,textStatus,errorThrown){
				//通常情况下textStatus和errorThrown只有其中一个包含信息
				// this;    //调用本次ajax请求时传递的options参数
				console.log(this);
				console.log(XMLHttpRequest);
			}
		});
	};

	/**
	 * 格式化参数
	 * @param {Object} data 	POST请求参数
	 * */
	var formatParams = function(data) {
		if (typeof data === "object"){
			var name, arr=[];
			for(name in data){
				arr.push(encodeURIComponent(name)+'='+encodeURIComponent(data[name]));
			}
			arr.push(('v='+Math.random()).replace('.',''));
			return arr.join('&');
		} else {
			return data;
		}

	};
	/**
	 * 格式化参数(还未确认)
	 * @param {Object} data 	POST请求参数
	 * */
	function convertData(data){
		if( typeof data === 'object' ){
			var convertResult = "" ;
			for(var c in data){
				convertResult+= c + "=" + data[c] + "&";
			}
			convertResult=convertResult.substring(0,convertResult.length-1)
			return convertResult;
		}else{
			return data;
		}
	}

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

	/**
	 * 项目开发基本配置
	 *
	 * @param {string} content 模板
	 * @param {any} data 数据
	 * @returns 渲染后的字符串
	 */
	function render(content, data) {
		data = data || {};
		var list = ['var tpl = "";'];
		var codeArr = transform(content);  // 代码分割项数组

		for (var i = 0, len = codeArr.length; i < len; i++) {
			var item = codeArr[i]; // 当前分割项

			if (item.type == 1) {  // js逻辑
				list.push(item.txt);
			}
			else if (item.type == 2) {  // js占位
				var txt = 'tpl+=' + item.txt + ';';
				list.push(txt);
			}
			else {  //文本
				var txt = 'tpl+="' +
					item.txt.replace(/"/g, '\\"') +
					'";';
				list.push(txt);
			}
		}
		list.push('return tpl;');

		return new Function('data', list.join('\n'))(data);
	}

	/**
	 * 普通文本添加到数组，对换行部分进行转义
	 *
	 * @param {Array<{type:number,txt:string}>} list
	 * @param {string} content
	 */
	function appendTxt(list, content) {
		content = content.replace(/\r?\n/g, "\\n");
		list.push({ txt: content });
	}
	// 提供外部调用的参数和方法
	return {
		global						: global,
		isLocal						: isLocalhost,
		config						: ajaxConfig,
		reqDataApi				: reqDataApi,
		reqAjaxDataApi		: reqAjaxDataApi,
		reqUrl						: reqUrl,
	};
}));
