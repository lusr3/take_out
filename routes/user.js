var express = require('express');
var router = express.Router();
var user = require('../model/user');

/* user */
router.get('/login', user.Glogin);
router.post('/login', user.Plogin);
router.get('/logout', user.Glogout);
router.get('/register', user.Gregister);
router.post('/register', user.Pregister);
router.get('/edit', user.Gedit);
router.post('/edit', user.Pedit);

// TODO: 修改信息应该也是在 user 里面

module.exports = router;