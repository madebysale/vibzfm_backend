// import express from 'express';
// import validate from 'express-validation';

// import * as userController from '../controllers/user/user.controller';
// import * as userValidator from '../controllers/user/user.validator';

// import * as lotteryController from '../controllers/lottery/lottery.controller';

// import * as ticketController from '../controllers/ticket/ticket.controller';
// import * as ticketValidator from '../controllers/ticket/ticket.validator';

// import * as winnerController from '../controllers/winner/winner.controller';
// import * as winnerValidator from '../controllers/winner/winner.validator';

// import * as walletController from '../controllers/wallet/wallet.controller';
// import * as walletValidator from '../controllers/wallet/wallet.validator';

// import * as notificationController from '../controllers/notification/notification.controller';
// import * as notificationValidator from '../controllers/notification/notification.validator';

// import * as transactionController from '../controllers/transaction/transaction.controller';
// import * as stepController from '../controllers/step/step.controller';

// const router = express.Router();

// //= ===============================
// // API routes
// //= ===============================
// //router.post('/me', userController.profile);
// router.post(
//   '/changePassword',
//   validate(userValidator.changePassword),
//   userController.changePassword,
// );
// router.post(
//   '/uploadProfilePic',
//   //validate(userValidator.uploadProfilePic),
//   userController.uploadProfilePic,
// );


// router.post('/lotteries', lotteryController.list);

// router.get('/tickets', ticketController.list);
// router.post(
// 	'/buyTickets',
// 	validate(ticketValidator.buy),
// 	ticketController.buy);
// router.post('/myTickets', ticketController.myTickets);


// router.post(
// 	'/addWallet',
// 	validate(walletValidator.add),
// 	walletController.add);
// router.get('/myWallet', walletController.get);
// router.post(
// 	'/withdraw',
// 	validate(walletValidator.add),
// 	walletController.withdraw);


// router.post('/topWinners', winnerController.list);
// router.post('/myWinningList', winnerController.getwinninglist);
// router.post('/todaywinninglist', winnerController.mywinnerlist);
// router.post('/getallstepbylottery', stepController.getallstepbylottery)



// router.post('/notifications', notificationController.list);
// router.post(
// 	'/readNotification',
// 	validate(notificationValidator.read),
// 	notificationController.read);
// router.get('/readAllNotification', notificationController.readAll);

// router.post('/myTransactions', transactionController.list);
// router.post('/paytmChecksum', transactionController.paytmChecksum);
// router.post('/validatePaytmChecksum', transactionController.validatePaytmChecksum);

// module.exports = router;
