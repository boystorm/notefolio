const express = require('express'); 
const router = express.Router();
const UserController = require('../../controllers/user/userController');

/**
* =======================================
* 설  명 : 카테고리
* =======================================
*/
/* default url : / */ 
router.get('/', function(req, res, next){ res.render('user/profile.ejs'); });


module.exports = router;