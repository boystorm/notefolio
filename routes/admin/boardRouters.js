const express = require('express'); 
const router = express.Router();
const BoardController = require('../../controllers/admin/boardController');

/* 게시판 글 등록, 수정, 삭제  */
router.get('/boardAdd/:id', function(req, res, next){ res.render('admin/manageRegister'); });
router.get('/boardMod/:id/:idx', function(req, res, next){ res.render('admin/manageRegister'); });

module.exports = router;