var fs = require('fs');
var fileContent = 'nothing';
var fielContent2 = "nothing";

fs.readFile(__filename, 'utf-8', function(error, file) {  // __filename 是node的一个全局变量 ，值为当前文件的绝对路径
	if(error) {
		console.log(error);
		return;
	}
	fileContent = file;
	console.log('end readfile \n');
})

console.log('docSomethingWithFile: ' + fileContent + '\n');
console.log(__filename);

// docSomethingWithFile: nothing
// 
// D:\nodejs\node_modules\output_me.js
// end readfile




// 修正
fs.readFile(__filename, "utf-8", function(error, file) {
	if(error) {
		console.log(error);
		return;
	}
	fileContent2 = file;
	console.log("doSomethingWithFile: " + fileContent2 + "\n");
})
console.log("我们先去喝杯茶\n");


