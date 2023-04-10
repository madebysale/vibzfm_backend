import jwt from "jsonwebtoken";
import crypto from "crypto";
import axios from "axios";
import { admin, sequelize } from "../../models";
import { successResponse, errorResponse, uniqueId } from "../../helpers";
// import user from "../models/user";

// import vidzfm from '../../models/vidzfm';
const { Op } = require("sequelize");

// const conn = require("../../config/conn").promise();


export const createadmin = async (req, res) => {
    try {

      const rest = await admin.findOne({
        where: {
          
             password: req.body.password
          
          
        }
      }).then((resp) => {
        console.log(resp);
      
        if (resp) {
          res.send({
            message: "This password is already used",
          });
        }
        // return successResponse(req,res,rest );
      });
     


      const result = await admin.create({
       
        email:req.body.email,
        password: req.body.password,
        createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
       
   
      });

     

// const passMatch = await bcrypt.compare(req.body.password, admin.password);
// if (!passMatch) {
//   return res.status(422).json({
//     message: "Incorrect password",
//   });
// }

// const theToken = jwt.sign({ id: admin.id }, "the-super-strong-secrect", {
//   expiresIn: "1h",
// });

// return res.json({
//   token: theToken,
//   message:" login sucessfully "
// });
  

      // const admin = await admin.findOne({ where: { email: req.body.email } });
   
      const theToken = jwt.sign(
        {
        
        },
        process.env.SECRET,
      ); 
      return successResponse(req,res,{result,theToken} );
    //   const not = await admin.findOne({ where: { email:result.email } });
    //   if (not) {
    //     return  successResponse({res, error:'Invalid username or password'});
    //   }
     
        
    } catch (err) {
      console.log(err);
    }
  };
  
