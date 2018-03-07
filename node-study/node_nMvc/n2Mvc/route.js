
/*

	路由注册和路由匹配


*/


var parseURL = require('url').parse;// 将"url" 的parse方法付给parseURL

var routes = {
	get: [],
	post: [],
	head: [],
	put: [],
	delete: []
}

/*
*注册route 的规则
*实例：
*	route.map({
*		method: "post",
*		url: //blog/post/(\d+)/?$/i,
*		controller: "blog",
*		action:"showBlogPost"
*	})
*/


exports.map = function(dict) {
	if(dict && dict.url && dict.controller) {
		var method = dict.method ? dict.method.toLowerCase() : 'get';
		routes[method].push({
			u: dict.url, //url 匹配正则
			c: dict.controller, 
			a: dict.action || 'index'
		});
	}
}
exports.getActionInfo = function(url, method) {
	var r = {
		contrller: null,
		action: null,
		args: null
	}


	var method = method ? method.toLowerCase() : "get";
	var pathname = parseURL(url).pathname; //文件路径
	var m_routes = routes[method];
	for(var i in m_routes) {
		// 正则匹配
		r.args = m_routes[i].u.exec(pathname);
		if(r.args) {
			r.controller = m_routes[i].c;
			r.action = m_routes[i].a;
			r.args.shift(); // 去掉匹配到的整个url
			break;
		}
	}
	// 如果匹配到route,r大概是｛controller: 'blog', action: 'index', args: ['1']｝
	return r;
}



/*
	var url = require('url');
	var a = url.parse('http://example.com:8080/one?a=index&t=article&m=default');
	console.log(a);
	 
	//输出结果：
	{ 
	    protocol : 'http' ,
	    auth : null ,
	    host : 'example.com:8080' ,
	    port : '8080' ,
	    hostname : 'example.com' ,
	    hash : null ,
	    search : '?a=index&t=article&m=default',
	    query : 'a=index&t=article&m=default',
	    pathname : '/one',
	    path : '/one?a=index&t=article&m=default',
	    href : 'http://example.com:8080/one?a=index&t=article&m=default'
	}

*/