/**
 * @author QLeelulu@gmail.com
 * @blog http://qleelulu.cnblogs.com
 */

exports.index = function(){
    this.render('blog/index.html', {msg:'Hello World'});
};


var http = require('http'),
    events = require("events");

//var tsina_client = http.createClient(80, "api.t.sina.com.cn");

//创建一个EventEmitter的实例
var tweets_emitter = new events.EventEmitter();


function get_tweets() {
	var postData = querystring({
		'msg': 'Hello World'
	});
	var options = {
		hostname: 'api.t.sina.com.cn',
		port: '80',
		method: 'get',
		path: '/statuses/public_timeline.json?source=3243248798',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData)
		}
	}
	var request = http.request(options, function(res) {
		var body = '';
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			body += chunk;
		})
		.on('error', function(err) {
			throw err;console.log('blog.js')
		});
		res.write(postData);
		res.end();
	})


	// var request = tsina_client.request("GET", "/statuses/public_timeline.json?source=3243248798", {"host": "api.t.sina.com.cn"});

	// request.addListener("response", function(response) {
	// 	var body = "";
	// 	response.addListener("data", function(data) {
	// 		body += data;
	// 	});

	// 	response.addListener("end", function() {
	// 		var tweets = JSON.parse(body);
	// 		if(tweets.length > 0) {
	// 		    //这里发出事件调用
	// 			tweets_emitter.emit("tweets", tweets);
	// 		}
	// 	});
	// });

	// request.end();
};

// action: tweets
exports.tweets = function(blogType){
        this.render('blog/tweets.html');
};

// action: tweets_data
exports.tweets_data = function(blogType){
    var _t = this;
    //注册一个一次性的事件监听
    var listener = tweets_emitter.once("tweets", function(tweets) {  
        _t.render('blog/tweets_data.html', {tweets: tweets});
    });
  
    get_tweets();
};

