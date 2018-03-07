var file = require('./file.js');
var url = require('url');
var querystring = require('querystring');

module.exports = {
	home: function(res) {
		// res.write('<h3>首页</h3>');
		// res.end();
		file.readFile('./template/main.html', res)
	},
	login: function(res, req) {
		// res.write('<h3>登录</h3>');
		// res.end();

		//get
		// var urlObject = url.parse(req.url, true).query; // ture:转换成对象

		//post 
		var post = "";
		req.on('data', function(chunk) {
			post += chunk;
		});
		req.on('end', function() {
			post = querystring.parse(post); //转换成对象
			console.log("---------------------")
			console.log(post);
			console.log("---------------------")
		})

		file.readFile('./template/login.html', res);
	},
	registor: function(res) {
		// res.write('<h3>注册</h3>');
		// res.end();
		file.readFile('./template/registor.html', res);
	},
	image: function(res) {
		res.writeHeader(200, {'Content-Type': 'image/jpg'})
		file.readImageFile('./images/timg.jpg', res);
	}
}