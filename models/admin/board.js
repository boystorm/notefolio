/**
* =======================================
* 설  명 : 데이터베이스 Mysql
* =======================================
*/
const db_config = require('../../config/mysql');
const conn = db_config.init();
db_config.connect(conn);

let Board = function (){}; // 생성자

// 게시판 글 등록
Board.boardAddProcess = function(mainId, subId, title, result){
    let insert = "INSERT INTO board (image, title, content, regdate, modidate, main_id, sub_id) values(1,?,1,now(),now(),?,?);";

    conn.query(insert, [title, mainId, subId], function(err, res){
        if(err){
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Board;