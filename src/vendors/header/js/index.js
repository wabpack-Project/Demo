var tpl = '<header class="head">\n' +
	'  <a class="iconfont iconback" href="javascript:window.history.back();"></a>\n' +
	'  <h1>海关体检预约海关体检</h1>\n' +
	'  <a class="word_4" href="/signin">取消订单</a>\n' +
	'</header>';

android_app = false;
ios_app = false;
is_wx = false;

// 根据终端设置是否显示
if (!(android_app || ios_app || is_wx)) {
	// 引用头信息
	header("引用头信息", "aaa", function (el) {
		console.log(el);
		console.log("callback");
		// 替换头部标题
		// document.getElementsByTagName("header")[0].children[1].innerText = "海关体检预约海关体检!!!";
	});
}




