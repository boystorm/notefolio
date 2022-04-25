const db_config = require('../../config/mysql');
const conn = db_config.init();
db_config.connect(conn);

let Manage = function (){}; // 생성자

// 카테고리 쿼리
Manage.manageCategory = function(result){
    let query1 = "SELECT * FROM main_category;" ;
    let query2 = "SELECT * FROM sub_category;";

    conn.query(query1 + query2, function(err, res){
        if(err){
            result(null, err);
        } else {
            let res1 = res[0];
            let res2 = res[1];
            result(null, res1, res2);
        }
    });
};

// 카테고리 쿼리
Manage.manageCategoryData = function(result){
    let query1 = "SELECT * FROM main_category;" ;
    let query2 = "SELECT * FROM sub_category;";

    conn.query(query1 + query2, function(err, res){
        if(err){
            result(null, err);
        } else {
            let res1 = res[0];
            let res2 = res[1];
            result(null, res1, res2);
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
};

// 카테고리 수정
Manage.manageCategoryUpdateProcess = function(subTitle, mainId, subId, result){
    conn.query("update sub_category set SUB_TITLE = ?, main_id = ? where sub_id = ?", [subTitle, mainId, subId], function(err, res){
        if(err){
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

// 카테고리 삭제
Manage.manageCategoryDeleteProcess =  function(id, result){
    conn.query("delete from sub_category where sub_id = ?", id, function(err, res){
        if(err){
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Manage;