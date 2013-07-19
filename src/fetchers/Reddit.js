var 
	HttpRequester = require('../helpers/HttpRequester');


module.exports = {
	
	fetch : function(url, callback) {
		
		var me = this;

		HttpRequester
			.get(
				"www.reddit.com", 
			 	"/search.json?q=url:\"" + url + "\"", 
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
		result.stats.postCount = data.data.children.length;
		result.posts = [];

		var totalComments = 0;
		var totalUps = 0;
		var totalDowns = 0;
		var totalScore = 0;
		var scoreHigh = null;
		var scoreLow = null;
		var categories = [];

		for (var i = data.data.children.length - 1; i >= 0; i--) {
			var p = data.data.children[i].data;
			result.posts.push(p);
			totalComments += p.num_comments;
			totalUps += p.ups;
			totalDowns += p.downs;
			totalScore += p.score;
			if(scoreLow == null || scoreLow > p.score)
				scoreLow = p.score;
			if(scoreHigh == null || scoreHigh < p.score)
				scoreHigh = p.score;
			if(categories.indexOf(p.subreddit) == -1)
				categories.push(p.subreddit);
		};

		result.stats.totalComments = totalComments;
		result.stats.totalUps = totalUps;
		result.stats.totalDowns = totalDowns;
		result.stats.averageScore = totalScore/result.stats.postCount;
		result.stats.scoreHigh = scoreHigh;
		result.stats.scoreLow = scoreLow;
		result.categories = categories;

		return result;
	}


}