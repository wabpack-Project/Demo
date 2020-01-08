// 绑定后退事件
window.addEventListener("popstate", function(e){
	// alert("popstate", location.hash);
	// if (typeof ios_app != 'undefined' && ios_app) {
	// 	// history.go(-1);
	// }
	// 移除药品列表
	$(".drug").remove();
	// 移除购物车药品记录
	$(".drawer").remove();
}, false);

// 绑定访问记录发生变化
window.addEventListener("visibilitychange", function(e){
	showRightTextButton("", "", 1);
});