var express = require('express');
var router = express.Router();
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/test';// 常量

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res) {
	res.send('get login success');
	console.log(req.query['username']);
	//console.log(req.params.username);
});

router.post('/login', function(req, res) {
	console.log(req.body.username)
	res.send('post login success');
});

// router.all('/login', function(req, res) {
// 	res.send('accept get or post request');
// });

router.post('/registor', function(req, res) {
	//console.log(req.body.username);
	var username = req.body.username;
	var password = req.body.password;
	var nickname = req.body.nickname;
  
  	var insertData = function(db, callback) {
		var data = [{username: username, password: password, nickname: nickname}];
        callback('ok');
  	}

	MongoClient.connect(DB_CONN_STR, function(err, db) {
		if(err) {
			console.log(err);
			return;
		}
		//console.log('连接成功！');
		//console.log(db);
		insertData(db, function(results) {
			console.log(results);
			res.send('注册成功！');
		})
	})

	//res.send('注册成功');
})

router.get('/ab*c', function(req, res) {
	res.send('路由正则匹配');
})

router.get('/html', function(req, res) {
	//res.sendFile('/node-study/express/express/package.json')
})

module.exports = router;
