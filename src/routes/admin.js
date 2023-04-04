// import express from 'express';
// import validate from 'express-validation';

// import * as userController from '../controllers/user/user.controller';
// import * as lotteryController from '../controllers/lottery/lottery.controller';
// import * as stepController from '../controllers/step/step.controller';
// import * as winnerController from '../controllers/winner/winner.controller';


// import * as ticketController from '../controllers/ticket/ticket.controller';
// import * as ticketValidator from '../controllers/ticket/ticket.validator';
// import * as transactionController from '../controllers/transaction/transaction.controller';

// import * as walletController from '../controllers/wallet/wallet.controller';
// import * as walletValidator from '../controllers/wallet/wallet.validator';
// import * as userValidator from '../controllers/user/user.validator';

// import * as agentController from '../controllers/agent/agent.controller';
// import * as dashboardreport from '../controllers/dashboardandreport/dashboardreport.controller';


// const router = express.Router();

// //= ===============================
// // Admin routes
// //= ===============================


// router.post('/craetestep', stepController.craetestep);
// router.get('/getallstep', stepController.getallstep);
// router.post('/Stepedit', stepController.Stepedit);
// router.post('/Stepdetilas', stepController.Stepdetilas);
// router.get('/getallstepnames', stepController.getallstepname);
 
// router.post('/craetelottery', lotteryController.craetelottery);
// router.get('/getalllottery', lotteryController.getalllottery);
// router.get('/getalllotteryfilter', lotteryController.getalllotteryfilter);
// router.post('/Lotteryedit', lotteryController.Lotteryedit);
// router.post('/Lotterydetilas', lotteryController.Lotterydetilas);

// router.post('/getallwinner', winnerController.getallwinner);
// router.post('/getallfakewinner', winnerController.getallfakewinner);

// router.post('/createWinner', ticketController.createWinner);
// router.post('/createFakeWinner', ticketController.createFakeWinner);
// router.post('/getuserbyid', ticketController.getuserbyid);
// router.post('/createManualWinner', ticketController.createManualWinner);
// router.post('/getwinnerbyid', winnerController.getwinnerbyid);
// router.post('/getallstepbylottery', stepController.getallstepbylottery)
// router.post('/getallwinneronreview', winnerController.getallwinneronreview);
// router.post('/dropreviewwinner', ticketController.dropreviewwinner);

// router.post('/myTransactions', transactionController.transactionlist);
// router.post('/Transactiondetails', transactionController.Transactiondetails);
// router.post('/Transactionedit', transactionController.Transactionedit);
// router.post('/depositetransactionlist', transactionController.depositetransactionlist);
// router.post('/withdrawaltransactionlist', transactionController.withdrawaltransactionlist);
// router.post('/withdrawalrequestlist', transactionController.withdrawalrequestlist);


// router.post('/withdrawstatusupdate', walletController.withdrawstatusupdate);
// router.post('/withdrawrequestcancel', walletController.withdrawrequestcancel);
// router.post('/getwinninglist', winnerController.getallwinninglist);
// router.post('/allTickets', ticketController.AllTickets);
// router.post('/allAgents', agentController.list);
// router.post('/listpromocode', agentController.listpromocode);
// router.post('/addAgent', agentController.createAgent);
// router.post('/editAgent', agentController.Agentedit);
// router.post('/detailsAgent', agentController.Agentdetails);
// router.post('/agentdepositetransactionlist', agentController.depositetransactionlist);
// router.post('/agentwithdrawaltransactionlist', agentController.withdrawaltransactionlist);
// router.post('/agentmyTransactions', agentController.transactionlist);
// router.post('/withdrawalagentmoney',agentController.withdrawalAgentMoney,);
// router.get('/getdashboarddata', dashboardreport.getdashboarddata);
// router.post('/Reports',dashboardreport.getreportdata);
// router.post(
//     '/ListAllTransactions',
//     userController.AllTransactions,
//   );

// router.post(
// 	'/addWallet',
// 	validate(walletValidator.add),
//     walletController.addfromadmin);
// router.post('/myWallet', walletController.getfromadmin);
// router.post(
//         '/register',
//         validate(userValidator.register),
//         userController.register,);
// router.post(
//     '/sendnotification',
//     userController.sendNotification,);
// router.post('/getalluser',userController.getprofile);

// router.post('/getprofileid',userController.getprofileid);
// router.post('/Useredit',userController.Useredit);

// module.exports = router;

