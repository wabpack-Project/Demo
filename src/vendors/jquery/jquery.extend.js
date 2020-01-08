jQuery.fn.extend({
	check: function() {
		return this.each(function() { this.checked = true; });
	},
	uncheck: function() {
		return this.each(function() { this.checked = false; });
	},
	// 判断是否包含
	hasAttr: function (attributeName) {
		var _attr = this.attr(attributeName);
		// if (typeof )
		console.log(attr);
		return typeof attr
	}
});

jQuery.extend({
	check: function() {
		return this.each(function() { this.checked = true; });
	},
	uncheck: function() {
		return this.each(function() { this.checked = false; });
	}
});

