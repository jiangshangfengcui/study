var http = require('http');
var url = require('url');

function start(route) {
	function onRequest(req, res) {
		var pathname = url.parse(req.url).pathname;
		console.log(7,req.method);       // 请求方法
		console.log(8, req.originalUrl); // undefined
		console.log(9, req.url);         // '/login.html'
		console.log(10, req.headers);
		console.log(11, req.socket);     
		console.log(12);

		route(pathname)(res);

		// res.writeHead(200, {"Content-Type": "text/plain"});
		// res.write('send completed');
		// res.end();
	}
	http.createServer(onRequest).listen(8888);
	console.log('server has started');
}

exports.start = start;