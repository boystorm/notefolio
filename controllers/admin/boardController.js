const Board = require("../../models/admin/board");

// 글 등록 컨트롤러
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

// 글 읽기 컨트롤러
exports.boardRead = function(req, res){
    let idx = req.params.idx;
    let mainId = req.params.mainId;
    let subId = req.params.subId;

    Board.boardRead(idx, mainId, subId, function(err, result){
        if(err){
            res.send(err);
        } else {
            console.log(result);
            res.render("admin/manageMod", {
                idx : idx,
                mainId : mainId,
                subId : subId,
                rows : result
            })
        }
    });
};