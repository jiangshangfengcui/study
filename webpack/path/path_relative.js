var path = require('path');

var url1 = path.relative('C:\\vajoy\\test\\aaa', 'C:\\vajoy\\impl\\bbb');
var url2 = path.relative('C:/vajoy/test/aaa', 'C:/vajoy/bbb');
var url3 = path.relative('C:/vajoy/test/aaa', 'D:/vajoy/bbb');

console.log('url1:',url1);  //..\..\impl\bbb
console.log('url2:',url2);  //url2: ..\..\bbb
console.log('url3:',url3);  //D:\vajoy\bbb

var url4 = path.relative('/data/orandea/test/aaa', './data/orandea/impl/bbb')
console.log('url4:', url4);