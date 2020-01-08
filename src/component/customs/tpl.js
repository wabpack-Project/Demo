(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		define(factory);
	} else if (typeof exports === "object") {
		var mo = factory();
		mo.__esModule = true;
		mo["default"] = mo;
		module.exports = mo;
	} else {
		root.tpl = factory();
	}
})(this, function() {
	var tpl = {
		// 预约主页模板
		customs: '<!-- 体检套餐 名称和描述 -->\n' +
			'<div class="declaration" >\n' +
			'  <%\n' +
			'  var headInfo = data.header;\n' +
			'  %>\n' +
			'  <div class="tit"><%=headInfo[0]%></div>\n' +
			'  <div class="des"><%=headInfo[1]%></div>\n' +
			'</div>\n' +
			'<!-- 选择套餐 -->\n' +
			'<div class="choose_package" >\n' +
			'  <div class="column_name">\n' +
			'    选择套餐\n' +
			'    <div class="related_sign fr" ></div>\n' +
			'  </div>\n' +
			'  <ul class="cp_list" >\n' +
			'    <%\n' +
			'    for(var i = 0, len = data.sale_list.length; i<len; i++){\n' +
			'    var packageInfo = data.sale_list[i],\n' +
			'      packagePrice = packageInfo.price && "<em>￥</em>"+packageInfo.price,\n' +
			'      isRelated = packageInfo.is_register_related ? "attr_related=1" : "";\n' +
			'      isDrop = packageInfo.introduction ? "" : "noCon";\n' +
			'    %>\n' +
			'    <li id="cp_<%=packageInfo.id%>" attr_id="<%=packageInfo.id%>" attr_related="<%=packageInfo.is_register_related%>" attr_num="<%=i%>" >\n' +
			'      <div class="p_item">\n' +
			'        <!-- 套餐名称 -->\n' +
			'        <div class="p_item_opt">\n' +
			'          <div class="fl "><span class="iconfont iconxuanzhong p_select"></span></div>\n' +
			'          <div class="fr opt_drop"><span class="iconfont iconxiangxia p_drop <%=isDrop%>" ></span></div>\n' +
			'          <div class="p_item_tit">\n' +
			'            <div class="fr p_price">\n' +
			'              <%=packagePrice||""%>\n' +
			'            </div>\n' +
			'            <div>\n' +
			'              <%=packageInfo.key_context_Chinese||""%>\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </div>\n' +
			'        <!-- 套餐描述 -->\n' +
			'        <%\n' +
			'          if(packageInfo.introduction){\n' +
			'        %>\n' +
			'        <div class="p_item_des">\n' +
			'          <div class="triangle-up"></div>\n' +
			'          <div class="p_item_con">\n' +
			'            包含项目：<%=packageInfo.introduction||""%>\n' +
			'          </div>\n' +
			'        </div>\n' +
			'        <%\n' +
			'          }\n' +
			'        %>\n' +
			'      </div>\n' +
			'    </li>\n' +
			'    <%\n' +
			'    }\n' +
			'    %>\n' +
			'  </ul>\n' +
			'</div>\n' +
			'\n' +
			'<!-- 套餐介绍 -->\n' +
			'<div class="" >\n' +
			'  <div class="column_name">套餐介绍</div>\n' +
			'  <ul class="p_img_list">\n' +
			'    <%\n' +
			'    for(var j = 0, len = data.sale_picture.length; j<len; j++){\n' +
			'      var pictureInfo = data.sale_picture[j];\n' +
			'    %>\n' +
			'    <li>\n' +
			'      <img src="<%=pictureInfo.url||\'\'%>">\n' +
			'    </li>\n' +
			'    <%\n' +
			'    }\n' +
			'    %>\n' +
			'    \n' +
			'  </ul>\n' +
			'</div>',
		// 疫苗模板
		vacc: '<div class="drawer" data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <!--<div class="drawer_cont">-->\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="fl">\n' +
			'        <a href="javascript:;" class="cancel <%=data.cancelBtn+\'-\'+data.hash%>">取消</a>\n' +
			'      </div>\n' +
			'      <div class="fr">\n' +
			'        <a href="javascript:;" class="confirm <%=data.sureBtn+\'-\'+data.hash%>">确认</a>\n' +
			'      </div>\n' +
			'      <div class="dw_h_name">选择接种疫苗</div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <ul class="select_list">\n' +
			'        \n' +
			'        <%\n' +
			'        var i, vaccData = data.data;\n' +
			'        for(i in vaccData){\n' +
			'          var vaccInfo = vaccData[i],\n' +
			'              vaccPrice = vaccInfo.price && "<em>￥</em>"+vaccInfo.price;\n' +
			'        %>\n' +
			'        <li>\n' +
			'          <div class="fl "><span attr_id="<%=vaccInfo.id%>" class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><%=vaccPrice||""%></div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              <%=vaccInfo.key_context_Chinese||""%>\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <%\n' +
			'          }\n' +
			'        %>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'    <!--</div>-->\n' +
			'  </div>\n' +
			'</div>',
		// 关联登记
		signList: '<div class="drawer" style="display: block" data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <!--<div class="drawer_cont">-->\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="dw_h_name">选择预约关联登记</div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <ul class="select_sign">\n' +
			'        <%\n' +
			'        var i, signData = data.data;\n' +
			'        for(i in signData){\n' +
			'        var signInfo = signData[i],\n' +
			'          isShow = signInfo.EntryorExit? \'block\' : \'none\';\n' +
			'        %>\n' +
			'        <li class="clearfix" data-id="<%=signInfo.id||\'\'%>">\n' +
			'          <div class="s_sign_item">\n' +
			'            <div class="category fr" style="display: <%=isShow%>"><%=signInfo.EntryorExit||""%></div>\n' +
			'            <div class="info">登记时间：<em><%=signInfo.completed_time||""%></em></div>\n' +
			'            <div class="info">目的地：<em><%=signInfo.destination||""%></em></div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <%\n' +
			'        }\n' +
			'        %>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'    <!--</div>-->\n' +
			'  </div>\n' +
			'</div>',
		// 深度体检模板
		physicalsList: '<div class="drawer" style="display: block" data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask <%=data.maskClass+\'-\'+data.hash%>"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <!--<div class="drawer_cont">-->\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="fl">\n' +
			'        <a href="javascript:;" class="cancel <%=data.cancelBtn+\'-\'+data.hash%>">取消</a>\n' +
			'      </div>\n' +
			'      <div class="fr">\n' +
			'        <a href="javascript:;" class="confirm <%=data.sureBtn+\'-\'+data.hash%>">确认</a>\n' +
			'      </div>\n' +
			'      <div class="dw_h_name">选择体检项目</div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <!-- 类别 -->\n' +
			'      <dl class="select_list_category clearfix" >\n' +
			'        <%\n' +
			'        var n=0, sortData = data.data.all_applicable_people_classification, len = sortData.length;\n' +
			'        for(; n<len; n++){\n' +
			'        var sortInfo = sortData[n];\n' +
			'        if(n==0) {\n' +
			'        %>\n' +
			'        <dt class="cur" attr_sort="<%=sortInfo.key_context_English||\'\'%>" ><%=sortInfo.key_context_Chinese||""%></dt>\n' +
			'        <%\n' +
			'        } else {\n' +
			'        %>\n' +
			'        <dt attr_sort="<%=sortInfo.key_context_English||\'\'%>" ><%=sortInfo.key_context_Chinese||""%></dt>\n' +
			'        <%\n' +
			'        }}\n' +
			'        %>\n' +
			'      </dl>\n' +
			'      <!-- 列表 -->\n' +
			'      <ul class="select_list list_bt">\n' +
			'        <%\n' +
			'        var m, physicalsData = data.data.children;\n' +
			'        for(m in physicalsData){\n' +
			'        var physicalsInfo = physicalsData[m];\n' +
			'        %>\n' +
			'        <li  data-id="<%=physicalsInfo.id||\'\'%>" data-sort="<%=physicalsInfo.applicable_people_Chinese||\'\'%>" attr_sex="<%=physicalsInfo.applicable_people_English||\'\'%>" >\n' +
			'          <div class="fl "><span  attr_id="<%=physicalsInfo.id%>" class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'          <div class="fr s_price"><em>￥</em><%=physicalsInfo.price||""%></div>\n' +
			'          <div class="s_list_tit">\n' +
			'            <div>\n' +
			'              <%=physicalsInfo.key_context_Chinese||""%>\n' +
			'            </div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <%\n' +
			'        }\n' +
			'        %>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'  <!--</div>-->\n' +
			'  </div>\n' +
			'</div>',
		// 预约主页模板
		timeList: '<div class="drawer" style="display: block"  data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask  <%=data.maskClass+\'-\'+data.hash%>"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <!--<div class="drawer_cont">-->\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="fl" style="display: none">\n' +
			'        <a href="javascript:;" class="cancel <%=data.cancelBtn+\'-\'+data.hash%>">取消</a>\n' +
			'      </div>\n' +
			'      <div class="fr" style="display: none">\n' +
			'        <a href="javascript:;" class="confirm <%=data.sureBtn+\'-\'+data.hash%>">确认</a>\n' +
			'      </div>\n' +
			'      <div class="dw_h_name">选择预约时间</div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <ul class="select_time">\n' +
			'        <%\n' +
			'        var i=0, timeData = data.data, len = timeData.length;\n' +
			'        for(; i<len; i++){\n' +
			'        var timeInfo = timeData[i];\n' +
			'        %>\n' +
			'        <li class="clearfix"  data-id="<%=i%>" >\n' +
			'          <div class="s_time_data fl"><%=timeInfo.date_string||""%></div>\n' +
			'          <div class="s_time_count fr">剩余<%=timeInfo.left_amount||""%></div>\n' +
			'        </li>\n' +
			'        <%\n' +
			'        }\n' +
			'        %>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'  <!--</div>-->\n' +
			'  </div>\n' +
			'</div>',
		// 预约主页模板
		visitsList: '<div class="drawer" style="display: block;" data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask"></div>\n' +
			'  <div class="drawer_out">\n' +
			'    <!--<div class="drawer_cont">-->\n' +
			'    <div class="dw_head dw_m92">\n' +
			'      <div class="fl">\n' +
			'        <a href="javascript:;" class="cancel <%=data.cancelBtn+\'-\'+data.hash%>">取消</a>\n' +
			'      </div>\n' +
			'      <div class="fr">\n' +
			'        <a href="javascript:;" class="confirm <%=data.sureBtn+\'-\'+data.hash%>">确认</a>\n' +
			'      </div>\n' +
			'      <div class="dw_h_name">请选择陪诊时间</div>\n' +
			'    </div>\n' +
			'    <div class="dw_body dw_m92">\n' +
			'      <div class="select_visits" >\n' +
			'        <!-- 中英文选择 -->\n' +
			'        <ul class="clearfix">\n' +
			'          <%\n' +
			'          var i, visitsData = data.data.children;\n' +
			'          for(i in visitsData){\n' +
			'          var visitsInfo = visitsData[i];\n' +
			'          if(i==6) {\n' +
			'          %>\n' +
			'          <li data-id="<%=visitsInfo.id%>">\n' +
			'            <div class="fl "><span class="iconfont iconiconfontxuanzhong4 s_select"></span></div>\n' +
			'            <div class="visit_tit"><%=visitsInfo.key_context_Chinese%></div>\n' +
			'          </li>\n' +
			'          <%\n' +
			'          } else {\n' +
			'          %>\n' +
			'          <li data-id="<%=visitsInfo.id%>">\n' +
			'            <div class="fl "><span class="iconfont iconxuanzhong s_select"></span></div>\n' +
			'            <div class="visit_tit"><%=visitsInfo.key_context_Chinese%></div>\n' +
			'          </li>\n' +
			'          <%\n' +
			'          }}\n' +
			'          %>\n' +
			'        </ul>\n' +
			'        <!-- 时间选择 -->\n' +
			'        <div class="visit_time">\n' +
			'          \n' +
			'          <div class="visit_count clearfix">\n' +
			'            <div class="opt_count fl cut" ><span class="iconfont iconjianshao_f"></span></div>\n' +
			'            <div class="input_count fl">\n' +
			'              <input class="text_change" type="text" disabled value="<%=data.data.accompany_duration_minandmax.min%>小时" >\n' +
			'            </div>\n' +
			'            <div class="opt_count fl add"><span class="iconfont iconjia"></span></div>\n' +
			'          </div>\n' +
			'          <div class="visit_des"><%=data.data.accompany_duration_minandmax.discription%></div>\n' +
			'          \n' +
			'        </div>\n' +
			'        <!-- end -->\n' +
			'      </div>\n' +
			'    </div>\n' +
			'    <!--</div>-->\n' +
			'  </div>\n' +
			'</div>',
		// 药品列表
		drug: '<!-- 药品列表 -->\n' +
			'<div class="drug skin1">\n' +
			'  <!-- 搜索 -->\n' +
			'  <div class="drug_search d_m92">\n' +
			'    <div class="search_input" >\n' +
			'      <span class="iconfont iconsousuo"></span>\n' +
			'      <input  type="search" placeholder="" >\n' +
			'    </div>\n' +
			'  </div>\n' +
			'  <!-- 列表 -->\n' +
			'  <!--<div class="drug_container">-->\n' +
			'    <div class="drug_m">\n' +
			'      <!-- 类别 -->\n' +
			'      <div class="drug_l fl">\n' +
			'        <ul class="d_category">\n' +
			'          <%\n' +
			'          var i, catData = data.drug;\n' +
			'          for(i in catData){\n' +
			'          var catInfo = catData[i];\n' +
			'          if(i == 0) {\n' +
			'          %>\n' +
			'          <li data-v="<%=catInfo.cat_id||\'\'%>" class="cur k_<%=catInfo.cat_id||\'\'%>">\n' +
			'            <%=catInfo.cat_name||""%>\n' +
			'          </li>\n' +
			'          <%\n' +
			'            } else {\n' +
			'          %>\n' +
			'          <li data-v="<%=catInfo.cat_id||\'\'%>" class="k_<%=catInfo.cat_id||\'\'%>">\n' +
			'            <%=catInfo.cat_name||""%>\n' +
			'          </li>\n' +
			'          <%\n' +
			'          }}\n' +
			'          %>\n' +
			'        </ul>\n' +
			'      </div>\n' +
			'      <!-- 药品列表 -->\n' +
			'      <div class="drug_r">\n' +
			'        <div class="d_list d_m92">\n' +
			'          <%\n' +
			'          for(i in catData){\n' +
			'          var catInfo = catData[i];\n' +
			'          %>\n' +
			'          <div class="d_name v_<%=catInfo.cat_id||\'\'%>"><%=catInfo.cat_name||""%></div>\n' +
			'          <ul class="v_<%=catInfo.cat_id||\'\'%>" data-v="<%=catInfo.cat_id||\'\'%>" >\n' +
			'            <%\n' +
			'            var drugData = catInfo.goods_list\n' +
			'            for(j in drugData){\n' +
			'            var drugInfo = drugData[j];\n' +
			'            %>\n' +
			'            <li class="drug_<%=drugInfo.id||\'\'%>" data-v="<%=drugInfo.id||\'\'%>"  data-cat="<%=catInfo.cat_id||\'\'%>" >\n' +
			'              <div class="d_detail clearfix">\n' +
			'                <div class="d_img fl">\n' +
			'                  <img src="<%=drugInfo.goods_img||\'\'%>" >\n' +
			'                </div>\n' +
			'                <div class="d_des">\n' +
			'                  <div class="d_tit" ><%=drugInfo.goods_name||\'\'%></div>\n' +
			'                  <div class="clearfix">\n' +
			'                    <div class="quantity_count fr">\n' +
			'                      <div class="quantity sk1" data-v="r0d3unfc">\n' +
			'                        <div class="count_opt fl cut">\n' +
			'                          <span class="iconfont iconjjian-"></span>\n' +
			'                        </div>\n' +
			'                        <div class="input_opt fl" data-v="r0d3unfc">\n' +
			'                          <input class="text_change" disabled="" type="text" value="">\n' +
			'                        </div>\n' +
			'                        <div class="count_opt fl add">\n' +
			'                          <span class="iconfont iconwuuiconxiangjifangda"></span>\n' +
			'                        </div>\n' +
			'                      </div>\n' +
			'                    </div>\n' +
			'                    <div class="d_price" > ￥<em><%=drugInfo.price||\'\'%></em></div>\n' +
			'                  </div>\n' +
			'                </div>\n' +
			'              </div>\n' +
			'            </li>\n' +
			'            <%\n' +
			'            }\n' +
			'            %>\n' +
			'          </ul>\n' +
			'          <%\n' +
			'          }\n' +
			'          %>\n' +
			'        </div>\n' +
			'      </div>\n' +
			'    </div>\n' +
			'  <!--</div>-->\n' +
			'  <!-- 底部 -->\n' +
			'  <div class="drug_foot" >\n' +
			'    <div id="sure_drug" class="f_sure fr">确定</div>\n' +
			'    <div class="f_total">\n' +
			'      <div class="f_cart fl" id="drug_cart" >\n' +
			'        <img class="drug_box" src="../images/customs/drugBox.png">\n' +
			'        <span id="cart_count" class="count"><%=data.shop_cart.total_num||\'\'%></span>\n' +
			'      </div>\n' +
			'      <div id="total_price" class="f_price"><em>￥</em><%=data.shop_cart.total_price||0%></div>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'  <!-- end -->\n' +
			'  \n' +
			'</div>',
		// 自选记录
		card_record: '<div class="drawer" style="display: block" data-v="<%=data.hash%>" id="draw_<%=data.hash%>" >\n' +
			'  <div class="drawer_mask <%=data.maskClass+\'-\'+data.hash%>"></div>\n' +
			'  <div class="card_record" >\n' +
			'    <div class="c_record_head clearfix">\n' +
			'      <div class="clear_record fr"><span class="iconfont icondelete"></span>清空记录</div>\n' +
			'      <div class="c_fare" style="display: none;">运费15元（支持自取）</div>\n' +
			'    </div>\n' +
			'    <div class="c_record_body">\n' +
			'      <ul class="r_list d_m94">\n' +
			'        <%\n' +
			'        var i, drugData = data.data;\n' +
			'        for(i in drugData){\n' +
			'        var drugInfo = drugData[i],\n' +
			'        drugPrice = drugInfo.price && "<em>￥</em>"+drugInfo.price;\n' +
			'        %>\n' +
			'        <li data-v="<%=drugInfo.gid||\'\'%>">\n' +
			'          <div class="clearfix">\n' +
			'            <div class="r_quantity fr" >\n' +
			'              <div class="quantity sk1" >\n' +
			'                <div class="count_opt fl cut">\n' +
			'                  <span class="iconfont iconjjian-"></span>\n' +
			'                </div>\n' +
			'                <div class="input_opt fl" >\n' +
			'                  <input class="text_change" disabled="" type="text" value="<%=drugInfo.num||\'\'%>">\n' +
			'                </div>\n' +
			'                <div class="count_opt fl add">\n' +
			'                  <span class="iconfont iconwuuiconxiangjifangda"></span>\n' +
			'                </div>\n' +
			'              </div>\n' +
			'            </div>\n' +
			'            <div class="r_price fr"><%=drugPrice||""%></div>\n' +
			'            <div class="r_name"><%=drugInfo.goods_name||""%></div>\n' +
			'          </div>\n' +
			'        </li>\n' +
			'        <%\n' +
			'        }\n' +
			'        %>\n' +
			'      </ul>\n' +
			'    </div>\n' +
			'  </div>\n' +
			'</div>',
	};
	return tpl;
});
