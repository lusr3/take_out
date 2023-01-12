var express = require('express');
var router = express.Router();
var rid = require('../model/rider');

/* rider */
router.get('/index', rid.index);
// 已完成订单
router.get('/task')
// 待处理订单
router.get('/')
module.exports = router;