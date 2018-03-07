var webpack = require('webpack');
var path = require('path');
var glob = require('glob');

//var disPath = path.resolve(__dirname, 'public/dist');

var getEntry = function(url) {
	var entry = {}, js=true;
	glob.sync(url).forEach(function(name) {
		if(name.indexOf('views') != -1) {
			var n = name.substring((name.lastIndexOf('/') + 1), name.lastIndexOf('.'));
			js = false;
		}else {
			var n = name.substring((name.lastIndexOf('/') + 1), name.lastIndexOf('.'));
		}
		//var name = __dirname + name.substring(1);
		if(n.indexOf('.') != 0) {
			entry[n] = name;
		}
	});
	js ? entry['zepto'] = [__dirname + '/public/src/js/zepto', __dirname + '/public/src/js/zepto_animate', __dirname + '/public/src/js/zepto_cookie'] : '';
	console.log(entry);
	return entry;
};

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
	name: ['common11', 'zepto']
});

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [];
plugins.push(commonsPlugin);
plugins.push(new ExtractTextPlugin({
      filename: 'css/[name].css'
    }));
plugins.push(new webpack.ProvidePlugin({
	//$: 'Zepto'
}));


var pages = getEntry(path.resolve(__dirname, './views/*(allproduct|index|search).ejs'));
for(var chunkname in pages) {//console.log(39, chunkname.substring(chunkname.indexOf('/') + 1));
	var conf = {
		filename: 'html/' + chunkname + '.html',
		template: pages[chunkname],
		inject: true,
		chunks: ['common11','zepto',  chunkname.substring(chunkname.indexOf('/') + 1)],
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
	except: ['$', 'require', 'exprots', 'window', 'document']
}));

var entryJS = getEntry('./public/src/entry/*.js');


module.exports = {
	entry: entryJS, 
	output: {
		path:__dirname + '/public/dist', 
		publicPath: '/public/dist/',
		filename: 'js/[name].js'
	},
	resolve: {
		extensions: [ '.js', '.css']
	},
	module: {
		loaders: [
			{test: /\.html$/, loader:'html'},
			// {test: /\.js$/, loader: 'babel'},
			{test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})},
			{test: /\.(jpg|png)$/, loader: 'url?limit=8192'}
		]
	},
	plugins: plugins
}