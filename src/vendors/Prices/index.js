// 已有元素绑定事件
prices(document.getElementsByClassName("quantity"), {
	isTpl: false,
	minNum: 0,
	maxNum: 10.5,
	stepVal	: 1,					// 每次增加或减少的值
	digit		: 2,					// 小数保留位数
	isDisabled: false,
	addHandle: function (obj) {
		// obj.inputEl.value = obj.newV;
		// obj.addEl.style.display = "none";
	},
	cutHandle: function (obj) {
		// obj.inputEl.value = obj.newV;
	},
});

/*
// 在指定元素能生成并绑定事件
prices(document.getElementsByClassName("quantityT"), {
	minNum: 3,
	maxNum: 10,
	addHandle: function (el, v) {
		el.value = v + "小时";
	},
	cutHandle: function (el, v) {
		el.value = v + "小时";
	}
});
*/