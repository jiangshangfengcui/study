var path = require('path');

var url0 = path.dirname(__filename);
var str = path.dirname('path/upload/file/123.jpg');
var url1 = path.dirname('./foo/bar/baz/asdf/a.txt');
var url2 = path.dirname('/foo/bar/baz/asdf/');
var url3 = path.dirname('C:/vajoy/test/aaa');

console.log(str); // path/upload/file
console.log('url0:', url0); //  url0: E:\webpack\path
console.log('url1:',url1);  //  url1: ./foo/bar/baz/asdf
console.log('url2:',url2);  //  url2: /foo/bar/baz
console.log('url3:',url3);  //  url3: C:/vajoy/test








