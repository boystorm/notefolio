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
/* 로그인 라우터 */
router.get('/', function(req, res, next){ res.render('admin/login.html'); });
router.post('/loginProcess', AuthorController.login);

/* 패스워드 찾기 라우터 */
router.get('/password', function(req, res, next){ res.render('admin/password.html'); });
router.post('/passwordProcess', AuthorController.password);

/* 카테고리 관리 라우터 */
router.get('/manage', function(req, res, next){ res.render('admin/manage.html'); });


/* 회원정보 수정 관리 라우터 */
router.get('/memberEdit', function(req, res, next){ res.render('admin/memberEdit.html'); });
router.post('/member_')

module.exports = router;