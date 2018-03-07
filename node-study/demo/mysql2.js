// nodejs 通过连接池 连接mysql

var DataPool = require('./views/datapool.js');

var dataPool = new DataPool();
var pool = dataPool.getPool();

// 执行 SQL 语句
pool.getConnection(function(err, conn) {
	if(err) {
		console.log("err: " + err);
		return;
	}

	// insert
	var userInsertSql = 'insert into user(username, password) values("yongzheng", "12345566")';
	conn.query(userInsertSql, function(err, results) {
		console.log('insert success');
	});

	//select
	conn.query('select * from user', function(err, results) {
		for(var i=0; i < results.length; i++) {
			console.log(results[i].username);
		}
		conn.release();
	})
})