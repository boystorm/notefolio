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
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/**
 * =======================================
 * 설  명 : app.use() 미들웨이 기능 마운트
 * =======================================
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * =======================================
 * 설  명 : 라우팅
 * =======================================
 */
let pages = require('./routes/pages.js');   // 포트폴리오 메인
let adminPages = require('./routes/admin_pages.js');    // 관리자 메인

app.use('/', pages);
app.use('/admin', adminPages);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})