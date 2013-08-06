module.exports = {
	
	fetchers : {
		"reddit" : require('./fetchers/Reddit'),
		"facebook" : require('./fetchers/Facebook'),
		"twitter" : require('./fetchers/Twitter')
	},

	fetch : function() {
		var me = this;
		var url = arguments[0];
		var callback = arguments[arguments.length-1];
		var counter = this.fetchers.length;
		var result = {};
		var counter = Object.keys(this.fetchers).length;
		for(key in this.fetchers) {
			(function(k) {
				me.fetchers[k].fetch(url, function(err, r) {
					result[k] = err || r;
					if(--counter == 0)
						callback(null, result);
				});
			})(key);
		}
	}
};