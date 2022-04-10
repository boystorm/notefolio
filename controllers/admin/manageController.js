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
    let id = req.body.id;
    let title = req.body.title;

    Manage.manageCategoryProcess(id, title, function(err, result){
        if (err) {
            res.send(err);
        } else { 
            result.id = id;
            result.title = title;
            res.json(result); // ajax 처리땐 json 으로 값 ajax 에 반환함
        }
    });
};


