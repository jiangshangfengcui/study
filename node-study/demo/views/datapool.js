var mysql = require('mysql');

function DataPool() {
	this.flag = true; //是否连接过
	this.pool = mysql.createPool({
		host: 'localhost',
		user: 'root',
		password: '123456',
		port: '3306',
		database: 'test_schema'
	});

	this.getPool = function() {
		if(this.flag) {
			this.pool.on('connection', function(conn) {
				conn.query('set session auto_increment=1');
				this.flag = false;
			})
		}
		return this.pool;
	}
}

module.exports = DataPool;