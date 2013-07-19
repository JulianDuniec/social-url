var http = require('http');

module.exports = {
	
	get : function(host, path, port, method, callback) {
		var request = http.request({
			host : host,
			path : path,
			port : port,
			method : method
		}, function(response) {
			var body = "";
			response.on("data", function(data) {
				body += data;
			});
			response.on("end", function() {
				callback(null, body);
			})
		});
		request.on("error", function(e) {
			callback(e, null);
		});
		request.end();
	}
}