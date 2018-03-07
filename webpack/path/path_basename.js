var path = require('path');

var url1 = path.basename('/foo/bar/baz/asdf/a.txt');
var url2 = path.basename('/foo/bar/baz/asdf/a.txt','.txt');
var url3 = path.basename('/foo/bar/baz/asdf/');
var url4 = path.basename('C:/vajoy/test/aaa');

console.log('url1:',url1);  // a.txt
console.log('url2:',url2);  // a
console.log('url3:',url3);  // asdf
console.log('url4:',url4);  // aaa

var str = path.basename('path/upload/file/123.txt.jpg');
console.log(str); // 123.txt.jpg

var str = path.basename('path/upload/file/123.txt.jpg', '.jpg');
console.log(str); // 123.txt

var str = path.basename('path/upload/file/123.txt.jpg', '.txt.jpg');
console.log(str); // 123

var str = path.basename('path/upload/file/');
console.log(str); // file