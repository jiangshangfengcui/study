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

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
	name: 'common',
});

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [];
plugins.push(commonsPlugin);
plugins.push(new ExtractTextPlugin("css/[name].css"));
plugins.push(new webpack.ProvidePlugin({
	//$: 'Zepto'
}));


var pages = getEntry(path.resolve(__dirname, './views/*(allproduct|index|search).ejs'));//console.log(pages);
for(var chunkname in pages) {
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
	plugins.push(new HtmlWebpackPlugin(conf));
}

plugins.push(new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false
	},
	except: ['$', 'require', 'exprots']
}));

var entryJS = getEntry('./public/src/js/entry/*.js');


module.exports = {
	entry: entryJS, 
	output: {
		path:disPath, 
		publicPath: '/public/dist',
		filename: 'js/[name].js'
	},
	resolve: {
		extensions: [ '.js', '.css']
	},
	module: {
		loaders: [
			{test: /\.html$/, loader:'html'},
			// {test: /\.js$/, loader: 'babel'},
			{test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader!css-loader')},
			{test: /\.(jpg|png)$/, loader: 'url?limit=8192'}
		]
	},
	plugins: plugins
}