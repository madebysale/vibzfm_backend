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
import * as  totalnumbersalesrepcontroller  from '../controllers/vibzfm/user.controller';
import * as  updateagreementcontroller  from '../controllers/vibzfm/vibzfm.controller';
import * as  agreementlistcontroller  from '../controllers/vibzfm/vibzfm.controller';
import * as  totalcustomercontroller  from '../controllers/vibzfm/vibzfm.controller';
import * as updatecontroller  from '../controllers/vibzfm/vibzfm.controller';
import * as updatetableformcontroller  from '../controllers/vibzfm/vibzfm.controller';
import * as makecontractcontroller  from '../controllers/vibzfm/vibzfm.controller';
import * as contractlistcontroller  from '../controllers/vibzfm/vibzfm.controller';
import * as checkcustomercontroller  from '../controllers/vibzfm/vibzfm.controller';
import * as salesdropdowncontroller  from '../controllers/vibzfm/vibzfm.controller';







const router = express.Router();





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


//////sum of active inactive
router.post('/numberofsales',totalnumbersalesrepcontroller.totalnumbersalesrep);
router.post('/numberofsales',totalnumbersalesrepcontroller.totalnumbersalesrep);
router.post('/updateagreement/:id',updateagreementcontroller.updatevibzfmagrrement);


router.post('/agreementlist',agreementlistcontroller.agreementlist);




router.post('/totalcustomer',totalcustomercontroller.totalcustomer);
router.post('/updateform/:formid',updatecontroller.updateform);
router.post('/updateform',updatetableformcontroller.updatetableform);
router.post('/makecontract/:id',makecontractcontroller.makecontract);


router.post('/contractlist',contractlistcontroller.contractlist);
router.post('/checkcustomer',checkcustomercontroller.checkcustomer);
router.post('/salesdropdown',salesdropdowncontroller.salesdropdown);









module.exports = router;
