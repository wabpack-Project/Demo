// alert("弹出提示！");


// console.log(alert1.hide());


window.alert = msgbox._alert;
window.confirm = msgbox._confirm;
window.prompt = msgbox._prompt;

// msgbox._alert;

// msgbox._alert("");
// 第二个参数是回调方法
// alert(11, function () {
// 	console.log(2222);
// });

//直接弹出，无取消按钮
// alert("alert");
//有取消按钮
// confirm("Confirm");
//弹出输入框
// prompt("prompt");

// var aa = prompt("prompt");
// console.log(aa);

// TIPS


// prompt
// var ttt = prompt("邮箱", {
// 	inputCallback: function(dom, obj) {
// 		// 需要判断输入合法，输入内容验证
// 		console.log(dom);
// 		obj.inputValid = false;
// 		dom.oninput = function () {
// 			console.log(this.value);
// 			// 根据输入验证是否合法
// 			ttt.inputValid = true;
// 		}
// 	},
// 	confirmCallback: function () {
// 		console.log(ttt);
// 		if (!ttt.inputValid){
// 			console.log("请输入有效字符！");
// 		}
// 	},
// 	callback: function () {
// 		console.log("回调方法！");
// 	}
// });

// confirm
// var ddd = confirm(11, {
// 	title: '你好',
// 	confirmCallback: function () {
// 		console.log(3333);
// 		// alert(22);
// 	},
// 	callback: function () {
// 		console.log("回调方法！");
// 	}
// });
// console.log(ddd.opts.title);

// var ccc = confirm(11, {
// 	title: '哈哈',
// 	confirmCallback: function () {
// 		console.log(3333111);
// 	},
// 	callback: function () {
// 		console.log("回调方法111！");
// 	}
// });
// console.log(ccc.opts.confirmCallback);
// console.log(ddd.opts.confirmCallback);

// 第二个参数是对象
// alert
alert(11, {
	confirmCallback: function () {
		console.log(3333);
	},
	callback: function () {
		console.log("回调方法！");
	}
});