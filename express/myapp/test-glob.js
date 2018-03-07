var glob = require('glob');
var path = require('path');

var getEntry = function(url) {
	var entry = {};
	glob.sync(url).forEach(function(name) {console.log(6, name);
		if(name.indexOf('views') != -1) {
			var n = name.substring((name.lastIndexOf('/') + 1), name.lastIndexOf('.'));
		}else {
			var n = name.substring((name.lastIndexOf('/') + 1), name.lastIndexOf('.'));
		}
		//var name = __dirname + name.substring(1);console.log(12, name);
		if(n.indexOf('.') != 0) {
			entry[n] = name;
		}
	});
	return entry;
};

var src = path.resolve(__dirname, './views/*(allproduct|index|search).ejs');
//console.log(src);

var pages = getEntry(src);


console.log(pages);

var css = path.resolve(__dirname, '../../css/m_base_v.css');