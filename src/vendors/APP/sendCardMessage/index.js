var global = {},
		is_member = 0,
		ios_app = false,
		android_app = false;
/*
 * processing_status 处理状态 0待处理 1已处理
 * register_date     时间
 * apply_id          挂号的id
 * card_type         1 预约挂号原生 2 预约挂号网页 3 转诊 4 检查 5 支付
 * card_url          点击链接
 * doctor_id         只用于原生挂号
 */
// 储存卡片信息
global.extend = {
	card_url: "http://m.lk.cn/dh_orderinfo/oid:232178",			// 卡片地址
	card_type: "5",		// 卡片类型
	register_date: "2019-12-05",		// 发卡片时间
	processing_status: "0",		// 处理状态 0待处理 1已处理
	// data_id: d.oid,
};
console.log("卡片信息", global.extend);
// 存储卡片提示
global.card_content = "您在2019年12月05日有一个订单未支付，请登录蓝卡网APP尽快处理，以免耽误个人信誉！";
console.log("卡片内容", global.card_content);
// 判断是会员还是医生，储存发送人
if (!!is_member){ // 是会员
	global.user = {
		id: "2124895",
		name: "王磊",
	}
} else {
	global.user = {
		id: "1212212",
		name: "马景春",
	}
}
console.log("卡片发送用户", global.user);

sendCardMessage();