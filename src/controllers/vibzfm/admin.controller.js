import jwt from "jsonwebtoken";

const bcrypt = require('bcrypt');
import axios from "axios";
import { admin, sequelize } from "../../models";
import { successResponse, errorResponse, uniqueId } from "../../helpers";
// import user from "../models/user";

// import vidzfm from '../../models/vidzfm';
const { Op } = require("sequelize");

// const conn = require("../../config/conn").promise();


export const createadmin = async (req, res) => {

  const { email, password } = req.body;
    try {

////////////////////////////////////

// if (
//   !req.headers.authorization ||
//   !req.headers.authorization.startsWith("Bearer") ||
//   !req.headers.authorization.split(" ")[1]
// ) {
//   return res.status(422).json({
//     message: "Please provide the token",
//   });
// }

// const Token = req.headers.authorization.split(" ")[1];
// const decoded = jwt.verify(theToken, "the-super-strong-secrect");







//  const result = await admin.create({
       
//   email:req.body.email,
//   // password: req.body.password,
 
//   password:req.body.password,
//   Token:theToken,
//   createdAt: req.body.createdAt,
// updatedAt: req.body.updatedAt,
      

// });


// const password = await bcrypt.hash(req.body.password, 12);

   // Check if admin with given email exists
    const admina = await admin.findOne({ where: { email,password } });

    if (!admina) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

 

    const theToken = jwt.sign({ id: admin.id }, process.env.SECRET, { expiresIn: '1m' }
      
      // process.env.SECRET,
  ); 
    return successResponse(req,res,{theToken} );
    // return res.status(200).json({ message: 'Login successful' });
  







////////////////////////////////////







      // const rest = await admin.findOne({
      //   where: {
          
      //        password: req.body.password
          
          
      //   }
      // }).then((resp) => {
      //   console.log(resp);
      
      //   if (resp) {
      //     res.send({
      //       message: "This password is already used",
      //     });
      //   }
      //   // return successResponse(req,res,rest );
      // });


/////////////////////////////


 // Find the user in the database

 
//  const result = await admin.create({
       
//   email:req.body.email,
//   password: req.body.password,
//   createdAt: req.body.createdAt,
// updatedAt: req.body.updatedAt,
 

// });


//  const user = await admin.findOne({ where: { email } });

//  if (!user) {
//    return res.status(401).json({ message: 'Invalid email or password' });
//  }

 // Validate the user's password
//  const isMatch = await bcrypt.compare(user.password,password);

//  if (!isMatch) {
//    return res.status(401).json({ message: 'Invalid email or password' });
//  }

 // Create a JWT token















// } 










     


  

     


   
     
 
      }  
        
     catch (err) {
      console.log(err);
    }
  };
  
