var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.redirect('/users');
  res.render('index', { title: 'Take-out'});
});

module.exports = router;
