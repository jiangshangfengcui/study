var http = require('http')

http.createServer(function(req, res) {
	res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'})
	if(req.url !== '/favicon.ico') {
		res.write('hello Nodellll')
	}
	res.end()
}).listen(8888)

console.log('hello Node!')
