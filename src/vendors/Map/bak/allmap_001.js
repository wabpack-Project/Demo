(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(factory);
	} else if (typeof exports === 'object') {
		// Node, CommonJS-like
		// es6 module , typescript
		var mo = factory();
		mo.__esModule = true;
		mo['default'] = mo;
		module.exports = mo;
	} else {
		// browser
		root.map = factory();
	}
}(this, function () {


	var offsetY = 20;
	var locationInfo = {
		point: {
			lng: 0,
			lat: 0
		}
	};

	/**
	 * 实例化地图
	 * @param {Function} id 		请求初始化信息
	 */
	var instantiationMap = function (id, point, scale) {
		// 设置默认值，1. id默认值 allmap	2. point 默认(116.404, 39.915)	3. scale 默认15
		if (!id) id = "allmap";
		if (!point || (typeof point != "object")) {
			point = { lng: 116.404, lat: 39.915};
		}
		if (!scale) scale = 15;
		// 创建地图实例
		var map = new BMap.Map(id),												// 创建地图实例
			point = new BMap.Point(point.lng, point.lat);		// 设置中心点坐标
			map.centerAndZoom(point, scale);									// 地图初始化，同时设置地图展示级别

		return map;
	};

	/**
	 * 浏览器定位
	 * @param {Function} examine 		请求初始化信息
	 */
	var geolocation = function (map, callback) {
		var geolocation = new BMap.Geolocation();

		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				var mk = new BMap.Marker(r.point);
				map.addOverlay(mk);
				//将地图中心移动到可视区中点
				map.panTo(r.point);
				var centerPixel = map.pointToOverlayPixel(map.getCenter());
				//通过设置地图的中心点，使定位点显示在手机上部分区域
				map.setCenter(map.overlayPixelToPoint({x:centerPixel.x,y:centerPixel.y+offsetY}));
				/*
				map.addEventListener('dragend',function(){
					//获得移动之后地图中心点的像素位置
					var pixel = map.pointToOverlayPixel(map.getCenter());
					map.clearOverlays();
					// map.removeOverlay(mk.getLabel());//删除之前的label
					//获得定位图标所在位置在地图上的地理位置，实际上定位图标的像素位置就在地图中心像素位置相应的偏移量处
					var Point = map.overlayPixelToPoint({x:pixel.x,y:pixel.y-offsetY});
					var mkn = new BMap.Marker(Point);
					map.addOverlay(mkn);
				});
*/
				// alert('您的位置：'+r.point.lng+','+r.point.lat);
				// console.log(r);
				console.log('您的位置经纬度：'+r.point.lng+','+r.point.lat);
				// console.log('您的位置地址：' + r.address.province + r.address.city + (r.address.district||"") + (r.address.street||"") + (r.address.streetNumber||""));
				callback(r.point);
			}
			else {
				alert('failed'+this.getStatus());
				console.log('failed'+this.getStatus());
			}
		});
	};

	/**
	 * 获取拖动过后中心定位图标所在位置
	 * @param {Function} examine 		请求初始化信息
	 */
	var dragendMap = function (map) {
		//获得移动之后地图中心点的像素位置
		var pixel = map.pointToOverlayPixel(map.getCenter());
		map.clearOverlays();
		// map.removeOverlay(mk.getLabel());//删除之前的label
		//获得定位图标所在位置在地图上的地理位置，实际上定位图标的像素位置就在地图中心像素位置相应的偏移量处
		var Point = map.overlayPixelToPoint({x:pixel.x,y:pixel.y-offsetY});
		var mkn = new BMap.Marker(Point);
		map.addOverlay(mkn);

		var addr = geocoder(Point);

	};

	/**
	 * 地址解析
	 * @param {Function} examine 		请求初始化信息
	 */
	var geocoder = function (point) {
		// 创建地理编码实例
		var myGeo = new BMap.Geocoder(), addr;
		// 根据坐标得到地址描述
		myGeo.getLocation(point, function(result){
			if (result){
				// alert(result.address);
				console.log(result.address);
				addr = result.address;
			}
		});
		return addr;
	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (id, point, scale) {
		console.log("初始化！！！");
		// 创建地图实例
		var map = instantiationMap(id, point, scale);
		// 浏览器定位
		geolocation(map, function (point) {
			console.log("定位成功！！！" + point);
			// var addr = geocoder(point);
			// console.log("您的位置：", addr);
		});
		// 监听地图拖拽事件
		map.addEventListener('dragend',function(){
			dragendMap(map);
		});

	};

	// 提供外部调用的参数和方法
	return {
		init: init
	};
}));
