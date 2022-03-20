const express = require('express'); 
const router = express.Router();
const controller = require('../../controllers/admin/authController');

router.get('/', function(req, res, next){
    res.render('admin/login.html');
});


module.exports = router;