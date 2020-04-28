/**
 * html直接写在页面形式，操作指定视图
 * */

var  Home = "Home", Brand = "Brand", GoodslistOnline = "GoodslistOnline";

// 配置路由
var routes = [
	 {
		 path: '/',
		 name: 'Home',
		 callback: Home
	 },
	 {
		 path: '/brand',
		 name: 'Brand',
		 callback: Brand,
		 meta: {
			 login_require: true
		 },
		 children:[
			 {
				 path: 'online',
				 callback: GoodslistOnline
			 }
		 ]
	 },
 ];

//

Router.init({
	animationName : "fade",
	pageBoxClass	: "page-box",
});
// 单个路由注册
Router.registerRouter("/test", function (transition) {
	console.log(1);
	Router.syncFun(function(transition){
		document.getElementById("home").innerHTML = '<p style="color:#DD8C6F;">当前同步渲染详情页' + JSON.stringify(transition) +'</p>';
		console.log("首页回调" + JSON.stringify(transition))
	},transition);
	Router.asyncFun('../js/detail.js',transition);
});
Router.beforeEach(function(transition) {
	console.log('切换之 前 dosomething', transition);
	setTimeout(function() {
		//模拟切换之前延迟，比如说做个异步登录信息验证
		transition.next();
	}, 100)
});
Router.afterEach(function(transition) {
	console.log("切换之 后 dosomething", transition)
});
// Router.init();





