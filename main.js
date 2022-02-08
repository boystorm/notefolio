const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;

 /**
 * =======================================
 * 설  명 : 모듈 
 * =======================================
 */
// 데이터베이스 연결
const db_config = require(__dirname + '/config/database.js');
const conn = db_config.init();
db_config.connect(conn);
// url 쿼리 문자열 
let qs = require('querystring');

/**
 * =======================================
 * 설  명 : app.use() 미들웨이 기능 마운트
 * =======================================
 */
// 정적 파일
app.use(express.static(__dirname + "/adm"));
app.use("/lib",express.static(__dirname + "/lib"));

/**
 * =======================================
 * 설  명 : 어플리케이션
 * =======================================
 */
// 임시 경로 설정 
app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/adm/templates/login.html');
})

// 로그인 화면 첫 로딩
app.get('/adm', (req, res) => {
  return res.sendFile(__dirname + '/adm/templates/login.html');
})

// 로그인 아이디 패스워드 입력
app.post('/login_process', function (req, res) {
  let body = '';
  req.on('data', function(data){
    body = body + data;
  });
  
  req.on('end', function(){
     let post = qs.parse(body);
     conn.query("SELECT * FROM AUTHOR", function (err, result, fields) {
      if (err) {
        throw err
      } else {
        if(result[0].id === post.id && parseInt(result[0].password) === parseInt(post.password)){
          res.redirect("/manage");
        } else {
          res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
          res.write("<script>alert('아이디 패스워드를 확인해 주세요')</script>");
          res.write("<script>window.location=\"/adm\"</script>");
        }
      }
    });
  })
});

// 패스워드 찾기 페이지
app.get('/password', (req, res) => {
  return res.sendFile(__dirname + '/adm/templates/password.html');
})

// 패스워드 찾기 아이디 패스워드 입력
app.post('/password_process', function (req, res) {
  let body = '';
  req.on('data', function(data){
      body = body + data;
  });
  req.on('end', function(){
    let post = qs.parse(body);
    let responseData = {};

    if(post.passwordHint === "yangbankim"){
        conn.query("SELECT * FROM AUTHOR", function (err, result, fields) {
          if (err) {
            throw err
          } else {
            responseData.passHint = result[0].password;
            responseData.flag = true;
            res.json(responseData);
          }
        });
    } else {
      responseData.flag = false;
      res.json(responseData);
    }
  });
});

// 매니지 페이지
app.get('/manage', (req, res) => {
  return res.sendFile(__dirname + '/adm/templates/manage.html');
})

// 비밀번호 변경 페이지
app.get('/memberEdit', (req, res) => {
  return res.sendFile(__dirname + '/adm/templates/memberEdit.html');
})

// 비밀번호 변경 버튼 클릭
app.post('/memberEdit_process', (req, res) => {
  let body = '';      // 요청 데이터를 담을 변수
  req.on('data', function(data){    //요청
    body = body + data;   // 요청받은 데이터 저장
  }),
  req.on('end', function(){
    console.log(body);
  })
})


// 등록, 수정 페이지
// app.get('', (req, res) => {
//   return res.sendFile(__dirname + '/adm/templates/manageRegister.html');
// })

// app.post('/create_process', function (req, res) {
//     let body = '';
//     req.on('data', function(data){
//         body = body + data;
//     });

//     req.on('end', function(){
//         let post = qs.parse(body);
//          console.log(post)
//         let sql = 'INSERT INTO AUTHOR (id, password) VALUES(?, ?)';
//         let params = [post.id, post.password];
//         conn.query(sql, params, function(err) {
//             if(err) console.log('query is not excuted. insert fail...\n' + err);
//             else res.redirect('/');
//         });
        
//     })
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})