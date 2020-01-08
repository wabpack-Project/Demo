var ios_app = false,
	android_app = false;

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
	}
};
// 提升IOS回调方法作用域，解析ios传回的base64编码
window.getVersionAndNameForIos = function (code) {
	// 判断编码不存在并退出
	if (!code) return;
	// 解析base64编码
	var Base = new Base64(),
		jsonobj = jQuery.parseJSON(Base.decode(code));
	console.log("Base", jsonobj);
	// {name: "cn.lancare.lancare", version: "3.0.59/20191014000001"}
	// 页面赋值
	$("#app_name").val(jsonobj.name);
	$("#android_version").val(jsonobj.version);
};
// IOS回调方法
var getVersionForIos = function (app_intro) {
	alert(app_intro);
};