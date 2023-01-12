var express = require('express');
var router = express.Router();
var ven = require('../model/vendor');
var multer = require('multer');

const storage = multer.diskStorage({
    destination(req,res,cb){
      cb(null,'public/uploads/');
    },
    filename(req,file,cb){
      const filenameArr = file.originalname.split('.');
      cb(null,Date.now() + '.' + filenameArr[filenameArr.length-1]);
    }
  });
const upload = multer({storage});

/* vendor */
router.get('/index', ven.index);

// 菜品管理
router.get('/list', ven.list);
router.get('/add', ven.Gadd);
router.post('/add', ven.Padd);
router.get('/delete', ven.Gdelete)
router.post('/delete', ven.Pdelete);
router.get('/upload', ven.Gupload);
router.post('/upload', upload.single('file'), ven.Pupload);

// 订单信息
router.get('/task', ven.task)

module.exports = router;