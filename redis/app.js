var redis = require('redis');
// var client = redis.createClient();
var RDS_PORT = 6379, // 设置端口号
	RDS_HOST = '127.0.0.1', // 服务器IP
	RDS_PWD = 'foobared', // 登陆密码
	RDS_OPTS = {auth_pass: RDS_PWD},  // 设置项
	client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

// 第二种认证方式
client.auth(RDS_PWD, function() {
	console.log('认证通过');
})

client.on('ready', function(res) {
	console.log('ready');
});

// client.on('connect', function() {
// 	client.set('author', 'Wilson', redis.print); // Reply: OK
// 	client.get('author', redis.print); // Reply: Wilson
// 	console.log('connect')
// })

client.on('end', function(err) {
	console.log('end');
})

client.on('connect', function(res) {
	// // 多值set 和 get 
	// client.hmset('short', {'js': 'javascript', 'c#': 'C Sharp'}, redis.print); // 设置多组键值对
	// client.hmset('short', 'SQL', 'Structured Query Languge', 'HTML', 'Hyper Text Mark Languge', redis.print);

	// client.hgetall('short', function(err, res) {  // 获取值操作
	// 	if(err) {
	// 		console.log('Error: ' + err);
	// 		return;
	// 	}
	// 	console.dir(res);// 显示一个对象的所有属性和方法
	// });
	
	//  打包执行多个命令
	var key = 'skills';
	client.sadd(key, 'C#'); // 集合操作，向集合key中添加N个元素，已存在元素的将忽略.redis2.4版本前只能添加一个值
	client.sadd(key, 'nodejs');
	client.sadd(key, 'MySQL');

	client.multi()
	.sismember(key, 'C#')  // 元素value是否存在于集合key中，存在返回1，不存在返回0
	.smembers(key)   // 返回集合 key 中的所有成员，不存在的集合key也不会报错，而是当作空集返回
	.exec(function (err, replies) {
		console.log('MULTI got ' + replies.length + ' replies');
		replies.forEach(function (reply, index) {
			console.log('Reply ' + index + ': ' + reply.toString());
		})
	})


	client.quit(); //与之对应的还有一个client.end()方法，相对比较暴力；client.quit方法会接收到所有响应后发送quit命令，而client.end则是直接关闭；都是触发end事件
})