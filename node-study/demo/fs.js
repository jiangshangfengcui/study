var http = require('http')
var file = require('./views/file.js');
var router = require('.views/router.js');

http.createServer(function(req, res) {
	res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'})
	if(req.url !== '/favicon.ico') {
		// file.readFile('./template/main.html', res);
		//file.writeFile('./files/test.txt',res);
		router.home(res);
	}
	//res.end()
}).listen(8888)

console.log('hello Node!')
