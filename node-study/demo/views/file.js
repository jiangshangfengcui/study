var fs = require('fs');

module.exports = {
	readFileSync: function(res) {
		var data = fs.readFileSync('./template/main.html', 'utf-8');
		res.write(data);
		res.end();
	},
	readFile: function(file, res) {
		fs.readFile(file, 'utf-8', function(err, data){
			res.write(data);
			res.end();
		})
	},
	readImageFile: function(file, res) {
		fs.readFile(file, 'binary', function(err, data) {
			res.write(data, 'binary');
			res.end();
		})
	},
	writeFile: function(file, res) {
		fs.writeFile(file, 'data write', function(err) {
			if(err) throw err;
			res.write('write success');
			res.end();
		})
	}
}