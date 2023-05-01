import jwt from "jsonwebtoken";
import crypto from "crypto";
import axios from "axios";
// import app from 'app.js'
// import express from "express";
// var bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
import { user, Vidzfm, sequelize } from "../../models";
import { successResponse, errorResponse, uniqueId } from "../../helpers";
const { Op } = require("sequelize");
const path = require("path");

const conn = require("../../config/conn").promise();
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB file size limit
});


var uploadSingle = upload.any();

export const createuser = async (req, res, next) => {
  console.log(req.body, "init");
  uploadSingle(req, res, async function (err) {
    console.log(req.body, "ods");
    // Use the upload middleware to handle file upload
    try {
      var signature = "";
      if (req.files) {
        for (var i = 0; i < req.files.length; i++) {
          if (req.files[i].fieldname == "signature") {
            signature = req.files[i].filename;
          }
        }
      }

      const existingUser = await user.findOne({
        where: { email: req.body.email },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Email address already exists",
        });
      }
   console.log(req.body.otp,"canvasSignature")
   console.log(signature,"image")
      const hashPass = await  bcrypt.hash(req.body.password, 12);
   console.log(req.body.mobile,"sddss")
  //  console.log(req.body.mobile,"sddss")
      const newUser = await user.create({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        canvasSignature: req.body.canvasSignature,          
        password: hashPass,
        signature,
        
        

           // Set the file name to the signature field
      });


      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'madebysale.impetrosys@gmail.com',
          pass: 'cnglhgqwdjgdaitx'
        }
      });
  
     
      // const otp = crypto.randomInt(1000000).toString().padStart(6, '0');
  
  
      // Define the email message
      let mailOptions = {
        from: 'madebysale.impetrosys@gmail.com',
        to: req.body.email,
        subject: 'Password Reset Request',
        text: "congratulations for register in VIBZFM "+req.body.email
      };
  
  
  
      transporter.sendMail(mailOptions,function(error, info) {
        if (error) {
          console.log(error);
          res.status(500).send('Failed to send password reset email');
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send({message:'Password reset email sent'});
        }
      });



      if (newUser) {
        return res.status(201).json({
          message: "Registration successful",
        });
      }
    } catch (err) {
      next(err);
    }
  });
};

// const upload = multer({
//   dest: "/uploads"
// });
// var uploadSingle = upload.any();
// export const createuser = async (req, res, next) => {
//   console.log(req.files,"init")
//   uploadSingle(req, res, async function (err) {
//     console.log(req.files,'outside')
//     // Use the upload middleware to handle file upload
//       var signature="";
//       if(req.files){
//           for (let i = 0; i < req.files.length; i++) {
//             if(req.files[i].fieldname == 'signature'){
//               signature = (req.files[i].filename);
//             }
//           }
//       }

//////////////////////////////////////////////////////////////////////////////////

export const userlogin = async (req, res, next) => {
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ errors: errors.array() });
  // }

  try {
    const existingUser = await user.findOne({
      where: {
        email: req.body.email,
      },
    });
    
    if(existingUser.status==false){
      return res.status(422).json({
        message: "admin has to verify you",
      });
    }



    if (!existingUser) {
      return res.status(422).json({
        message: "Invalid email address",
      });
    }

    const passMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!passMatch) {
      return res.status(422).json({
        message: "Incorrect password",
      });
    }

    const theToken = jwt.sign(
      { userss: existingUser },
      "the-super-strong-secrect",
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      token: theToken,
      email: req.body.email,
      message: " login sucessfully ",
    });
  } catch (err) {
    next(err);
  }
};


////////////////////////////////////////////////////////////////////////////////////////////


export const forgetpassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const usera = await user.findOne({ where: { email } });

    if (!usera) {
      return res.status(400).json({
        message: "Email is not exist in your database",
      });
    }

  
  
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'madebysale.impetrosys@gmail.com',
        pass: 'cnglhgqwdjgdaitx'
      }
    });

   
    const otp = crypto.randomInt(1000000).toString().padStart(6, '0');
 
 
    
    const [numRowsUpdated, updatedUser] = await user.update({ otp }, { where: { id: usera.id } });

    console.log(`Updated ${numRowsUpdated} rows for user ${usera.id}`);
    console.log(otp)
    // Define the email message
    let mailOptions = {
      from: 'madebysale.impetrosys@gmail.com',
      to: req.body.email,
      subject: 'Password Reset Request',
      text: 'here is your reset otp:'+otp
    };



    transporter.sendMail(mailOptions,async function(error, info) {
      if (error) {
        console.log(error);
        res.status(500).send({message:'Failed to send password reset email'});
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send({message:'Password reset email sent'});
      }
    });


    // res.send({
    //   message: "reset link sent on your email",
    // });
  } catch (err) {
    next(err);
  }
};

export const resetpassword = async (req, res, next) => {
  try {
    if (req.body.password === "" ) {
      res.send("invalid password");
    } else {
      const existingUser = await user.findOne({
        where: { email: req.body.email,otp:req.body.otp },
      });
      // if (!existingUser) {
      //   // return res.send({message:"email is not in the database"});
      //   return res.status(400).json({
      //     message: "incorrect email",
      //   });
      // }
      if (!existingUser) {
        // return res.send({message:"email is not in the database"});
        return res.status(400).json({
          message: "incorrect otp",
        });
      }
  

      const match = await bcrypt.compare(
        req.body.password,
        existingUser.password
      );
      if (match) {
        // res.send({message:"new password cannot be the same as the old password"});
        return res.status(400).json({
          message: "new password cannot be the same as the old password",
        });
      } else {
        const saltRounds = 10;
        const hashPass = await bcrypt.hash(req.body.password, saltRounds);
        console.log(hashPass);

        await existingUser.update({
          password: hashPass,
        });

        res.send({message:"password changed"});
      }
    }
  } catch (error) {
    next(error);
  }
};
////////////////////////////////////////////////////////////////////////////


export const verifysalesrep= async(req,res,next)=>{
  try {
    const users = await user.findAll();
    return successResponse(req, res, users);

     } catch (err) {
    console.log(err);
  }
};


export const adminaccess = async(req,res,next)=>{
  try {
    const users = await user.findAll({
      where:{Role:3}
    });
    return successResponse(req, res, users);

     } catch (err) {
    console.log(err);
  }

}

export const salesrepupdate = async (req, res, next) => {

    const userId = req.params.id;
    





try {
  const userId = req.params.id;
  const rows =
    await conn.execute(
      `UPDATE users SET status = CASE
      WHEN status = true THEN false
      ELSE true
  END
  WHERE id = ${userId}`
    )

    return successResponse(req, res, rows);
}catch(err){
 console.log(err)
}


}