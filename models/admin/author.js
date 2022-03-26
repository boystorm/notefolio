/**
* =======================================
* 설  명 : 데이터베이스 Mysql
* =======================================
*/
const db_config = require('../../config/mysql');
const conn = db_config.init();
db_config.connect(conn);

let Author = function (){}; // 생성자

// 로그인
Author.login = function(id, password, result){
 
  conn.query("SELECT * FROM author WHERE id = ? AND password = ?", [id, password], function (err, res) {
    if(err){
      console.log("error:", err);
      result(null, err);
    } else {
      console.log("Author(작가) :", id,"- Author(비번) :", password);
      result(null, res);
    }
  });
};

module.exports = Author;