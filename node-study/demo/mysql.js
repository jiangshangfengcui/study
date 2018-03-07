// nodejs 直连mysql

var mysql = require('mysql');

//连接数据库
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'test_schema',
	port: '3306'
});

//创建一个连接
connection.connect(function(err) {
	if(err) {
		console.log('insert err:' + err);
		return;
	}
	console.log('insert success');
});

//执行插入
var userInsertSql = 'insert into user(username, password) values(?, ?)';
var param = ["kangxi", "7979709"];
connection.query(userInsertSql, param, function(err, results) {
	if(err) {
		consoel.log('insert err:' + err);
		return;
	}
	console.log('insert success');
});

// 查询数据
var userSelectSql = 'select * from user';
connection.query(userSelectSql, function(err, results) {
	if(err) {
		consoel.log('select err:' + err);
		return;
	}
	for(var i=0; i < results.length; i++) {
		console.log((i + 1) + '/' + results[i].username);
	}
});

//关闭一个连接
connection.end(function(err) {
	if(err) {
		console.log(err.toString());
		return;;
	}
	console.log('[connection end] success');
})