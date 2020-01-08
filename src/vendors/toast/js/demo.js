// var demo = document.getElementsByTagName("button");
// console.log(demo);
var demo1 = document.getElementsByClassName("demo1");
demo1[0].onclick = function () {
	toast("提示内容");
};

var demo2 = document.getElementsByClassName("demo2");
demo2[0].onclick = function () {
	toast("这是一条长文字提示，超过一定字数就会换行。这是一条长文字提示，超过一定字数就会换行", {
		// showType: 1,
		position: "bottom",
		imgCss: 'width: 30px; heigth:30px;',
		iconClass: 'iconjia1 iconfont',	// 字体图标class
		iconCss: 'font-size: 32px;', // 字体图标样式
		imgTpl: '<img src="https://img.yzcdn.cn/vant/logo.png" class="van-icon__image">',		// 图片模板
	});
};

var demo3 = document.getElementsByClassName("demo3");
demo3[0].onclick = function () {
	toast("这是一条长文字提示，超过一定字数就会换行。这是一条长文字提示，超过一定字数就会换行", {
		// showType: 1,
		position: "bottom",
		imgCss: 'width: 30px; heigth:30px;',
		iconClass: 'iconjia1 iconfont',	// 字体图标class
		iconCss: 'font-size: 32px;', // 字体图标样式
		imgTpl: '<img src="https://img.yzcdn.cn/vant/logo.png" class="van-icon__image">',		// 图片模板
		callback: function () {
			console.log("回调方法！！！");
		}
	});
};

var demo4 = document.getElementsByClassName("demo4");
demo4[0].onclick = function () {
	toast("这是一条长文字提示，超过一定字数就会换行。", {
		showType: 2,
		position: "bottom",
		imgCss: 'width: 30px; heigth:30px;',
		iconClass: 'iconjia1 iconfont',	// 字体图标class
		iconCss: 'font-size: 32px;', // 字体图标样式
		imgTpl: '<img src="https://img.yzcdn.cn/vant/logo.png" class="van-icon__image">',		// 图片模板
		callback: function () {
			console.log("回调方法！！！");
		}
	});
};

var demo5 = document.getElementsByClassName("demo5");
demo5[0].onclick = function () {
	toast("这是一条长文字提示，超过一定字数就会换行。", {
		time: 1000,
		showType: 3,
		position: "bottom",
		imgCss: 'width: 30px; heigth:30px;',
		iconClass: 'iconjia1 iconfont',	// 字体图标class
		iconCss: 'font-size: 32px;', // 字体图标样式
		imgTpl: '<img src="https://img.yzcdn.cn/vant/logo.png" class="van-icon__image">',		// 图片模板
		callback: function (el, obj) {
			console.log("回调方法！！！");
			var _attribute =  '[data-v="' + obj.hash+'"]';
			var style = document.getElementsByTagName("style")[0];
			// obj.removeCss("data_style");
			// obj.removeCss();

			// document.querySelector('style[data_style="8ayq4u3q"]')

			setTimeout(function () {
				// obj.removeCss("data_style");
				obj.remove();
			}, obj.opts.time);
		}
	});
};

var demo6 = document.getElementsByClassName("demo6");
demo6[0].onclick = function () {
	var aa = toast("这是一条长文字提示，超过一定字数就会换行。", {
		time: 1000,
		showType: 3,
		position: "bottom",
		imgCss: 'width: 30px; heigth:30px;',
		iconClass: 'iconjia1 iconfont',	// 字体图标class
		iconCss: 'font-size: 32px;', // 字体图标样式
		imgTpl: '<img src="https://img.yzcdn.cn/vant/logo.png" class="van-icon__image">',		// 图片模板
		// /*
		callback: function (el, obj) {
			console.log("回调方法！！！");
			var _attribute =  '[data-v="' + obj.hash+'"]';
			var style = document.getElementsByTagName("style")[0];
			// obj.removeCss("data_style");
			// obj.removeCss();

			// document.querySelector('style[data_style="8ayq4u3q"]')

			setTimeout(function () {
				obj.removeCss(obj);
				// obj.removeCss("data_style");
				// obj.remove();
			}, obj.opts.time);
		}
		// */
	});
	console.log(aa);
};


