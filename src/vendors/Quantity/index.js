// 已有元素绑定事件
quantity(document.getElementsByClassName("quantity"), {
	isTpl: false,
	minNum: 3,
	maxNum: 10,
	addHandle: function (el, v) {
		el.value = v + "小时";
	},
	cutHandle: function (el, v) {
		el.value = v + "小时";
	},
});

/*
// 在指定元素能生成并绑定事件
quantity(document.getElementsByClassName("quantityT"), {
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