var fs = require('fs');
var fileContent = 'nothing';

fs.readFile(_filename, 'utf-8', function(error, file) {  // _filename 是node的一个全局变量 ，值为当前文件的绝对路径
	if(error) {
		console.log(error);
		return;
	}
	fileContent = file;
	console.log('end readfile \n');
})

console.log9('docSomethingWithFile: ' + fileContent + '\n');