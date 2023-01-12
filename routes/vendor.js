var express = require('express');
var router = express.Router();
var ven = require('../model/vendor');

/* vendor */
router.get('/index', ven.index);
// 菜品管理
router.get('/list', ven.list);
router.get('/add', ven.Gadd);
router.post('/add', ven.Padd);
router.post('/delete', ven.delete);
// 订单信息
router.get('/task', ven.task)

module.exports = router;