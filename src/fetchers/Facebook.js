var 
	HttpRequester = require('../helpers/HttpRequester');


module.exports = {
	
	fetch : function(url, callback) {
		
		var me = this;

		HttpRequester
			.get(
				"graph.facebook.com", 
			 	"/"+url, 
			 	80, 
				"GET",
			 		function(err, data) {
			 			if(err) callback(err, null);
			 			else {
			 				callback(null, me.constructResult(JSON.parse(data)));
			 			}
				});
	},

	constructResult : function(data) {
		var result = {};
		result.stats = {};
		result.stats.postCount = data.shares;
		result.stats.totalComments = data.comments;

		return result;
	}


}