const db_config = require('../../config/mysql');
const conn = db_config.init();
db_config.connect(conn);

let Manage = function (){}; // 생성자

// 카테고리 쿼리
Manage.manageCategory = function(result){
    conn.query("SELECT * FROM main_category", function(err, res){
        if(err){
            result(null, err);
        } else {
            result(null, res);
        }
    });
    
};

// 카테고리 등록
Manage.manageCategoryProcess = function(subTitle, mainId, result){
    conn.query("INSERT INTO sub_category (sub_title, main_id) VALUES(?,?)", [subTitle, mainId], function(err, res){
        if(err){
            result(null, err);
        } else {
            result(null, res);
        }
    });


    // conn.query("UPDATE main_category SET main_title = ? WHERE main_id = ?", [title, id], function(err, res){
    //     if(err){
    //         result(null, err);
    //     } else {
    //         result(null, res);
    //     }
    // });
};



module.exports = Manage;