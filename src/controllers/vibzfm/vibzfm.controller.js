const jwt = require('jsonwebtoken');
import crypto from "crypto";
import axios from "axios";
// import apiAuth from "../../middleware/apiAuth";
import { Vidzfm, sequelize } from "../../models";
import { successResponse, errorResponse, uniqueId } from "../../helpers";
// import vidzfm from '../../models/vidzfm';
const { Op } = require("sequelize");

const conn = require("../../config/conn").promise();

// import QueryTypes from 'sequelize'
const moment = require("moment");

export const createvibzfmUser = async (req, res) => {
  // const token = req.headers['x-token'];
  // const decoded = jwt.verify(token, "the-super-strong-secrect");
  // console.log(decoded);


  try {
    const token = req.headers['x-token'];
    const decoded = jwt.verify(token, "the-super-strong-secrect");
    console.log(decoded);
    console.log(decoded.userss.id);
    console.log(decoded.userss.role);

    const result = await Vidzfm.create({
      contract_date: req.body.contract_date,
      sales_rep: req.body.sales_rep,
      advertiser: req.body.advertiser,
      name: req.body.name,
      event: req.body.event,
      phone: req.body.phone,
      email: req.body.email,
      orderid: req.body.orderid,
      sign: req.body.sign,
      fields: req.body.fields,
      generetedBy: decoded.userss.id,
      Role: decoded.userss.role,
      createdAt: req.body.contract_date,
      updatedAt: req.body.contract_date,
    });
     
    // await Vidzfm.update({ ,  }, { where: { email: req.body.email } });


   
    console.log("result", result, Vidzfm);

    return successResponse(req, res, result);
  } catch (err) {
    console.log(err);
  }
};

export const selectvibzfmUser = async (req, res) => {

  try {
    const token = req.headers['x-token'];
    const decoded = jwt.verify(token, "the-super-strong-secrect");
    console.log(decoded.userss.id,"a");
    console.log(decoded.userss.role,"b");
    // console.log(disable,"c");

    // const users = await Vidzfm.findAll();
    // return successResponse(req, res, users);
      if(decoded.userss.role==1 ){

        const rows = await conn.execute(`SELECT * from vidzfm where disable=0 `);
        return successResponse(req, res, rows[0]);
      }
      if(decoded.userss.role==3){
        const rows = await conn.execute(`SELECT * from vidzfm where disable=0 AND Role=3 AND generetedBy=${decoded.userss.id}`);
        return successResponse(req, res, rows[0]);
      }

        

      // await conn.execute(`SELECT * 
      // FROM vidzfm 
      // WHERE disable = 0 
      // AND (
      //   (${decoded.userss.role}) OR 
      //   (${decoded.userss.role} AND ${decoded.userss.id})
      // )`);
      // return successResponse(req, res, rows);




  } catch (err) {
    console.log(err);
  }
};

export const invoicevibzfmUser = async (req, res) => {
  try {
   
    const rows =
      await conn.execute(`SELECT t.*, 
      MIN(jt.start_date) as st_date, 
      MAX(jt.end_date) as ed_date, 
      SUM(CAST(jt.qty AS DECIMAL(10,2))) as qty_total, 
      SUM(CAST(jt.discounted_cost AS DECIMAL(10,2))) as cost_total, 
      SUM(CAST(jt.cost_tax AS DECIMAL(10,2))) as costtax
    FROM vidzfm t, 
      JSON_TABLE(t.fields, '$[0][*]' COLUMNS (
        start_date DATETIME PATH '$.start_date',
        end_date DATETIME PATH '$.end_date',
        qty INT PATH '$.qty',
        discounted_cost DECIMAL(10,2) PATH '$.discounted_cost',
        cost_tax DECIMAL(10,2) PATH '$.cost_tax'
      )) AS jt 
    WHERE t.id = (SELECT MAX(id) FROM vidzfm) 
    GROUP BY t.id
    ORDER BY t.id DESC;
`);

    return successResponse(req, res, rows[0]);
  } catch (err) {
    console.log(err);
  }
};

export const viewdetailvibzfmUser = async (req, res) => {
  try {
    // const token = req.headers['x-token'];
    // const decoded = jwt.verify(token, "the-super-strong-secrect");
    // console.log(decoded);
    // const id = [req.body.id];
    // console.log(req.body.id)
    const view =
      await conn.execute(`SELECT t.*, 
      MIN(jt.start_date) as st_date, 
      MAX(jt.end_date) as ed_date, 
      SUM(CAST(jt.qty AS DECIMAL(10,2))) as qty_total, 
      SUM(CAST(jt.discounted_cost AS DECIMAL(10,2))) as cost_total, 
      SUM(CAST(jt.cost_tax AS DECIMAL(10,2))) as costtax
    FROM vidzfm t, 
      JSON_TABLE(t.fields, '$[0][*]' COLUMNS (
        start_date DATETIME PATH '$.start_date',
        end_date DATETIME PATH '$.end_date',
        qty INT PATH '$.qty',
        discounted_cost DECIMAL(10,2) PATH '$.discounted_cost',
        cost_tax DECIMAL(10,2) PATH '$.cost_tax'
      )) AS jt 
    WHERE t.id = ${req.body.id}`);
    return successResponse(req, res, view[0]);
  } catch (err) {
    console.log(err);
  }
};


export const joinvidzfmanduser = async (req, res, next) =>{

  const join = await conn.execute(`SELECT Vidzfm.*,FROM Vidzfm LEFT OUTER JOIN Users ON Vidzfm.id = users.id AND users.Isadmin = 0`)

}



export const deletevibzfmUser = async (req, res) => {
  try {
  const userId = req.params.id;
    
      const users = await Vidzfm.findOne({ where: { id: userId } });
      if (!users) {
        return res.status(404).send({ message: `User with id ${userId} not found` });
      }
  
      const newStatus = !Vidzfm.status; // toggle the status
      await Vidzfm.update({ disable: newStatus }, { where: { id: userId } });
  
      return res.send({ message: `User with id ${userId} has successfully deleted`});
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Internal server error' });
    }
};



export const salespersonlist = async (req, res) => {

 try {
  const users = await Vidzfm.findAll({
    where: {
      sales_rep: req.body.sales_rep
    }
  })

  return successResponse(req, res, users);
} catch (err) {
  console.log(err);
}
};





