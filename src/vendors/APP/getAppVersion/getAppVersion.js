(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.getAppVersion = factory();
	}
})(this, function() {
	global = {
		isIosApp: true,
	};
	// 获取版本号
	var getAppVersion = function () {
		if (android_app){
			console.log("安卓 APP内支付");
			// 获取版本号
			var appInfo = window.LanCareWeb.getVersion();
			// alert(appInfo);
			// 判断appInfo是否存在
			if (!appInfo) return;
			// 页面赋值
			$("#app_name").val(appInfo.packageName);
			$("#android_version").val(appInfo.ver);
		} else if (ios_app){
			console.log("IOS APP内支付");
			window.webkit.messageHandlers.Lancare.postMessage('getVersionAndName');
		} else {
			console.log("非APP内支付");
			// 测试IOS返回base64编码解析
			if (global.isIosApp){
				var code = "eyJuYW1lIjoiY24ubGFuY2FyZS5sYW5jYXJlIiwidmVyc2lvbiI6IjMuMC41OVwvMjAxOTEwMTQwMDAwMDEifQ==";
				getVersionAndNameForIos(code);
			}
		}
	};
	// 提升IOS回调方法作用域，解析ios传回的base64编码
	window.getVersionAndNameForIos = function (code) {
		// 判断编码不存在并退出
		if (!code) return;
		// 解析base64编码
		var Base = new Base64(),
			jsonobj = JSON.parse(Base.decode(code));
			// jsonobj = jQuery.parseJSON(Base.decode(code));
		console.log("IOS Base64 转码", jsonobj);
		// {name: "cn.lancare.lancare", version: "3.0.59/20191014000001"}
		// 页面赋值
		// $("#app_name").val(jsonobj.name);
		// $("#android_version").val(jsonobj.version);
	};
	// IOS回调方法
	window.getVersionForIos = function (app_intro) {
		alert(app_intro);
	};
	// 对外开放方法
	return getAppVersion;
});