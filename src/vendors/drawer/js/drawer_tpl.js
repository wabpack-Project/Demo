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
		root.tpl = factory();
	}
}(this, function () {

	var tpl = {
		skin1 : '<div class="drawer" id="draw_<%=data.hash%>" style="display: block" >\n' +
			'  <div class="drawer_mask"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="fl">\n' +
			'        <a href="javascript:;" class="cancel">取消</a>\n' +
			'      </div>\n' +
			'      <div class="fr">\n' +
			'        <a href="javascript:;" class="confirm">确认</a>\n' +
			'      </div>\n' +
			'      <div class="dw_h_name">选择接种疫苗</div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <ul class="select_list">\n' +
			'        <li>\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><em>￥</em>1185</div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              其他出境船员常规体检\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <li>\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><em>￥</em>1185</div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              其他出境船员常规体检\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <li>\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><em>￥</em>1185</div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              其他出境船员常规体检\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <li>\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><em>￥</em>1185</div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              其他出境船员常规体检\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <li>\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><em>￥</em>1185</div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              其他出境船员常规体检\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <li>\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><em>￥</em>1185</div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              其他出境船员常规体检\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <li>\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><em>￥</em>1185</div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              其他出境船员常规体检\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <li>\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><em>￥</em>1185</div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              其他出境船员常规体检\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <li>\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><em>￥</em>1185</div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              其他出境船员常规体检\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <li>\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><em>￥</em>1185</div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              其他出境船员常规体检\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <li>\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><em>￥</em>1185</div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              其他出境船员常规体检\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <li>\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><em>￥</em>1185</div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              其他出境船员常规体检\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'</div>',
		skin2 : '<div class="drawer" data-v="<%=data.hash%>">\n' +
			'  <div class="drawer_mask <%=data.maskClass+\'-\'+data.hash%>" style="opacity: <%=data.opacity%>; z-index: <%=data.z_index%>;"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="fl">\n' +
			'        <a href="javascript:;" class="cancel <%=data.cancelBtn+\'-\'+data.hash%>"><%=data.cancelTxt%></a>\n' +
			'      </div>\n' +
			'      <div class="fr">\n' +
			'        <a href="javascript:;" class="confirm <%=data.sureBtn+\'-\'+data.hash%>"><%=data.sureTxt%></a>\n' +
			'      </div>\n' +
			'      <div class="dw_h_name"><%=data.title%></div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92" style="height: <%=data.height%>;">\n' +
			'      <ul class="select_list">\n' +
			'        <%\n' +
			'        var i = 0, len = data.data.length;\n' +
			'        if(len == 0) {\n' +
			'        %>\n' +
			'        <li class="">\n' +
			'          <div class="no_data"><%=data.noData%></div>\n' +
			'        </li>\n' +
			'        <% } else {\n' +
			'        for(; i < len; i++){\n' +
			'        var detail = data.data[i];\n' +
			'        %>\n' +
			'        <li>\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><em>￥</em><%=detail.price||""%></div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              <%=detail.name||""%>\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <% } } %>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'</div>',
		list1: '<ul class="select_list">\n' +
			'  <%\n' +
			'  var i = 0, len = data.data.length;\n' +
			'  if(len == 0) {\n' +
			'  %>\n' +
			'  <li class="">\n' +
			'    <div class="no_data"><%=data.noData%></div>\n' +
			'  </li>\n' +
			'  <% } else {\n' +
			'  for(; i < len; i++){\n' +
			'  var detail = data.data[i];\n' +
			'  %>\n' +
			'  <li>\n' +
			'    <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'    <div class="fr s_price"><em>￥</em><%=detail.price||""%></div>\n' +
			'    <div class="s_list_tit">\n' +
			'      <div>\n' +
			'        <%=detail.name||""%>\n' +
			'      </div>\n' +
			'    </div>\n' +
			'  </li>\n' +
			'  <% } } %>\n' +
			'</ul>',
	};

	// 提供外部调用的参数和方法
	return tpl;
}));
