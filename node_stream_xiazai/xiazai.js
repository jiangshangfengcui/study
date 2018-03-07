var http = require('http');
var url = require('url'); // 解析get请求的参数
var querystring = require('querystring'); // 解析post请求中的参数
var fs = require('fs');

var routers = {}; // 路由地图
var requestHandlers = {}; // 句柄函数集

requestHandlers.index = function() {

};
requestHandlers.download = function (req, res) {

};
routers['/'] = requestHandlers.index;
routers['/xiazai'] = requestHandlers.download;

// 文件流


function onRequest(req, res) {
	// 获取请求路径 
	var pathname = url.parse(req.url).pathname;
	// post 请求
	var post = '';
	req.on('data', function(chunk){
		post += chunk;
	});
	req.on('end', function() {
		post = querystring.parse(post);
		res.end(util.inspect(post));
	})
}

http.createServer(onRequest).listen(4000);