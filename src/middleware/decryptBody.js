// import { errorResponse } from '../helpers';
// require('dotenv').config();
// var aesEcb = require('aes-ecb');

// const decrypt = async (req, res, next) => {  
//   try {
//     const keyString = process.env.AES_SECRET;    
//     console.log('req.body',req.body);
//     var data = aesEcb.decrypt(keyString, req.body.data);
//     req.body = JSON.parse(data);
//     console.log(req.body);
//     return next();
//   } catch (error) {
//     return errorResponse(
//       req,
//       res,
//       'Incorrect data format, try again',
//       401,
//     );
//   }
// };

// export default decrypt;
