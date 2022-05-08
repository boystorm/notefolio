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
            res.render("admin/manageMod", {
                idx : idx,
                mainId : mainId,
                subId : subId,
                rows : result
            })
        }
    });
};

// 글 수정 컨트롤러
exports.boardUpdateProcess = function(req, res){
    let idx = req.body.idx;
    let mainId = req.body.mainId;
    let subId = req.body.subId;
    let title = req.body.title;
    
    Board.boardUpdateProcess(idx, mainId, subId, title, function(err, result){
        if(err){
            res.send(err);
        } else {
            res.redirect("/admin/manage/1")
        }
    });
};

// 글 삭제 컨트롤러
exports.boardDelete = function(req, res){
    let idx = toString(req.body.boardChk);
    // 갯수만 배열로 만들면될듯

    // ajax 로 태울거니까 del버튼 클릭하면 js 한번 작업 거쳐야될듯
    console.log(idx);
    console.log(idx.length);
    // let pu = [];
    // for(let j = 0; j < idx.lenght; j++){
    //     console.log(j);
    //     pu.push(idx);
    //     console.log("pu: "+ pu);
    // }
    
    
    
    let cnt = idx.length;
    let help = "";
    //console.log("카운트가??:"+cnt);
    for(let i = 0; i < cnt; i++){
        if(help) help += ",";
        help += "?";
    }
    //console.log(help);
    Board.boardDelete(idx, help, function(err, result){
        if(err){
            res.send(err);
        } else {
            //res.redirect("/admin/manage/1")
        }
    });
};