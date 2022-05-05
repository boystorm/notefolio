const express = require('express'); 
const router = express.Router();
const BoardController = require('../../controllers/admin/boardController');

/* admin/board */ 
/* 게시판 글쓰기 페이지 */
router.get('/boardAdd/:mainId/:subId', function(req, res, next){ 
    let main = req.params.mainId;
    let sub = req.params.subId;

    res.render('admin/manageAdd', {
        mainId : main, 
        subId : sub
    });
});

/* 게시판 글 등록 */
router.post('/boardAddProcess', BoardController.boardAddProcess);

/* 게시판 글 읽기 */
router.get('/boardRead/:idx/:mainId/:subId', BoardController.boardRead);

/* 게시판 글 수정 */
router.post('/boardUpdateProcess', BoardController.boardUpdateProcess);

/* 게시판 글 삭제 */
router.delete('/boardDeleteProcess/:idx/:main/:subId', BoardController.boardDeleteProcess);

module.exports = router;