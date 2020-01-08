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
	 * 工具类
	 *
	 * */
	// 对象合并
	function extend(o,n,override) {
		for(var key in n){
			if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
				o[key]=n[key];
			}
		}
		return o;
	}

	/**
	 * 生成Hash
	 * @param {Object} len 		Hash位数
	 * */
	var createHash = function(len){
		if (!len || typeof(Number(len)) != 'number') {return;}
		var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		var hs = [];
		var hl = Number(len);
		var al = ar.length;
		for (var i = 0; i < hl; i++) {
			hs.push(ar[Math.floor(Math.random() * al)]);
		}
		return hs.join('');
	};

	/**
	 * 判断数据类型
	 * @param {Object} len 		Hash位数
	 * */
	var isObjFunc = function(type) {
		var _toString = Object.prototype.toString;
		return function() {
			return _toString.call(arguments[0]) === '[object ' + type + ']'
		}
	};

	// 判断是对象
	var isObject = function() {
		return isObjFunc("Object")(arguments[0]);
	};

	/**
	 * 创建构造函数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var ajax = function (opt) {
		// 默认参数
		this.def = {
			url: '',
			type: 'post',
			async : true,
			dataType: 'json',
			jsonp:	"callback", //请求php的参数名
			jsonpCallback: "",//要执行的回调函数
			data: null,
			cache: true,
			contentType: "application/x-www-form-urlencoded",
			timeout: 99999,
			beforeSend:	function() {},
			success : function() {},
			error : function(s) {
				alert('status:' + s + 'error!');
			},
			complete : function() {},
		};
		// 合并参数
		this.opts = extend(this.def, opt,true);
		// 生成Hash
		this.hash = createHash(8);
		// console.log(this);
		// 初始化插件
		// this.init(this.opts);
	};

	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	ajax.prototype = {
		init: function (obj) {
			// console.log("init!");
			console.log(this);
			// 判断是否配置接口请求地址
			if(!obj.url) {
				console.error('请输入接口请求地址');

				return;
			}

			// 判断请求数据类型是JSONP
			if (obj.dataType === "jsonp") {
				console.log("jsonp");
				// 触发jsonp方法
				this.jsonp(obj);
				return;
			}

			// 设置请求参数
			// this.setReqOpt(this.opts);
			// 连接和发送-第二步(1.设置请求	2. 发送请求)
			if(obj.type=='get'){
				this.get(obj);
			}else if(obj.type=='post'){
				this.post(obj);
			}
			// todo: 只完成第一步，另四步待完成
		},
		// jsonp方法
		jsonp: function(obj) {
			// jsonp参数
			var jsonpObj = {}, cbName;

			// 判断是否存在请求参数
			if (obj.data){
				jsonpObj = obj.data;
			}

			// 判断是否函数是否存在
			if (obj.jsonpCallback) {
				// 配置jsonp回调参数
				// jsonpObj.jsonp = obj.jsonp;
				// jsonpObj.jsonpCallback = obj.jsonpCallback;
				jsonpObj[obj.jsonp] = obj.jsonpCallback;
				// 储存回调函数名称
				cbName = obj.jsonpCallback;
			} else {
				// 回调函数名称
				cbName = 'jQuery' + ('v1.11.1' + Math.random()).replace(/\D/g,'') + '_' + new Date().getTime();
			}

			// jsonpObj.url = obj.url + '?' + obj.jsonp + '=' + obj.jsonpCallback;
			// console.log(jsonpObj.url);

			// 配置外部调用公共方法
			window[cbName] = function (data){
				console.log(data);
				obj.success(data);
			};

			// 配置jsonp请求URL(可能需要处理格式化参数)
			obj.url = obj.url + "?" + this.formatParams(jsonpObj);
			console.log(obj.url);

			// 创建页面js请求
			this.injectElement(obj.url, "head");

		},
		// 创建页面js请求
		injectElement : function(url, inject) {
			var srcipt = document.createElement('script');
			srcipt.src = url;
			// srcipt.charset = "utf-8";
			// srcipt.type = "text/javascript";
			var _inject = document.getElementsByTagName(inject)[0];
			//处理完毕之后,删除script标签，否则多次请求，页面会存在多个script标签
			script.onload = function(){
				_inject.removeChild(srcipt);
			};
			// 插入到页面
			_inject.appendChild(srcipt);
		},
		// get方法
		get : function(obj) {
			var _this = this;
			// 创建XHR对象-第一步(创建XMLHttpRequest对象用于在后台与服务器交换数据)
			var xhr = this.createXHR();
			// console.log(xhr);

			// 连接和发送-第二步(1.设置请求	2. 发送请求)
			// 判断是否存在请求参数
			if (obj.data){
				// 若是GET请求，则将数据加到url后面
				obj.url = obj.url + "?" + this.formatParams(obj.data);
			}

			// 监听开始事件，触发后执行事件函数
			xhr.onloadstart = function(){
				// console.log('开始', obj);
				_this.opts.beforeSend(this);
			};

			// 在使用XHR对象时，必须先调用open()方法，
			// 它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
			xhr.open(obj.type, obj.url, obj.async);
			// xhr.setRequestHeader("Cache-Control","no-cache");

			// get方式则填null
			xhr.send(null);

			//  监听请求失败事件，触发后执行事件函数
			xhr.onerror = function(){
				// console.log('请求失败', obj);
				_this.opts.error(this);
			};

			// 监听请求完成事件，触发后执行事件函数
			xhr.onloadend = function(){
				// console.log('请求完成', obj);
				_this.opts.complete(this);
			};

			// 设置有效时间
			setTimeout(function(){
				if(xhr.readySate!=4){
					xhr.abort();
				}
			}, obj.timeout);

			// 判断是同步请求还是异步，执行回调
			if (obj.async) { // true表示异步，false表示同步
				// console.log("异步！");
				// 使用异步调用的时候，需要触发readystatechange 事件
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) { // 判断对象的状态是否交互完成
						_this.callBack(obj, xhr); // 回调
					}
				};
			} else { // 同步
				console.log("同步！");
				this.callBack(obj, xhr); // 回调
			}

		},
		// post方法
		post : function(obj) {
			var _this = this;
			// 创建XHR对象-第一步(创建XMLHttpRequest对象用于在后台与服务器交换数据)
			var xhr = this.createXHR();
			// console.log(xhr);
			// 连接和发送-第二步(1.设置请求	2. 发送请求)
			obj.data = this.formatParams(obj.data);

			// 监听开始事件，触发后执行事件函数
			xhr.onloadstart = function(){
				// console.log('开始', obj);
				_this.opts.beforeSend(this);
			};

			// 在使用XHR对象时，必须先调用open()方法，
			// 它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
			xhr.open(obj.type, obj.url, obj.async);
			//设置表单提交时的内容类型
			// post方式需要自己设置http的请求头，来模仿表单提交。
			// 放在open方法之后，send方法之前。
			xhr.setRequestHeader("Content-Type", obj.contentType);
			// post方式将数据放在send()方法里
			xhr.send(obj.data);

			//  监听请求失败事件，触发后执行事件函数
			xhr.onerror = function(){
				// console.log('请求失败', obj);
				_this.opts.error(this);
			};

			// 监听请求完成事件，触发后执行事件函数
			xhr.onloadend = function(){
				// console.log('请求完成', obj);
				_this.opts.complete(this);
			};

			// 设置有效时间
			setTimeout(function(){
				if(xhr.readySate!=4){
					xhr.abort();
				}
			}, obj.timeout);

			// 判断是同步请求还是异步，执行回调
			if (obj.async) { // true表示异步，false表示同步
				console.log("异步！");
				// 使用异步调用的时候，需要触发readystatechange 事件
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) { // 判断对象的状态是否交互完成
						_this.callBack(obj, xhr); // 回调
					}
				};
			} else { // 同步
				console.log("同步！");
				this.callBack(obj, xhr); // 回调
			}
		},
		// 创建异步请求对象方法
		createXHR: function () {
			if (window.XMLHttpRequest) { // IE7+、Firefox、Opera、Chrome 和Safari
				return new XMLHttpRequest();
			} else if (window.ActiveXObject) { // IE6 及以下
				var versions = ['MSXML2.XMLHttp', 'Microsoft.XMLHTTP'], i = 0, len = versions.length;
				for (; i < len; i++) {
					try {
						return new ActiveXObject(version[i]);
						break;
					} catch (e) {
						// 跳过
					}
				}
			} else {
				throw new Error('浏览器不支持XHR对象！');
			}
		},
		callBack: function (obj, xhr) {
			if (xhr.status == 200 || xhr.status == 304) { // 判断http的交互是否成功，200表示成功
				// console.log(xhr);
				// 根据数据类型返回对应的数据
				var data = this.getDataType(obj, xhr);
				obj.success(data, xhr); // 回调传递参数
				// obj.success(xhr.response);
				// console.log(JSON.parse(data));
			} else {
				// alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
				console.log('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
				obj.error(xhr);
			}
		},
		// 根据数据类型返回指定数据格式
		getDataType: function(obj, xhr) {
			var result = xhr.responseText;
			// 判断请求数据类型
			switch(obj.dataType){
				case "text":
					break;
				case "html":
					break;
				case "json":
					result = JSON.parse(result);   // 此处_data 就是你指定的数据类型
					break;
				case "xml":
					result = xhr.responseXML;
					break;
			}
			return result;
		},
		// 设置请求参数
		setReqOpt: function(obj) {
			// ajax请求方式，GET和POST（必须大写，此处默认把小写转大写）
			// ajax请求方式转成大写
			obj.type = this.convertUpperCase(obj.type);
			// 格式化请求参数
			obj.data = this.formatParams(obj.data);
			// 接口添加随机数
			obj.url = this.noCachUrl(obj.url);
		},
		// 参数转成大写
		convertUpperCase: function (opt) {
			return opt.toUpperCase();
		},
		// 给接口添加随机数， 不让浏览器缓存
		noCachUrl: function(opt) {
			// 通过使用JS随机字符串解决IE浏览器第二次默认获取缓存的问题
			return opt + '?rand=' + Math.random();
		},
		// 格式化POST请求参数
		formatParams: function(data) {
			// 判断参数是对象
			if (isObject(data)){
				var name, arr=[];
				for(name in data){
					arr.push(encodeURIComponent(name)+'='+encodeURIComponent(data[name]));
				}
				// 判断是否缓存被请求页面
				if (!this.opts.cache) {
					// 添加随机数
					arr.push(('v='+Math.random()).replace('.',''));
				}
				return arr.join('&');
			} else {
				return data;
			}
		},


	};

	/**
	 * 实例化插件
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var reqDataApi = function (opt) {
		// 实例化构造函数
		var _ajax = new ajax(opt);
		// 实例初始化
		return _ajax.init(_ajax.opts);
	};

	// GET请求
	var _get = function () {
		// 实例化构造函数
		var _ajax = new ajax(opt);
		// 实例初始化
		return _ajax.get(_ajax.opts);
	};

	// POST请求
	var _post = function () {
		// 实例化构造函数
		var _ajax = new ajax(opt);
		// 实例初始化
		return _ajax.post(_ajax.opts);
	};

	// 提供外部调用的参数和方法
	return {
		isLocal						: isLocalhost,
		config						: new ajax().opts,
		reqUrl						: reqUrl,
		reqDataApi				: reqDataApi,
		reqGetDataApi			: _get,
		reqPostDataApi		: _post,
	};
}));
