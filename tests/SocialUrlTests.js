var
	SocialUrl = require('../src/SocialUrl');

var test_url = "http://www.youtube.com/watch?v=RSLG1scOfa8";


exports.testReddit = function(test) {
	SocialUrl.fetch(test_url, function(err, results) {
		test.ok(results.reddit.stats.postCount >= 6);
		test.ok(results.reddit.posts.length >= 6);
		test.done();
	});
};

exports.testFacebook = function(test) {
	SocialUrl.fetch(test_url, function(err, results) {
		test.ok(results.facebook.stats.postCount >= 4790432);
		test.ok(results.facebook.stats.totalComments >= 7);
		test.done();
	});
}