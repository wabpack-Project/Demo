/**
 * 配置数据请求URL,本地还是URL
 * 1. 结构如下
 * adjust_output_edit 请求数据时，传入这个对象。具体请求reqUrl或者reqJson根据flag判断
 * 参数：1. reqUrl 请求接口地址（跨域请求本地开发和项目内开发）	2. reqJson	请求本地json文件
 * @param {Object} adjust_output_edit  调用reqUrl时请求的参数
 * @param {string} reqUrl  		开发环境请求接口URL
 * @param {string} reqDevUrl  本地环境请求接口URL
 * @param {string} reqJson  	本地环境请求本地json文件URL
 * @param {boolean} flag  		本地环境请求接口URL
 * */
// 设置请求接口URL还是本地json文件
data = {
	nursinglist: {
		reqJson : "js/packlist.json",
		flag		: true
	},
};

// http://m.lk.cn/2/vacc_getbabyinfo?child_id=00BC0A71-AAC2-4ADD-B117-527BBAACD3A2
// https://www.lancare.cc//1/vacc_bespeakdata
// groupId: 122
// tab: bespeak_data