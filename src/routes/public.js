import express from 'express';
import validate from 'express-validation';

import * as vibzfmcontroller from '../controllers/vibzfm/vibzfm.controller';

import * as vibzfmcontroller1 from '../controllers/vibzfm/vibzfm.controller';
import * as invoicevibzfmcontroller from '../controllers/vibzfm/vibzfm.controller';
import * as viewdetailvibzfmcontroller from '../controllers/vibzfm/vibzfm.controller';
// import * as winnerController from '../controllers/winner/winner.controller'
// import * as userValidator from '../controllers/user/user.validator';
// import * as dashboardreport from '../controllers/dashboardandreport/dashboardreport.controller';
// import * as fakeuser from '../controllers/fakeuser/fakeuser.controller';


const router = express.Router();

//= ===============================
// Public routes
//= ===============================

// router.post(
//   '/login',
//   validate(userValidator.login),
//   userController.login,
// );
// router.post(
//   '/register',
//   validate(userValidator.register),
//   userController.register,
// );
// router.post(
//   '/verify',
//   validate(userValidator.verify),
//   userController.verify,
// );



router.post('/getdata',vibzfmcontroller.createvibzfmUser);
router.post('/list',vibzfmcontroller1.selectvibzfmUser);
router.post('/invoice',invoicevibzfmcontroller.invoicevibzfmUser);
router.post('/viewdetail',viewdetailvibzfmcontroller.viewdetailvibzfmUser);

// router.post('/adminlogout', userController.adminlogout);
// router.post('/adminuserregister', userController.adminuserregister);
// router.post('/winnerlist', winnerController.winnerlist);


// router.get(
//   '/getprofileid',
//   userController.getprofileid,
// );

// router.post(
//   '/AllTransactionlimit',
//   userController.AllTransactionlimit,
// );
// router.get('/getdashboarddata', dashboardreport.getdashboarddata);
// router.post('/Reports',dashboardreport.getreportdata);
// router.post('/getDailyreportdata',dashboardreport.getDailyreportdata);
// router.post('/createFakeuser',fakeuser.createFakeuser);



module.exports = router;
