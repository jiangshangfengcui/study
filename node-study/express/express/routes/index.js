var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', city: 'shanghai' });
});

router.get('/login', function(req, res) {
	// res.send('login');
	res.render('login', {});
});

router.get('/registor', function(req, res) {
	res.render('registor', {});
})

module.exports = router;
