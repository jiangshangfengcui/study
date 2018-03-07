var http = require('http');
var querystring = require("querystring");


exprots.runServer = function(port) {
	port = port || 8080;
	var sever = http.createServer(function(request, response) {
		var _postData = '';
		//on用于添加一个监听函数到一个特定的事件
		request.on("data", function(chunk) {
			_postData += chunk;
		})
		.on("end", function() {
			console.log(request);
			console.log(response);
			console.log(querystring);
			request.post = querystring.parse(_postData);
			handlerRequest(request, response);
		})
	}).listen(port);
	console.log("Server running at http//127.0.0.1: " + port + "/");
}

