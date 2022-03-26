const express = require('express'); 
const router = express.Router();
const AuthorController = require('../../controllers/admin/authorController');

/**
* =======================================
* 설  명 : 모듈
* =======================================
*/
const qs = require('querystring');    

/**
* =======================================
* 설  명 : 관리자 라우터
* =======================================
*/
/* 로그인 */
router.get('/', function(req, res, next){res.render('admin/login.html');});
router.post('/login_process', AuthorController.login);

/* 패스워드 찾기 */
router.get('/password', function(req, res, next){res.render('admin/password.html');});

module.exports = router;