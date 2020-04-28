
var title = data.title;
var content = data.title;
var imgUrl = data.avatar;
var titleUrl= location.href;
var url= location.href;
var siteUrl= location.href;
// 分享方法
/**
 * 分享方法
 * 参考文档   http://www.mob.com/wiki/detailed?wiki=ShareSDK_Android_APISHARE_title_dsfptfxcssm&id=14
 * title 标题
 * content 描述
 * imgUrl 		图片地址
 * titleUrl		标题地址(图文、链接、音频)（QQ空间和QQ）
 * url				跳转地址（分享文本）（有道、明道）
 * siteUrl		跳转地址
 * */
function share(title, content, imgUrl, titleUrl, url, siteUrl) {
	if(android_app){
		window.LanCareWeb.share(title,content,imgUrl,titleUrl,url,siteUrl);
	}else if(ios_app){
		window.location.href = "objc:://sharesdk::/" + title + "::/" + content +"::/" + imgUrl +"::/" + titleUrl +"::/" +url +"::/" + siteUrl + "::/"+"";
	} else {
		console.log("非APP不能分享");
	}
}


