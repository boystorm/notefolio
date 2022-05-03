const Board = require("../../models/admin/board");

// 카테고리 등록 컨트롤러
exports.boardAddProcess = function(req, res){
    let mainId = req.body.mainId;
    let subId = req.body.subId;
    let title = req.body.title;

    Board.boardAddProcess(mainId, subId, title, function(err, result){
        if (err) {
            res.send(err);
        } else {
            res.redirect("/admin/manage/1");
        }
    });
};
