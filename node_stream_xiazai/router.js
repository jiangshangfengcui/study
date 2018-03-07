/**
*  文件系统 fs API 汇总：
*					
*					     
						1、打开文件 fs.open(path, flags, callback) 异步
							path: 文件路径
							flags: 打开文件的模式
							callback: 回调函数，有两个参数，第一个参数err, 第二个参数fd(文件描述符，用于读写文件和关闭文件)

						2、读取文件 fs.read(fd, buffer, offset, length, position, callback) 异步
							fd: 通过fs.open() 方法打开的文件返回的文件描述符
							buffer：数据写入的缓冲区
							offset：缓冲区写入的写入偏移量
							length: 要从文件中读取的字节数
							position：文件读取的起始位置，如果 position 的值为null, 则会从当前文件指针的位置读取
							callback：回调函数，有三个参数，err, bytesRead, buffer, err为错误信息，bytesRead 表示读取的字节数， buffer为缓冲区对象

						3、写入文件 fs.write(fd, buffer, offset, length, position, callback) 异步
							参数意义同上

						4、关闭异步模式打开的文件 fs.close(fd, callback) 
							fd: 文件描述符
							callback：回调函数，没有参数
						5、截取异步模式下打开的文件 fs.ftruncate(fd, len, callback)
							fd: 文件描述符 
							len: 文件内容截取的长度
							callback：回调函数， 没有参数
							fd 是截取文件时操作的对象，截取完成后可进一步操作
						6、删除文件 fs.unlink(path, callback) 
							path: 文件路径
							callback：回调函数，有个err参数

						7、创建目录 fs.mkdir(path[, mode], callback)
							path: 文件路径, 是一个目录路径
							mode: 设置目录权限，默认是0777
							callback：回调函数，参数 err	

						8、读取目录 fs.readdir(path, callback) 
							path: 文件路径
							callback：回调函数，有两个参数 err、files, err 为错误信息，files 为目录下的文件列表数组

						9、删除目录 fs.rmdir(path, callback)
							path: 目录路径
							callback：回调函数，参数err

						10、获取文件信息 fs.stat(path, callback)
							path: 文件路径
							callback：回调函数，带有两个参数err、stats, 其中 stats 是 fs.Stats 对象的实例
							即，执行这个方法 会将 Stats类的实例对象stats 返回过来，stats对象具有判断某些信息的方法
							例如：stats.isFile()、stats.isDirectory()...

				以上方法基于文件描述fd进行操作，代码多层嵌套，书写复杂，一下方法更常用：

						fs.readFile(filename, encoded, callback)
							filename: 文件名
							encoded: 文件编码
							callback: 回调函数，有两个参数 err, data
						fs.readFileSync(filename, encoded)

						fs.writeFile(filename, data[, option], callback) 
							filename: 文件路径
							data: 要写入文件的数据
							option： 该参数是一个对象，包括{encoding, mode, flag}, 默认编码是utf-8, flag为'w'
							callback: 回调函数，有一个参数 err
						fs.writeFileSync(filename)

						fs.appendFile(name, data, encode, callback)
							name: 文件路径
							data: 添加的字段 {String | Buffer}
							encode: 设置编码
							callback: 回调函数，有一个参数 err
						fs.appendFileSync(filename, data[, option])
							fielname: 文件路径
							data: 将写入的数据 {string | buffer}
							option: 参数对象，{encoding, mode{Number default=438}, flag{String default='a'}} 


					windows 系统下的文件编码是GBK, 可使用 https://github.com/ashtuchkin/iconv-lite 转换
*
*

var fs = require('fs');


function route(pathname) {
	// 输出请求的文件名
	console.log("Request for " + pathname + " received.");

	return function showPage(res) { 
		// 从文件系统中读取请求的文件内容
		fs.readFile(pathname.substr(1), function(err, data) {
			if(err) {
				/**
				 * HTTP 状态码： 404：NOT FOUND
				 * Content Type: text/plain // 内容类型： 纯文本类型（浏览器接收到文件后不对其处理）
				 */
				res.writeHead(404, {"Content-Type": "text/html"});
			}else {
				/**
				 * HTTP 状态码：200 ： OK
				 * Content Type: text/html // 内容类型： 超文本类型 （浏览器接收到文件后调用html解析器对文件进行相应的处理）
				 */
				res.writeHead(200, {"Content-Type": "video/mpeg4"});
				res.write(data);
			}
			// 发送相应数据
			res.end();
		})
	} 

}

exports.route = route;

/**
 *   在 node 中对流（Stream）概念的实践有如下5个方面： 
 * 			
 *						1、http request response
 *						2、fs read write stream
 *  					3、zlib stream
 * 						4、tcp sockets
 * 						5、child process stdout and stderr
 */

// 简单实现复制功能
var readStream = fs.createReadStream('/path/to/source');
var writeStream = fs.createWriteStream('/path/to/dest');

readStdream.on('data', function(chunk) { // 监听数据流事件，当有数据流时开始写入流操作
	writeStream.write(chunk);
});

readStream.on('end', function() {  // 当读数据流读完所有数据时，关闭数据流 
	writeStream.end();
})

// 直接使用pipe
fs.createReadStream('/path/to/source').pipe(fs.createWriteStream('path/to/dest'));

// 完整复制文件的代码
var fs = require('fs'),
	path = require('path'),
	out = process.stdout;
var filePath = '/Users/chen/Movies/Game.of.Thrones.S04E07.1080p.HDTV.x264-BATV.mkv';

var readStream = fs.createReadStream(filePath);
var writeStream = fs.createWriteStream('file.mvk');

// 同步获取文件的状态信息
var stat  = fs.statSync(filePath);  

var totalSize = stat.size,
	passedLength = 0,
	lastSize = 0,
	startTime = Date.now();

readStream.on('data', function(chunk) {
	passedLength +=chunk.length;
	if (writeStream.write(chunk) === false) {
		readStream.pause();
	}
});

readStream.on('end', function() {
	writeStream.end();
});

writeStream.on('drain', function() {
	readStream.resume();
});

setTimeout(function show() {
	var percent = Math.ceil((passedLength / totalSize) * 100);
	var size = Math.ceil(passedLength / 1000000);
	var diff = size - lastSize;
	lastSize = size;
	out.clearLine();
	out.cursorTo(0);
	out.write('已完成' + size + 'Mb, ' + percent + '%，速度：' + diff * 2 + 'Mb/s ');
	if(passedLength < totalSize) {
		setTimeout(show, 500);
	}else {
		var entTime = Date.now();
		console.log();
		console.log('共用时：' + (endTime - startTime) / 1000 + '秒！')
	}
}, 500)