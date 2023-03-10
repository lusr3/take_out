var express = require('express');
var router = express.Router();
var user = require('../model/user');
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


/* user */
router.get('/login', user.Glogin);
router.post('/login', user.Plogin);
router.get('/logout', user.Glogout);
router.get('/register', user.Gregister);
router.post('/register', user.Pregister);
router.get('/upload', user.Gupload);
router.post('/upload', upload.single('file'), user.Pupload);
router.get('/edit', user.Gedit);
router.post('/edit', user.Pedit);

// TODO: 修改信息应该也是在 user 里面

module.exports = router;