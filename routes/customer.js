var express = require('express');
var router = express.Router();
var cus = require('../model/customer');

/* customer */
router.get('/index', cus.index);

module.exports = router;