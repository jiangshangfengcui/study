var path = require('path');

var url1 = path.sep;
var url2 = 'foo\\bar\\baz'.split(path.sep);
var url3 = 'foo/bar/baz'.split(path.sep);

console.log('url1:',url1);  // win下为\，*nix下为/
console.log('url2:',url2);  // [ 'foo', 'bar', 'baz' ]
console.log('url3:',url3);  // win下返回[ 'foo/bar/baz' ]，但在*nix系统下会返回[ 'foo', 'bar', 'baz' ]