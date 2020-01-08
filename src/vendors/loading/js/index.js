var css1 = 'body { background: #000; }\n' +
	'    .loader {\n' +
	'      margin: 6em auto;\n' +
	'      font-size: 10px;\n' +
	'      position: relative;\n' +
	'      text-indent: -9999em;\n' +
	'      border-top: 1.1em solid rgba(255, 255, 255, 0.2);\n' +
	'      border-right: 1.1em solid rgba(255, 255, 255, 0.2);\n' +
	'      border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);\n' +
	'      border-left: 1.1em solid #ffffff;\n' +
	'      -webkit-animation: load8 1.1s infinite linear;\n' +
	'      animation: load8 1.1s infinite linear;\n' +
	'    }\n' +
	'    .loader,\n' +
	'    .loader:after {\n' +
	'      border-radius: 50%;\n' +
	'      width: 10em;\n' +
	'      height: 10em;\n' +
	'    }\n' +
	'    @-webkit-keyframes load8 {\n' +
	'      0% {\n' +
	'        -webkit-transform: rotate(0deg);\n' +
	'        transform: rotate(0deg);\n' +
	'      }\n' +
	'      100% {\n' +
	'        -webkit-transform: rotate(360deg);\n' +
	'        transform: rotate(360deg);\n' +
	'      }\n' +
	'    }\n' +
	'    @keyframes load8 {\n' +
	'      0% {\n' +
	'        -webkit-transform: rotate(0deg);\n' +
	'        transform: rotate(0deg);\n' +
	'      }\n' +
	'      100% {\n' +
	'        -webkit-transform: rotate(360deg);\n' +
	'        transform: rotate(360deg);\n' +
	'      }\n' +
	'    }';
// loading();

// console.log(loading().def);

// console.log(test());
// console.log(1, test().init());

// test.init()
/**
 * 使用默认模板加载中
 *
 */
// /*
// console.log(loading);

setTimeout(function () {
	aa.hide();
}, 200000);

function hah() {

	document.body.addEventListener('touchmove', function (e) {
		e.preventDefault();
	}, { passive: false });

	var aa = loading(function (dom) {
		console.log("回调方法！");
		console.log(dom);

	});
}

// */
// loading
// console.log(aa);
// aa.hide();
// test();
/**
 * 使用自定义模板加载中
 *
 */
// 自定义模板加载
/*
var bb = loading({
	tpl: '<div class="loader load5" >加载中...</div>',
}, function () {
	console.log("回调方法！");
});
bb.loadCss(css1);
*/

/**
 * 使用自定义模板加载中
 *
 */
// 自定义模板加载
	/*
var cc = loading({
	tpl: '数据加载中...',
}, function () {
	console.log("回调方法！");
});
cc.loadCss(css1);
*/

