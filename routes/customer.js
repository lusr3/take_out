var express = require('express');
var router = express.Router();
var cus = require('../model/customer');

/* customer */
router.get('/index', cus.index);
router.get('/list', cus.list);
// 详情
router.get('/detail', cus.detail);
router.post('/detail/add', cus.add);
router.post('/detail/delete', cus.delete);
router.post('/detail/commit', cus.commit);
// 历史
router.get('/history', cus.history);
router.get('/history/comment', cus.Gcomment);
router.post('/history/comment', cus.Pcomment);
router.post('/history/confirm', cus.confirm);

module.exports = router;