var express = require('express');
var router = express.Router();
var rid = require('../model/rider');

/* rider */
router.get('/index', rid.index);
// 查看订单信息
router.get('/task', rid.task);
// 接单
router.post('/task/get', rid.get);
module.exports = router;