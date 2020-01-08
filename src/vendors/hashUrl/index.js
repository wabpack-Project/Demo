document.getElementById("hash_url").onclick = function(){

	hashUrl("hash1", function () {
		console.log("hash改变！");
		test();
	});
};

function test() {
	console.log("执行测试方法！");
}
// document.getElementById("hash_url").click();