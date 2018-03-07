// 引入依赖
var express = require('express');
var utility = require('utility');

// 建立 express 实例
var app = express();

app.get('/', function(req, res) {
	//从 req.query 中取出我们的 q 参数
	//如果 post 传来的body 数据， 则是在 req.body 里面， 不过 express 默认不处理 body 中的信息， 需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理，这个后面会讲到。
	//如果分不清什么是 query，什么是body的话， 那就需要补一下 http 的知识了
	var q = req.query.q;

	//调用 utility.md5 方法，得到 md5 之后的值
	//之所以使用 utility 这个库来生成 md5 值， 实施知识习惯问题。 每个人都自己习惯的技术堆栈
	// 我刚入职阿里的时候跟着苏千和朴灵混， 所以也混到了不少他们的技术堆栈， 仅此而已
	// utility 的 github 地址 ： https://github.com/node-modules/utility
	// 里面定义了很多常用且比较杂的辅助方法， 可以去看看
	var md5Value = utility.md5(q);
	var sha1 = utility.sha1(q);

	res.send([md5Value, sha1]);	
	//res.send('<h1> ni hao </h1>');
});

app.get('/getip', function(req, res) {
	console.log(27,req.ip);
	console.log(28, req.headers['x-forwarded-for']);
	console.log(29, req.headers['x-real-ip']);
	console.log(req.path);
})

app.listen(4000, function(req, res) {
	console.log('app is runnig at port 3000');
})