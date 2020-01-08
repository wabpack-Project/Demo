// <!-- 组件 -->
import $ from "../vendors/jquery/jquery-1.10.2.min";
import "../vendors/Js/Array.extension";
import "../vendors/Js/tool";
// import ajax from "../vendors/ajax/config";
var ajax = require("../vendors/ajax/config");
import miniTpl from "../vendors/mini-tpl/mini-tpl";
import draw from "../vendors/drawer/drawer_m";
import quantity from "../vendors/Quantity/quantityOpt";

// <!-- 业务 -->
import examine from "./tpl";
import examine from "./examine_event";

// 业务 css
import '../../css/customs/index.css';

// 初始化触发业务
examine(userId);
