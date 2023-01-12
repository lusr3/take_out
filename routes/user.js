var express = require('express');
var router = express.Router();
var user = require('../model/user');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var multer = require('multer');
// const upload = multer({ dest: '/uploads' })

const storage = multer.diskStorage({
    // destination:'public/uploads/'+new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate(),
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

// TODO: 修改信息应该也是在 user 里面

module.exports = router;