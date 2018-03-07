var path = require('path');

var url = path.format({
    root : "/",
    dir : "/home/user/dir",
    base : "file.txt",
    ext : ".txt",
    name : "file"
});

console.log('url: ', url);  //url:  /home/user/dir\file.txt
