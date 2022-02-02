const express = require('express');
const app = express();
const port = 3000;
const db_config = require(__dirname + '/config/database.js');
const conn = db_config.init();

//adm 폴더의 클라이언트 접근 허용 (미들웨어) : 추가되어야 불러온 html 에서 css/javasciprt 경로를 제대로 잡음
app.use(express.static(__dirname + "/adm"));

db_config.connect(conn);

app.get('', (req, res) => {
  return res.sendFile(__dirname + '/adm/templates/memberEdit.html');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})