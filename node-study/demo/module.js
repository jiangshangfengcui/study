var http = require('http')
var User = require('./views/User.js')

http.createServer(function(req, res) {
	res.writeHeader(200, {'Content-Type': 'text/html; charset=utf-8'})
	if(req.url !== '/favicon.ico') {
		var user1 = new User('zhangsanfeng', '23', ['a', 'ad'])
		var user2 = new User('taijizhongshi', '34', [89,89])
		user1.friends.push('ccc')
		//user1.prototype.sayName = function() {return this.name}
		res.write(user1.sayFriends().toString())
		res.write('<br />')
		res.write(user2.sayFriends().toString())
		//res.write(user2.sayName().toString())
	}
	res.end()
}).listen(8888)

console.log('hello Node!')
