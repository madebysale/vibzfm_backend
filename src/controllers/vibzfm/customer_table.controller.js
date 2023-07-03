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
    FROM vidzfm vf
    JOIN customer_tables ct ON vf.customerid = ct.id
    WHERE ct.customerdelete = 0
    GROUP BY ct.id`
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
