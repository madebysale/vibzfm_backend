import express from 'express';
import validate from 'express-validation';

import * as vibzfmcontroller from '../controllers/vibzfm/vibzfm.controller';
import * as deletecontroller from '../controllers/vibzfm/vibzfm.controller';

import * as vibzfmcontroller1 from '../controllers/vibzfm/vibzfm.controller';
import * as invoicevibzfmcontroller from '../controllers/vibzfm/vibzfm.controller';
import * as viewdetailvibzfmcontroller from '../controllers/vibzfm/vibzfm.controller';
import * as  salescontroller  from '../controllers/vibzfm/vibzfm.controller';
import * as  admincontroller  from '../controllers/vibzfm/admin.controller';
import * as  userController  from '../controllers/vibzfm/user.controller';
import * as  userlogincontroller  from '../controllers/vibzfm/user.controller';
import * as  forgetpasscontroller  from '../controllers/vibzfm/user.controller';
import * as  resetpasscontroller  from '../controllers/vibzfm/user.controller';


import * as  adminaccesscontroller  from '../controllers/vibzfm/user.controller';
import * as  verifycontroller  from '../controllers/vibzfm/user.controller';

import * as  salesrep  from '../controllers/vibzfm/user.controller';



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
router.post('/adminlogin',admincontroller.createadmin);
router.post('/delete/:id',deletecontroller.deletevibzfmUser);




router.post('/user',userController.createuser);
router.post('/userlogin',userlogincontroller.userlogin);

router.post('/salesuser',salescontroller.salespersonlist);
router.post('/forgetpassword',forgetpasscontroller.forgetpassword);
router.post('/resetpassword',resetpasscontroller.resetpassword);


router.post('/adminaccess',adminaccesscontroller.adminaccess);

router.post('/verifysalesrep',verifycontroller.verifysalesrep);
router.post('/salesrepverified/:id',salesrep.salesrepupdate);






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
