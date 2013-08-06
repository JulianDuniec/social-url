var
	HttpRequester = require('../helpers/HttpRequester');

http://urls.api.twitter.com/1/urls/count.json?url=http://www.youtube.com/watch?v=RSLG1scOfa8

module.exports = {
	fetch : function(url, callback) {
		var me = this;
		HttpRequester
			.get(
					"urls.api.twitter.com",
					"/1/urls/count.json?url="+url,
					80,
					"GET",
					function(err, data) {
						if(err) callback(err, null);
						else callback(
			 				null, 
			 				me.constructResult(
			 					JSON.parse(data)));

					}
				)
	},

	constructResult : function(data) {
		var result = {};
		result.stats = {};
		result.stats.postCount = data.count;
		return result;
	}
}