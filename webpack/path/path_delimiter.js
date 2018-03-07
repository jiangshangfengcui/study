var path = require('path');
var env = process.env.PATH; //当前系统的环境变量PATH

var url1 = env.split(path.delimiter);

console.log(path.delimiter); //win下为“;”，*nix下为“:”
console.log('env:',env);  // C:\ProgramData\Oracle\Java\javapath;C:\Program Files (x86)\Intel\iCLS Client\;
console.log('url1:',url1);  // ['C:\ProgramData\Oracle\Java\javapath','C:\Program Files (x86)\Intel\iCLS Client\']