// 第一版
(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.Router = factory();
	}
})(this, function() {

	/**
	 * 工具类
	 *
	 * */
	var util = {
		// 对象合并
		extend: function (o, n, override) {
			for(var key in n){
				if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
					o[key]=n[key];
				}
			}
			return o;
		},
		// 闭包返回函数
		closure: function (name) {
			function fun(currentHash) {
				name && window[name](currentHash);
			}
			return fun;
		},
		// 生成不同的 key
		genKey: function() {
			var t = 'xxxxxxxx';
			return t.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0;
				var v = c === 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			})
		},
		//获取路由的路径和详细参数
		getParamsUrl: function() {
			var hashDeatail = location.hash.split("?"),		// 获取hash数组
					hashName = hashDeatail[0].split("#")[1], 										//路由地址
					params = hashDeatail[1] ? hashDeatail[1].split("&") : [], 	//参数内容
					query = {};
			var i = 0, len = params.length;
			for (; i < len; i++) {
				var item = params[i].split("=");
				query[item[0]] = item[1]
			}
			return {
				path: hashName,
				query: query,
				params: params
			}
		},
		// 判断元素是否有某个CLASS
		hasClass: function(elem, cls) {
			cls = cls || '';
			if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
			return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
		},
		// 给元素新增CLASS
		addClass: function(ele, cls) {
			if (!util.hasClass(ele, cls)) {
				ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
			}
		},
		// 移除元素的CLASS
		removeClass(elem, cls) {
			if (util.hasClass(elem, cls)) {
				var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
				while (newClass.indexOf(' ' + cls + ' ') >= 0) {
					newClass = newClass.replace(' ' + cls + ' ', ' ');
				}
				elem.className = newClass.replace(/^\s+|\s+$/g, '');
			}
		}
	};


	/**
	 * 创建构造函数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var _Router = function (opt) {
		/**
		 * 定义默认参数
		 * @param {Array<{type:number,txt:string}>} list
		 */
		var def =  {
			routerViewId : "#routerView",			// 路由挂载点
			pageBoxClass	: "page",						// 视图class
			curPageClass	: "current",				// 当前视图class
			animationName : "fade",						// 路由切换动画
			stackPages : true,								// 多级页面缓存
			redirectRoute : null, 						// 路由重定向的 hash
			// 路由历史
			historyFlag : "",									// 路由状态，前进，回退，刷新
			history : [], 										// 路由历史
			routerMap : [], 									// 路由映射
			routers : {}, 										//保存注册的所有路由
			// 回调方法
			beforeFun: null,									// 路由切换前回调方法
			afterFun: null,										// 路由切换后回调方法
		};
		this.def = def;
		// 合并参数
		// this.opts = util.extend(def, opt, true);
	};
	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	_Router.prototype = {
		init: function (config) {
			// console.log("初始化方法！");
			// console.log(config);
			// 合并参数
			var obj = this.opts = util.extend(this.def, config, true);
			// 获取页面设置动画效果
			this.getAnimationName(obj.routerViewId, config);
			// console.log(this.opts);
			// 判断路由映射数据不存在, 生成路由映射
			if (!obj.routerMap.length) {
				this.getRouterMap(obj.routerViewId, obj);
			}
			// 注册路由
			this.registerMapRouter(obj);
			console.log(obj.routers);
			// 事件绑定设置
			this.bindWindowEvent();
		},
		// 事件绑定设置
		bindWindowEvent : function () {
			var _this = this;
			// 初始化跳转方法
			window.linkTo = function(path) {
				console.log('path :', path);
				if (path.indexOf("?") !== -1) {
					window.location.hash = path + '&key=' + util.genKey()
				} else {
					window.location.hash = path + '?key=' + util.genKey()
				}
			};

			//页面首次加载 匹配路由
			window.addEventListener('load', function(event) {
				// console.log('load', event);
				_this.historyChange(event, _this.opts)
			}, false);

			//路由切换
			window.addEventListener('hashchange', function(event) {
				// console.log('hashchange', event);
				_this.historyChange(event, _this.opts);
			}, false);
		},
		// 路由历史纪录变化
		historyChange: function(event, obj) {
			var currentHash = util.getParamsUrl();		// 获取当前地址hash
			var nameStr = "router-" + (obj.routerViewId) + "-history";		// 拼接sessionStorage的key
			console.log(currentHash, nameStr);
			// 获取历史记录
			this.getHistory(obj, nameStr);
			// console.log(this.opts.history);
			// 设置历史记录标记
			this.setHistoryFlag(obj, currentHash);
			console.log('historyFlag :', obj.historyFlag);
			// console.log('history :', obj.history);
			// 判断多级页面缓存
			if (!obj.stackPages) {
				obj.historyFlag = 'forward';
			}
			// sessionStorage存储历史记录
			window.sessionStorage[nameStr] = JSON.stringify(obj.history);
			// 根据路由跳转URL
			this.urlChange(obj, currentHash);
		},
		// 根据路由跳转URL
		urlChange: function(obj, currentHash) {
			// 判断当前hash的路由是否已经注册
			if (obj.routers[currentHash.path]) {
				// 刷新当前页面视图
				this.refresh(currentHash, obj);
			} else {
				//不存在的地址,重定向到默认页面
				location.hash = obj.redirectRoute;
			}
		},
		refresh:function(currentHash, obj){
			var _this = this;
			if(obj.beforeFun){
				obj.beforeFun({
					to : {
						path: currentHash.path,
						query: currentHash.query
					},
					next : function(){
						// obj.routers[currentHash.path].callback.call(obj, currentHash);
						_this.changeView(currentHash, obj);
					}
				})
			}else{
				// obj.routers[currentHash.path].callback.call(obj, currentHash);
				this.changeView(currentHash, obj);
			}
		},
		// 切换页面
		changeView: function(currentHash, obj) {
			// console.log("切换视图！");
			// 获取当前hash对应的路径和视图
			var curHashObj = this.getHashAndView(currentHash, obj);
			// console.log(curHashObj);
			// 判断当前hash视图是否存在
			if (!curHashObj.currentPage){
				obj.routers[currentHash.path].callback ? obj.routers[currentHash.path].callback(currentHash) : null;
				return;
			}
			// 根据历史记录标记切换对应视图和动画
			this.gotoViewAnimation(obj, curHashObj, currentHash);
			// 判断是否有切换后方法
			obj.afterFun ? obj.afterFun(currentHash) : null;
		},
		// 根据历史记录标记切换对应视图和动画
		gotoViewAnimation : function (obj, curHashObj, currentHash) {
			// 获取切换之前的视图
			var prevPage = document.getElementsByClassName(obj.curPageClass)[0];
			console.log(prevPage);
			// 拼接进入和离开CLASS
			var enterName = 'enter-' + obj.animationName;
			var leaveName = 'leave-' + obj.animationName;
			// console.log(enterName, leaveName);
			// 判断历史记录标记，切换对应视图
			if (obj.historyFlag === 'back') {
				// console.log("后退！");
				// if (prevPage) {
				// 	util.removeClass(prevPage, obj.curPageClass);
				// }
				// util.addClass(curHashObj.currentPage, obj.curPageClass);
				// 给切换之前视图添加离开动画
				if (prevPage) {
					util.addClass(prevPage, leaveName);
				}
				setTimeout(function() {
					// 移除切换之前视图CLASS
					if (prevPage) {
						util.removeClass(prevPage, leaveName);
						util.removeClass(prevPage, obj.curPageClass);
					}
					// 当前视图添加CLASS
					util.addClass(curHashObj.currentPage, obj.curPageClass);
				}, 250);
			} else if (obj.historyFlag === 'forward' || obj.historyFlag === 'refresh') {
				// console.log("刷新和前进！");
				if (prevPage) {
					util.addClass(prevPage, obj.curPageClass);
				}
				if (curHashObj.currentPage){
					util.addClass(curHashObj.currentPage, enterName);
				}
				setTimeout(function() {
					if (prevPage) {
						util.removeClass(prevPage, obj.curPageClass);
					}
					if (curHashObj.currentPage){
						util.removeClass(curHashObj.currentPage, enterName);
						util.addClass(curHashObj.currentPage, obj.curPageClass);
					}
				}, 350);
				// 前进和刷新都执行回调 与 初始滚动位置为 0
				if (curHashObj.currentPage) {
					curHashObj.currentPage.scrollTop = 0;
				}
				obj.routers[curHashObj.currHash].callback ? obj.routers[curHashObj.currHash].callback(currentHash) : null;
			}
		},
		// 获取当前hash对应的路径和视图
		getHashAndView : function (currentHash, obj) {
			// 获取视图页面列表
			var pages = document.getElementsByClassName(obj.pageBoxClass);
			// 定义默认变量
			var curObj = {
						currentPage : null,
						currHash : null,
					},
					i = 0, len = pages.length;
			// 遍历视图列表，找出与当前hash匹配的视图
			for (; i < len; i++) {
				var page = pages[i];
				var hash = page.getAttribute('data-hash'); // 视图的hash
				// page.setAttribute('class', "page")
				if (hash === currentHash.path) {
					curObj = {
						currHash : hash,
						currentPage : page,
					}
				}
			}
			// console.log(curObj);
			return curObj;
		},
		// 设置历史记录标记
		setHistoryFlag : function (obj, currentHash) {
			// 定义后退、刷新、前进初始值
			var back = false, refresh = false, forward = false,
				index = 0,
				i = 0, len = obj.history.length;		// 历史记录长度和循环初始值
			// 遍历历史记录
			for (; i < len; i++) {
				var h = obj.history[i];
				if (h.hash === currentHash.path && h.key === currentHash.query.key) {
					index = i;
					if (i === len - 1) {
						refresh = true
					} else {
						back = true
					}
					break;
				} else {
					forward = true
				}
			}
			// 标记历史记录操作
			if (back) {
				obj.historyFlag = 'back';
				obj.history.length = index + 1
			} else if (refresh) {
				obj.historyFlag = 'refresh';
			} else {
				obj.historyFlag = 'forward';
				var item = {
					key: currentHash.query.key,
					hash: currentHash.path,
					query: currentHash.query
				};
				obj.history.push(item);
			}
		},
		// 获取历史记录
		getHistory : function (obj, id) {
			obj.history = window.sessionStorage[id] ? JSON.parse(window.sessionStorage[id]) : [];
		},
		// 路由映射注册路由
		registerMapRouter : function (obj) {
			var i = 0, len = obj.routerMap.length;
			for (; i < len; i++) {
				var router = obj.routerMap[i];
				if (router.name === "redirect") {
					obj.redirectRoute = router.path;
				} else {
					obj.redirectRoute = obj.routerMap[0].path;
				}
				// 注册单层路由
				this.registerRouter(router.path, router.callback);
				// var newPath = router.path;
				// var path = newPath.replace(/\s*/g, ""); //过滤空格
				// obj.routers[path] = {
				// 	callback: router.callback, //回调
				// }
			}
			// console.log(obj.routers);
		},
		// 单层路由注册
		registerRouter : function (path, callback) {
			var path = path.replace(/\s*/g, ""); //过滤空格
			// 判断回调函数存在，并且是函数
			if(callback && Object.prototype.toString.call(callback) === '[object Function]'){
				this.opts.routers[path] ={
					callback : callback,		//回调
					fn : null 							//存储异步文件状态
				}
			}else{
				console.trace('注册' + path + '地址需要提供正确的的注册回调')
			}
		},
		// 生成路由映射数据
		getRouterMap : function (viewId, obj) {
				var selector = viewId + " ." + obj.pageBoxClass;
				var pages = document.querySelectorAll(selector);
				var i = 0, len = pages.length;
				for (; i < len; i++) {
					var page = pages[i];
					var hash = page.getAttribute('data-hash');
					var name = hash.substr(1);
					var item = {
						path: hash,
						name: name,
						callback: util.closure(name)
					};
					obj.routerMap.push(item);
				}
				// console.log(this.opts.routerMap);
		},
		// 获取动画效果名称
		getAnimationName : function (viewId, config) {
			// 获取页面设置动画
			var animationNameHtml = document.querySelector(viewId).getAttribute('data-animationName');
			// console.log(animationNameHtml);
			// /*
			if (config && config.animationName) {
				this.opts.animationName = config.animationName;
			} else if (animationNameHtml) {
				this.opts.animationName = animationNameHtml;
			}
			// */
			// console.log(this.opts.animationName);
		},
		//切换之前的钩子
		beforeEach: function(callback) {
			if (Object.prototype.toString.call(callback) === '[object Function]') {
				this.opts.beforeFun = callback;
			} else {
				console.trace('路由切换前钩子函数不正确')
			}
		},
		//切换成功之后的钩子
		afterEach: function(callback) {
			if (Object.prototype.toString.call(callback) === '[object Function]') {
				this.opts.afterFun = callback;
			} else {
				console.trace('路由切换后回调函数不正确')
			}
		},
		//路由异步懒加载js文件
		asyncFun: function(file, transition){
			console.log("异步！");
			var _this = this;
			if(this.opts.routers[transition.path].fn){
				this.opts.afterFun && this.opts.afterFun(transition);
				this.opts.routers[transition.path].fn(transition);
			}else{
				console.log("开始异步下载js文件" + file);
				var _body = document.getElementsByTagName('body')[0];
				var scriptEle = document.createElement('script');
				scriptEle.type = 'text/javascript';
				scriptEle.src = file;
				scriptEle.async = true;
				SPA_RESOLVE_INIT = null;
				scriptEle.onload= function(){
					console.log('下载'+file+'完成');
					_this.opts.afterFun && _this.opts.afterFun(transition);
					_this.opts.routers[transition.path].fn = SPA_RESOLVE_INIT;
					_this.opts.routers[transition.path].fn(transition);
				};
				_body.appendChild(scriptEle);
			}
		},
		//同步操作
		syncFun:function(callback, transition){
			console.log("同步！");
			this.opts.afterFun && this.opts.afterFun(transition);
			callback && callback(transition);
		}
	};

	var Router = function (opt) {
		console.log("实例化！");
		return new _Router();
	};


	// 对外开放方法
	// return Router();
	// return _Router();
	return new _Router();
});