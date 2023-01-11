var express = require('express');
var router = express.Router();
var ven = require('../model/vendor');

/* vendor */
router.get('/index', ven.index);

module.exports = router;