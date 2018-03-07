/*

	模版解析模块

*/

var Shotenjin = {};
//模版缓存， 缓存解析后的模版
Shotenjin.templateCatch = {};

//读取模版内容
//在模版中引用模板使用：｛#.../layout.html/ #｝
Shotenjin.getTemplateStr = function(filename) {
	//console.log('get template:' + filename);
	var t = '';
	//这里使用的是同步读取
	if(path.existsSync(filename)){
		t = fs.readFileSync(filename, 'utf-8');
	}else{
		throw 'View:' + filename + 'not exists';
	}
	return t.replace(/\{#[\s]*([\.\/\w\-]+)[\s]*#\}/ig, function(m, g1) {
		var fp = path.join(filename, g1.trim());
		return Shotenjin.getTemplateStr(fp);
	})
}

Shotenjin.renderView = function(viewPath, context) {
	var template = Shotenjin.templateCatch[viewPath];
	if(!template) {
		var template_str = Shotenjin.getTemplateStr(viewPath);
		var template = new Shotenjin.Template();
		template.convert(template_str);
		//添加到缓存中
		Shotenjin.templatetCatch[viewPath] = template;
	}
	var output = template.render(context);
	return output;
}

global.Shotenjin = Shotenjin;