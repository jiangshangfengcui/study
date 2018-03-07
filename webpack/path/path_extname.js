var path = require('path');

var url1 = path.extname('/foo/bar/baz/asdf/a.txt');
var url2 = path.extname('/foo/bar/baz/asdf/a.txt.html');
var url3 = path.extname('/foo/bar/baz/asdf/a.');
var url4 = path.extname('C:/vajoy/test/.');
var url5 = path.extname('C:/vajoy/test/a');

console.log('url1:',url1);  // .txt
console.log('url2:',url2);  // .html
console.log('url3:',url3);  // .
console.log('url4:',url4);  //
console.log('url5:',url5);  //