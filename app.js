/**
 * =======================================
 * 설  명 : 모듈 
 * =======================================
 */
 const { response } = require('express');
 const express = require('express');
 const app = express();
 const port = 3000;
 const path = require("path");   // 유연한 디렉토리 
 const qs = require('querystring');    // url 쿼리 문자열 
 const cookieParser = require('cookie-parser')   // 쿠키 파서
 const expressSession = require('express-session');    // 세션 파서
 const ejs = require('ejs');  // ejs 템플릿
 
 /**
  * =======================================
  * 설  명 : 데이터베이스 Mysql
  * =======================================
  */
 const db_config = require(__dirname + '/config/database.js');
 const conn = db_config.init();
 db_config.connect(conn);
 
 /**
  * =======================================
  * 설  명 : ejs 템플릿 설정
  * =======================================
  */
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');
 app.engine('html', require('ejs').renderFile);
 
 /**
  * =======================================
  * 설  명 : app.use() 미들웨이 기능 마운트
  * =======================================
  */
 app.use(express.static(path.join(__dirname, 'public')));
 
 /**
  * =======================================
  * 설  명 : 라우팅(routes)
  * =======================================
  */
 let adminPages = require('./routes/admin/auth.js');    // 관리자 로그인
 
 //app.use('/', pages);
 app.use('/', adminPages);
 //app.use('/admin', adminPages);
 
 /**
  * =======================================
  * 설  명 : 서버 실행(포트 : 3000)
  * =======================================
  */

 // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
