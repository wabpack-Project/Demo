var tpl = '<div class="drawer" >\n' +
	'  <div class="drawer_mask"></div>\n' +
	'  <div class="drawer_out">\n' +
	'    <div class="dw_head dw_m92">\n' +
	'      <div class="dw_h_name">请选择支付方式</div>\n' +
	'    </div>\n' +
	'    <div class="dw_body dw_m92">\n' +
	'      <ul class="pay_list">\n' +
	'        <li data-pay="wxpay">\n' +
	'          <div class="pay_con clearfix">\n' +
	'            <div class="pay_name">\n' +
	'              <span class="iconfont iconweixin fl"></span>\n' +
	'              微信支付\n' +
	'            </div>\n' +
	'          </div>\n' +
	'        </li>\n' +
	'        <li data-pay="alipay">\n' +
	'          <div class="pay_con clearfix">\n' +
	'            <div class="pay_name">\n' +
	'              <span class="iconfont iconzhifubao fl"></span>\n' +
	'              支付宝支付\n' +
	'            </div>\n' +
	'          </div>\n' +
	'        </li>\n' +
	'      </ul>\n' +
	'    </div>\n' +
	'  </div>\n' +
	'</div>';

// 数据
var data = {};

android_app = false;
ios_app = false;
is_wx = false;

// 根据终端设置是否显示
// if (!(android_app || ios_app || is_wx)) {

// 注意tpl回调

	// 加载支付方式
	// 第一种 使用默认模板， 点击支付方式回调方法
	// payment(function (pay) {
	// 	console.log("点击支付方式回调方法!");
	// 	console.log(pay);
	// });

	// 第二种 使用自定义模板， 有回调方法，可以绑定事件和dom操作
	// payment(function (pay) {
	// 	console.log("使用自定义模板，回调方法!");
	// }, tpl);

	// 第三种 使用默认模板，传入标题， 点击支付方式回调方法
	payment(function (pay) {
		console.log("点击支付方式回调方法");
	}, "你好啊");

	// 第四种 使用数据渲染自定义模板，有回调方法，可以绑定事件和dom操作
	payment(function (pay) {
		console.log("使用数据渲染自定义模板，回调方法!");
	}, function () {
		console.log("数据渲染自定义模板");
		return miniTpl(tpl, data);
	});


/*
// 请求确认支付信息接口
sureOrderInfo(pay_type);
// 更新form支付方式
$("#pay_type").val(pay_type);
// 判断是app，更新form信息
if (android_app || ios_app) {
	// 更新form版本号和包名
	document.getElementById("app_name").value = global.appInfo.packageName;
	$("#app_name").val(global.appInfo.packageName);
	$("#android_version").val(global.appInfo.version);
}
*/

// 获取版本号
var getAppVersion = function () {
	if (android_app){
		console.log("安卓 APP内支付");
		// 获取版本号
		var appInfo = window.LanCareWeb.getVersion(),
			jsonobj = jQuery.parseJSON(appInfo);
		// alert(jsonobj);
		// 判断appInfo是否存在
		if (!appInfo) return;
		// alert("appInfo存在！");
		// alert(jsonobj.packageName);
		// alert(jsonobj.ver);
		// 存储版本号和包名信息
		global.appInfo = {
			packageName: jsonobj.packageName,
			version: jsonobj.ver,
		};
		// 页面赋值
		// $("#app_name").val(appInfo.packageName);

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
	// alert(jsonobj.name);
	// alert(jsonobj.version);
	// 存储版本号和包名信息
	global.appInfo = {
		packageName: jsonobj.name,
		version: jsonobj.version,
	};

	// 页面赋值
	// $("#app_name").val(jsonobj.name);
	// $("#android_version").val(jsonobj.version);
};
// IOS回调方法
var getVersionForIos = function (app_intro) {
	alert(app_intro);
};

// }




