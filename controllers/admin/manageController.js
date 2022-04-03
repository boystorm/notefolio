const Manage = require("../../models/admin/manage");

// 카테고리 관리 컨트롤러
exports.manage = function(req, res){
    Manage.manageCategory(function(err, result){
        if(err){
            res.send(err);
        } else {
            console.log(result);
            res.render('admin/manage', {
                rows : result
            }); 
        }
    });
    
};

// 카테고리 등록 컨트롤러
// exports.manageCategory = function(req, res){
//     res.render('admin/manage.ejs'); 
// };


