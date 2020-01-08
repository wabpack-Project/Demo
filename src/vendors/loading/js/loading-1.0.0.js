(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.loading = factory();
	}
})(this, function() {
	/**
	 * 工具类
	 *
	 * */
	// 对象合并
	function extend(o, n, override) {
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

	// 判断是函数（方法）
	var isFunction = function() {
		return isObjFunc("Function")(arguments[0]);
	};

	// 判断是字符串
	var isString = function() {
		return isObjFunc("String")(arguments[0]);
	};

	/**
	 * 字符串转DOM
	 * @param {Object} len 		Hash位数
	 * */
	var parseDom = function(str){
		var objEl = document.createElement("div");
		objEl.innerHTML = str;
		return objEl.childNodes;
	};

	/**
	 * 检测字符串是否含有html标签
	 * @param htmlStr
	 */
	function checkHtml(htmlStr) {
		var  reg = /<[^>]+>/g;
		return reg.test(htmlStr);
	}

	// 设置默认参数
	var global = {
		// 模板数组
		skin: [
			{
				css: '.loading { position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; }\n' +
					'.loading_mask { position: absolute; z-index: 5; top: 0; right: 0; bottom: 0; left: 0; opacity: 0.4; -moz-opacity: 0.4; background: #000; }\n' +
					'.loading_main { position: absolute; top: 40%; left: 50%; z-index: 10; text-align: center; -webkit-transform: translate(-50%,-50%); transform: translate(-50%,-50%); }\n' +
					'.load_text { line-height: 36px; font-size: 18px; padding-top: 10px; color: #fff; }\n' +
					'.spinner { position: relative; margin: 0 auto; width: 50px; height: 50px; }\n' +
					'.circle { width: 4px; height: 4px; border-radius: 2px; background: #fff; position: absolute; animation: spinner linear 0.8s infinite; -webkit-animation: spinner linear 0.8s infinite;\n' +
					'}\n' +
					'.circle:nth-child(1){ left: 24px; top: 2px; animation-delay:0s; }\n' +
					'.circle:nth-child(2){ left: 40px; top: 8px; animation-delay:0.1s; }\n' +
					'.circle:nth-child(3){ left: 47px; top: 24px; animation-delay:0.1s; }\n' +
					'.circle:nth-child(4){ left: 40px; top: 40px; animation-delay:0.2s; }\n' +
					'.circle:nth-child(5){ left: 24px; top: 47px; animation-delay:0.4s; }\n' +
					'.circle:nth-child(6){ left: 8px; top: 40px; animation-delay:0.5s; }\n' +
					'.circle:nth-child(7){ left: 2px; top: 24px; animation-delay:0.6s; }\n' +
					'.circle:nth-child(8){ left: 8px; top: 8px; animation-delay:0.7s; }\n' +
					'@keyframes spinner { 0%,40%,100% {transform: scale(1);} 20% {transform: scale(3);} }\n' +
					'@-webkit-keyframes spinner { 0%,40%,100% {transform: scale(1);} 20% {transform: scale(3);} }',
				tpl: '<div class="loading" >\n' +
					'  <div class="loading_main">\n' +
					'    <div class="spinner">\n' +
					'      <div class="circle"></div>\n' +
					'      <div class="circle"></div>\n' +
					'      <div class="circle"></div>\n' +
					'      <div class="circle"></div>\n' +
					'      <div class="circle"></div>\n' +
					'      <div class="circle"></div>\n' +
					'      <div class="circle"></div>\n' +
					'      <div class="circle"></div>\n' +
					'    </div>\n' +
					'    <div class="load_text">正在努力加载中...</div>\n' +
					'  </div>\n' +
					'  <div class="loading_mask"></div>\n' +
					'</div>',
			},
			{
				css: '',
				tpl: '',
			},
			{
				css: '',
				tpl: '',
			}
		],
		// 默认模板
		defSkin: {},
		// 类型
		typeArr: {
			svg_snake: {
				css: '.loading{position:absolute;top:0;left:0;right:0;bottom:0;z-index:10;width:100%;height:100%;display:flex;justify-content:center;align-items:center}.loading-mask{position:absolute;z-index:5;top:0;right:0;bottom:0;left:0}.loading-wrapper{padding:20px;border-radius:8px;background-color:rgba(0,0,0,0.7);color:#fff}.load-text{line-height:36px;font-size:16px;display:inline-block}.loading-vertical{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.loading-vertical{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex}.loading-vertical .load-text{padding-top:10px}.loading-spinner{width:32px;height:32px;position:relative;display:inline-block;max-width:100%;max-height:100%;vertical-align:middle;-webkit-animation:spinner-rotate .8s linear infinite;animation:spinner-rotate .8s linear infinite}.loading-spinner-circular{-webkit-animation-duration:2s;animation-duration:2s}.loading-circular{display:inline-block;width:100%;height:100%}.loading-circular circle{-webkit-animation:spinner-circular 1.5s ease-in-out infinite;animation:spinner-circular 1.5s ease-in-out infinite;stroke:currentColor;stroke-width:3;stroke-linecap:round}@-webkit-keyframes spinner-circular{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-40}100%{stroke-dasharray:90,150;stroke-dashoffset:-120}}@keyframes spinner-circular{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-40}100%{stroke-dasharray:90,150;stroke-dashoffset:-120}}@-webkit-keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}',
				tpl: '<div class="loading-spinner loading-spinner-circular">\n' +
					'      <svg viewBox="25 25 50 50" class="loading-circular"><circle cx="50" cy="50" r="20" fill="none"></circle></svg>\n' +
					'    </div>',
			},
			snake: {
				css: '.loading{position:absolute;top:0;left:0;right:0;bottom:0;z-index:10;width:100%;height:100%;display:flex;justify-content:center;align-items:center}.loading-wrapper{padding:20px;border-radius:8px;background-color:rgba(0,0,0,0.7)}.load-text{line-height:36px;font-size:18px;color:#fff;display:inline-block;vertical-align:top;padding:0 0 0 5px}.loading-vertical{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.loading-vertical{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex}.loading-vertical .load-text{padding:10px 0 0 0}.loading-spinner{display:inline-block}.loading-spinner .spinner-snake{height:32px;width:32px}.spinner-snake{-webkit-animation:spinner-rotate .8s infinite linear;animation:spinner-rotate .8s infinite linear;border:4px solid transparent;border-radius:50%;border-top-color:#ccc;border-left-color:#ccc;border-bottom-color:#ccc}@-webkit-keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}',
				tpl: '<div class="loading-spinner">\n' +
					'      <div class="spinner-snake" ></div>\n' +
					'    </div>',
			},
			spinner: {
				css: '.loading{position:absolute;top:0;left:0;right:0;bottom:0;z-index:10;width:100%;height:100%}.loading-mask{position:absolute;z-index:5;top:0;right:0;bottom:0;left:0}.loading-wrapper{position:absolute;top:40%;left:50%;z-index:10;padding:20px;border-radius:8px;text-align:center;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:rgba(0,0,0,0.7)}.load-text{line-height:36px;font-size:18px;padding-top:10px;color:#fff}.loading-spinner{position:relative;margin:0 auto;width:57px;height:57px}.spin{width:8px;height:8px;border-radius:4px;background:#fff;box-shadow:rgba(0,0,0,0.1) 0 0 1px;position:absolute;animation:spinner-fade linear .8s infinite;-webkit-animation:spinner-fade linear .8s infinite}.spin:nth-child(1){left:24px;top:2px;-webkit-animation-delay:.125s;animation-delay:.125s}.spin:nth-child(2){left:40px;top:8px;-webkit-animation-delay:.25s;animation-delay:.25s}.spin:nth-child(3){left:47px;top:24px;-webkit-animation-delay:.375s;animation-delay:.375s}.spin:nth-child(4){left:40px;top:40px;-webkit-animation-delay:.5s;animation-delay:.5s}.spin:nth-child(5){left:24px;top:47px;-webkit-animation-delay:.625s;animation-delay:.625s}.spin:nth-child(6){left:8px;top:40px;-webkit-animation-delay:.75s;animation-delay:.75s}.spin:nth-child(7){left:2px;top:24px;-webkit-animation-delay:.875s;animation-delay:.875s}.spin:nth-child(8){left:8px;top:8px;-webkit-animation-delay:1s;animation-delay:1s}@-webkit-keyframes spinner-fade{0%{opacity:.85}50%{opacity:.25}to{opacity:.25}}@keyframes spinner-fade{0%{opacity:.85}50%{opacity:.25}to{opacity:.25}}',
				tpl: '<div class="loading-spinner">\n' +
					'      <div class="spinner">\n' +
					'        <div class="spin"></div>\n' +
					'        <div class="spin"></div>\n' +
					'        <div class="spin"></div>\n' +
					'        <div class="spin"></div>\n' +
					'        <div class="spin"></div>\n' +
					'        <div class="spin"></div>\n' +
					'        <div class="spin"></div>\n' +
					'        <div class="spin"></div>\n' +
					'      </div>\n' +
					'    </div>',
			},
			fading_circle: {
				css: '.loading{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%}.loading-mask{position:absolute;z-index:5;top:0;right:0;bottom:0;left:0}.loading-wrapper{position:absolute;top:40%;left:50%;z-index:10;padding:20px;border-radius:8px;opacity:.4;-moz-opacity:.4;background:#000;text-align:center;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.load-text{line-height:36px;font-size:18px;padding-top:10px;color:#fff}.loading-spinner{position:relative;margin:0 auto;width:32px;height:32px}.circle-color-46>div::before{background-color:#ccc}.fading-circle{width:100%;height:100%;top:0;left:0;position:absolute}.fading-circle::before{content:" ";display:block;margin:0 auto;width:15%;height:15%;border-radius:100%;-webkit-animation:fading-circle 1.2s infinite ease-in-out both;animation:fading-circle 1.2s infinite ease-in-out both}.fading-circle.is-circle2{-webkit-transform:rotate(30deg);transform:rotate(30deg)}.fading-circle.is-circle2::before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.fading-circle.is-circle3{-webkit-transform:rotate(60deg);transform:rotate(60deg)}.fading-circle.is-circle3::before{-webkit-animation-delay:-1s;animation-delay:-1s}.fading-circle.is-circle4{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.fading-circle.is-circle4::before{-webkit-animation-delay:-0.9s;animation-delay:-0.9s}.fading-circle.is-circle5{-webkit-transform:rotate(120deg);transform:rotate(120deg)}.fading-circle.is-circle5::before{-webkit-animation-delay:-0.8s;animation-delay:-0.8s}.fading-circle.is-circle6{-webkit-transform:rotate(150deg);transform:rotate(150deg)}.fading-circle.is-circle6::before{-webkit-animation-delay:-0.7s;animation-delay:-0.7s}.fading-circle.is-circle7{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.fading-circle.is-circle7::before{-webkit-animation-delay:-0.6s;animation-delay:-0.6s}.fading-circle.is-circle8{-webkit-transform:rotate(210deg);transform:rotate(210deg)}.fading-circle.is-circle8::before{-webkit-animation-delay:-0.5s;animation-delay:-0.5s}.fading-circle.is-circle9{-webkit-transform:rotate(240deg);transform:rotate(240deg)}.fading-circle.is-circle9::before{-webkit-animation-delay:-0.4s;animation-delay:-0.4s}.fading-circle.is-circle10{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.fading-circle.is-circle10::before{-webkit-animation-delay:-0.3s;animation-delay:-0.3s}.fading-circle.is-circle11{-webkit-transform:rotate(300deg);transform:rotate(300deg)}.fading-circle.is-circle11::before{-webkit-animation-delay:-0.2s;animation-delay:-0.2s}.fading-circle.is-circle12{-webkit-transform:rotate(330deg);transform:rotate(330deg)}.fading-circle.is-circle12::before{-webkit-animation-delay:-0.1s;animation-delay:-0.1s}@-webkit-keyframes fading-circle{0%,39%,100%{opacity:0}40%{opacity:1}}@keyframes fading-circle{0%,39%,100%{opacity:0}40%{opacity:1}}',
				tpl: '<div class="loading-spinner">\n' +
					'      <div class="spinner-fading-circle circle-color-46" >\n' +
					'        <div class="fading-circle is-circle2"></div>\n' +
					'        <div class="fading-circle is-circle3"></div>\n' +
					'        <div class="fading-circle is-circle4"></div>\n' +
					'        <div class="fading-circle is-circle5"></div>\n' +
					'        <div class="fading-circle is-circle6"></div>\n' +
					'        <div class="fading-circle is-circle7"></div>\n' +
					'        <div class="fading-circle is-circle8"></div>\n' +
					'        <div class="fading-circle is-circle9"></div>\n' +
					'        <div class="fading-circle is-circle10"></div>\n' +
					'        <div class="fading-circle is-circle11"></div>\n' +
					'        <div class="fading-circle is-circle12"></div>\n' +
					'        <div class="fading-circle is-circle13"></div>\n' +
					'      </div>\n' +
					'    </div>',
			},
			fading_bar: {
				css: '.loading{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center}.loading-mask{position:absolute;z-index:5;top:0;right:0;bottom:0;left:0}.loading-wrapper{margin-bottom:150px;padding:20px;border-radius:8px;background-color:rgba(0,0,0,0.7);text-align:center}.load-text{line-height:36px;font-size:18px;color:#fff;display:inline-block;padding-top:10px}.loading-vertical{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.loading-vertical{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex}.loading-vertical .load-text{padding-top:10px}.loading-spinner{position:relative;display:inline-block;width:32px;max-width:100%;height:32px;max-height:100%;color:#fff;vertical-align:middle;-webkit-animation:spinner-rotate .8s linear infinite;animation:spinner-rotate .8s linear infinite}.loading-spinner{-webkit-animation-timing-function:steps(12);animation-timing-function:steps(12)}.fading-bar i{position:absolute;top:0;left:0;width:100%;height:100%}.fading-bar i::before{display:block;width:2px;height:25%;margin:0 auto;background-color:currentColor;border-radius:40%;content:\' \'}.fading-bar i:nth-of-type(1){-webkit-transform:rotate(30deg);transform:rotate(30deg);opacity:1}.fading-bar i:nth-of-type(2){-webkit-transform:rotate(60deg);transform:rotate(60deg);opacity:.9375}.fading-bar i:nth-of-type(3){-webkit-transform:rotate(90deg);transform:rotate(90deg);opacity:.875}.fading-bar i:nth-of-type(4){-webkit-transform:rotate(120deg);transform:rotate(120deg);opacity:.8125}.fading-bar i:nth-of-type(5){-webkit-transform:rotate(150deg);transform:rotate(150deg);opacity:.75}.fading-bar i:nth-of-type(6){-webkit-transform:rotate(180deg);transform:rotate(180deg);opacity:.6875}.fading-bar i:nth-of-type(7){-webkit-transform:rotate(210deg);transform:rotate(210deg);opacity:.625}.fading-bar i:nth-of-type(8){-webkit-transform:rotate(240deg);transform:rotate(240deg);opacity:.5625}.fading-bar i:nth-of-type(9){-webkit-transform:rotate(270deg);transform:rotate(270deg);opacity:.5}.fading-bar i:nth-of-type(10){-webkit-transform:rotate(300deg);transform:rotate(300deg);opacity:.4375}.fading-bar i:nth-of-type(11){-webkit-transform:rotate(330deg);transform:rotate(330deg);opacity:.375}.fading-bar i:nth-of-type(12){-webkit-transform:rotate(360deg);transform:rotate(360deg);opacity:.3125}@-webkit-keyframes spinner-rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}',
				tpl: '<div class="loading-spinner">\n' +
					'      <div class="fading-bar">\n' +
					'        <i></i>\n' +
					'        <i></i>\n' +
					'        <i></i>\n' +
					'        <i></i>\n' +
					'        <i></i>\n' +
					'        <i></i>\n' +
					'        <i></i>\n' +
					'        <i></i>\n' +
					'        <i></i>\n' +
					'        <i></i>\n' +
					'        <i></i>\n' +
					'        <i></i>\n' +
					'      </div>\n' +
					'    </div>',
			},
			svg_bar: {
				css: '.loading{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center}.loading-mask{position:absolute;z-index:5;top:0;right:0;bottom:0;left:0}.loading-wrapper{margin-bottom:150px;padding:20px;border-radius:8px;background-color:rgba(0,0,0,0.7);text-align:center}.load-text{line-height:36px;font-size:18px;color:#fff;display:inline-block;vertical-align:top}.loading-vertical{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.loading-vertical{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex}.loading-vertical .load-text{padding-top:10px}.loading-spinner{display:inline-block;width:2rem;height:2rem;-webkit-transform-origin:50%;transform-origin:50%;-webkit-animation:preloader-spin 1s steps(12,end) infinite;animation:preloader-spin 1s steps(12,end) infinite}.preloader{width:100%;height:100%}.preloader:after{display:block;content:"";width:100%;height:100%;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D\'0%200%20120%20120\'%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20xmlns%3Axlink%3D\'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink\'%3E%3Cdefs%3E%3Cline%20id%3D\'l\'%20x1%3D\'60\'%20x2%3D\'60\'%20y1%3D\'7\'%20y2%3D\'27\'%20stroke%3D\'%236c6c6c\'%20stroke-width%3D\'11\'%20stroke-linecap%3D\'round\'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(30%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(60%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(90%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(120%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(150%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.37\'%20transform%3D\'rotate(180%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.46\'%20transform%3D\'rotate(210%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.56\'%20transform%3D\'rotate(240%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.66\'%20transform%3D\'rotate(270%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.75\'%20transform%3D\'rotate(300%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.85\'%20transform%3D\'rotate(330%2060%2C60)\'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");background-position:50%;background-size:100%;background-repeat:no-repeat}.preloader-white:after{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D\'0%200%20120%20120\'%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20xmlns%3Axlink%3D\'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink\'%3E%3Cdefs%3E%3Cline%20id%3D\'l\'%20x1%3D\'60\'%20x2%3D\'60\'%20y1%3D\'7\'%20y2%3D\'27\'%20stroke%3D\'%23fff\'%20stroke-width%3D\'11\'%20stroke-linecap%3D\'round\'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(30%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(60%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(90%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(120%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.27\'%20transform%3D\'rotate(150%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.37\'%20transform%3D\'rotate(180%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.46\'%20transform%3D\'rotate(210%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.56\'%20transform%3D\'rotate(240%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.66\'%20transform%3D\'rotate(270%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.75\'%20transform%3D\'rotate(300%2060%2C60)\'%2F%3E%3Cuse%20xlink%3Ahref%3D\'%23l\'%20opacity%3D\'.85\'%20transform%3D\'rotate(330%2060%2C60)\'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")}@-webkit-keyframes preloader-spin{100%{-webkit-transform:rotate(360deg)}}@keyframes preloader-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}',
				tpl: '<div class="loading-spinner">\n' +
					'      <div class="preloader preloader-white"></div>\n' +
					'    </div>',
			},
			svg_bar1: {
				css: '.loading{position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center}.loading-mask{position:absolute;z-index:5;top:0;right:0;bottom:0;left:0}.loading-wrapper{margin-bottom:150px;padding:20px;border-radius:8px;background-color:rgba(0,0,0,0.7);text-align:center}.load-text{line-height:36px;font-size:18px;color:#fff;display:inline-block;vertical-align:top}.loading-vertical{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.loading-vertical{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex}.loading-vertical .load-text{padding-top:10px}.loading-spinner{display:inline-block;width:32px;height:32px;-webkit-transform-origin:50%;transform-origin:50%;-webkit-animation:spinner-spin 1s step-end infinite;animation:spinner-spin 1s step-end infinite}.mui-spinner{width:100%;height:100%}.mui-spinner:after{display:block;width:100%;height:100%;content:\'\';background-image:url(\'data:image/svg+xml;charset=utf-8,<svg viewBox=\\\'0 0 120 120\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' xmlns:xlink=\\\'http://www.w3.org/1999/xlink\\\'><defs><line id=\\\'l\\\' x1=\\\'60\\\' x2=\\\'60\\\' y1=\\\'7\\\' y2=\\\'27\\\' stroke=\\\'%236c6c6c\\\' stroke-width=\\\'11\\\' stroke-linecap=\\\'round\\\'/></defs><g><use xlink:href=\\\'%23l\\\' opacity=\\\'.27\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.27\\\' transform=\\\'rotate(30 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.27\\\' transform=\\\'rotate(60 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.27\\\' transform=\\\'rotate(90 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.27\\\' transform=\\\'rotate(120 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.27\\\' transform=\\\'rotate(150 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.37\\\' transform=\\\'rotate(180 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.46\\\' transform=\\\'rotate(210 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.56\\\' transform=\\\'rotate(240 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.66\\\' transform=\\\'rotate(270 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.75\\\' transform=\\\'rotate(300 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.85\\\' transform=\\\'rotate(330 60,60)\\\'/></g></svg>\');background-repeat:no-repeat;background-position:50%;background-size:100%}.mui-spinner-white:after{background-image:url(\'data:image/svg+xml;charset=utf-8,<svg viewBox=\\\'0 0 120 120\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' xmlns:xlink=\\\'http://www.w3.org/1999/xlink\\\'><defs><line id=\\\'l\\\' x1=\\\'60\\\' x2=\\\'60\\\' y1=\\\'7\\\' y2=\\\'27\\\' stroke=\\\'%23fff\\\' stroke-width=\\\'11\\\' stroke-linecap=\\\'round\\\'/></defs><g><use xlink:href=\\\'%23l\\\' opacity=\\\'.27\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.27\\\' transform=\\\'rotate(30 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.27\\\' transform=\\\'rotate(60 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.27\\\' transform=\\\'rotate(90 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.27\\\' transform=\\\'rotate(120 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.27\\\' transform=\\\'rotate(150 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.37\\\' transform=\\\'rotate(180 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.46\\\' transform=\\\'rotate(210 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.56\\\' transform=\\\'rotate(240 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.66\\\' transform=\\\'rotate(270 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.75\\\' transform=\\\'rotate(300 60,60)\\\'/><use xlink:href=\\\'%23l\\\' opacity=\\\'.85\\\' transform=\\\'rotate(330 60,60)\\\'/></g></svg>\')}@-webkit-keyframes spinner-spin{0%{-webkit-transform:rotate(0deg)}8.33333333%{-webkit-transform:rotate(30deg)}16.66666667%{-webkit-transform:rotate(60deg)}25%{-webkit-transform:rotate(90deg)}33.33333333%{-webkit-transform:rotate(120deg)}41.66666667%{-webkit-transform:rotate(150deg)}50%{-webkit-transform:rotate(180deg)}58.33333333%{-webkit-transform:rotate(210deg)}66.66666667%{-webkit-transform:rotate(240deg)}75%{-webkit-transform:rotate(270deg)}83.33333333%{-webkit-transform:rotate(300deg)}91.66666667%{-webkit-transform:rotate(330deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes spinner-spin{0%{transform:rotate(0deg)}8.33333333%{transform:rotate(30deg)}16.66666667%{transform:rotate(60deg)}25%{transform:rotate(90deg)}33.33333333%{transform:rotate(120deg)}41.66666667%{transform:rotate(150deg)}50%{transform:rotate(180deg)}58.33333333%{transform:rotate(210deg)}66.66666667%{transform:rotate(240deg)}75%{transform:rotate(270deg)}83.33333333%{transform:rotate(300deg)}91.66666667%{transform:rotate(330deg)}100%{transform:rotate(360deg)}}',
				tpl: '<div class="loading-spinner">\n' +
					'      <div class="mui-spinner mui-spinner-white"></div>\n' +
					'    </div>',
			},
			spinner4: {
				css: '',
				tpl: '',
			},
		}
	};

	/**
	 * 构造函数私有方法
	 * @param {Object} len 		Hash位数
	 * */
	/**  */
	// 获取DOM元素，并设置DOM属性
	var getTpl = function (type, tpl, obj) {
			// 定义变量
			var _html;
			// 判断是否有自定义模板
			if (!tpl){		// 自定义模板不存在，使用指定类型模板
				// 获取默认模块模板
				_html = getDefType(type);
				// 标记使用默认模板
				global.isDef = true;
			} else if (isFunction(tpl)) {	// 数据替换html变量生成模板
				// 渲染模板
				_html = tpl();
			} else if (isString(tpl)) {	// 字符串模板
				// tpl存在，检测不是html字符串
				if (checkHtml(tpl)) {
					_html = tpl;
				} else {
					// tplCallback不是html字符串，把tplCallback设为标题
					// global.tit = tpl;
					obj.tit = tpl;
					// 获取默认模块模板
					_html = getDefType(type);
					// 标记使用默认模板
					global.isDef = true;
				}
			}
			return _html;

			// console.log(_html);
			// 模板转换成DOM, 并返回DOM
			// return parseDom(_html)[0];
		};
	// 获取默认模块
	var getDefSkin = function (skin) {
		// 匹配模板皮肤
		switch(skin) {
			case 0:
				global.defSkin = global.skin[skin];
				break;
			case 1:
				global.defSkin = global.skin[skin];
				break;
			case 2:
				global.defSkin = global.skin[skin];
				break;
			default:
				global.defSkin = global.skin[0];
		}
		return global.defSkin.tpl;
	};

	/**  */
	// 获取加载中类型模板
	var getTypeTpl = function (type, tpl, obj) {
		// 定义变量
		var _tpl;
		// 判断是否有自定义模板
		if (!tpl){		// 自定义模板不存在，使用指定类型模板
			// 获取默认模块模板
			_tpl = getDefTypeTpl(type, obj);
			// obj.text = "正在加载数据。。。";
			// 标记使用默认模板
			global.isDef = true;
		} else if (isFunction(tpl)) {	// 数据替换html变量生成模板
			// 渲染模板
			_tpl = tpl();
		} else if (isString(tpl)) {	// 字符串模板
			// tpl存在，检测不是html字符串
			if (checkHtml(tpl)) {
				_tpl = tpl;
			} else {
				// tplCallback不是html字符串，把tplCallback设为标题
				// global.tit = tpl;
				obj.text = tpl;
				// 获取默认模块模板
				_tpl = getDefTypeTpl(type, obj);
				// 标记使用默认模板
				global.isDef = true;
			}
		}
		return _tpl;
	};
	// 获取文字模板
	var getTextTpl = function (text, size, sty) {
		// 定义变量
		var _html = '<div class="load-text" >' + text + '</div>';
		return _html;
	};
	// 获取MASK模板
	var getMaskTpl = function (sty) {
		// 定义变量
		var _html = '<div class="loading-mask"></div>';
		if (!!sty){
			_html = '<div class="loading-mask" style="' + sty + '"></div>';
		}
		return _html;
	};
	// 获取默认加载中类型
	var getDefTypeTpl = function (type, obj) {
		// 匹配模板皮肤
		switch(type) {
			case "snake":
				// 圆圈加载
				global.defType = global.typeArr[type];
				break;
			case "svg_snake":
				// svg圆圈加载
				global.defType = global.typeArr[type];
				break;
			case "spinner":
				// 8个小圆加载中（IE使用，不能设置加载器大小）
				obj.size = "";
				global.defType = global.typeArr[type];
				break;
			case "fading_circle":
				// 渐消多圆加载
				global.defType = global.typeArr[type];
				break;
			case "fading_bar":
				// 渐消多长条加载
				global.defType = global.typeArr[type];
				break;
			case "svg_bar":
				// 渐消多长条加载
				global.defType = global.typeArr[type];
				break;
			case "svg_bar1":
				// 渐消多长条加载
				global.defType = global.typeArr[type];
				break;
			default:
				global.defType = global.typeArr[0];
		}
		return global.defType.tpl;
	};
	// 匹配展示类型
	var getShowTypeTpl = function (type, tpl, textTpl, maksTpl) {
		var _html;
		// 设置文字默认值和MASK默认值
		// textTpl = textTpl || "";
		// maksTpl = maksTpl || "";
		// 循环判断
		switch (type) {
			case "popup":
				_html = popUpTpl(tpl, textTpl, maksTpl);
				break;
			case "button":
				_html = buttonTpl(tpl, textTpl);
				break;
			default:
				_html = popUpTpl(tpl, textTpl, maksTpl);
				break;
		}
		return _html;
	};

	/**  */
	// 按钮加载中模板
	var buttonTpl = function (tpl, textTpl) {
		// console.log("button");
		var _html = '<div>\n' +
			'  '+ tpl +'\n' +
			'  '+ textTpl +'\n' +
			'</div>';
		return _html;
	};
	// 弹框加载中模板
	var popUpTpl = function (tpl, textTpl, maksTpl) {
		// console.log("popUp");
		var _html = '<div class="loading" >\n' +
			'  <div class="loading-wrapper">\n' +
			'    ' + tpl + '\n' +
			'    ' + textTpl + '\n' +
			'  </div>\n' +
			'  ' + maksTpl + '\n' +
			'</div>';
		return _html;
	};

	/**  */
	// 设置DOM属性
	var setDomAttribute = function (el, hash) {
		// 给DOM添加HASH属性
		el.setAttribute('data-v', hash);
		// console.log(el);
	};

	// 载入html到页面
	var insertHtml = function (dom, apendEl, text) {
		// console.log(apendEl);
		// 判断apendEl是否存在, 没有设置默认值为 body
		if (!apendEl || (apendEl == "body")) {
			// 插入到body的最前面
			// var firstEl = document.body.firstChild;//得到页面的第一个元素
			// document.body.insertBefore(html, firstEl);
			document.body.append(dom);
		} else {
			// 判断插入的class是否存在
			if (document.getElementsByClassName(apendEl).length > 0) {
				document.getElementsByClassName(apendEl)[0].append(dom);
			} else {
				console.log("插入class不存在！");
				return;
			}
		}

	};

	// 更新loading样式
	var updateDomSty = function (dom, obj) {
		// console.log(dom);
		// 判断是垂直居中
		if (obj.vertical) {
			if (dom.getElementsByClassName("loading-wrapper").length > 0){
				dom.getElementsByClassName("loading-wrapper")[0].classList.add("loading-vertical");
			} else {
				dom.classList.add("loading-vertical");
			}

		}
		// 更新spin样式
		var spinCss = '';
		if (!!obj.size && !!obj.color) {
			spinCss = 'width: '+ obj.size +'; height: '+ obj.size +'; color: '+ obj.color;
		} else if (!!obj.size) {
			spinCss = 'width: '+ obj.size +'; height: '+ obj.size +';';
		} else if (!!obj.size) {
			spinCss = 'color: '+ obj.color;
		}
		if (!!spinCss) {
			dom.getElementsByClassName("loading-spinner")[0].setAttribute("style", spinCss);
		}

		// 更新spin文本样式
		var textCss = '';
		if (!!obj.textCss) {
			textCss = obj.textCss;
		} else if (!!obj.textSize && !!obj.color){
			textCss = 'font-size: '+ obj.textSize +'; color: '+ obj.color;
		} else if (!!obj.textSize) {
			textCss = 'font-size: '+ obj.textSize +';';
		} else if (!!obj.color) {
			textCss = 'color: '+ obj.color;
		}
		if (!!textCss) {
			dom.getElementsByClassName("load-text")[0].setAttribute("style", textCss);
		}
	};

	// 绑定事件
	var bindEvent = function (dom, callback) {
		// 判断是否有回调方法
		if (callback){
			callback(dom);
		}
	};



	/**
	 * 创建构造函数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var _loading = function (opt, callback) {
		/**
		 * 定义默认参数
		 * @param {Array<{type:number,txt:string}>} list
		 */
		var def = {
			tpl: '',		// 自定义模板（只配置旋转器的部分）
			skin: 0,		// 默认css3模板
			showType: "popup",	// 展示类型
			injectSite: "body",	// 插入位置
			color: "",			// 颜色 	string	#c9c9c9
			vertical: true,	// 是否垂直排列图标和文字内容	boolean	false
			// 图标相关updateDomSty
			type: "svg_bar1", 	// 类型，可选值为 spinner 	string	circular   svg可以配置大小和颜色
			size: "36px",			// 加载图标大小，默认为px		string | number	30px
			// 文字相关
			text: "加载中...",		// 加载中文字
			textSize: "16px",		// 文字大小，默认单位为px		string | number	30px
			isShowText: true,	// 是否显示文字 默认值 true
			textCss: "",			// 文字样式 默认为空 color: #f00; font-size: 20px;
			// mask 相关
			isMask: false,  // 是否显示mask
			maskCss: "",			// MASK样式 默认为空 color: #f00; font-size: 20px;
		};
		// 合并参数
		this.opts = extend(def, opt, true);
		// console.log(this.opts);
		// 生成Hash
		this.hash = createHash(8);
		// 初始化插件
		this.init(this.opts, callback);
	};

	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	_loading.prototype = {
		init: function (obj, callback) {
			// console.log("初始化方法！");
			// console.log(obj, callback);
			var textTpl = "", maksTpl = "";
			// 获取加载中展示样式对应tpl 字符串
			var typeTpl = getTypeTpl(obj.type, obj.tpl, obj);
			// console.log(1, typeTpl);
			// 判断是否显示文字
			if (obj.isShowText) {
				// 设置加载中文字tpl 字符串
				var textTpl = getTextTpl(obj.text, obj.textSize, obj.textCss);
			}
			// 判断是否显示MASK
			if (obj.isMask) {
				// 设置加载中文字tpl 字符串
				var maksTpl = getMaskTpl(obj.maskCss);
			}
			// 拼接匹配加载中展示位置tpl 字符串
			var showTypeTpl = getShowTypeTpl(obj.showType, typeTpl, textTpl, maksTpl);
			// console.log(2, showTypeTpl);
			// 模板转换成DOM, 并返回DOM
			var _dom = parseDom(showTypeTpl)[0];
			// 储存插件DOM
			this.el = _dom;
			// console.log(1, _dom);
			// console.log(obj);
			// 是否载入默认Css
			// console.log(global.isDef);
			// 判断使用默认模板，并加载默认CSS
			if (global.isDef){
				this.loadCss();
			}
			// 设置DOM属性
			setDomAttribute(_dom, this.hash);
			// console.log(2, _dom);
			// console.log(_dom);
			// 把DOM插入到页面
			insertHtml(_dom, obj.injectSite, obj.text, obj.text);
			// 更新loading 样式
			updateDomSty(_dom, obj);
			// 绑定事件
			bindEvent(_dom, callback);

		},
		// 载入默认css
		loadCss: function (str, inject) {
			// console.log(global.defSkin.css);
			// 设置默认插入位置
			if (!inject) inject = "head";
			// 设置默认css
			if (!str) {
				str = global.defType.css;
			}
			// 创建样式
			var style = document.createElement("style");
			style.type = "text/css";
			style.setAttribute('data_style', this.hash);
			style.innerHTML = str;
			// console.log(style);
			// 样式插入位置
			var _inject = document.getElementsByTagName(inject)[0];

			// 样式载入到页面指定位置
			_inject.appendChild(style);
		},
		// 绑定事件
		bindEvent: function (_dom, callback) {
			// 判断是否有回调方法
			if (callback){
				callback(_dom);
			}
		},
		hide: function () {
			// console.log("隐藏！");
			// console.log(this);
			this.el.remove();
		}
	};

	// 实例化方法
	var loading = function (opt, callback) {
		// 判断第一个参数是回调方法，设置默认参数为空
		if (isFunction(opt)) {
			// 设置回调方法和参数
			callback = opt;
			opt = {};
		}
		// var load = new _loading(opt);
		// console.log("load", load);
		return new _loading(opt, callback);
		// return load;
	};

	window.test = function (opt) {
		// console.log("loading", loading);
		return new _loading(opt);
	};

	return loading;
});