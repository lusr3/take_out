var express = require('express');
var router = express.Router();
var rid = require('../model/rider');

/* rider */
router.get('/index', rid.index);

module.exports = router;