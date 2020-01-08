/**
 * 输入验证
 * */
// 验证手机号
var checkMobile = function (tel) {
	var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	if (!myreg.test(tel)) {
		return false;
	} else {
		return true;
	}
};
// 验证数字
var checkInteger = function (tel) {
	var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	if (!myreg.test(tel)) {
		return false;
	} else {
		return true;
	}
};
// 验证中文和英文
var checkC_E = function (tel) {
	var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	if (!myreg.test(tel)) {
		return false;
	} else {
		return true;
	}
};
