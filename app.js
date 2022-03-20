const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;

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
 * 설  명 : 모듈 
 * =======================================
 */
let path = require("path");   // 유연한 디렉토리 
let qs = require('querystring');    // url 쿼리 문자열 
let cookieParser = require('cookie-parser')   // 쿠키 파서
let expressSession = require('express-session');    // 세션 파서

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
let adminPages = require('./routes/admin/admin_pages.js');    // 관리자 메인

//app.use('/', pages);
app.use('/', adminPages);
//app.use('/admin', adminPages);

/**
 * =======================================
 * 설  명 : 서버 실행(포트 : 3000)
 * =======================================
 */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})