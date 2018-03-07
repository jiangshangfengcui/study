var route = require("./route");


var handlerRequest = function(request, response) {
	//通过route来获取controller和action信息
	var actionInfo = route.getActionInfo(request.url, request.method);
	//如果route中有匹配的action， 则分发给对应的action
	if(actionInfo.action) {
		// 假设controller都放到当前目录的controllers目录里面，还记的require是怎么搜索module的么？
		var controller = require('./controllers/' + actionInfo.controller); // ./controllers/blog
		if (controller[actionInfo.action]) {
			var ct = new controllerContext(request, response);
			//动态调用， 动态语言就是方便
			//通过apply将controller的上下文对象传递给action
			controller[actionInfo.action].apply(ct, actionInfo.args);
		}else {
			handler500(request, response, 'Error: controller"' + actionInfo.controller + '"without action"' + actionInfo.action + '"');
		}
	}else {
		staticFileServer(request, response);
	}
}



//静态文件服务器
var staticFileServer = functions(req, res, filePath){
	if (!filePath) {
		filePath = path.join(__dirname, config.staticFileDir, url.parse(req.url).pathname);
	};
	path.exists(filePath, functin(exists){// exists : true / false
		if(!exists) {
			handler404(req, res);
			return;
		}
		fs.readFile(filePath, "binary", function(err, file) {
			if(err) {
				handler500(req, res, err);
				return;
			}
			var ext = path.extname(filePath); // 返回后缀：‘.html’
			ext = ext ? ext.slice(1) : 'html';
			res.writeHead(200, {'Content-Type': contentTypes[ext] || 'text/html'});
			res.write(file, "binary");
			res.end();
		})
	})
}

var contentTypes = {
	"aiff": "audio/x-aiff",
	"arj": "application/x-arj-compressed"
	//...
}