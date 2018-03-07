var http = require('http');

var options = {
	hostname: '127.0.0.1',
	port: 8080,
	path: '/hotWords?_=' + new Date().getTime(),
	method: 'get',
};
var req = http.request(options, function(result){
	console.log('热词请求成功！');
	var data = '';
	result.on('data', function(chunck) {
		data += chunck;
	});
	result.on('end', function() {
		console.log('end', data);
	});
});
req.on('error', function(err) {
	console.log('转发失败！');
});
//req.write('');
req.end();