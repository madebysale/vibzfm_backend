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

const conn = require("../../config/conn")






export const customerlist = async (req, res, next) => {
  try {
    const token = req.headers["x-token"];
    const decoded = jwt.verify(token, "the-super-strong-secrect");

   
    const join = await conn.execute(
      `SELECT  
       ct.*,
       SUM(CASE WHEN vf.makecontract = 0 THEN 1 ELSE 0 END) AS quotation,
       SUM(CASE WHEN vf.makecontract = 1 THEN 1 ELSE 0 END) AS contract
FROM customer_tables ct
LEFT JOIN vidzfm vf ON vf.customerid = ct.id
WHERE ct.customerdelete = 0
GROUP BY ct.id
ORDER BY ct.id DESC`

    );
    return res
    .status(200)
    .send(join[0]);


    // const customerCounts = await customer_table.findAll({
    //   attributes: [
    //     'id',
    //     'customer_name',
    //     [sequelize.literal('COUNT(CASE WHEN vf.makecontract = 0 THEN 1 END)'), 'quotation'],
    //     [sequelize.literal('COUNT(CASE WHEN vf.makecontract = 1 THEN 1 END)'), 'contract']
    //   ],
    //   include: [
    //     {
    //       model: Vidzfm,
    //       as: 'vidzfm',
    //       attributes: []
    //     }
    //   ],
    //   where: {
    //     customerdelete: 0
    //   },
    //   group: ['customer_table.id'],
    //   order: [['id', 'DESC']]
    // });

    // return successResponse(req, res, customerCounts);
  




// Build the query
// const query = customer_table.findAll({
//   attributes: {
//     include: [
//       [sequelize.literal('COUNT(CASE WHEN makecontract = 0 THEN 1 END)'), 'quotation'],
//       [sequelize.literal('COUNT(CASE WHEN makecontract = 1 THEN 1 END)'), 'contract']
//     ]
//   },
//   include: [
//     {
//       model: Vidzfm,
//       required: false, // LEFT JOIN
//       where: { makecontract: { [Op.or]: [0, 1] } }
//     }
//   ],
//   where: { customerdelete: 0 },
//   group: ['customer_table.id'],
//   order: [['customer_table.id', 'DESC']]
// });


// Execute the query
// query.then(results => {
//   console.log(results);
// }).catch(error => {
//   console.error(error);
// });










// res.json(result);

  }
   catch (error) {
    console.error(error);
    res.status(500).json({ message: err.message });  }
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
      message: `Deleted Successfully `,
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
// 


export const updatecustomer = async (req, res) => {

  try{

    const customerId = req.body.id; // Get customer ID from the request parameters
    const updatedCustomerData = req.body;

    console.log(customerId),'xuass'
    console.log(updatedCustomerData,'xua123ss')
    const [updatedRows] = await customer_table.update(updatedCustomerData, {
      where: { id: customerId },
    });


    if (updatedRows === 0) {
      return res.status(404).json({ code: 404, message: 'Customer not found' });
    }

    // Find the updated customer to return in the response
    const updatedCustomer = await customer_table.findByPk(customerId);
    
  res.json({ code: 200, message: 'Customer updated successfully', data: updatedCustomer });
  }

 catch (error) {
  console.error(error);
  res.status(500).json({ code: 500, message: 'Internal server error' });
}
}
