var  Home = "Home", Brand = "Brand", GoodslistOnline = "GoodslistOnline";
var routes = [
	 {
		 path: '/',
		 name: 'Home',
		 component: Home
	 },
	 {
		 path: '/brand',
		 name: 'Brand',
		 component: Brand,
		 meta: {
			 login_require: true
		 },
		 children:[
			 {
				 path: 'online',
				 component: GoodslistOnline
			 }
		 ]
	 },
 ];

function test(obj) {
	console.log(obj);
}

test({
	routes,
	aa: "1",
});



