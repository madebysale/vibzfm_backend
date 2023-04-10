import jwt from "jsonwebtoken";
import crypto from "crypto";
import axios from "axios";
import { Vidzfm, sequelize } from "../../models";
import { successResponse, errorResponse, uniqueId } from "../../helpers";
// import vidzfm from '../../models/vidzfm';
const { Op } = require("sequelize");

const conn = require("../../config/conn").promise();

// import QueryTypes from 'sequelize'
const moment = require("moment");

export const createvibzfmUser = async (req, res) => {
  try {
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
      createdAt: req.body.contract_date,
      updatedAt: req.body.contract_date,
    });
    console.log("result", result, Vidzfm);

    return successResponse(req, res, result);
  } catch (err) {
    console.log(err);
  }
};

export const selectvibzfmUser = async (req, res) => {
  try {
    const users = await Vidzfm.findAll();

    return successResponse(req, res, users);
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
    ORDER BY t.id DESC`);

    return successResponse(req, res, rows[0]);
  } catch (err) {
    console.log(err);
  }
};

export const viewdetailvibzfmUser = async (req, res) => {
  try {
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
