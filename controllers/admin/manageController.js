const Manage = require("../../models/admin/manage");

// 카테고리 메인 컨트롤러
exports.manageData = function(req, res){
    // 카테고리 리스트 및 게시판
    Manage.manageData(function(err, result1, result2, result3){
        if(err){
            res.send(err);
        } else {
            res.render('admin/manage', {
                rows1 : result1,
                rows2 : result2,
                rows3 : result3
            }); 
        }
    });
};

// 카테고리 관리 컨트롤러
exports.manageCatgoryData = function(req, res){
    // 카테고리 리스트 및 게시판
    Manage.manageCategoryData(function(err, result1, result2){
        if(err){
            res.send(err);
        } else {
            res.json({
                rows1 : result1, 
                rows2 : result2
            });
        }
    });
    
};

// 카테고리 등록 컨트롤러
exports.manageCategory = function(req, res){
    let subTitle = req.body.categoryName;
    let mainId = req.body.categoryKinds;

    Manage.manageCategoryProcess(subTitle, mainId, function(err, result){
        if (err) {
            res.send(err);
        } else {
            // data json 넘겼으니 result 결과를 던져야함
            res.json(result);
        }
    });
};

// 카테고리 수정 컨트롤러
exports.manageCategoryUpdate = function(req, res){
    let subId = req.body.categorySubId;
    let subTitle = req.body.categoryName;

    Manage.manageCategoryUpdateProcess(subTitle, subId, function(err, result){
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

// 카테고리 삭제 컨트롤러
exports.manageCategoryDelete = function(req, res){
    let id = req.params.id;
    Manage.manageCategoryDeleteProcess(id, function(err, result){
        if (err) {
            res.send(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
};

