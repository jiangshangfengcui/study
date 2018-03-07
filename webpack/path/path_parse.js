var path = require('path');

var obj1 = path.parse('/home/user/dir/file.txt');
var obj2 = path.parse('C:\\path\\dir\\index.html');


console.log('obj1: ', obj1);
console.log('obj2: ', obj2);


obj1:  { 
	root: '/',
    dir: '/home/user/dir',
    base: 'file.txt',
    ext: '.txt',
    name: 'file' 
}
obj2:  {  
	root: 'C:\\',
	dir: 'C:\\path\\dir',
	base: 'index.html',
	ext: '.html',
    name: 'index' 
}
