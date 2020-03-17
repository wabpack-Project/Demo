(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.linkage = factory();
	}
})(this, function() {

	// 设置默认参数
	var global = {
		city: {},
		selectCity: {},
		defCss: '.drawer { position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: 100; display: none; }\n' +
			'.drawer_mask { width: 100%; height: 100%; background: #000000; opacity: 0.3; }\n' +
			'.drawer_out { position: absolute; bottom: 0; left: 0; width: 100%; }\n' +
			'.drawer_cont { background: #fff; }\n' +
			'.dw_m92 { padding: 0 4%; width: 92%; }\n' +
			'.dw_head { height: 2.5rem; line-height: 2.5rem; background: #f1f5f7; position: absolute;\n' +
			'    top: -2.5rem; left: 0; }\n' +
			'.dw_head .cancel { color: #111; font-size: .75rem; }\n' +
			'.dw_head .confirm { color: #00a7ff; font-size: .75rem; }\n' +
			'.dw_h_name { color: #111; font-size: .85rem; padding: 0 1.8rem; text-align: center; }\n' +
			'.dw_body { overflow-y: auto; background: #fff; max-height:22.5rem; }\n' +
			'\n' +
			'/** 选项卡样式 */\n' +
			'.tab { }\n' +
			'.tab_head { width: 100%; overflow-x: auto; padding-bottom: .4rem; }\n' +
			'.tab_body { max-height: 19rem; overflow-y: auto; padding-bottom: .5rem; }\n' +
			'.tab_list { display: inline-block; border-bottom: none; height: 2.4rem; white-space: nowrap; position: relative; padding-top: .1rem; }\n' +
			'.tab_list li { display: inline-block; line-height: 2.4rem; margin-left: 1.2rem; color: #000; font-size: .75rem; }\n' +
			'.tab_list li:first-child { margin-left: 0; }\n' +
			'.tab_list .line { background: #ff6050; width: 1.4rem; height: .15rem;\n' +
			'    position: absolute; bottom: 0; left: .5rem; }\n' +
			'\n' +
			'/** 列表样式 */\n' +
			'.city_list { padding-top: .3rem; }\n' +
			'.city_list li { }\n' +
			'.c_list_tit { padding-top: .4rem; line-height: 1.8rem; font-size: .75rem; color: #000; }\n' +
			'.c_list_tit span { float: left; padding-right: .15rem; }\n' +
			'.c_list_tit .s_select { display: none; }\n' +
			'.city_list li.cur div { font-weight: bolder; }\n' +
			'.city_list li.cur .s_select { display: block; }\n' +
			'.s_select { font-size: .75rem; }\n' +
			'.iconxuanzhong { color: #ddd; }\n' +
			'.iconiconfontxuanzhong4 { color: #ff6050; font-size: .85rem; }',
		defTpl: '<div class="drawer provinces" id="province" style="display: block;" >\n' +
			'  <%\n' +
			'  if(data.isMask) {\n' +
			'  %>\n' +
			'  <div class="drawer_mask"></div>\n' +
			'  <%\n' +
			'  }\n' +
			'  %>\n' +
			'  <div class="drawer_out">\n' +
			'    <!--<div class="drawer_cont">-->\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <%\n' +
			'      if(data.isCancel) {\n' +
			'      %>\n' +
			'      <div class="fl">\n' +
			'        <a href="javascript:;" class="cancel  <%=data.cancelBtn+\'-\'+data.hash%>"><%=data.cancelTxt%></a>\n' +
			'      </div>\n' +
			'      <%\n' +
			'      }\n' +
			'      if(data.isSure) {\n' +
			'      %>\n' +
			'      <div class="fr">\n' +
			'        <a href="javascript:;" class="confirm  <%=data.sureBtn+\'-\'+data.hash%>"><%=data.sureTxt%></a>\n' +
			'      </div>\n' +
			'      <%\n' +
			'      }\n' +
			'      %>\n' +
			'      <div class="dw_h_name"><%=data.title%></div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <!-- 选项卡 -->\n' +
			'      <div class="tab_head">\n' +
			'        <ul class="tab_list">\n' +
			'          <!-- 省 -->\n' +
			'          <%\n' +
			'          if(data.provinceName) {\n' +
			'          %>\n' +
			'          <li attr_sort="province" attr_id="provinceID" ><%=data.provinceName%></li>\n' +
			'          <%\n' +
			'          } else {\n' +
			'          %>\n' +
			'          <li attr_sort="province" attr_id="provinceID">请选择</li>\n' +
			'          <% } %>\n' +
			'          <!-- 市 -->\n' +
			'          <%\n' +
			'          if(data.cityName) {\n' +
			'          %>\n' +
			'          <li attr_sort="city" attr_id="cityID"><%=data.cityName%></li>\n' +
			'          <%\n' +
			'          } else {\n' +
			'          %>\n' +
			'          <li attr_sort="city" attr_id="cityID">请选择</li>\n' +
			'          <% } %>\n' +
			'          <!-- 区 -->\n' +
			'          <%\n' +
			'          if(data.areaName) {\n' +
			'          %>\n' +
			'          <li attr_sort="area" attr_id="areaID"><%=data.areaName%></li>\n' +
			'          <%\n' +
			'          } else {\n' +
			'          %>\n' +
			'          <li attr_sort="area" attr_id="areaID">请选择</li>\n' +
			'          <% } %>\n' +
			'          <!-- 街道 -->\n' +
			'          <%\n' +
			'          if(data.streetName) {\n' +
			'          %>\n' +
			'          <li attr_sort="street" attr_id="id"><%=data.streetName%></li>\n' +
			'          <%\n' +
			'          } else {\n' +
			'          %>\n' +
			'          <li attr_sort="street" attr_id="id">请选择</li>\n' +
			'          <% } %>\n' +
			'          <!-- 社区 -->\n' +
			'          <%\n' +
			'          if(data.villageName) {\n' +
			'          %>\n' +
			'          <li attr_sort="village" attr_id="id"><%=data.villageName%></li>\n' +
			'          <%\n' +
			'          } else {\n' +
			'          %>\n' +
			'          <li attr_sort="village" attr_id="id">请选择</li>\n' +
			'          <% } %>\n' +
			'          <!-- 小区 -->\n' +
			'          <%\n' +
			'          if(data.communityName) {\n' +
			'          %>\n' +
			'          <li attr_sort="community" attr_id="id"><%=data.communityName%></li>\n' +
			'          <%\n' +
			'          } else {\n' +
			'          %>\n' +
			'          <li attr_sort="community" attr_id="id">请选择</li>\n' +
			'          <% } %>\n' +
			'          <div class="line"></div>\n' +
			'        </ul>\n' +
			'      </div>\n' +
			'      <!-- 列表 -->\n' +
			'      <div class="tab_body">\n' +
			'        <!-- 省 -->\n' +
			'        <ul class="city_list list_bt province_l" >\n' +
			'          <%\n' +
			'          var i = 0, province_d = data.data.province;\n' +
			'          if(!province_d) {\n' +
			'          %>\n' +
			'          <li class="">\n' +
			'            <div class="no_data"><%=data.noData%></div>\n' +
			'          </li>\n' +
			'          <% } else {\n' +
			'          for(i in province_d){\n' +
			'          var province = province_d[i];\n' +
			'          %>\n' +
			'          <%\n' +
			'          if(province.name == data.provinceName) {\n' +
			'          %>\n' +
			'            <li class="cur" attr_sort="province" attr_id="<%=province.provinceID%>" attr_name="<%=province.name%>">\n' +
			'          <% } else { %>\n' +
			'            <li attr_sort="province" attr_id="<%=province.provinceID%>" attr_name="<%=province.name%>">\n' +
			'          <% } %>\n' +
			'            <div class="c_list_tit">\n' +
			'              <span class="iconfont iconiconfontxuanzhong4 s_select"></span>\n' +
			'              <div attr_id="<%=province.provinceID%>">\n' +
			'                <%=province.name%>\n' +
			'              </div>\n' +
			'            </div>\n' +
			'          </li>\n' +
			'          <% } } %>\n' +
			'        </ul>\n' +
			'        <!-- 市 -->\n' +
			'        <ul class="city_list list_bt city_l" style="display: none" >\n' +
			'          <%\n' +
			'          var j = 0, city_d = data.data.city[data.provinceId];\n' +
			'          if(!city_d) {\n' +
			'          %>\n' +
			'          <li class="">\n' +
			'            <div class="no_data"><%=data.noData%></div>\n' +
			'          </li>\n' +
			'          <% } else {\n' +
			'          for(j in city_d){\n' +
			'          var city = city_d[j];\n' +
			'          %>\n' +
			'          <%\n' +
			'          if(city.name == data.cityName) {\n' +
			'          %>\n' +
			'          <li class="cur" attr_sort="city" attr_id="<%=city.cityID%>" attr_name="<%=city.name%>">\n' +
			'            <% } else { %>\n' +
			'          <li attr_sort="city" attr_id="<%=city.cityID%>" attr_name="<%=city.name%>">\n' +
			'            <% } %>\n' +
			'            <div class="c_list_tit">\n' +
			'              <span class="iconfont iconiconfontxuanzhong4 s_select"></span>\n' +
			'              <div attr_id="<%=city.cityID%>">\n' +
			'                <%=city.name%>\n' +
			'              </div>\n' +
			'            </div>\n' +
			'          </li>\n' +
			'          <% } } %>\n' +
			'        </ul>\n' +
			'        <!-- 区 -->\n' +
			'        <ul class="city_list list_bt area_l" style="display: none">\n' +
			'          <%\n' +
			'          var k = 0, area_d = data.data.area[data.cityId];\n' +
			'          if(!area_d) {\n' +
			'          %>\n' +
			'          <li class="">\n' +
			'            <div class="no_data"><%=data.noData%></div>\n' +
			'          </li>\n' +
			'          <% } else {\n' +
			'          for(k in area_d){\n' +
			'          var area = area_d[k];\n' +
			'          %>\n' +
			'          <%\n' +
			'          if(area.name == data.areaName) {\n' +
			'          %>\n' +
			'          <li class="cur" attr_sort="area" attr_id="<%=area.areaID%>" attr_name="<%=area.name%>">\n' +
			'            <% } else { %>\n' +
			'          <li attr_sort="area" attr_id="<%=area.areaID%>" attr_name="<%=area.name%>">\n' +
			'            <% } %>\n' +
			'            <div class="c_list_tit">\n' +
			'              <span class="iconfont iconiconfontxuanzhong4 s_select"></span>\n' +
			'              <div attr_id="<%=area.areaID%>">\n' +
			'                <%=area.name%>\n' +
			'              </div>\n' +
			'            </div>\n' +
			'          </li>\n' +
			'          <% } } %>\n' +
			'        </ul>\n' +
			'        <!-- 街道 -->\n' +
			'        <ul class="city_list list_bt street_l"  style="display: none" >\n' +
			'          <%\n' +
			'          var i = 0, street_d = data.data.street;\n' +
			'          if(!street_d) {\n' +
			'          %>\n' +
			'          <li class="">\n' +
			'            <div class="no_data"><%=data.noData%></div>\n' +
			'          </li>\n' +
			'          <% } else {\n' +
			'          for(i in street_d){\n' +
			'          var street = street_d[i];\n' +
			'          %>\n' +
			'          <%\n' +
			'          if(street.name == data.streetName) {\n' +
			'          %>\n' +
			'          <li class="cur" attr_sort="street" attr_id="<%=street.id%>" attr_name="<%=street.name%>">\n' +
			'            <% } else { %>\n' +
			'          <li attr_sort="street" attr_id="<%=street.id%>" attr_name="<%=street.name%>">\n' +
			'            <% } %>\n' +
			'            <div class="c_list_tit">\n' +
			'              <span class="iconfont iconiconfontxuanzhong4 s_select"></span>\n' +
			'              <div attr_id="<%=street.id%>">\n' +
			'                <%=street.name%>\n' +
			'              </div>\n' +
			'            </div>\n' +
			'          </li>\n' +
			'          <% } } %>\n' +
			'        </ul>\n' +
			'        <!-- 社区 -->\n' +
			'        <ul class="city_list list_bt village_l"  style="display: none" >\n' +
			'          <%\n' +
			'          var i = 0, village_d = data.data.village;\n' +
			'          if(!village_d) {\n' +
			'          %>\n' +
			'          <li class="">\n' +
			'            <div class="no_data"><%=data.noData%></div>\n' +
			'          </li>\n' +
			'          <% } else {\n' +
			'          for(i in village_d){\n' +
			'          var village = village_d[i];\n' +
			'          %>\n' +
			'          <%\n' +
			'          if(village.name == data.villageName) {\n' +
			'          %>\n' +
			'          <li class="cur" attr_sort="village" attr_id="<%=village.id%>" attr_name="<%=village.name%>">\n' +
			'            <% } else { %>\n' +
			'          <li attr_sort="village" attr_id="<%=village.id%>" attr_name="<%=village.name%>">\n' +
			'            <% } %>\n' +
			'            <div class="c_list_tit">\n' +
			'              <span class="iconfont iconiconfontxuanzhong4 s_select"></span>\n' +
			'              <div attr_id="<%=village.id%>">\n' +
			'                <%=village.name%>\n' +
			'              </div>\n' +
			'            </div>\n' +
			'          </li>\n' +
			'          <% } } %>\n' +
			'        </ul>\n' +
			'        <!-- 小区 -->\n' +
			'        <ul class="city_list list_bt community_l"  style="display: none" >\n' +
			'          <%\n' +
			'          var i = 0, community_d = data.data.community;\n' +
			'          if(!community_d) {\n' +
			'          %>\n' +
			'          <li class="">\n' +
			'            <div class="no_data"><%=data.noData%></div>\n' +
			'          </li>\n' +
			'          <% } else {\n' +
			'          for(i in community_d){\n' +
			'          var community = community_d[i];\n' +
			'          %>\n' +
			'          <%\n' +
			'          if(community.name == data.communityName) {\n' +
			'          %>\n' +
			'          <li class="cur" attr_sort="community" attr_id="<%=community.id%>" attr_name="<%=community.name%>">\n' +
			'            <% } else { %>\n' +
			'          <li attr_sort="community" attr_id="<%=community.id%>" attr_name="<%=community.name%>">\n' +
			'            <% } %>\n' +
			'            <div class="c_list_tit">\n' +
			'              <span class="iconfont iconiconfontxuanzhong4 s_select"></span>\n' +
			'              <div attr_id="<%=community.id%>">\n' +
			'                <%=community.name%>\n' +
			'              </div>\n' +
			'            </div>\n' +
			'          </li>\n' +
			'          <% } } %>\n' +
			'        </ul>\n' +
			'        <!-- end -->\n' +
			'      </div>\n' +
			'      <!-- end -->\n' +
			'    </div>\n' +
			'    <!--</div>-->\n' +
			'  </div>\n' +
			'</div>',
		listTpl: '<ul class="city_list list_bt <%=data.sort%>_l" >\n' +
			'          <%\n' +
			'          var i = 0, _list = data.data;\n' +
			'          if(!_list) {\n' +
			'          %>\n' +
			'          <li class="">\n' +
			'            <div class="no_data"><%=data.noData%></div>\n' +
			'          </li>\n' +
			'          <% } else {\n' +
			'          for(i in _list){\n' +
			'          var listInfo = _list[i];\n' +
			'          %>\n' +
			'          <%\n' +
			'          if(listInfo.name == data.dName) {\n' +
			'          %>\n' +
			'            <li class="cur" attr_sort="<%=data.sort%>" attr_id="<%=listInfo[data.dID]%>" attr_name="<%=listInfo.name%>">\n' +
			'          <% } else { %>\n' +
			'            <li attr_sort="<%=data.sort%>" attr_id="<%=listInfo[data.dID]%>" attr_name="<%=listInfo.name%>">\n' +
			'          <% } %>\n' +
			'            <div class="c_list_tit">\n' +
			'              <span class="iconfont iconiconfontxuanzhong4 s_select"></span>\n' +
			'              <div attr_id="<%=listInfo[data.dID]%>">\n' +
			'                <%=listInfo.name%>\n' +
			'              </div>\n' +
			'            </div>\n' +
			'          </li>\n' +
			'          <% } } %>\n' +
			'</ul>',
	};

	/**
	 * 工具类
	 *
	 * */
	// 对象合并
	function extend(o, n, override) {
		for(var key in n){
			if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
				o[key]=n[key];
			}
		}
		return o;
	}

	/**
	 * 生成Hash
	 * @param {Object} len 		Hash位数
	 * */
	var createHash = function(len){
		if (!len || typeof(Number(len)) != 'number') {return;}
		var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		var hs = [];
		var hl = Number(len);
		var al = ar.length;
		for (var i = 0; i < hl; i++) {
			hs.push(ar[Math.floor(Math.random() * al)]);
		}
		return hs.join('');
	};

	/**
	 * 判断数据类型
	 * @param {Object} len 		Hash位数
	 * */
	var isObjFunc = function(type) {
		var _toString = Object.prototype.toString;
		return function() {
			return _toString.call(arguments[0]) === '[object ' + type + ']'
		}
	};

	// 判断是函数（方法）
	var isFunction = function() {
		return isObjFunc("Function")(arguments[0]);
	};

	// 判断是对象
	var isObject = function() {
		return isObjFunc("Object")(arguments[0]);
	};

	// 判断是字符串
	var isString = function() {
		return isObjFunc("String")(arguments[0]);
	};

	/**
	 * 字符串转DOM
	 * @param {Object} len 		Hash位数
	 * */
	var parseDom = function(str){
		var objEl = document.createElement("div");
		objEl.innerHTML = str;
		return objEl.childNodes;
	};

	/**
	 * 删除字符串左右空格
	 * @param str		{string}	字符串
	 * @returns {void | string | never}
	 */
	function trim(str){
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}

	/**
	 *  dom 操作
	 * */
		// 设置DOM属性
	var setDomAttribute = function (el, hash) {
			// 给DOM添加HASH属性
			el.setAttribute('data-v', hash);
			// console.log(el);
		};

	// 移除已经存在的轻提示框
	var removeBeDom = function (className, defClassName) {
		if (!className){
			className = defClassName;
		}
		var _d = document.getElementsByClassName(className);
		if (_d && _d.length > 0){
			_d[0].remove();
		}
	};

	// 清空所有子节点
	var clearChildNodes = function (className) {
		var el = document.getElementsByClassName(className)[0];
		var childs = el.childNodes;
		for(var i = childs.length - 1; i >= 0; i--) {
			el.removeChild(childs[i]);
		}
	};

	// 载入DOM到页面
	var insertHtml = function (dom, apendEl) {
		// console.log(apendEl);
		// 判断apendEl是否存在, 没有设置默认值为 body
		if (!apendEl || (apendEl == "body")) {
			// 插入到body的最前面
			// var firstEl = document.body.firstChild;//得到页面的第一个元素
			// document.body.insertBefore(html, firstEl);
			document.body.append(dom);
		} else {
			// 判断插入的class是否存在
			if (document.getElementsByClassName(apendEl).length > 0) {
				document.getElementsByClassName(apendEl)[0].append(dom);
			} else {
				console.log("插入class不存在！");
				return;
			}
		}
	};

	// 移除DOM
	var removeDom = function (dom) {
		// 判断DOM是否存在
		if (!dom){
			console.log("请配置要移除的DOM~");
			return;
		}
		// 移除插件dom
		dom.remove();
	};
	// 移除插件
	var removePlug = function (dom, obj) {
		// console.log("隐藏！");
		// 移除插件dom
		removeDom(dom);
		if (!isObject(obj)){
			console.log("请配置要移除插件CSS~");
			return;
		}
		// 移除插件css
		removeStyle(obj);
	};

	/**
	 * CLASS 操作
	 * */
	// 新增CLASS
	var addClass = function (dom, className) {
		// 判断className类型
		if (isFunction(className)){
			className = className();
		} else if (isString(className)) {
			className = className;
		} else {
			console.log("className只支持callback和字符串");
			return;
		}
		// 获取当前class
		var domClass  = dom.className;
		// 判断当前class是否存在
		if (!!domClass && (domClass.indexOf(className)==-1)) {
			// 追加class
			domClass = domClass.concat(" ", className);
		} else {
			domClass = className;
		}
		// console.log(domClass);
		// 更新DOM元素Class
		dom.className = domClass;
	};
	// 移除CLASS
	var removeClass = function (dom, className) {
		// 判断cls类型
		if (isString(className)) {
			className = className;
		} else if (isFunction(className)){
			className = className();
		} else {
			console.log("className只支持callback和字符串");
			return;
		}
		// 定义字符串正则
		var reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
		// 判断class是否存在
		if (reg.test(dom.className)) {
			dom.className = dom.className.replace(className, '').replace(/(^\s*)|(\s*$)/g, "");
		}
	};

	/**
	 * CSS 操作
	 * */
	// 载入默认css
	var loadCss = function (str, v, inject) {
		// console.log(global.defSkin.css);
		// 设置默认插入位置
		if (!inject) inject = "head";
		// 设置默认css
		if (!str) {
			console.log("你还没有配置样式~");
			return;
		}
		// 创建样式
		var style = document.createElement("style");
		style.type = "text/css";
		style.setAttribute('data_style', v);
		style.innerHTML = str;
		// 存储样式属性
		// this.attrStyle = 'data_style';
		// console.log(style);
		// 样式插入位置
		var _inject = document.getElementsByTagName(inject)[0];

		// 样式载入到页面指定位置
		_inject.appendChild(style);
	};
	// 移除CSS
	var removeStyle = function (obj) {
		// 判断参数不存在(hash必须)
		if (!obj || !obj.hash){
			console.log("请配置正确的参数~");
			return;
		}
		// 判断参数是对象，为组件内移除
		key = obj.styleName || "data_style";
		val = obj.hash;
		// 设置默认移除元素范围
		var attr = 'style';
		// 判断属性是否存在
		if (key){ attr = 'style['+ key +']'; }
		// 判断属性值是否存在
		if (val){ attr = 'style['+ key +'="'+ val +'"]'; }
		// console.log(attr);
		var _style = document.querySelectorAll(attr);
		// console.log(_style);
		if (_style.length > 1){	// 判断是多个元素
			removeAllStyle(_style);
		} else if (_style.length > 0) {	// 判断只有一个元素
			_style[0].remove();
		}
	};

	// 移除多个DOM元素
	var removeAllStyle = function (d) {
		// 获取元素信息
		var i = 0, len = d.length;
		// 遍历元素
		for (; i<len; i++){
			d[i].remove();
		}
	};

	/**
	 * 模板操作
	 * */
	// 获取插件tpl
	var getTpl = function (tpl, callback, d) {
		// 定义变量
		var _tpl;
		// 判断是否有自定义模板
		if (!tpl){		// 自定义模板不存在，使用指定类型模板
			// 获取默认模块模板
			_tpl = global.defTpl;
			// 判断是否有回调方法，替换模板内容
			if (callback) {
				_tpl = callback(_tpl, d);
			}
			// 标记使用默认模板
			global.isDef = true;
		} else if (isFunction(tpl)) {	// 数据替换html变量生成模板
			// 渲染模板
			_tpl = tpl();
		} else if (isString(tpl)) {	// 字符串模板
			// tpl存在，检测不是html字符串
			if (checkHtml(tpl)) {
				_tpl = tpl;
			} else {
				// tpl不是html字符串，把tpl设为标题
				// global.tit = tpl;
				global.title = tpl;
				// 获取默认模块模板
				_tpl = global.defTpl;
				// 标记使用默认模板
				global.isDef = true;
			}
		} else if (isNumber(tpl)){
			// 更新插件文本
			global.title = tpl;
			// 获取默认模块模板
			_tpl = global.defTpl;
			// 标记使用默认模板
			global.isDef = true;
		}
		return _tpl;
	};

	/**
	 * 创建构造函数
	 * @param {Array<{type:number,txt:string}>} list
	 */
	var _linkage = function (opt, tpl) {
		/**
		 * 定义默认参数
		 * @param {Array<{type:number,txt:string}>} list
		 */
		var def = {
			// 文字
			title: "请选择所在地区",	// 标题
			sureTxt: "确定",		// 确定文字
			cancelTxt: "取消",	// 取消文字
			noData: "暂无信息",
			// Class配置
			sureBtn: "confirm_opt",		// 确定按钮class
			cancelBtn: "cancel_opt",	// 取消按钮class
			maskClass: "mask_opt",
			apendClass	: "body",
			// 样式配置
			height: "",
			z_index: 100,
			opacity: 0.3,
			// 是否启用开关
			isMask: false, 			// 是否显示半透明背景
			maskClose: false,  // 是否点击半透明背景隐藏弹出框
			isDestroy: true,	 // 是否销毁
			isSure: true,			// 是否显示确认操作
			isCancel: false,		// 是否显示取消操作
			// 数据相关
			data: null,				// 是否传入数据
			time: 2000,				// 定时器
			level: 6,					// 联动层级数量
			// 回调方法
			replaceTpl: null, 	// 替换模板方法
			onShow: null, 	// 弹窗显示后触发事件
			onClose: null, 	// 弹窗关闭后触发事件
			onSure: null,		// 触发确认后事件
			onCancel: null,	// 触发取消或关闭后事件
			updateList: null,		// 更新列表方法
			assignmentHand: null,		// 选中最后一项，赋值回调方法

		};
		// 合并参数
		this.opts = extend(def, opt, true);
		// console.log(this.opts);
		// 生成Hash
		this.hash = createHash(8);
		// console.log(this.hash);
		this.init(tpl, this.opts);
	};

	/**
	 * 定义构造函数方法
	 * @param {Array<{type:number,txt:string}>} list
	 */
	_linkage.prototype = {
		init: function (tpl, obj) {
			// console.log("初始化方法！");
			// console.log(tpl);
			// console.log(this.opts);
			// 拼接替换数据
			// var d = obj;
			obj.hash = this.hash;
			// 获取插件模板
			var _tpl = getTpl(tpl, this.opts.replaceTpl, obj);
			// 模板转换成DOM, 并返回DOM
			var _dom = parseDom(_tpl)[0];
			// console.log(_dom);
			// 储存插件DOM
			this.el = _dom;
			// 存储城市数据
			global.city = this.opts.data;
			// 设置DOM属性
			setDomAttribute(_dom, this.hash);
			// console.log(_dom);
			// 移除已有插件
			removeBeDom(this.opts.removeEl, "provinces");
			// 判断使用默认模板，并加载默认CSS
			if (global.isDef){
				loadCss(global.defCss, this.hash);
			}
			// 把DOM插入到页面
			insertHtml(_dom, this.opts.injectSite);

			// 获取TAB元素
			var tabEl = _dom.getElementsByClassName("tab_head")[0].getElementsByTagName("li");
			// 根据联动层级数量显示对应的TAB
			this.hideTab(tabEl, obj.level, _dom);
			// 判断是否有回调方法，没有绑定默认事件
			if (this.opts.onShow) {
				this.opts.onShow(_dom, this, tabEl);
			} else {
				// 默认绑定事件
				this.bindEvent(_dom, this, tabEl);
			}
			// 返回原型链
			return this;

		},
		// TAB操作，默认显示第一个TAB
		hideTab: function(tabEl, lev, dom) {
			// 默认隐藏所有选项卡
			var i = 0, flag = true, last = 0, len = tabEl.length;
			// 循环遍历
			for (; i<len; i++){
				// 默认全部隐藏
				tabEl[i].style.display = "none";
				// 判断是否有已选择值
				if (tabEl[i].textContent == "请选择"){
					// 判断是首次加载, 不触发显示选项卡操作
					if (lev == this.opts.level) {
						console.log("首次加载~");
					} else if (flag) {	// 判断不是第一个请选择
						tabEl[i].style.display = "inline-block";
						// 关闭显示操作
						flag = false;
						// 标记当前是第一个选项卡
					}
				} else {
					// 判断是否超出层级数
					if (i < lev) {
						tabEl[i].style.display = "inline-block";
					}
					// 储存最后一个，非请选择值
					last = i;
				}
			}
			// 判断是首次加载, 设置选项卡停留在最后
			if (lev == this.opts.level) {
				console.log("不是请选择，首次加载~");
				// this.updateTab(tabEl[i]);
				this.last = last;
				// 选中操作
				this.selectTabHand(tabEl[last], tabEl, dom);
			}

			// 判断第一项是否有值，没值默认显示第一个
			// if (tabEl[0].textContent == "请选择"){
			// 	tabEl[0].style.display = "inline-block";
			// }
		},
		// 隐藏所有列表
		hideAllList: function(dom) {
			// 获取要隐藏的列表
			var _ul = dom.getElementsByClassName("tab_body")[0].getElementsByTagName("ul"); // 多个联动列表
			// 定义初始化参数
			var i = 0, len = _ul.length;
			for (; i<len; i++) {
				// 默认全部隐藏
				_ul[i].style.display = "none";
			}
		},
		// 绑定事件
		bindEvent: function (dom, obj, tabEl) {
			// 绑定联动列表点击事件
			this.listClickEvent(dom, tabEl);
			// return;
			// 绑定选项卡点击事件
			this.tabClickEvent(tabEl, dom);
			return;
			setTimeout(function () {
				var plugObj = {
					styleName: "data_style",
					domName: "data-v",
					hash: obj.hash,
				};
				removePlug(dom, plugObj);
			}, obj.opts.time);
		},
		// 绑定联动列表点击事件
		listClickEvent: function(dom, tabEl) {
			var _this = this;
			// 获取要绑定元素
			var el = dom.getElementsByClassName("tab_body")[0].getElementsByTagName("ul")[this.last].getElementsByTagName("li");	// 联动列表
			// 定义循环变量初始值
			var i = 0, len = el.length;
			// 遍历联动列表，绑定点击事件
			while (i < len) {
				// 绑定支付方式点击事件
				el[i].onclick = function(){
					// 选中操作
					_this.selectCityHand(this, el, tabEl);
				};
				i++;
			}
		},
		// 绑定选项卡点击事件
		tabClickEvent: function(tabEl, dom) {
			var _this = this;
			// 选项卡列表
			// var tab_el = dom.getElementsByClassName("tab_head")[0].getElementsByTagName("li");
			// 定义循环变量初始值
			var j = 0, tab_len = tabEl.length;
			// 遍历联动列表，绑定点击事件
			for (; j<tab_len; j++) {
				tabEl[j].index = j;
				// 绑定支付方式点击事件
				tabEl[j].onclick = function(){
					// 选中操作
					_this.selectTabHand(this, tabEl, dom);
					// 更新当前选项卡信息
					_this.last = j;
					console.log(j);
				};
			}
			/*
			while (j < tab_len) {
				// 绑定支付方式点击事件
				tabEl[j].onclick = function(){
					// 选中操作
					_this.selectTabHand(this, tabEl, dom);
					// 更新当前选项卡信息
					_this.last = j;
				};
				j++;
			}
			*/
		},
		// 选中选项卡操作
		selectTabHand: function(el, elArr, dom) {
			// console.log(el);
			// 更新选项卡状态
			this.updateTab(el);
			// 显示当前选项卡数据
			this.showSortList(el, elArr, dom);
		},
		// 更新当前选项卡数据
		showSortList: function(el, elArr, dom){
			// 获取当前选项卡类别
			var _sort = el.getAttribute("attr_sort");
			var curSortUl = _sort + "_l";
			// 隐藏所有列表
			this.hideAllList(dom);
			// 显示当前类别列表
			dom.getElementsByClassName(curSortUl)[0].style.display = "block";
			// 绑定当前列表点击事件
			this.listClickEvent(dom, elArr);
		},
		// 选中项操作
		selectCityHand: function (el, elArr, tabEl) {
			// 选中当前项，移除其他选中
			this.onSelect(el, elArr);
			// 获取选中项，进行相应操作
			this.getSelectV(el, tabEl);
		},
		// 选中当前项，移除其他项样式
		onSelect: function (el, elArr) {
			// 移除所有选中样式
			var m = 0, len = elArr.length;
			for (; m<len; m++){
				removeClass(elArr[m], "cur");
			}
			// console.log(el);
			// 当前项添加选中样式
			addClass(el, "cur");
		},
		// 获取选中项值，并匹配选项卡
		getSelectV: function (el, tabEl) {
			// 获取选中项，进行相应操作
			var _id = el.getAttribute("attr_id"),
					_name = el.getAttribute("attr_name"),
					_sort = el.getAttribute("attr_sort");
			// console.log(_id, _name, _sort);
			// console.log(tabEl);
			// 根据类别存储值
			switch (_sort) {
				case "province":
					global.selectCity.province = {
						id: _id,
						name: _name,
					};
					this.changeTab(global.selectCity.province, tabEl, 0);
					break;
				case "city":
					global.selectCity.city = {
						id: _id,
						name: _name,
					};
					this.changeTab(global.selectCity.city, tabEl, 1);
					break;
				case "area":
					global.selectCity.area = {
						id: _id,
						name: _name,
					};
					this.changeTab(global.selectCity.area, tabEl, 2);
					break;
				case "street":
					global.selectCity.street = {
						id: _id,
						name: _name,
					};
					this.changeTab(global.selectCity.street, tabEl, 3);
					break;
				case "village":
					global.selectCity.village = {
						id: _id,
						name: _name,
					};
					this.changeTab(global.selectCity.village, tabEl, 4);
					break;
				case "community":
					global.selectCity.community = {
						id: _id,
						name: _name,
					};
					this.changeTab(global.selectCity.community, tabEl, 5);
					break;
				default:
					break;
			}
			// console.log(global.city);
		},
		// 更新选项卡
		changeTab: function (obj, tabEl, n) {
			var tab_n = tabEl[n+1];		// 新TAB
			var tab_o = tabEl[n];			// 老TAB

			// 判断超出联动数量, 赋值返回
			if (this.opts.level <= n+1) {
				console.log("超出联动设置数量~");
				// 移除联动插件
				removePlug(this.el, {
					hash: this.hash,
				});
				// 页面赋值回调方法
				this.opts.assignmentHand && this.opts.assignmentHand(global.selectCity, this.el);
				return;
			}
			// 获取新选项卡的参数
			var _sort = tab_n.getAttribute("attr_sort");	// 类别
			var _id = tab_n.getAttribute("attr_id");			// id
			// 获取老选项卡的参数
			var _sort_o = tab_o.getAttribute("attr_sort");	// 类别
			var data = this.opts.data[_sort][obj.id]; 	// 下一级数据
			// 判断没有下一级联动没有数据
			if (!data){
				console.log("下一级数据为空~");
				// 移除联动插件
				removePlug(this.el, {
					hash: this.hash,
				});
				// 页面赋值回调方法
				this.opts.assignmentHand && this.opts.assignmentHand(global.selectCity, this.el);
				return;
			}
			// 更新选项卡项，增加新选项卡显示
			tabEl[n].textContent = obj.name;
			tab_n.textContent = "请选择";
			tab_n.style.display = "inline-block";

			// var _name = tab_n
			// 隐藏当前选项卡之后的选项卡
			this.hideTab(tabEl, n+2);
			// 更新选项卡状态
			this.updateTab(tab_n);
			// 更新数据
			this.showNewList(obj.id, tabEl, _sort, _sort_o, _id);
		},
		// 切换选项卡
		updateTab: function (el, n) {
			// 获取选项卡相关参数
			var lineEl = document.getElementsByClassName("line")[0];
			// 选中项的黄线距离当前选项卡左侧距离
			var el_l = (el.offsetWidth - lineEl.offsetWidth)/2;
			// 当前选项卡距离父级元素左侧距离
			var _l = el.offsetLeft;
			//
			var line_l = el_l + _l;
			// console.log(el_l, _l);
			// console.log(line_l);
			lineEl.style.left = line_l + "px";
		},
		// 更新列表
		showNewList: function (id, tabEl, sort, sort_o, dID, dName) {
			// 列表数据
			var d = {
				noData: this.opts.noData,
				data: this.opts.data[sort][id],
				sort: sort,
				dID: dID,
				dName: dName,
			};
			// console.log(d);
			// 获取列表模板
			if (this.opts.updateList) {
				// 列表模板
				var tpl = this.opts.updateList(global.listTpl, d);
				// console.log(tpl);
				// 模板转换成DOM, 并返回DOM
				var _dom = parseDom(tpl)[0];
				// console.log(_dom);
				// 获取清空列表信息
				var ulClass = sort + "_l";		// 拼接列表Class
				var parentEl = document.getElementsByClassName(ulClass)[0].parentNode;		// 获取父级元素
				// console.log(parentEl);
				// 移除现有列表
				removeBeDom(ulClass);
				// 显示新列表
				this.updateDom(_dom, parentEl, sort, sort_o, tabEl);
			}
		},
		// 新增列表，隐藏之前的列表显示新列表
		updateDom: function (dom, parentEl, sort, sort_o, tabEl) {
			// 获取新老列表class
			var newClass = sort + "_l";		// 拼接列表Class
			var oldClass = sort_o + "_l";		// 拼接列表Class
			// 新增列表
			parentEl.append(dom);
			// 隐藏老列表
			document.getElementsByClassName(oldClass)[0].style.display = "none";
			// 显示新列表
			document.getElementsByClassName(newClass)[0].style.display = "block";
			// 新列表绑定点击事件
			this.bindListClickEvent(parentEl, tabEl);
		},
		// 绑定事件
		bindListClickEvent: function (dom, tabEl) {
			var _this = this;
			// 获取要绑定元素
			var el = dom.getElementsByTagName("li");
			// 定义循环变量初始值
			var i = 0, len = el.length;
			// 遍历支付方式元素，绑定支付方式点击事件
			while (i < len) {
				// 绑定支付方式点击事件
				el[i].onclick = function(){
					// 选中操作
					_this.selectCityHand(this, el, tabEl);
				};
				i++;
			}
		},


	};

	// 省市区联动
	var linkage = function (opt, tpl) {
		// 定义默认参数
		var _opt = {};
		// 判断opt是方法、对象，配置相应参数
		if (isFunction(opt)){
			_opt.callback = opt;
		} else if (isObject(opt)) {
			_opt = opt;
		}
		// 实例化方法
		return new _linkage(_opt, tpl);
	};
	// 对外开放方法
	return linkage;
});