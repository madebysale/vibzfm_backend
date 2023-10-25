const jwt = require('jsonwebtoken');
import crypto from "crypto";
import axios from "axios";
// import apiAuth from "../../middleware/apiAuth";
import {Invoice, sequelize } from "../../models";
import { successResponse, errorResponse, uniqueId } from "../../helpers";
// import vidzfm from '../../models/vidzfm';
const { Op } = require("sequelize");

const conn = require("../../config/conn")



export const createinvoicedynamic = async (req, res) => {
try {
    const token = req.headers['x-token'];
    const decoded = jwt.verify(token, "the-super-strong-secrect");
    // console.log(decoded);
    // console.log(decoded.userss.id);
    // console.log(decoded.userss.role);
    console.log(req.body.paymentdue,"sas")

    const result = await Invoice.create({
     
      product_type: req.body.product_type,
      start_date:req.body.start_date,
      end_date: req.body.end_date,
      starttime:req.body.starttime,
      endtime:req.body.endtime,
      sunday:req.body.sunday,
      monday:req.body.monday,
      tuesday:req.body.tuesday,
      wednesday:req.body.wednesday,
      thursday:req.body.thursday,
      friday:req.body.friday,
      saturday:req.body.saturday,
      rate: req.body.rate,
      discount: req.body.discount,
      cost:req.body.cost,
      discounted_cost:req.body.discounted_cost,
      cost_tax:req.body.cost_tax,
      formid: decoded.userss.id,
    });
     

}
catch(err){

}

}



export const deleteproduct = async(req,res)=>{
  try {
    const userId = req.params.id;

    const users = await Invoice.findOne({ where: { id: userId } });
    if (!users) {
      return res
        .status(404)
        .send({ message: `User with id ${userId} not found` });
    }

    const newStatus = !Invoice.status; // toggle the status
    await Invoice.update({ disableproduct: newStatus }, { where: { id: userId } });

    return res.send({
      message: `successfully deleted`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal server error" });
  }
}