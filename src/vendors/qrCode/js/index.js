// 模板
var tpl1 = '<div class="popup">\n' +
	'  <div class="popup_mask"></div>\n' +
	'  <div class="popup_out">\n' +
	'    <div class="pop_head">\n' +
	'      <div class="qc_price">支付金额：<span><em>￥</em><%=data.total_fee||\'\'%></span></div>\n' +
	'    </div>\n' +
	'    <div class="pop_body">\n' +
	'      <div class="qrCode">\n' +
	'        <div class="qc_img">\n' +
	'          <div class="qc_id_img">\n' +
	'            <img src="<%=data.code_url||\'\'%>">\n' +
	'          </div>\n' +
	'          <div class="qc_id_invalid">\n' +
	'            <div class="qc_void">\n' +
	'              <i class="iconfont iconshuaxin"></i>\n' +
	'              <p class="qc_txt">二维码失效，点击刷新</p>\n' +
	'            </div>\n' +
	'            <div class="qc_mask"></div>\n' +
	'          </div>\n' +
	'        </div>\n' +
	'        <div class="qc_time">该二维码 <span><%=data.timeout_express||\'\'%>分钟</span>后过期</div>\n' +
	'        <div class="qc_des">请用<%=data.payName||\'\'%>扫描</div>\n' +
	'      </div>\n' +
	'    </div>\n' +
	'  </div>\n' +
	'</div>';

var tpl = '<div class="popup">\n' +
	'  <div class="popup_mask"></div>\n' +
	'  <div class="popup_out">\n' +
	'    <div class="pop_head">\n' +
	'      <div class="qc_price">支付金额：<span><em>￥</em>1256.25</span></div>\n' +
	'    </div>\n' +
	'    <div class="pop_body">\n' +
	'      <div class="qrCode">\n' +
	'        <div class="qc_img">\n' +
	'          <div class="qc_id_img">\n' +
	'            <img src="../../asset/images/customs/qrcode.jpg">\n' +
	'          </div>\n' +
	'          <div class="qc_id_invalid">\n' +
	'            <div class="qc_void">\n' +
	'              <i class="iconfont iconshuaxin"></i>\n' +
	'              <p class="qc_txt">二维码失效，点击刷新</p>\n' +
	'            </div>\n' +
	'            <div class="qc_mask"></div>\n' +
	'          </div>\n' +
	'        </div>\n' +
	'        <div class="qc_time">距离二维码过期还剩 <span>1分15秒</span></div>\n' +
	'        <div class="qc_des">请用微信扫描</div>\n' +
	'      </div>\n' +
	'    </div>\n' +
	'  </div>\n' +
	'</div>';

// 数据
var data = {};

global = {};
android_app = false;
ios_app = false;
is_wx = false;

// 根据终端设置是否显示
// if (!(android_app || ios_app || is_wx)) {
  // 第一种 数据替换模板方式
	// 加载二维码
	// /*
	// qrCode(function (el) {
	// 	// 对应绑定事件和回调处理
	// 	console.log("回调函数！！！");
	// 	console.log(el);
	// }, function () {
	// 	return miniTpl(tpl, data);
	// });
	// */

	// 第二种 直接传入模板
	// 加载二维码
	// qrCode(function () {
	// 	console.log("事件绑定！！！");
	// }, tpl);

	// 第三种没有参数直接跳出
	// 加载二维码
	// qrCode(function () {
	// 	d = {
	// 		code_url: "http://www.lk.cn/i/icons/ALI_LG677757298696602431.png",
	// 		timeout_express: "2"
	// 	};
	// 	global.orderInfo = {
	// 		total_fee: "396.39"
	// 	};
	// 	payName = "支付宝";
	// 	console.log("回调函数！！！");
	// 	// 更新支付金额
	// 	$(".qc_price").find("span").html("<em>￥</em>" + global.orderInfo.total_fee);
	// 	// 更新支付二维码
	// 	$(".qc_img").find("img").attr("src", d.code_url);
	// 	// 更新过期时间
	// 	$(".qc_time").find("span").html(d.timeout_express + "分钟");
	// 	// 更新支付方式
	// 	$(".qc_des").text("请用" + payName + "扫描");
	// });

	var qrcodeData = {
		code_url: "http://www.lk.cn/i/icons/ALI_LG677757298696602431.png",
		timeout_express: "2",
		total_fee: "396.39",
		payName: "支付宝",
	};
	/*
	qrCode(function () {
		d = {
			code_url: "http://www.lk.cn/i/icons/ALI_LG677757298696602431.png",
			timeout_express: "2"
		};
		global.orderInfo = {
			total_fee: "396.39"
		};
		payName = "支付宝";
		console.log("回调函数！！！");
		// // 更新支付金额
		// $(".qc_price").find("span").html("<em>￥</em>" + global.orderInfo.total_fee);
		// // 更新支付二维码
		// $(".qc_img").find("img").attr("src", d.code_url);
		// // 更新过期时间
		// $(".qc_time").find("span").html(d.timeout_express + "分钟");
		// // 更新支付方式
		// $(".qc_des").text("请用" + payName + "扫描");
	}, null, {
		time: 12450,
		refreshHand: function (a, b) {
			console.log("刷新！！！");
			console.log(a, b);
		}
	});
	*/

	// 模板渲染
	qrCode(function () {
		console.log("回调函数！！！");
	}, function () {
		// qrcodeData 拼接数据	tpl1 渲染模板
		return miniTpl(tpl1, qrcodeData);
	}, {
		time: "2",
		maskClose: true,
		refreshHand: function (expiredHand, dom, opt, voidEL) {
			console.log("点击刷新！！！");
			// console.log(a, b);
			expiredHand(dom, opt, voidEL);
		},
		autoRefreshHand: function () {
			console.log("自动刷新！！！");
		}
	});
// }




