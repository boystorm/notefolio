const Manage = require("../../models/admin/manage");

// 카테고리 관리 컨트롤러
exports.manage = function(req, res){
    Manage.manageCategory(function(err, result){
        if(err){
            res.send(err);
        } else {
            res.render('admin/manage', {
                rows : result
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


