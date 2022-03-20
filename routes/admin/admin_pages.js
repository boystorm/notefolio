const express = require('express'); 
const router = express.Router();
const controller = require('../../controllers/controllers');

router.get('/', function(req, res, next){
    res.render('login.html');
});


module.exports = router;