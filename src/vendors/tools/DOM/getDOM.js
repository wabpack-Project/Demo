var utils = {
	// 根据参数查找对应元素
	findDom : function (str, dom) {
		var _way;
		// 判断dom不存在设置默认值
		if (dom) {
			if (dom.length > 1) dom = dom[0];
		} else {
			dom = document;
		}
		// 判断是不是特殊字符
		if (this.checkSpecialChar(str)) { // 是特殊字符
			// 判断是id还是class
			_way = this.matchStr1st(str[0]);
		} else if (str === "body"){
			_way = 3;
		} else if (str === "html") {
			_way = 4;
		} else if (this.matchTagStr(str)) {
			_way = 5;
		} else {
			_way = 6;
		}
		// 匹配对应的查找操作
		var newDom = this.matchWay(dom, _way, str);
		console.log(newDom);
		return newDom;
	},
	// 匹配查找数据类型
	matchWay : function (dom, way, str) {
		// 定义默认返回值
		var _dom;
		// 匹配查找方式
		switch (way) {
			case 1:
				_dom = this.hasDOM(document.getElementById(str.substring(1)));
				break;
			case 2:
				_dom = this.hasDOM(dom.getElementsByClassName(str.substring(1)));
				break;
			case 3:
				_dom = this.hasDOM(document.body);
				break;
			case 4:
				_dom = this.hasDOM(document.documentElement);
				break;
			case 5:
				_dom = this.hasDOM(dom.getElementsByTagName(str));
				break;
			default:
				_dom = this.hasDOM(document.getElementsByName(str));
				break;
		}
		return _dom;
	},
	// 判断id还是class
	matchTagStr : function (str) {
		// 定义字符串数组
		var arr = ["div", "li", "p", "a", "span"];
		if (arr.indexOf(str) != -1) {
			return true;
		};
		return false;
	},
	// 判断id还是class
	matchStr1st : function (str) {
		var flag;
		if (str === ".") {
			flag = 2;
		} else if (str === "#") {
			flag = 1;
		}
		return flag;
	},
	// 判断是否返回dom
	hasDOM : function (dom) {
		if (dom.length < 1) {
			// console.log("没有找到当前DOM");
			return false;
		}
		return dom;
	},
	// 验证特殊字符
	checkSpecialChar : function (str)  {
		var myreg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
		if (!myreg.test(str)) {
			return true;
		} else {
			return false;
		}
	},
};


utils.findDom(".text", document.getElementsByClassName("list"));
utils.findDom("#list", document.getElementsByClassName("list"));

utils.findDom("body", document.getElementsByClassName("list"));
utils.findDom("html", document.getElementsByClassName("list"));

utils.findDom("li", document.getElementsByClassName("list"));

utils.findDom("aa", document.getElementsByClassName("list"));