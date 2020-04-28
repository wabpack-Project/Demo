var  Home = function (route) {
	console.log("首页！");
	var tpl = '<div class="page-box" data-hash="/home" style="display: block">\n' +
		'    <div class="page-content">\n' +
		'      <div class="header" >\n' +
		'        <div><a class=\'back\' onclick=\'window.history.go(-1)\'>返回</a></div>\n' +
		'        <h2>首页</h2>\n' +
		'      </div>\n' +
		'      <div id="home"><input type="text"> <div><div href="javascript:void(0);" onclick="linkTo(&quot;#/brand/aaa&quot;)">列表</div></div><div class="height">内容占位</div></div>\n' +
		'    </div>\n' +
		'  </div>';

	var _html = History.parseDom(tpl)[0];
	console.log(_html);

	// document.getElementById("routerView").append(_html);
	document.getElementById("routerView").innerHTML = tpl;

	// home(route);
}, Brand = function () {
	console.log("Brand！");
	var tpl = '<div class="page-box" data-hash="/list" style="display: block">\n' +
		'    <div class="page-content">\n' +
		'      <div class="header" >\n' +
		'        <div><a class=\'back\' onclick=\'window.history.go(-1)\'>返回</a></div>\n' +
		'        <h2>列表</h2>\n' +
		'      </div>\n' +
		'      <div id="list"><input type="text"> <div><a href="javascript:void(0);" onclick="linkTo(&quot;#/detail&quot;)">详情</a></div></div>\n' +
		'      \n' +
		'    </div>\n' +
		'  </div>';

	var _html = History.parseDom(tpl)[0];
	console.log(_html);

	document.getElementById("routerView").innerHTML = tpl;
}, detail = function (route) {
	console.log("detail！");


	console.log(1);
	History.syncFun(function(transition){
		// document.getElementById("home").innerHTML = '<p style="color:#DD8C6F;">当前同步渲染详情页' + JSON.stringify(route) +'</p>';
		console.log("首页回调" + JSON.stringify(route))
	},route);
	History.asyncFun('../js/detail.js',route);

	// document.getElementById("routerView").innerHTML = tpl;
}, GoodslistOnline = "GoodslistOnline";
// 配置路由
var routes = [
	{
		path: '/',
		name: 'Home',
		callback: Home
	},
	{
		path: '/brand/aaa',
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
	{
		path: '/detail',
		name: 'detail',
		callback: detail
	},
];

//

History.init({
	animationName : "fade",
	pageBoxClass	: "page-box",
	routerMap 		: routes,
	mode					: "history",
});
// 单个路由注册
History.registerRouter("/test", function (transition) {
	console.log(1);
	History.syncFun(function(transition){
		document.getElementById("home").innerHTML = '<p style="color:#DD8C6F;">当前同步渲染详情页' + JSON.stringify(transition) +'</p>';
		console.log("首页回调" + JSON.stringify(transition))
	},transition);
	History.asyncFun('../js/detail.js',transition);
});
History.beforeEach(function(transition) {
	console.log('切换之 前 dosomething', transition);
	setTimeout(function() {
		//模拟切换之前延迟，比如说做个异步登录信息验证
		transition.next();
	}, 100)
});
History.afterEach(function(transition) {
	console.log("切换之 后 dosomething", transition)
});
// Router.init();





