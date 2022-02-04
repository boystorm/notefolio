const express = require('express');
const app = express();
const port = 3000;
const db_config = require(__dirname + '/config/database.js');
const conn = db_config.init();

let qs = require('querystring');


//adm 폴더의 클라이언트 접근 허용 (미들웨어) : 추가되어야 불러온 html 에서 css/javasciprt 경로를 제대로 잡음
app.use(express.static(__dirname + "/adm"));
app.use("/lib",express.static(__dirname + "/lib"));

db_config.connect(conn);

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
          console.log("success");
          // 쿠키 세션 ? 주면서 넘기기 확인
          res.redirect("/manage");
        } else {
          console.log("fail");
          res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
          res.write("<script>alert('아이디 패스워드를 확인해 주세요')</script>");
          res.write("<script>window.location=\"/adm\"</script>");
        }
      }
    });
  })
});

// 매니지 페이지
app.get('/manage', (req, res) => {
  return res.sendFile(__dirname + '/adm/templates/manage.html');
})

// 패스워드 찾기
app.get('/password', (req, res) => {
  return res.sendFile(__dirname + '/adm/templates/password.html');
})

// 로그인 아이디 패스워드 입력
app.post('/password_process', function (req, res) {
  let body = '';
  req.on('data', function(data){
      body = body + data;
  });
  req.on('end', function(){
    let post = qs.parse(body);
    if(post.passwordHint === "yangbankim"){
        conn.query("SELECT * FROM AUTHOR", function (err, result, fields) {
          if (err) {
            throw err
          } else {
            console.log("success")
            // ajax 찾아보기
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});           
            res.write("<script>window.location=\"/password\"</script>");
            res.write("<script>alert('아이디 패스워드를 확인해 주세요')</script>");
            console.log(result[0].password);
          }
        });
    } else {
      console.log("fail");
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.write("<script>alert('힌트가 맞지 않습니다.')</script>");
      res.write("<script>window.location=\"/password\"</script>");
    }
  });
});



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