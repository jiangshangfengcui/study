var path = require('path');

var url1 = path.isAbsolute('../testFiles/secLayer');
var url2 = path.isAbsolute('./join.js');
var url3 = path.isAbsolute('temp');
var url4 = path.isAbsolute('/temp/../..');
var url5 = path.isAbsolute('E:/github/nodeAPI/abc/efg');
var url6 = path.isAbsolute('///temp123');

console.log('url1:',url1);  // false
console.log('url2:',url2);  // false
console.log('url3:',url3);  // false
console.log('url4:',url4);  // true
console.log('url5:',url5);  // true
console.log('url6:',url6);  // true
