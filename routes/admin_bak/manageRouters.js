const express = require('express'); 
const router = express.Router();
const ManageController = require('../../controllers/admin/manageController');


/**
* =======================================
* 설  명 : 관리 라우터 
* =======================================
*/
/* admin/manage */ 
/* 카테고리 관리 화면 */
router.get('/', function(req, res, next){ res.redirect('manage/1/1'); });
router.get('/:mainId/:page', ManageController.manageData);

/* 카테고리 Select 목록 */
router.get('/category/data', ManageController.manageCatgoryData);

/* 카테고리 Insert 매니저 */
router.post('/manageCategoryProcess', ManageController.manageCategory); 

/* 카테고리 Update 매니저 */
router.post('/manageCategoryUpdateProcess', ManageController.manageCategoryUpdate); 

/* 카테고리 Delete 매니저 */
router.delete('/category/:id', ManageController.manageCategoryDelete); 

module.exports = router;