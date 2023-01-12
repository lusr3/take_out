var express = require('express');
var router = express.Router();
var rid = require('../model/rider');

/* rider */
router.get('/index', rid.index);
// 已完成订单
router.get('/task/finished', rid.finished);
// 待处理订单
router.get('/task/pending', rid.pending);
router.post('/task/get', rid.get);
module.exports = router;