const jwt = require('jsonwebtoken');
import crypto from "crypto";
import axios from "axios";

// import app from 'app.js'
// import express from "express";
// var bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
import { user, Vidzfm, sequelize } from "../../models";
import { successResponse, errorResponse, uniqueId } from "../../helpers";
const { Op } = require("sequelize");
const path = require("path");

const conn = require("../../config/conn").promise();
import multer from "multer";
import { env } from "process";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
});

var uploadSingle = upload.any();

export const createuser = async (req, res, next) => {
  console.log(req.body, "init");
  try {
    uploadSingle(req, res, async function (err) {
      console.log(req.body, "inner the function");

      var signature = "";

      if (req.files) {
        for (var i = 0; i < req.files.length; i++) {
          if (req.files[i].fieldname == "signature") {
            signature = req.files[i].filename;
          }
        }
      }

      const existingEmailUser = await user.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (existingEmailUser) {
        return res.status(400).json({
          message: "Email address already exists",
        });
      }

      const existingMobileUser = await user.findOne({
        where: {
          mobile: req.body.mobile,
        },
      });

      if (existingMobileUser) {
        return res.status(400).json({
          message: "Mobile number already exists",
        });
      }

      console.log(req.body.otp, "canvasSignature");
      console.log(signature, "image");
      const hashPass = await bcrypt.hash(req.body.password, 12);
      console.log(user.role, "sddss");
      console.log(user.Role, "s44ddss");

      const newUser = await user.create({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hashPass,
        signature,
      });

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.Nodemailer_email,
          pass: process.env.Nodemailer_pass,
        },
      });

      let mailOptions = {
        from: "madebysale.impetrosys@gmail.com",
        to: req.body.email,
        subject:"Registration Confirmation",
        // text: "congratulations for register in VIBZFM " + req.body.email,
        text:`Dear ${req.body.name},\n\nThank you for registeration in Vibzfm Your registration is pending for verification by the admin.\n\nBest regards,\n VIBZFM`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(500).send("Failed to send password reset email");
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).send({ message: "Password reset email sent" });
        }
      });

      if (newUser) {
        return res.status(201).json({
          message: "Your account has been created successfully.",
        });
      }
    });
  } catch (err) {
    next(err);
  }
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

    if (!existingUser) {
      return res.status(422).json({
        message: "Invalid email address",
      });
    }

    const use = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

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
        expiresIn: "7d",
      }
    );

    if (existingUser.status == false) {
      return res.status(422).json({
        message:
          "Sorry! your account is not verified yet, please contact to admin to get it verified.",
      });
    }

    return res.json({
      token: theToken,
      data: use,
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
        message: "invalid Email ",
      });
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "madebysale.impetrosys@gmail.com",
        pass: "cnglhgqwdjgdaitx",

      

      },
    });

    const otp = crypto.randomInt(1000000).toString().padStart(6, "0");

    const [numRowsUpdated, updatedUser] = await user.update(
      { otp },
      { where: { id: usera.id } }
    );

    console.log(`Updated ${numRowsUpdated} rows for user ${usera.id}`);
    console.log(otp);
    // Define the email message
    let mailOptions = {
      from: "madebysale.impetrosys@gmail.com",
      to: req.body.email,
      subject: "Password Reset Request",
      text:
      
      `There was a request to change your password!\n\nIf you did not make this request then please ignore this email.\n\nOtherwise, Here your otp:${otp}`
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
        res
          .status(500)
          .send({ message: "Failed to send password reset email" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send({ message: "sent the OTP on your email." });
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
    if (req.body.password === "") {
      res.send("invalid password");
    } else {
      const existingUser = await user.findOne({
        where: { email: req.body.email, otp: req.body.otp },
      });

      if (!existingUser) {
        return res.status(400).json({
          message: "incorrect otp",
        });
      }

      const match = await bcrypt.compare(
        req.body.password,
        existingUser.password
      );
      if (match) {
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

        res.send({ message: "password changed" });
      }
    }
  } catch (error) {
    next(error);
  }
};
////////////////////////////////////////////////////////////////////////////

export const verifysalesrep = async (req, res, next) => {
  try {
    const users = await user.findAll();
    return successResponse(req, res, users);
  } catch (err) {
    console.log(err);
  }
};

export const adminaccess = async (req, res, next) => {
  try {
    const users = await user.findAll({
      where: {
        Role: 3,
      },
      order: [["id", "DESC"]],
    });
    return successResponse(req, res, users);
  } catch (err) {
    console.log(err);
  }
};

export const salesrepupdate = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const userId = req.params.id;
    const rows = await conn.execute(
      `UPDATE users SET status = CASE
      WHEN status = true THEN false
      ELSE true
  END
  WHERE id = ${userId}`
    );

    return successResponse(req, res, rows);
  } catch (err) {
    console.log(err);
  }
};

export const totalnumbersalesrep = async (req, res, next) => {
  try {
    const result = await user.findOne({
      attributes: [
        [
          sequelize.literal("SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END)"),
          "active",
        ],
        [
          sequelize.literal("SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END)"),
          "inactive",
        ],
        [
          sequelize.literal("SUM(CASE WHEN role = 3 THEN 1 ELSE 0 END)"),
          "sum_of_roles",
        ],
      ],
    });

    return successResponse(req, res, [result]);
  } catch (err) {
    console.log(err);
  }
};

export const salesdropdown = async (req, res) => {
  try {
    const token = req.headers["x-token"];
    // console.log(token)
    const decoded = jwt.verify(token, "the-super-strong-secrect");

    if (decoded.userss.role == 1) {
      const records = await user.findAll({
        attributes: ['name', 'lastname'],
        raw: true,
      });

      const options = records.map((record) => `${record.name} ${record.lastname}`);

      res.json(options);
    } else if (decoded.userss.role == 3) {
      const records = await user.findAll({
        attributes: ['name' ,'lastname'],
        where: {
          id: decoded.userss.id,
        },
        raw: true,
      });

      const options = records.map((record) => `${record.name} ${record.lastname}`);

      res.json(options);
    } else {
      res.status(403).json({ error: 'Access denied' });
    }
  } catch (error) {
    console.error('Error fetching sales representatives:', error);
    // res.status(500).json({ error: 'Failed to fetch sales representatives' });
  }
};







// export const salesdropdown = async (req, res)=>{
//   try{
// const token = req.headers['x-token'];
// const decoded = jwt.verify(token, "the-super-strong-secret");

// if (decoded.userss.role === 1) {
// const names= user.findAll({
//     attributes: [[sequelize.fn('DISTINCT', sequelize.col('name')), 'name']],
//     raw: true
//   })
  
//       const options = names.map((record) => record.name);
//       res.json(options);

   
// } else if (decoded.userss.role === 3) {
//  const names= user.findAll({
//     where: { id: decoded.userss.id },
//     raw: true
//   })
   
//       res.json(names);
 
// }
// } catch(err){
//   console.log(err)
//   res.status(403).json({ error: 'Invalid user role' });
// }
// }