import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import axios from 'axios';
// import  {Vidzfm} from '../../models/vidzfm';
import {Vidzfm,sequelize} from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';
// import vidzfm from '../../models/vidzfm';
const { Op } = require('sequelize');
// const  {Sequelize}  = require('sequelize');
// import { Sequelize } from 'sequelize';
// import conn from '../../config/conn';
const conn = require("../../config/conn").promise();

// import QueryTypes from 'sequelize'
const moment = require('moment');



// const MyModel = Sequelize.define('vidzfm', {
//   // Define your model schema here
// });



// export const createData = async (req, res) => {
//   // var localcurrentdate1 = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')
//   // var localnewcurrentdate = moment(localcurrentdate1, 'YYYY-MM-DD hh:mm:ss');
//   try {
//     const {
//       userName,
//       number,
//       wallet_balance,
//       lottery_percent,
//       status,
//       promocode
//     } = req.body;
//     console.log(req.body);

//     //register new user
//     const payload = {
//       userName,
//       number,
//       wallet_balance,
//       lottery_percent,
//       status,
//       createdAt: localnewcurrentdate,
//       updatedAt: localnewcurrentdate


//     };



 

//     const agentpromo = await Agent_promocode.create(payloadpromocode);
//     const result = {
//       "id": user.id,
//       "name": user.userName,
//       "number": user.number,
//       "wallet_balance": user.wallet_balance,
//       "lottery_percent": user.lottery_percent,
//       "status": user.status,
//       "agent_code": agentpromo.promocode



//     }
//     return successResponse(req, res, result,'Created successfully.');

//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }


// };

export const createvibzfmUser= async(req,res)=>{


  

  try{
   //  const [result] = await Sequelize.query(
  //  `INSERT INTO vidzfm (contract_date, advertiser,name,event, phone,email, orderid,fields) VALUES ( ${req.body.contract_date},${req.body. advertiser},${req.body.name},${req.body.event},${req.body. phone},${req.body.email},${req.body.orderid},${req.body.fields})`,
  //  {
  //   type:QueryTypes.INSERT,
  //   // replacements: [req.body.contract_date, req.body.advertiser,req.body.name, req.body.event,req.body. phone,req.body.email,req.body.orderid,req.body.fields],
  //  },
  // )
  // console.log(req.body)
  // console.log(result)

  const result = await Vidzfm.create({contract_date:req.body.contract_date,sales_rep:req.body.sales_rep, advertiser:req.body.advertiser,name:req.body.name,event:req.body.event, phone:req.body.phone,email:req.body.email, orderid:req.body.orderid ,sign
    :req.body.sign,fields:req.body.fields,createdAt: req.body.contract_date,
    updatedAt: req.body.contract_date})
  console.log("result", result,Vidzfm);

  
  return successResponse(req, res, result);

  }
  catch(err){
    console.log(err)
  }


 
}




export const selectvibzfmUser= async(req,res)=>{


  try{
  const users = await Vidzfm.findAll();

  return successResponse(req, res, users);
  }catch(err){
    console.log(err)
  }


}


export const invoicevibzfmUser =async(req,res)=>{
try{ 
  const rows = await conn.execute(`SELECT t.*, MIN(jt.start_date) as st_date, MAX(jt.end_date) as ed_date, SUM(jt.qty) as qty_total ,SUM(jt.cost) as cost_total,SUM(jt.cost_tax) as costtax 
FROM vidzfm t, JSON_TABLE(t.fields, '$[0][*]' COLUMNS ( start_date DATETIME PATH '$.start_date',end_date DATETIME PATH '$.end_date',qty INT PATH '$.qty',cost INT PATH '$.cost',cost_tax INT PATH '$.cost_tax')) AS jt 
WHERE t.id = (SELECT MAX(id) FROM vidzfm) 
GROUP BY t.id, jt.start_date, jt.end_date, jt.qty, jt.cost, jt.cost_tax
ORDER BY t.id DESC
`);


return successResponse(req, res, rows[0]);



   }
   catch(err){
    console.log(err)
   }
 



}


export const viewdetailvibzfmUser =async(req,res)=>{
 
  // console.log(req.)

  try{
   
    // const id = [req.body.id];
    // console.log(req.body.id)
    const view = await  conn.execute(`SELECT t.*, MIN(jt.start_date) as st_date, MAX(jt.end_date) as ed_date, SUM(jt.qty) as qty_total ,SUM(jt.cost) as cost_total,SUM(jt.cost_tax) as costtax 
FROM vidzfm as t, JSON_TABLE(t.fields, '$[0][*]' COLUMNS ( start_date DATETIME PATH '$.start_date',end_date DATETIME PATH '$.end_date',qty INT PATH '$.qty',cost INT PATH '$.cost',cost_tax INT PATH '$.cost_tax')) AS jt 
WHERE t.id = ${req.body.id}`

)
return successResponse(req, res, view[0])


  }

  catch(err){
    console.log(err)
    
  }

}