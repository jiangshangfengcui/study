/*

	配置route规则

*/

var route = require('./route');

route.map({
	method: 'get',
	url: //blog/?$/i,
	controller: 'blog',
	action: 'index'
})

route.map({
	method: 'get',
	url: //tweets/?$/i,
	controller: 'blog',
	action: 'tweets'
})