const jwt = require('jsonwebtoken');
import crypto from "crypto";
import axios from "axios";
// import apiAuth from "../../middleware/apiAuth";
import { monday, sequelize } from "../../models";
import { successResponse,successResponse1, errorResponse, uniqueId } from "../../helpers";
import vidzfm from "../../models/vidzfm";
// import vidzfm from '../../models/vidzfm';
const { Op } = require("sequelize");



export const mondaytimecreate = async (req, res) => {


    try {
        const token = req.headers['x-token'];
        const decoded = jwt.verify(token, "the-super-strong-secrect");
     
    
    
        const result = await monday.create({
           
          // contract_date: req.body.contract_date,
          starttime: req.body.starttime,
          endtime: req.body.endtime,
          formid: decoded.userss.id,
          role: decoded.userss.role,
         
        })
        return successResponse1(req,res, result );

    }

    catch(err){
        console.log(err)
    }










}