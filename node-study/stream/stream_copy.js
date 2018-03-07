var fs = require('fs')
 
 var readStream = fs.createReadStream('E:\Git-2.7.2-32-bit_setup.1457942412.exe')
 var writeStream = fs.createWriteStream('git.exe')

 readStream.on('data', function(chunk) {
 	if (writeStream.write(chunk) === false) {
 		console.log('data pause')
 		readStream.pause()
 	};
 })
 readStream.on('end', function() {
 	console.log('data end')
 	writeStream.end();
 })
 writeStream.on('drain', function() {
 	console.log('data drain')
 	readStream.resume()
 })