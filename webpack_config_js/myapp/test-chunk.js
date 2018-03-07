var webpack = require('webpack');
var path = require('path');
var glob = require('glob');

var disPath = path.join(__dirname, 'public/dist');

var getEntry = function(url) {
	var entry = {};
	glob.sync(url).forEach(function(name) {
		if(name.indexOf('views') != -1) {
			var n = name.substring((name.lastIndexOf('/') + 1), name.lastIndexOf('.'));
		}else {
			var n = name.substring((name.lastIndexOf('/') + 1), name.lastIndexOf('.'));
		}
		//var name = __dirname + name.substring(1);
		if(n.indexOf('.') != 0) {
			entry[n] = name;
		}
	});
	return entry;
};

var pages = getEntry(path.resolve(__dirname, './views/*(allproduct|index|search).ejs'));//console.log(pages);
for(var chunkname in pages) {console.log(39, chunkname.substring(chunkname.indexOf('/') + 1));
	var conf = {
		filename: 'html/' + chunkname + '.html',
		template: pages[chunkname],
		inject: true,
		chunks: ['zepto', 'common', chunkname.substring(chunkname.indexOf('/') + 1)],
		minify: {
			removeComments: true,
			collapseWhitespace: false
		},
		hash: true,
	}
	//plugins.push(new HtmlWebpackPlugin(conf));
}