var express = require('express');
var router = express.Router();
var ven = require('../model/vendor');

/* vendor */
router.get('/index', ven.index);
router.get('/list', ven.list);
router.get('/add', ven.Gadd);
router.post('/add', ven.Padd);
router.post('/delete', ven.delete);

module.exports = router;