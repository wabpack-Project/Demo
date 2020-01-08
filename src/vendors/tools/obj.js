// 赋值对象
// Json序列化克隆对象
var deepClone = function(obj){
	return JSON.parse(JSON.stringify(obj));
};

// 新建对象
function newObj(obj) {
	var datas = [];
	for (key in obj) {
		var data = {};//每次循环的时候，新建对象
		data.name = key;
		datas.push(data);
	}
	console.log(datas);
	return datas;
};

// 对象合并
/**
 * 合并对象，可以配置深拷贝还是浅拷贝， 远对象会被覆盖
 * 深拷贝 原对象会被覆盖
 * 浅拷贝 原对象不会被覆盖
 * */
function extend(o,n,override) {
	for(var key in n){
		if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
			o[key]=n[key];
		}
	}
	return o;
}

/**
 * 合并多个对象成新对象，深拷贝
 * */
function extend() {
	var length = arguments.length;
	var target = arguments[0] || {};
	if (typeof target != "object" && typeof target != "function") {
		target = {};
	}
	if (length == 1) {
		target = this;
		// i--;
	}
	for (var i = 1; i < length; i++) {
		var source = arguments[i];
		for (var key in source) {
			// 使用for in会遍历数组所有的可枚举属性，包括原型。
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}
	return target;
}

