controllerContext = function(request, response) {
	this.req = reqeust;
	this.res = response;
	this.handler404 = handler404;
	this.handler500 = handler500;
}

controllerContext.prototype.render = function(viewName, context){
	viewEngine.render(this.req, this.res, viewName, context);
}

controllerContext.prototype.renderJson = function(json) {
	veiwEngine.renderJson(this.req, this.res, json);
}

var viewEngine = {
	render: function(req, res, viewName, context) {
		var filename = path.join(__dirname, 'views', viewName);
		try{
			var output = Shotenjin.renderView(filename, context);
		}catch(err) {
			handler500(req, res, err);
			return;
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(output);
	},
	renderJson: function(req, res, json) {
		//TODO:
	}
}

