const jwt = require("jsonwebtoken");
import crypto from "crypto";
import axios from "axios";


// import apiAuth from "../../middleware/apiAuth";
import { customer_table, Vidzfm, sequelize } from "../../models";
import {
  successResponse,
  successResponse1,
  successResponse2,
  errorResponse,
  uniqueId,
} from "../../helpers";
import vidzfm from "../../models/vidzfm";
// import vidzfm from '../../models/vidzfm';
const { Op } = require("sequelize");

const conn = require("../../config/conn").promise();






export const customerlist = async (req, res, next) => {
  try {
    const token = req.headers["x-token"];
    const decoded = jwt.verify(token, "the-super-strong-secrect");

   
    const join = await conn.execute(
      `SELECT  
      ct.*, 
      COUNT(CASE WHEN vf.makecontract = 0 THEN 1 END) AS quotation,
      COUNT(CASE WHEN vf.makecontract = 1 THEN 1 END) AS contract
FROM customer_tables ct
LEFT JOIN vidzfm vf ON vf.customerid = ct.id
WHERE ct.customerdelete = 0
GROUP BY ct.id order by id desc`
    );
    return res
    .status(200)
    .send(join[0]);
}


   catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
};



export const customerdelete = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await customer_table.findOne({ where: { id: userId } });
    if (!user) {
      return res
        .status(404)
        .send({ message: `User with id ${userId} not found` });
    }

  

    // const newStatus = !user.customerdelet ;
    await customer_table.update({ customerdelete: 1 }, { where: { id: userId } });

    return res.send({
      message: `User with id ${userId} has been successfully deleted`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};


 
export const createcustomer = async (req, res) => {
  try {
    const existingUser = await customer_table.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email }, // Check if name already exists
          { mobile: req.body.mobile }, // Check if phone already exists
        ],
      },
    });
   
      if (existingUser) {
    
        return successResponse2(req, res);    }
  

    const newCustomer = await customer_table.create({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      address:req.body.address,
      company_name: req.body.company_name,
    });

    return successResponse(req,res, newCustomer);
    // return res.status(200).send({ message: "ok" ,data:newCustomer});
  } catch (err) {
    return res.status(500).send({ message: 'Internal Error' });
  }
};

// // Helper function for success response
// function successResponsee(res, data) {
//   return res.send({
//     message: 'Customer created successfully',
//     customer: data,
//   });
// }

// // Helper function for existing customer response
// function successResponse21(res, data) {
//   return res.send({
//     message: 'Email or mobile already exists',
//     customer: data,
//   });
// }
