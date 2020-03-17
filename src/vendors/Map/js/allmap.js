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
	var offsetY = 20,
		locationInfo = {
			point: {}
		};

	/**
	 * 实例化地图
	 * @param {String} id 			地图id
	 * @param {String} point 		地图中心点坐标
	 * @param {INT} scale 		地图缩放级别
	 */
	var instantiationMap = function (point, scale, id) {
		// 设置默认值，1. id默认值 allmap	2. point 默认(116.404, 39.915)	3. scale 默认15
		if (!id) id = "allmap";
		if (!point || (typeof point != "object")) {
			point = { lng: 116.404, lat: 39.915};
		}
		if (!scale) scale = 15;
		// 创建地图实例
		var map = new BMap.Map(id, {
				enableHighResolution: true //是否开启高清
			}),												// 创建地图实例
			point = new BMap.Point(point.lng, point.lat);		// 设置中心点坐标
			map.centerAndZoom(point, scale);									// 地图初始化，同时设置地图展示级别
		locationInfo.map = map;
		return map;
	};

	/**
	 * 设置当前坐标为中心点，并标记(包括配置标记图标)
	 * @param {String} point 	需要设为中心点的标记坐标
	 * @param {Object} map 		地图控件
	 */
	var setCenterPoint = function (point, map) {
		// 定义图标
		var myIcon = new BMap.Icon("http://api0.map.bdimg.com/images/geolocation-control/point/position-icon-14x14.png", new BMap.Size(23, 25), {
			// 指定定位位置。
			// 当标注显示在地图上时，其所指向的地理位置距离图标左上
			// 角各偏移10像素和25像素。您可以看到在本例中该位置即是
			// 图标中央下端的尖角位置。
			// anchor: new BMap.Size(10, 25),
			// 设置图片偏移。
			// 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
			// 需要指定大图的偏移位置，此做法与css sprites技术类似。
			imageOffset: new BMap.Size(0, 0 - 0 * 25)   // 设置图片偏移
		});
		// 定义标记
		var mk = new BMap.Marker(new BMap.Point(point.lng, point.lat), {
			icon: myIcon	// 引用icon
		});
		// 把标记添加到地图上
		map.addOverlay(mk);
		// 将地图中心移动到可视区中点
		map.panTo(point);
		var centerPixel = map.pointToOverlayPixel(map.getCenter());
		//通过设置地图的中心点，使定位点显示在手机上部分区域
		map.setCenter(map.overlayPixelToPoint({x:centerPixel.x, y:centerPixel.y + offsetY}));
	};

	/**
	 * 设置当前坐标为中心点，并标记(包括配置标记图标)
	 * @param {String} point 	需要标记坐标
	 * @param {Object} map 		地图控件
	 */
	var addMarker = function (point, map) {
		// 定义标记
		var mk = new BMap.Marker(new BMap.Point(point.lng, point.lat));
		// 把标记添加到地图上
		map.addOverlay(mk);
	};

	/**
	 * 根据标点的数组自动调整缩放级别
	 * @param {Array} 	bPoints 		标记点数组
	 * @param {Object} 	map 				地图控件
	 */
	var setZoom = function (bPoints, map) {
		// 根据提供的地理区域或坐标获得最佳的地图视野，返回的对象中包含center和zoom属性，分别表示地图的中心点和级别。此方法仅返回视野信息，不会将新的中心点和级别做用到当前地图上
		var view = map.getViewport(eval(bPoints));
		// 设置缩放级别
		var mapZoom = view.zoom - 1;
		// 设置中心点
		var centerPoint = view.center;
		// 缩放地图
		map.centerAndZoom(centerPoint, mapZoom);
	};

	/**
	 * 浏览器定位(手机端开启定位后，位置偏差较小)
	 * @param {Object} map 		地图控件
	 */
	var geolocation = function (map, callback) {
		var geolocation = new BMap.Geolocation();
		// 开启SDK辅助定位
		//geolocation.enableSDKLocation();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				// 定义图标
				var myIcon = new BMap.Icon("http://api0.map.bdimg.com/images/geolocation-control/point/position-icon-14x14.png", new BMap.Size(23, 25), {
					// 指定定位位置。
					// 当标注显示在地图上时，其所指向的地理位置距离图标左上
					// 角各偏移10像素和25像素。您可以看到在本例中该位置即是
					// 图标中央下端的尖角位置。
					// anchor: new BMap.Size(10, 25),
					// 设置图片偏移。
					// 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
					// 需要指定大图的偏移位置，此做法与css sprites技术类似。
					imageOffset: new BMap.Size(0, 0 - 0 * 25)   // 设置图片偏移
				});
				// 定义标记
				var mk = new BMap.Marker(r.point, {
					icon: myIcon	// 引用icon
				});
				// 添加标记
				map.addOverlay(mk);
				// /*
				//将地图中心移动到可视区中点
				map.panTo(r.point);
				console.log(0, r.point);
				console.log(0, r);
				var centerPixel = map.pointToOverlayPixel(map.getCenter());
				//通过设置地图的中心点，使定位点显示在手机上部分区域
				map.setCenter(map.overlayPixelToPoint({x:centerPixel.x, y:centerPixel.y + offsetY}));
				// */
				// alert('您的位置：'+r.point.lng+','+r.point.lat);
				// console.log(r);
				// console.log('您的位置经纬度：'+r.point.lng+','+r.point.lat);
				// 存储经纬度信息
				locationInfo.localPoint = r.point;
				// 解析经纬度
				geocoderAddr(r.point);
				// 根据经纬度解析城市编码
				// geocoderCode(r.point);
				// 判断是否有回调方法
				callback && callback();
			}
			else {
				alert('failed'+this.getStatus());
				console.log('failed'+this.getStatus());
			}
		},{enableHighAccuracy: true});
	};

	/**
	 * 根据坐标转换成城市编码
	 * @param {String} point 		需要转换的坐标
	 * */
	var geocoderCode = function (point) {
		$.ajax({
			url:'http://api.map.baidu.com/geocoder/v2/?ak=VTPNcUYwZdC70HoCHSrPCHSu&location=' + point.lat + ',' + point.lng + '&output=json&pois=0',
			dataType: 'jsonp',
			callback: 'BMap._rd._cbk43398',
			success: function(res) {
				console.log(res);
				var result = res.result,
					addressComponent = result.addressComponent,
					adcode = addressComponent.adcode
			} ,
			error:function(){

			}
		});
	};

	/**
	 * 获取拖动过后中心定位图标所在位置
	 * @param {Object} map 		地图控件
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
		console.log(Point);
		// 更新经纬度信息
		locationInfo.point = Point;
		// 解析经纬度
		geocoderAddr(Point);
	};

	/**
	 * 把坐标转换成地址
	 * @param {String} point 		需要转换的坐标
	 */
	var geocoderAddr = function (point) {
		// 创建地理编码实例
		var myGeo = new BMap.Geocoder(), addr;
		// 根据坐标得到地址描述
		myGeo.getLocation(point, function(result){
			if (result){
				// alert(result.address);
				console.log(result.address);
				// 储存地址信息和省市区信息
				locationInfo.address = result.address;
				locationInfo.addressComponents = result.addressComponents;
			}
		});
	};

	/**
	 * 把地址转换成坐标
	 * @param {String} addr 		请求初始化信息
	 * @param {String} city 		请求初始化信息
	 */
	var geocoderPoint = function (addr, city) {
		// 创建地址解析器实例
		var myGeo = new BMap.Geocoder();
		// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(addr, function(point){
			if (point) {
				console.log(point);
				// 更新经纬度信息
				locationInfo.point = point;
				// map.centerAndZoom(point, 16);
				// map.addOverlay(new BMap.Marker(point));
			}else{
				alert("您选择地址没有解析到结果!");
			}
		}, city);
	};

	/**
	 * 驾车路线
	 * @param {Object} map 		地图控件
	 */
	var drivingRoute = function (map, n) {
		//三种驾车策略：最少时间，最短距离，避开高速
		// var BMAP_DRIVING_POLICY_LEAST_TIME;
		var routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME,BMAP_DRIVING_POLICY_LEAST_DISTANCE,BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];
		var route = routePolicy[n||0];	// 设置路线
		// 实例化起点和终点
		var start = new BMap.Point(locationInfo.localPoint.lng, locationInfo.localPoint.lat);
		var end = new BMap.Point(locationInfo.endPoint.lng, locationInfo.endPoint.lat);
		// 规划路线（配置路线待完善）
		var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true},policy: route});
		driving.search(start, end);
		// driving.search("天安门", "百度大厦");
	};

	/**
	 * 添加定位控件
	 * @param {Object} map 		地图控件
	 */
	var addGeolocationControl = function (map) {
		// 添加定位控件
		var geoCtrl = new BMap.GeolocationControl({
			anchor : BMAP_ANCHOR_BOTTOM_RIGHT,
			showAddressBar     : true, 		//是否显示
			enableAutoLocation : true,		 //首次是否进行自动定位
			offset             : new BMap.Size(10, 10),
			// locationIcon     	 : icon //定位的icon图标
		});

		// 将定位控件添加到地图
		map.addControl(geoCtrl);

		//监听定位成功事件
		geoCtrl.addEventListener("locationSuccess",function(e){
			console.log(e);
		});
		//监听定位失败事件
		geoCtrl.addEventListener("locationError",function(e){
			console.log(e);
		});

		// 开始进行定位
		geoCtrl.location();
		// alert(geoCtrl.getAddressComponent());
		return geoCtrl;
	};

	/**
	 * 初始化方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var init = function (point, endPoint, scale, id) {
		// console.log("初始化！！！");
		// 定义标记数组
		var bPoints = [point, endPoint];
		// 创建地图实例
		var map = instantiationMap(id, point, scale);
		// 设置中心点并标记
		setCenterPoint(point, map);
		// 添加定位控件
		// addGeolocationControl(map);
		// 添加标记点
		addMarker(endPoint, map);
		// 根据标点的数组自动调整缩放级别
		setTimeout(function () {
			setZoom(bPoints, map);
		}, 500);

		// 窗口大小发生变化，触发resize方法
		window.onresize = function() {
			setZoom(bPoints, map);
		};

		// 存储坐标信息
		locationInfo.localPoint = point;
		locationInfo.endPoint = endPoint;
		// 返回地图控件
		return map;
	};

	// 提供外部调用的参数和方法
	return {
		init : init,
		locationInfo : locationInfo,
		drivingRoute : drivingRoute,
		geocoderPoint : geocoderPoint,
		geolocation: geolocation,
	};
}));
