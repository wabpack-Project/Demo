var formInfo = {
	username: {
		required: true,			// 必填
		tips: "",
	}
};


document.getElementById("form").onchange = function () {
	console.log(111);
};

checkFormRequireData("isRequired", "attr_required");