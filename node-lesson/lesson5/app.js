var async = require('async');
var superagent = require('superagent');

var concurrencyCount = 0;
var i = 0;
var fetchUrl = function (url, callback) {
	var delay = parseInt((Math.random() * 10000000) % 2000, 10);
	concurrencyCount++;
	console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
	superagent.get(url)
		.end(function(err, res) {
			if(err) {
				return console.error(err)
			}
			concurrencyCount--;
			callback(null, url + '  ' + (++i) + ' html content');
		})


	// setTimeout(function() {
	// 	concurrencyCount--;
	// 	callback(null, url + ' html content');
	// }, delay);
};

var urls = [];
for(var i = 0; i < 30; i++) {
	urls.push('http://m.i360mall.com:3000/');
}

async.mapLimit(urls, 5, function(url, callback) {
	fetchUrl(url, callback);
}, function(err, result) {
	console.log('final:');
	console.log(result);
})