/**
* =======================================
* 설  명 : 데이터베이스 Mysql
* =======================================
*/
const db_config = require('../../config/mysql');
const conn = db_config.init();
db_config.connect(conn);

let Manage = function (){}; // 생성자

// 카테고리 쿼리
// Author.mainCategory = function(id, password, result){
//     conn.query("SELECT * FROM author WHERE id = ? AND password = ?", [id, password], function (err, res) {
//       if(err){
//         result(null, err);
//       } else {
//         result(null, res);
//       }
//     });
//   };