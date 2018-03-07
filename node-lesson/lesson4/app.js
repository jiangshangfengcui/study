var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');

// 得到一个 eventproxy 的实例
var ep = new eventproxy();

// url 模块是Node.js 标准库里面的
// http://nodejs.org/api/url.html
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';
var topicUrls = [];
var userUrls = [];
var result;

superagent.get(cnodeUrl)
	.end(function(err, res) {
		if(err) {
			return console.log(err);
		}
		var $ = cheerio.load(res.text);
		// 获取首页所有的连接
		$('#topic_list .topic_title').each(function(idx, element) {
			var $element = $(element);
			// $element.attr('href') 本来的样式是 /topic/542acdd5d28233425538b04
			// 我们用 url.resolve 来自动推断出完整 url, 变成
			// https://cnodejs.org/topic/542acdd5d28233425538b04 的形式
			// 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的实例
			var href = url.resolve(cnodeUrl, $element.attr('href'));
			topicUrls.push(href);
		});

		console.log(topicUrls);
		// 命令 ep 重复监听 topicUrls.length 次 （在这里也就是40 次）'topic_html' 事件再行动
		ep.after('topic_html', topicUrls.length, function(topics) {
			// topics 是个数组， 包含了40 次 ep.emit('topic_html', pair) 中的那40个pair

			var topicsPairs = [];

			// 开始行动
			topics = topics.map(function(topicPair){
				// 接下来都是 jquery 的用法了
				var topicUrl = topicPair[0];
				var topicHtml = topicPair[1];
				var $ = cheerio.load(topicHtml);console.log(1);
				if($('.user_info .reply_author').eq(0).attr('href')) {
					userUrls.push(url.resolve(cnodeUrl, $('.user_info .reply_author').eq(0).attr('href')));
					topicsPairs.push(topicUrl);
				}
				return ({
					title: $('.topic_ful_title').text().trim(),
					href: topicUrl, 
					comment1: $('.reply_content').eq(0).text().trim(),
					author1: $('.user_info .reply_author').eq(0).text().trim()
				});
			});
			result = topics;
			//console.log(topics);
			console.log(userUrls);
			ep.after('user_html', userUrls.length, function(data) {console.log(222);
				// 接下来都是jquery 的用法了
				data.forEach(function(topic) {
					var href = topic[0];
					var userHtml = topic[1];
					var $ = cheerio.load(userHtml);
					var score1 = $('.unstyled .big').text().trim();//console.log(result);
					result = result.map(function(item){//console.log(item);
						if(item.href == href) {
							item.score1 = score1;
							return item;
						}
					});
				});
				console.log(result);
			})




			userUrls.forEach(function(userUrl, index) {
				superagent.get(userUrl)
					.end(function(err, res){
						//console.log('fetch' + userUrl + ' success');
						ep.emit('user_html', [topicsPairs[index], res.text]);
					});
				});

			//console.log('final:');
			//console.log(topics);
		});



		topicUrls.forEach(function(topicUrl) {
			superagent.get(topicUrl)
				.end(function(err, res) {
					//console.log('fetch ' + topicUrl + ' success');
					ep.emit('topic_html', [topicUrl, res.text]);
				});
		});
	});
// 得到 topicUrls  之后

