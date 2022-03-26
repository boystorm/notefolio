const Author = require("../../models/admin/author");

exports.login = function(req, res){
  // :id 값으로 파라미터를 넘길때만 --> req.params 사용가능 -- 
  let id = req.body.id;
  let password = req.body.password;

  Author.login(id, password, function(err, result){
    // 폴더 model/author.js 에서에서 처리 후 쿼리 데이터를 넘겨받는 받음
    if (err) {
      res.send(err);
    } else { 
      if(result.length > 0){   
        res.render('admin/manage.html');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<script>alert('아이디 패스워드를 확인해 주세요')</script>");
        res.write("<script>window.location=\"/\"</script>");
      }
    }
  })
};