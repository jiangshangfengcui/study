var path = require('path');

var str1 = path.join('./path/./', 'upload', '/file', '123.jpg');
console.log(4,str1);

var str2 = path.join('path', 'upload', 'file', '123.jpg');
console.log(7, str2);

var arr = ['path', 'upload', 'file', '123.jpg'];
var str3 = path.join.apply(null, arr);
console.log(11, str3);


var url1 = path.join('////./a', 'b////c', 'user/', 'vajoy', '..');
var url2 = path.join('a', '../../', 'user/', 'vajoy', '..');
var url3 = path.join('a', '../../', '{}', 'vajoy', '..');

console.log('url1:',url1);  // \a\b\c\user
console.log('url2:',url2);  // ..\user
console.log('url3:',url3);  // 存在非路径字符串，故抛出异常


var url0 = path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile');
console.log(url0);