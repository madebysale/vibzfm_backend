const jwt = require("jsonwebtoken");
import crypto from "crypto";
import axios from "axios";
// const axios = require('axios');

// import express from "express";
// var bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
import { user, Vidzfm, sequelize } from "../../models";
import { successResponse, errorResponse, uniqueId } from "../../helpers";
const { Op } = require("sequelize");
const path = require("path");

const conn = require("../../config/conn");
import multer from "multer";
import { env } from "process";
import { response } from "express";

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
        // clickup_code:req.body.clickup_code,
      });

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "madebysale.impetrosys@gmail.com",
          pass: "cnglhgqwdjgdaitx",
        },
      });

      let mailOptions = {
        from: "madebysale.impetrosys@gmail.com",
        to: req.body.email,
        subject: "Registration Confirmation",
        // text: "congratulations for register in VIBZFM " + req.body.email,
        // text:`Dear ${req.body.name},\n\nThank you for registeration in Vibzfm Your registration is pending for verification by the admin.\n\nBest regards,\n VIBZFM`
        html: `<html xmlns="http://www.w3.org/1999/xhtml">

        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
          <title>New Assignment</title>
          <style type="text/css">
            /* reset */
            article,
            aside,
            details,
            figcaption,
            figure,
            footer,
            header,
            hgroup,
            nav,
            section,
            summary {
              display: block
            }
        
            audio,
            canvas,
            video {
              display: inline-block;
              *display: inline;
              *zoom: 1
            }
        
            audio:not([controls]) {
              display: none;
              height: 0
            }
        
            [hidden] {
              display: none
            }
        
            html {
              font-size: 100%;
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%
            }
        
            html,
            button,
            input,
            select,
            textarea {
              font-family: sans-serif
            }
        
            body {
              margin: 0
            }
        
            a:focus {
              outline: thin dotted
            }
        
            a:active,
            a:hover {
              outline: 0
            }
        
            h1 {
              font-size: 2em;
              margin: 0 0.67em 0
            }
        
            h2 {
              font-size: 1.5em;
              margin: 0 0 .83em 0
            }
        
            h3 {
              font-size: 1.17em;
              margin: 1em 0
            }
        
            h4 {
              font-size: 1em;
              margin: 1.33em 0
            }
        
            h5 {
              font-size: .83em;
              margin: 1.67em 0
            }
        
            h6 {
              font-size: .75em;
              margin: 2.33em 0
            }
        
            abbr[title] {
              border-bottom: 1px dotted
            }
        
            b,
            strong {
              font-weight: bold
            }
        
            blockquote {
              margin: 1em 40px
            }
        
            dfn {
              font-style: italic
            }
        
            mark {
              background: #ff0;
              color: #000
            }
        
            p,
            pre {
              margin: 1em 0
            }
        
            code,
            kbd,
            pre,
            samp {
              font-family: monospace, serif;
              _font-family: 'courier new', monospace;
              font-size: 1em
            }
        
            pre {
              white-space: pre;
              white-space: pre-wrap;
              word-wrap: break-word
            }
        
            q {
              quotes: none
            }
        
            q:before,
            q:after {
              content: '';
              content: none
            }
        
            small {
              font-size: 75%
            }
        
            sub,
            sup {
              font-size: 75%;
              line-height: 0;
              position: relative;
              vertical-align: baseline
            }
        
            sup {
              top: -0.5em
            }
        
            sub {
              bottom: -0.25em
            }
        
            dl,
            menu,
            ol,
            ul {
              margin: 1em 0
            }
        
            dd {
              margin: 0 0 0 40px
            }
        
            menu,
            ol,
            ul {
              padding: 0 0 0 40px
            }
        
            nav ul,
            nav ol {
              list-style: none;
              list-style-image: none
            }
        
            img {
              border: 0;
              -ms-interpolation-mode: bicubic
            }
        
            svg:not(:root) {
              overflow: hidden
            }
        
            figure {
              margin: 0
            }
        
            form {
              margin: 0
            }
        
            fieldset {
              border: 1px solid #c0c0c0;
              margin: 0 2px;
              padding: .35em .625em .75em
            }
        
            legend {
              border: 0;
              padding: 0;
              white-space: normal;
              *margin-left: -7px
            }
        
            button,
            input,
            select,
            textarea {
              font-size: 100%;
              margin: 0;
              vertical-align: baseline;
              *vertical-align: middle
            }
        
            button,
            input {
              line-height: normal
            }
        
            button,
            html input[type="button"],
            input[type="reset"],
            input[type="submit"] {
              -webkit-appearance: button;
              cursor: pointer;
              *overflow: visible
            }
        
            button[disabled],
            input[disabled] {
              cursor: default
            }
        
            input[type="checkbox"],
            input[type="radio"] {
              box-sizing: border-box;
              padding: 0;
              *height: 13px;
              *width: 13px
            }
        
            input[type="search"] {
              -webkit-appearance: textfield;
              -moz-box-sizing: content-box;
              -webkit-box-sizing: content-box;
              box-sizing: content-box
            }
        
            input[type="search"]::-webkit-search-cancel-button,
            input[type="search"]::-webkit-search-decoration {
              -webkit-appearance: none
            }
        
            button::-moz-focus-inner,
            input::-moz-focus-inner {
              border: 0;
              padding: 0
            }
        
            textarea {
              overflow: auto;
              vertical-align: top
            }
        
            table {
              border-collapse: collapse;
              border-spacing: 0
            }
        
            /* custom client-specific styles including styles for different online clients */
            .ReadMsgBody {
              width: 100%;
            }
        
            .ExternalClass {
              width: 100%;
            }
        
            /* hotmail / outlook.com */
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
              line-height: 100%;
            }
        
            /* hotmail / outlook.com */
            table,
            td {
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
        
            /* Outlook */
            #outlook a {
              padding: 0;
            }
        
            /* Outlook */
            img {
              -ms-interpolation-mode: bicubic;
              display: block;
              outline: none;
              text-decoration: none;
            }
        
            /* IExplorer */
            body,
            table,
            td,
            p,
            a,
            li,
            blockquote {
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
              font-weight: normal !important;
            }
        
            .ExternalClass td[class="ecxflexibleContainerBox"] h3 {
              padding-top: 10px !important;
            }
        
            /* hotmail */
            /* email template styles */
            h1 {
              display: block;
              font-size: 26px;
              font-style: normal;
              font-weight: normal;
              line-height: 100%;
            }
        
            h2 {
              display: block;
              font-size: 20px;
              font-style: normal;
              font-weight: normal;
              line-height: 120%;
            }
        
            h3 {
              display: block;
              font-size: 17px;
              font-style: normal;
              font-weight: normal;
              line-height: 110%;
            }
        
            h4 {
              display: block;
              font-size: 18px;
              font-style: italic;
              font-weight: normal;
              line-height: 100%;
            }
        
            .flexibleImage {
              height: auto;
            }
        
            table[class=flexibleContainerCellDivider] {
              padding-bottom: 0 !important;
              padding-top: 0 !important;
            }
        
            body,
            #bodyTbl {
              background-color: #E1E1E1;
            }
        
            #emailHeader {
              background-color: #E1E1E1;
            }
        
            #emailBody {
              background-color: #FFFFFF;
            }
        
            #emailFooter {
              background-color: #E1E1E1;
            }
        
            .textContent {
              color: #8B8B8B;
              font-family: Helvetica;
              font-size: 16px;
              line-height: 125%;
              text-align: Left;
            }
        
            .textContent a {
              color: #205478;
              text-decoration: underline;
            }
        
            .emailButton {
              background-color: #205478;
              border-collapse: separate;
            }
        
            .buttonContent {
              color: #FFFFFF;
              font-family: Helvetica;
              font-size: 18px;
              font-weight: bold;
              line-height: 100%;
              padding: 15px;
              text-align: center;
            }
        
            .buttonContent a {
              color: #FFFFFF;
              display: block;
              text-decoration: none !important;
              border: 0 !important;
            }
        
            #invisibleIntroduction {
              display: none;
              display: none !important;
            }
        
            /* hide the introduction text */
            /* other framework hacks and overrides */
            span[class=ios-color-hack] a {
              color: #275100 !important;
              text-decoration: none !important;
            }
        
            /* Remove all link colors in IOS (below are duplicates based on the color preference) */
            span[class=ios-color-hack2] a {
              color: #205478 !important;
              text-decoration: none !important;
            }
        
            span[class=ios-color-hack3] a {
              color: #8B8B8B !important;
              text-decoration: none !important;
            }
        
            /* phones and sms */
            .a[href^="tel"],
            a[href^="sms"] {
              text-decoration: none !important;
              color: #606060 !important;
              pointer-events: none !important;
              cursor: default !important;
            }
        
            .mobile_link a[href^="tel"],
            .mobile_link a[href^="sms"] {
              text-decoration: none !important;
              color: #606060 !important;
              pointer-events: auto !important;
              cursor: default !important;
            }
        
            /* responsive styles */
            @media only screen and (max-width: 480px) {
              body {
                width: 100% !important;
                min-width: 100% !important;
              }
        
              table[id="emailHeader"],
              table[id="emailBody"],
              table[id="emailFooter"],
              table[class="flexibleContainer"] {
                width: 100% !important;
              }
        
              td[class="flexibleContainerBox"],
              td[class="flexibleContainerBox"] table {
                display: block;
                width: 100%;
                text-align: left;
              }
        
              td[class="imageContent"] img {
                height: auto !important;
                width: 100% !important;
                max-width: 100% !important;
              }
        
              img[class="flexibleImage"] {
                height: auto !important;
                width: 100% !important;
                max-width: 100% !important;
              }
        
              img[class="flexibleImageSmall"] {
                height: auto !important;
                width: auto !important;
              }
        
              table[class="flexibleContainerBoxNext"] {
                padding-top: 10px !important;
              }
        
              table[class="emailButton"] {
                width: 100% !important;
              }
        
              td[class="buttonContent"] {
                padding: 0 !important;
              }
        
              td[class="buttonContent"] a {
                padding: 15px !important;
              }
            }
          </style>
          <!--
              MS Outlook custom styles
            -->
          <!--[if mso 12]>
              <style type="text/css">
                .flexibleContainer{display:block !important; width:100% !important;}
              </style>
            <![endif]-->
          <!--[if mso 14]>
              <style type="text/css">
                .flexibleContainer{display:block !important; width:100% !important;}
              </style>
            <![endif]-->
        </head>
        
        <body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
          <center style="background-color:#E1E1E1;">
            <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTbl" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;">
              <tr>
                <td align="center" valign="top" id="bodyCell">
        
                  <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader">
                    <tr>
                      <td align="center" valign="top">
        
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td align="center" valign="top">
        
                              <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer">
                                <tr>
                                  <td valign="top" width="500" class="flexibleContainerCell">
        
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tr>
                                        <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none;display:none !important;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                                            <tr>
                                              <td align="left" class="textContent">
                                                <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;">
                                                  Here you can put short introduction of your email template.
                                                </div>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
        
                            </td>
                          </tr>
                        </table>
        
                      </td>
                    </tr>
                  </table>
        
                  <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="800" height ="500" id="emailBody">
        
                    <tr>
                      <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#fff">
                          <tr>
                            <td align="center" valign="top">
                              <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                                <tr>
                                  <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                    <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                      <tr>
                                        <td align="center" valign="top" class="textContent">
        <!--                                   <h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;">{{organizationName}} New Assignment</h1> -->
                                          <h2 style="text-align:center;font-weight:normal;font-family:Helvetica,Arial,sans-serif;font-size:23px;margin-bottom:10px;color:#C9BC20;line-height:135%;">Welcome</h2>
        <img style ="width:150px ; align-item:center;margin-left:145px" src="https://contract.familyfm.ltd/static/media/fm_logo.8ab00a202cf2f9daeaa1.png"></img>
        <!--                                   <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#FFFFFF;line-height:135%;">You have been assigned a {{taskType}} </div> -->
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td align="center" valign="top">
                              <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                                <tr>
                                  <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                    <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                      <tr>
                                        <td align="center" valign="top">
        
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                              <td valign="top" class="textContent">
                                                <h1 style="text-align:center; margin-bottom:15px">Account Registered Successfully
                                                </h1>                                  
                                                <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">Dear ${req.body.name}</h3>
                                                <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:135%;">
                                        Thank you for registering. Your account will be verified by VibzFM shortly. Once your account is verified, you can log in and contact VibzFM for any further queries.
                                                  
                                                </div>
                                              </td>
                                            </tr>
                                          </table>
        
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
        
                    <tr>
                      <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8">
                          <tr>
                            <td align="center" valign="top">
                              <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                                <tr>
                                  <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                    <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                      <tr>
                                        <td align="center" valign="top">
                                          <table border="0" cellpadding="0" cellspacing="0" width="50%" class="emailButton" style="background-color: #2E7D32;">
                                            <tr>
                                              <td align="center" valign="middle" class="buttonContent" style="padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px;">
                                                <a style="color:#FFFFFF;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:20px;line-height:135%;" href="https://contract.familyfm.ltd/login" target="_blank">Click for Login</a>
                                              </td>
                                            </tr>
                                          </table>
        
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
        
                  </table>
        
                  <!-- footer -->
                  <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailFooter">
                    <tr>
                      <td align="center" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td align="center" valign="top">
                              <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                                <tr>
                                  <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                    <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                      <tr>
                                        <td valign="top" bgcolor="#E1E1E1">
        
                                          <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;">
                                            <div>Copyright &#169; 2022. All rights reserved.</div>
                                            <div>If you don't want to receive these emails from us in the future, please <a href="https://app.omegaconstructionmanagement.com/profile" target="_blank" style="text-decoration:none;color:#828282;"><span style="color:#828282;">unsubscribe</span></a></div>
                                          </div>
        
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <!-- // end of footer -->
        
                </td>
              </tr>
            </table>
          </center>
        </body>
        
        </html>`,
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
        expiresIn: "1 day",
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
    const { email, name } = req.body;
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
      html: `<html xmlns="">

      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>New Assignment</title>
        <style type="text/css">
          /* reset */
          article,
          aside,
          details,
          figcaption,
          figure,
          footer,
          header,
          hgroup,
          nav,
          section,
          summary {
            display: block
          }
      
          audio,
          canvas,
          video {
            display: inline-block;
            *display: inline;
            *zoom: 1
          }
      
          audio:not([controls]) {
            display: none;
            height: 0
          }
      
          [hidden] {
            display: none
          }
      
          html {
            font-size: 100%;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%
          }
      
          html,
          button,
          input,
          select,
          textarea {
            font-family: sans-serif
          }
      
          body {
            margin: 0
          }
      
          a:focus {
            outline: thin dotted
          }
      
          a:active,
          a:hover {
            outline: 0
          }
      
          h1 {
            font-size: 2em;
            margin: 0 0.67em 0
          }
      
          h2 {
            font-size: 1.5em;
            margin: 0 0 .83em 0
          }
      
          h3 {
            font-size: 1.17em;
            margin: 1em 0
          }
      
          h4 {
            font-size: 1em;
            margin: 1.33em 0
          }
      
          h5 {
            font-size: .83em;
            margin: 1.67em 0
          }
      
          h6 {
            font-size: .75em;
            margin: 2.33em 0
          }
      
          abbr[title] {
            border-bottom: 1px dotted
          }
      
          b,
          strong {
            font-weight: bold
          }
      
          blockquote {
            margin: 1em 40px
          }
      
          dfn {
            font-style: italic
          }
      
          mark {
            background: #ff0;
            color: #000
          }
      
          p,
          pre {
            margin: 1em 0
          }
      
          code,
          kbd,
          pre,
          samp {
            font-family: monospace, serif;
            _font-family: 'courier new', monospace;
            font-size: 1em
          }
      
          pre {
            white-space: pre;
            white-space: pre-wrap;
            word-wrap: break-word
          }
      
          q {
            quotes: none
          }
      
          q:before,
          q:after {
            content: '';
            content: none
          }
      
          small {
            font-size: 75%
          }
      
          sub,
          sup {
            font-size: 75%;
            line-height: 0;
            position: relative;
            vertical-align: baseline
          }
      
          sup {
            top: -0.5em
          }
      
          sub {
            bottom: -0.25em
          }
      
          dl,
          menu,
          ol,
          ul {
            margin: 1em 0
          }
      
          dd {
            margin: 0 0 0 40px
          }
      
          menu,
          ol,
          ul {
            padding: 0 0 0 40px
          }
      
          nav ul,
          nav ol {
            list-style: none;
            list-style-image: none
          }
      
          img {
            border: 0;
            -ms-interpolation-mode: bicubic
          }
      
          svg:not(:root) {
            overflow: hidden
          }
      
          figure {
            margin: 0
          }
      
          form {
            margin: 0
          }
      
          fieldset {
            border: 1px solid #c0c0c0;
            margin: 0 2px;
            padding: .35em .625em .75em
          }
      
          legend {
            border: 0;
            padding: 0;
            white-space: normal;
            *margin-left: -7px
          }
      
          button,
          input,
          select,
          textarea {
            font-size: 100%;
            margin: 0;
            vertical-align: baseline;
            *vertical-align: middle
          }
      
          button,
          input {
            line-height: normal
          }
      
          button,
          html input[type="button"],
          input[type="reset"],
          input[type="submit"] {
            -webkit-appearance: button;
            cursor: pointer;
            *overflow: visible
          }
      
          button[disabled],
          input[disabled] {
            cursor: default
          }
      
          input[type="checkbox"],
          input[type="radio"] {
            box-sizing: border-box;
            padding: 0;
            *height: 13px;
            *width: 13px
          }
      
          input[type="search"] {
            -webkit-appearance: textfield;
            -moz-box-sizing: content-box;
            -webkit-box-sizing: content-box;
            box-sizing: content-box
          }
      
          input[type="search"]::-webkit-search-cancel-button,
          input[type="search"]::-webkit-search-decoration {
            -webkit-appearance: none
          }
      
          button::-moz-focus-inner,
          input::-moz-focus-inner {
            border: 0;
            padding: 0
          }
      
          textarea {
            overflow: auto;
            vertical-align: top
          }
      
          table {
            border-collapse: collapse;
            border-spacing: 0
          }
      
          /* custom client-specific styles including styles for different online clients */
          .ReadMsgBody {
            width: 100%;
          }
      
          .ExternalClass {
            width: 100%;
          }
      
          /* hotmail / outlook.com */
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          }
      
          /* hotmail / outlook.com */
          table,
          td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }
      
          /* Outlook */
          #outlook a {
            padding: 0;
          }
      
          /* Outlook */
          img {
            -ms-interpolation-mode: bicubic;
            display: block;
            outline: none;
            text-decoration: none;
          }
      
          /* IExplorer */
          body,
          table,
          td,
          p,
          a,
          li,
          blockquote {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            font-weight: normal !important;
          }
      
          .ExternalClass td[class="ecxflexibleContainerBox"] h3 {
            padding-top: 10px !important;
          }
      
          /* hotmail */
          /* email template styles */
          h1 {
            display: block;
            font-size: 26px;
            font-style: normal;
            font-weight: normal;
            line-height: 100%;
          }
      
          h2 {
            display: block;
            font-size: 20px;
            font-style: normal;
            font-weight: normal;
            line-height: 120%;
          }
      
          h3 {
            display: block;
            font-size: 17px;
            font-style: normal;
            font-weight: normal;
            line-height: 110%;
          }
      
          h4 {
            display: block;
            font-size: 18px;
            font-style: italic;
            font-weight: normal;
            line-height: 100%;
          }
      
          .flexibleImage {
            height: auto;
          }
      
          table[class=flexibleContainerCellDivider] {
            padding-bottom: 0 !important;
            padding-top: 0 !important;
          }
      
          body,
          #bodyTbl {
            background-color: #E1E1E1;
          }
      
          #emailHeader {
            background-color: #E1E1E1;
          }
      
          #emailBody {
            background-color: #FFFFFF;
          }
      
          #emailFooter {
            background-color: #E1E1E1;
          }
      
          .textContent {
            color: #8B8B8B;
            font-family: Helvetica;
            font-size: 16px;
            line-height: 125%;
            text-align: Left;
          }
      
          .textContent a {
            color: #205478;
            text-decoration: underline;
          }
      
          .emailButton {
            background-color: #205478;
            border-collapse: separate;
          }
      
          .buttonContent {
            color: #FFFFFF;
            font-family: Helvetica;
            font-size: 18px;
            font-weight: bold;
            line-height: 100%;
            padding: 15px;
            text-align: center;
          }
      
          .buttonContent a {
            color: #FFFFFF;
            display: block;
            text-decoration: none !important;
            border: 0 !important;
          }
      
          #invisibleIntroduction {
            display: none;
            display: none !important;
          }
      
          /* hide the introduction text */
          /* other framework hacks and overrides */
          span[class=ios-color-hack] a {
            color: #275100 !important;
            text-decoration: none !important;
          }
      
          /* Remove all link colors in IOS (below are duplicates based on the color preference) */
          span[class=ios-color-hack2] a {
            color: #205478 !important;
            text-decoration: none !important;
          }
      
          span[class=ios-color-hack3] a {
            color: #8B8B8B !important;
            text-decoration: none !important;
          }
      
          /* phones and sms */
          .a[href^="tel"],
          a[href^="sms"] {
            text-decoration: none !important;
            color: #606060 !important;
            pointer-events: none !important;
            cursor: default !important;
          }
      
          .mobile_link a[href^="tel"],
          .mobile_link a[href^="sms"] {
            text-decoration: none !important;
            color: #606060 !important;
            pointer-events: auto !important;
            cursor: default !important;
          }
      
          /* responsive styles */
          @media only screen and (max-width: 480px) {
            body {
              width: 100% !important;
              min-width: 100% !important;
            }
      
            table[id="emailHeader"],
            table[id="emailBody"],
            table[id="emailFooter"],
            table[class="flexibleContainer"] {
              width: 100% !important;
            }
      
            td[class="flexibleContainerBox"],
            td[class="flexibleContainerBox"] table {
              display: block;
              width: 100%;
              text-align: left;
            }
      
            td[class="imageContent"] img {
              height: auto !important;
              width: 100% !important;
              max-width: 100% !important;
            }
      
            img[class="flexibleImage"] {
              height: auto !important;
              width: 100% !important;
              max-width: 100% !important;
            }
      
            img[class="flexibleImageSmall"] {
              height: auto !important;
              width: auto !important;
            }
      
            table[class="flexibleContainerBoxNext"] {
              padding-top: 10px !important;
            }
      
            table[class="emailButton"] {
              width: 100% !important;
            }
      
            td[class="buttonContent"] {
              padding: 0 !important;
            }
      
            td[class="buttonContent"] a {
              padding: 15px !important;
            }
          }
        </style>
        <!--
            MS Outlook custom styles
          -->
        <!--[if mso 12]>
            <style type="text/css">
              .flexibleContainer{display:block !important; width:100% !important;}
            </style>
          <![endif]-->
        <!--[if mso 14]>
            <style type="text/css">
              .flexibleContainer{display:block !important; width:100% !important;}
            </style>
          <![endif]-->
      </head>
      
      <body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
        <center style="background-color:#E1E1E1;">
          <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTbl" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;">
            <tr>
              <td align="center" valign="top" id="bodyCell">
      
                <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader">
                  <tr>
                    <td align="center" valign="top">
      
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" valign="top">
      
                            <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer">
                              <tr>
                                <td valign="top" width="500" class="flexibleContainerCell">
      
                                  <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                      <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none;display:none !important;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                                          <tr>
                                            <td align="left" class="textContent">
                                              <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;">
                                                Here you can put short introduction of your email template.
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
      
                          </td>
                        </tr>
                      </table>
      
                    </td>
                  </tr>
                </table>
      
                <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="800" height ="500" id="emailBody">
      
                  <tr>
                    <td align="center" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#fff">
                        <tr>
                          <td align="center" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                              <tr>
                                <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                  <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                    <tr>
                                      <td align="center" valign="top" class="textContent">
      <!--                                   <h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;">{{organizationName}} New Assignment</h1> -->
                                        <h2 style="text-align:center;font-weight:normal;font-family:Helvetica,Arial,sans-serif;font-size:23px;margin-bottom:10px;color:#C9BC20;line-height:135%;">Welcome</h2>
      <img style ="width:150px ; align-item:center;margin-left:145px" src="https://contract.familyfm.ltd/static/media/fm_logo.8ab00a202cf2f9daeaa1.png"></img>
      <!--                                   <div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#FFFFFF;line-height:135%;">You have been assigned a {{taskType}} </div> -->
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                              <tr>
                                <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                  <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                    <tr>
                                      <td align="center" valign="top">
      
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                          <tr>
                                            <td valign="top" class="textContent">
                                              <h1 style="text-align:center; margin-bottom:15px">FORGET PASSWORD REQUEST</h1>                                  
                                              <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">Dear ${usera.name}</h3>
                                              <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:135%;">
              You have requsted to reset the password of your VIBZFM Account, Please find the reset otp to change your password
      <!--                                           There was a request to change your password! If you did not make this request then please ignore this email  -->
      <p style="text-align:center">   <span style="font-size:25px ; font-weight:600">${otp}</span></p> 
                                                <P>
                                                  Regards<br>
                                                  <span style="font-weight:600">Vibzfm Team</span> 
                                                </P>
                                                
                                                
                                              </div>
                                            </td>
                                          </tr>
                                        </table>
      
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
      
                  <tr>
                    <td align="center" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8">
                        <tr>
                          <td align="center" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                              <tr>
                                <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                  <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                    <tr>
                                      <td align="center" valign="top">
                                        <table border="0" cellpadding="0" cellspacing="0" width="50%" class="emailButton" style="background-color: #2E7D32;">
                                          <tr>
                                            <td align="center" valign="middle" class="buttonContent" style="padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px;">
                                              <a style="color:#FFFFFF;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:20px;line-height:135%;" href="https://contract.familyfm.ltd/resetpassword" target="_blank">Click to Reset</a>
                                            </td>
                                          </tr>
                                        </table>
      
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
      
                </table>
      
                <!-- footer -->
                <table bgcolor="#E1E1E1" border="0" cellpadding="0" cellspacing="0" width="500" id="emailFooter">
                  <tr>
                    <td align="center" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                              <tr>
                                <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                  <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                    <tr>
                                      <td valign="top" bgcolor="#E1E1E1">
      
                                        <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;">
                                          <div>Copyright &#169; 2022. All rights reserved.</div>
                                          <div>If you don't want to receive these emails from us in the future, please <a href="https://app.omegaconstructionmanagement.com/profile" target="_blank" style="text-decoration:none;color:#828282;"><span style="color:#828282;">unsubscribe</span></a></div>
                                        </div>
      
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <!-- // end of footer -->
      
              </td>
            </tr>
          </table>
        </center>
      </body>
      
      </html>`,
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
    const users = await user.findByPk(userId);

    if (!users) {
      throw new Error("User not found");
    } else {
      const updatedRows = await user.update(
        {
          status: sequelize.literal(
            "CASE WHEN status = true THEN false ELSE true END"
          ),
        },
        { where: { id: userId } }
      );

      return successResponse(req, res, updatedRows);
    }
  } catch (err) {
    console.error(err);
  }
};

export const totalnumbersalesrep = async (req, res, next) => {
  try {
    const token = req.headers["x-token"];
    console.log(token);
    const decoded = jwt.verify(token, "the-super-strong-secrect");
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

    // if(decoded.userss.clickup_code==null || decoded.userss.clickup_code==''){

    //   console.log(decoded.userss,'sddsds')

    //   return successResponse(req, res, {},400);
    // }
    // else{
    return successResponse(req, res, [result]);
    // }
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
        attributes: ["name", "lastname"],
        raw: true,
      });

      const options = records.map(
        (record) => `${record.name} ${record.lastname}`
      );

      res.json(options);
    } else if (decoded.userss.role == 3) {
      const records = await user.findAll({
        attributes: ["name", "lastname"],
        where: {
          id: decoded.userss.id,
        },
        raw: true,
      });

      const options = records.map(
        (record) => `${record.name} ${record.lastname}`
      );

      res.json(options);
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  } catch (error) {
    console.error("Error fetching sales representatives:", error);
    // res.status(500).json({ error: 'Failed to fetch sales representatives' });
  }
};



export const clickupauthrization = async (req, res) => {
  const token = req.headers["x-token"];
  const decoded = jwt.verify(token, "the-super-strong-secrect");

  console.log(token);

  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://api.clickup.com/api/v2/oauth/token?client_id=${process.env.client_id}&client_secret=${process.env.client_Secret}&code=${req.body.clickup_code}`,
    };

    axios
      .request(config)
      .then((response) => {
        var access_token = response.data.access_token;

        console.log(response.data.access_token, "access_token");
        console.log(response.data, "access_token12");
        console.log(JSON.stringify(response.data));

        user
          .update(
            {
              clickup_code: req.body.clickup_code,
              access_token: access_token,
            },
            { where: { id: decoded.userss.id } }
          )
          .then((respon) => {
            return successResponse(req, res, respon, true, 200);
          });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 404) {
          user
            .update(
              {
                clickup_code: null,
                access_token: null,
              },
              { where: { id: decoded.userss.id } }
            )
            .then((deleteresponse) => {
              return successResponse(req, res, deleteresponse, true, 404);
            });
        }  
        else if (error.response.status == 401) {
          return successResponse(req, res, {}, false, 401);
        }
      });
  } catch (err) {
    console.log(err);
  }
};

export const checkauthrization = async (req, res) => {
  const token = req.headers["x-token"];
  const decoded = jwt.verify(token, "the-super-strong-secrect");
  console.log(decoded.userss, "123");

  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://api.clickup.com/api/v2/oauth/token?client_id=${process.env.client_id}&client_secret=${process.env.client_Secret}&code=${decoded.userss.clickup_code}`,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("s6d5sdsa");

        console.log(response, "aerdsd1123");
        console.log(response.data, "aerdsd1123data");
        return successResponse(req, res, {}, true, 200);
      })

      .catch((error) => {
        if (error.response.status == 404 || error.response.status == 401) {
          console.log(error.response.status, "5356");

          user
            .update(
              {
                clickup_code: null,
                access_token: null,
              },
              { where: { id: decoded.userss.id } }
            )
            .then((responseupdate1) => {
              return successResponse(req, res, responseupdate1, true, 404);
            });
        } else if (error.response.status == 400) {
          console.log(error.response.status, "5356");

          user
            .update(
              {
                clickup_code: decoded.userss.clickup_code,
              },
              { where: { id: decoded.userss.id } }
            )
            .then((responseupdate1) => {
              return successResponse(req, res, responseupdate1, true, 400);
            });
        }
      });
  } catch (err) {
    console.log(err);
  }
};
