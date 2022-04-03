const express = require('express'); 
const router = express.Router();
const ManageController = require('../../controllers/admin/manageController');


/**
* =======================================
* 설  명 : 관리 라우터
* =======================================
*/
/* 카테고리 관리 라우터 */
router.get('/', ManageController.manage ); // 화면


/* 카테고리 매니저 */
//router.post('/manageCategoryProcess', ManageController.manageCategory); // 등록


module.exports = router;