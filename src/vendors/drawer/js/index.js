// 循环数据
function eachList(data) {
	var html = '<ul class="select_list">', i = 0, len = data.length;
	for (; i < len; i++){
		html += '<li>\n' +
			'  <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'  <div class="fr s_price"><em>￥</em>'+data[i].price+'</div>\n' +
			'  <div class="s_list_tit">\n' +
			'    <div>'+data[i].name+'</div>\n' +
			'  </div>\n' +
			'</li>';
	}
	html += '</ul>';
	return html;
}

// 统一调用方法和赋值方法
function getPacklistApi() {

	// 设置请求Url
	ajax.config.url = ajax.reqUrl(data.nursinglist, true);
	console.log(ajax.config.url);
	// 设置请求方式
	ajax.config.type = "get";
	console.log(ajax.config.type);

	// 请求data，并对数据进行处理（JQ调用方式）
	ajax.reqDataApi(ajax.config,function (res) {
		console.log(res);
		var code = res.res;
		if (code == 1) {
			// 渲染数据
			// _this.detailInfo = _this.formatDetailData(res.data);

			// 1. 先展示数据，再触发插件
			/*
			// 第一种方式
			var data = {
				noData: "无数据！",
				data: res.data,
			};

			// 渲染模板
			var _Html = miniTpl(tpl.list1, data);
			$(".dw_body").append(_Html);
			draw($("#draw_skin1"));
			*/
			// 第二种方式
			var _Html = eachList(res.data);
			$(".dw_body").append(_Html);
			// draw($("#draw_skin1"));
			/*
						draw({
							onShow: function (el) {
								console.log("弹窗显示后触发事件");
								$(".cancel").click(function () {
									el.hide();
								});
							},
						}, $("#draw_skin1"));
			*/
			// 1. DOM固定，jq对象触发
			/*
			draw({
				onShow: function (el) {
					console.log("弹窗显示后触发事件");
					$(".cancel").click(function () {
						el.hide();
					});
				},
			}, $("#draw_skin1"));
			*/
			// draw($("#draw_skin1"));

			// 2. DOM固定，字符串触发
			// draw(tpl.skin1);

			// 3. DOM固定，字符串触发
			// draw(tpl.skin1);

			// 8. dom结构固定，数据传入
			// /*
			draw({
				data: res.data,
				// data: [],
				// cancelBtn: "关闭",
				// apendClass	: "aaa",
				skin: 2,
				noData: "暂无套餐信息",
				apendClass: "aaa",
				onShow: function () {
					console.log("弹窗显示后触发事件");
				},
				onSure: function () {
					console.log("确认！");
				},		// 触发确认后事件
				onCancel: function () {
					console.log("取消！");
				},	// 触发取消或关闭后事件

			});
			// */

			// 9. dom结构固定，把页面指定元素插入
			// $("#timelinehtml")
			// document.getElementById("timelinehtml").innerText;
			/*
			draw({
				apendClass	: "dw_body",
				innerText	:	document.getElementById("timelinehtml").innerText,
			});
			*/
			// $(".select_list").append(document.getElementById("timelinehtml").innerText);

			// 10. 多层联动结构处理
			/*
			draw({
				data: res.data,
				// data: [],
				// cancelBtn: "关闭",
				// apendClass	: "aaa",
				skin: 2,
				noData: "暂无套餐信息",
				apendClass: "aaa",
				onShow: function () {
					console.log("弹窗显示后触发事件--1");

					$(".dw_h_name").click(function () {
						draw({
							data: res.data,
							// data: [],
							cancelTxt: "关闭",
							// apendClass	: "aaa",
							// maskClass: "",
							// mask: false,
							skin: 2,
							noData: "暂无套餐信息",
							apendClass: "aaa",
							onShow: function () {
								console.log("弹窗显示后触发事件--2");

								$(".dw_h_name").click(function () {
									draw({
										data: res.data,
										// data: [],
										cancelTxt: "关闭",
										// apendClass	: "aaa",
										// maskClass: "",
										// mask: false,
										skin: 2,
										noData: "暂无套餐信息",
										apendClass: "aaa",
										onShow: function () {
											console.log("弹窗显示后触发事件--3");

											$(".dw_h_name").click(function () {
												console.log("弹窗显示后触发事件--4");
											});

										},
										onSure: function () {
											console.log("确认！");

										},		// 触发确认后事件
										onCancel: function () {
											console.log("取消！");
										},	// 触发取消或关闭后事件

									});
								});

							},
							onSure: function () {
								console.log("确认！");

							},		// 触发确认后事件
							onCancel: function () {
								console.log("取消！");
							},	// 触发取消或关闭后事件

						});
					});

				},
				onSure: function () {
					console.log("确认！");



				},		// 触发确认后事件
				onCancel: function () {
					console.log("取消！");
				},	// 触发取消或关闭后事件

			});
			*/
		}
	});

};


getPacklistApi();
// draw.init();