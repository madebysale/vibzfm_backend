const jwt = require("jsonwebtoken");
import crypto from "crypto";
import axios from "axios";
const nodemailer = require("nodemailer");
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import apiAuth from "../../middleware/apiAuth";
import { Vidzfm, Invoice, user, customer_table, sequelize  } from "../../models";
import {
  successResponse,
  successResponse1,
  successResponse2,
  errorResponse,
  errorResponse1,
  uniqueId,
} from "../../helpers";
// import vidzfm from '../../models/vidzfm';
const { Op } = require('sequelize');

const conn = require("../../config/conn").promise();

export const createvibzfmUser = async (req, res) => {
  try {
    const token = req.headers["x-token"];
    const decoded = jwt.verify(token, "the-super-strong-secrect");

    const existingUser = await Vidzfm.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email }, // Check if name already exists
          { phone: req.body.phone }, // Check if phone already exists
        ],
      },
    });
    if (req.body.user_type == "addNew") {
      if (existingUser) {
        // Handle the case when the name or phone number is already taken
        // return res
        //   .status(400)
        //   .json({ message: "Email or phone number already exists" });
        // return successResponse2(req, res, existingUser);
        return successResponse2(req, res, existingUser);
      }
    


      const myresult = await customer_table.create({
        name: req.body.name,
        mobile: req.body.phone,
        email: req.body.email,
       })
       
       const result = await Vidzfm.create({
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
        paymentdue: req.body.paymentdue,
        customerid:myresult.id,
        cost:req.body.cost,
        trade:req.body.trade,
        discountabst:req.body.discountabst,
        abst:req.body.abst,
        grandtotal:req.body.grandtotal,




        

        
      });

   
      

      if (result.id) {
        var productitem = req.body.fields[0];
        for (let i = 0; i < productitem.length; i++) {
          console.log(result.id, "hhhh");
          console.log(productitem.length, "loop");
          await Invoice.create({
            product_type: productitem[i].product_type,
            start_date: productitem[i].start_date,
            end_date: productitem[i].end_date,
            starttime: productitem[i].starttime,
            endtime: productitem[i].endtime,
            sunday: productitem[i].sunday,
            monday: productitem[i].monday,
            tuesday: productitem[i].tuesday,
            wednesday: productitem[i].wednesday,
            thursday: productitem[i].thursday,
            friday: productitem[i].friday,
            saturday: productitem[i].saturday,
            rate: productitem[i].rate,
            discount: productitem[i].discount,
            cost: productitem[i].cost,
            discounted_cost: productitem[i].discounted_cost,
            cost_tax: productitem[i].cost_tax,
            total: productitem[i].total,
            formid: result.id,
            createdAt: req.body.contract_date,
            updatedAt: req.body.contract_date,
            weekhr: req.body.weekhr,
            qty: productitem[i].qty,
           jan:productitem[i].jan,
           feb: productitem[i].feb,
            mar:productitem[i].mar,
            april:productitem[i].april,
            may:productitem[i].may,
            june: productitem[i].june,
            july: productitem[i].july,
            aug: productitem[i].aug,
            sept:productitem[i].sept,
            oct: productitem[i].oct,
            nov: productitem[i].nov,
            dec: productitem[i].dec,
            
          });
        }
      }
             
      return successResponse1(req, res, result ,myresult);
     
    } else  {
      const myresult = await Vidzfm.create({
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
        paymentdue: req.body.paymentdue,
        customerid :req.body.customerid,
        cost:req.body.cost,
        trade:req.body.trade,
        discountabst:req.body.discountabst,
        abst:req.body.abst,
        grandtotal:req.body.grandtotal,
        



     
      });
      if (myresult.id) {
        var productitem = req.body.fields[0];
        console.log(productitem,'productitem')
        for (let i = 0; i < productitem.length; i++) {
          // console.log(existingUser.id, "hhhh");
          console.log(myresult.id, "resultid");
          console.log(productitem.length, "loopingvvfnbnvnvnh");
          await Invoice.create({
            product_type: productitem[i].product_type,
            start_date: productitem[i].start_date,
            end_date: productitem[i].end_date,
            starttime: productitem[i].starttime,
            endtime: productitem[i].endtime,
            sunday: productitem[i].sunday,
            monday: productitem[i].monday,
            tuesday: productitem[i].tuesday,
            wednesday: productitem[i].wednesday,
            thursday: productitem[i].thursday,
            friday: productitem[i].friday,
            saturday: productitem[i].saturday,
            rate: productitem[i].rate,
            discount: productitem[i].discount,
            cost: productitem[i].cost,
            discounted_cost: productitem[i].discounted_cost,
            cost_tax: productitem[i].cost_tax,
            total: productitem[i].total,
            formid: myresult.id,
            createdAt: req.body.contract_date,
            updatedAt: req.body.contract_date,
            weekhr: req.body.weekhr,
            qty: productitem[i].qty,
            jan:productitem[i].jan,
           feb: productitem[i].feb,
            mar:productitem[i].mar,
            april:productitem[i].april,
            may:productitem[i].may,
            june: productitem[i].june,
            july: productitem[i].july,
            aug: productitem[i].aug,
            sept:productitem[i].sept,
            oct: productitem[i].oct,
            nov: productitem[i].nov,
            dec: productitem[i].dec,
          });
          console.log(myresult,'myresult')
         
        }
         return successResponse1(req, res, myresult);
      }
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      // Handle the validation error
      const errors = err.errors.map((error) => ({
        message: error.message,
        type: error.type,
        path: error.path,
        value: error.value,
      }));

      return res.status(400).json({ errors });
    }

    console.log(err);
    // Handle other errors

    return res.status(500).json({ message: "Internal server error" });
  }
};

// export const selectvibzfmUser = async (req, res,params) => {

//   try {
//     const token = req.headers['x-token'];
//     const decoded = jwt.verify(token, "the-super-strong-secrect");

//      // const users = await Vidzfm.findAll();
//     // return successResponse(req, res, users);
//       if(decoded.userss.role==1 ){

//         const rows = await conn.execute(`SELECT *
//         FROM vidzfm where disable=0 AND makecontract= 0 order by id DESC`);

//         return successResponse(req, res, rows[0]);
//       }
//       if(decoded.userss.role==3){
//         const rows = await conn.execute(`SELECT * from vidzfm where disable=0 AND makecontract= 0 AND Role=3 AND generetedBy=${decoded.userss.id}`);
//         return successResponse(req, res, rows[0]);
//       }
// } catch (err) {
//     console.log(err);
//   }
// };

export const selectvibzfmUser = async (req, res, params) => {
  try {
    const token = req.headers["x-token"];
    const decoded = jwt.verify(token, "the-super-strong-secrect");

    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);
    const startIndex = (page - 1) * limit;

    let whereClause = {
      disable: 0,
      makecontract: 0,
    };

    if (decoded.userss.role == 1) {
      // Role 1 query
    } else if (decoded.userss.role == 3) {
      whereClause = {
        ...whereClause,
        Role: 3,
        generetedBy: decoded.userss.id,
      };
    }

    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    const { count: updateCount} = await Vidzfm.update(
      { disable: 1 },
      { where: { createdAt: { [Op.lt]: fifteenDaysAgo }, ...whereClause } }
    );

    console.log(`Updated ${updateCount} records`); // Debug statement

    const { count, rows } = await Vidzfm.findAndCountAll({
      where: whereClause,
      order: [["id", "DESC"]],
      limit: limit,
      offset: startIndex,
    });

    const totalCount = count;
    const totalPages = Math.ceil(totalCount / limit);

    const results = {
      results: rows,
      page: page,
      limit: limit,
      totalRows: totalCount,
      totalPages: totalPages,
    };

    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};




export const invoicevibzfmUser = async (req, res) => {
  try {
    const rows = await conn.execute(`SELECT t.*, 
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
    // console.log(decoded.userss.signature,"sign")
    const view = await conn.execute(`SELECT t.*, 
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

    //     const view=
    //  await conn.execute(`SELECT t.*,
    //  MIN(jt.start_date) AS st_date,
    //  MAX(jt.end_date) AS ed_date,
    //  SUM(CAST(jt.qty AS DECIMAL(10,2))) AS qty_total,
    //  SUM(CAST(jt.discounted_cost AS DECIMAL(10,2))) AS cost_total,
    //  SUM(CAST(jt.cost_tax AS DECIMAL(10,2))) AS costtax,
    //  u.*
    // FROM vidzfm t
    // RIGHT JOIN users u ON t.generetedBy = u.id
    // LEFT JOIN JSON_TABLE(t.fields, '$[0][*]' COLUMNS (
    //  start_date DATETIME PATH '$.start_date',
    //  end_date DATETIME PATH '$.end_date',
    //  qty INT PATH '$.qty',
    //  discounted_cost DECIMAL(10,2) PATH '$.discounted_cost',
    //  cost_tax DECIMAL(10,2) PATH '$.cost_tax'
    // )) AS jt ON t.id = ${req.body.id}
    // WHERE t.id = ${req.body.id}
    // `)

    return successResponse(req, res, view[0]);
  } catch (err) {
    console.log(err);
  }
};

export const joinvidzfmanduser = async (req, res, next) => {
  const join = await conn.execute(
    `SELECT Vidzfm *,FROM Vidzfm LEFT OUTER JOIN Users ON Vidzfm.id = users.id AND users.Isadmin = 0`
  );
};

export const deletevibzfmUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const users = await Vidzfm.findOne({ where: { id: userId } });
    if (!users) {
      return res
        .status(404)
        .send({ message: `User with id ${userId} not found` });
    }

    const newStatus = !Vidzfm.status; // toggle the status
    await Vidzfm.update({ disable: newStatus }, { where: { id: userId } });

    return res.send({
      message: `User with id ${userId} has successfully deleted`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const salespersonlist = async (req, res) => {
  try {
    const users = await Vidzfm.findAll({
      where: {
        sales_rep: req.body.sales_rep,
      },
    });

    return successResponse(req, res, users);
  } catch (err) {
    console.log(err);
  }
};

export const updatevibzfmagrrement = async (req, res) => {
  try {
    const myid = req.params.id;

    const updatedRows = await Vidzfm.update(
      {
        name: req.body.name,
        event: req.body.event,
        phone: req.body.phone,
        email: req.body.email,
        sales_rep: req.body.sales_rep,
        advertiser: req.body.advertiser,
        fields: req.body.fields,
      },
      {
        where: { id: myid },
      }
    );

    if (updatedRows) {
      const productItems = req.body.fields;

      if (productItems && Array.isArray(productItems)) {
        for (let i = 0; i < productItems.length; i++) {
          await Invoice.update(
            {
              product_type: productItems[i].product_type,
              start_date: productItems[i].start_date,
              end_date: productItems[i].end_date,
              starttime: productItems[i].starttime,
              endtime: productItems[i].endtime,
              sunday: productItems[i].sunday,
              monday: productItems[i].monday,
              tuesday: productItems[i].tuesday,
              wednesday: productItems[i].wednesday,
              thursday: productItems[i].thursday,
              friday: productItems[i].friday,
              saturday: productItems[i].saturday,
              rate: productItems[i].rate,
              discount: productItems[i].discount,
              cost: productItems[i].cost,
              discounted_cost: productItems[i].discounted_cost,
              cost_tax: productItems[i].cost_tax,
              total: productItems[i].total,
              createdAt: req.body.contract_date,
              updatedAt: req.body.contract_date,
            },
            {
              where: { formid: myid, id: productItems[i].productId },
            }
          );
        }
      }
    }

    if (updatedRows[0] === 0) {
      // If no rows were updated, the entity was not found
      return res.status(404).json({ message: "Entity not found" });
    }

    return res.status(200).json({ message: "Entity updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const agreementlist = async (req, res) => {
  try {
    const token = req.headers["x-token"];
    const decoded = jwt.verify(token, "the-super-strong-secrect");

    const id = req.body.id;
    const invoicedetails = await Vidzfm.findAll({ where: { id: id } });
    const invoiceitemlist = await Invoice.findAll({ where: { formid: id } });
    const singature = await user.findAll({ where: { id: id } });

    // const invoiceitemlist = await Invoice.findAll({
    //   where: { formid: id },
    //   attributes: [
    //      "*"
    //     [sequelize.literal("cost_tax - discounted_cost"), "result"], // Perform subtraction and include as 'result'
    //   ],
    // });

    const minStartDate = await Invoice.min("start_date", {
      where: { formid: id },
    });
    const maxEndDate = await Invoice.max("end_date", { where: { formid: id } });


   


    const sum2 = await Invoice.findOne({
      attributes: [
        [sequelize.literal('CAST(SUM(cost_tax) AS DECIMAL(10,2))'), 'sum'],
      ],
      where: {
        formid: id, // Replace `id` with the desired value for the `formiid` column
      },
      raw: true, 
    });
    
    const orderamount = parseFloat(sum2.sum);


    const sums = await Invoice.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('jan')), 'jan'],
        [sequelize.fn('SUM', sequelize.col('feb')), 'feb'],
        [sequelize.fn('SUM', sequelize.col('mar')), 'mar'],
        [sequelize.fn('SUM', sequelize.col('april')), 'april'],
        [sequelize.fn('SUM', sequelize.col('may')), 'may'],
        [sequelize.fn('SUM', sequelize.col('june')), 'june'],
        [sequelize.fn('SUM', sequelize.col('july')), 'july'],
        [sequelize.fn('SUM', sequelize.col('aug')), 'aug'],
        [sequelize.fn('SUM', sequelize.col('sept')), 'sept'],
        [sequelize.fn('SUM', sequelize.col('oct')), 'oct'],
        [sequelize.fn('SUM', sequelize.col('nov')), 'nov'],
        [sequelize.fn('SUM', sequelize.col('dec')), 'dec'],
      ],
      where: {
        formid: id,
      },
      raw: true,
    });

   

    
    // const disorderamount = await Invoice.findAll({
    //   raw: true,
    //   attributes: [
    //     [
    //       sequelize.cast(sequelize.fn('SUM', sequelize.col('cost')), 'int'),
    //       'cost'
    //     ]
    //   ],
    //   where: { formid: id }
    // });


    // const disorderamount = await Invoice.sum(literal('CAST(cost AS DECIMAL(10,2))'), {
    //   where: { formid: id },
    // });
    // const disorderamount = await Invoice.sum("cost", {
    //   where: { formid: id },
      
    // });
  


    const finaldata = {
      details: invoicedetails,
      itemlist: invoiceitemlist,
      // discountlist:result,
      signaturelist: singature,
      maxEndDate: maxEndDate,
      minStartDate: minStartDate,
      orderamount: orderamount,
      monthlyshedule: sums
     
    };

    return successResponse(req, res, finaldata);
  } catch (err) {
    console.log(err);
  }
};














export const totalcustomer = async (req, res, next) => {
  try {
    const result = await conn.execute(`SELECT
      SUM(CASE WHEN disable = 0 THEN 1 ELSE 0 END) AS total_agreement
  FROM
      vidzfm where makecontract=0`);

    const totalcontract = await conn.execute(`SELECT
    SUM(CASE WHEN makecontract = 1 THEN 1 ELSE 0 END) AS total_contract
FROM vidzfm where disable = 0`);
    const totalcustomer = await conn.execute(`SELECT
    SUM(CASE WHEN customerdelete = 0 THEN 1 ELSE 0 END) AS total_customer
FROM customer_tables`);

    const finaldata = {
      totalagreement: result[0],
      totalcontract: totalcontract[0],
      totalcustomer: totalcustomer[0],
    };

    return successResponse(req, res, finaldata);
  } catch (err) {
    console.log(err);
  }
};

export const updateform = async (req, res) => {
  try {
    const myid = req.params.formid;

    const updatedRows = await Vidzfm.update(req.body, {
      where: { formid: myid },
    });

    if (updatedRows[0] === 0) {
      return res.status(404).json({ message: "Entity not found" });
    }

    return res.status(200).json({ message: "Entity updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatetableform = async (req, res) => {
  try {
    const myid = req.params.id;

    const updatedRows = await Vidzfm.update(req.body, {
      where: { id: myid },
    });

    if (updatedRows[0] === 0) {
      return res.status(404).json({ message: "Entity not found" });
    }

    return res.status(200).json({ message: "Entity updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const makecontract = async (req, res) => {
  try {
    const userId = req.params.id;
    



    const users = await Vidzfm.findOne({ where: { id: userId } });

    console.log(users.email, "dddx");

    if (!users) {
      return res
        .status(404)
        .send({ message: `User with id ${userId} not found` });
    }

    const newStatus = !Vidzfm.status;
    await Vidzfm.update({ makecontract: newStatus }, { where: { id: userId } });

    //////////////////////////////////////////////////////////////////////

  

    /////////////////////////////////////////////////////////////////////////////////////////

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "madebysale.impetrosys@gmail.com",
        pass: "cnglhgqwdjgdaitx",
      },
    });

    let mailOptions = {
      from: "madebysale.impetrosys@gmail.com",
      to: users.email,
      subject: "Contract Successfully Created",
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
                                              <h1 style="text-align:center; margin-bottom:15px">Contract Created Successfully
                                              </h1>                                  
                                              <h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">Dear ${req.body.name}</h3>
                                              <div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:135%;">
                                             
                                   Your Agreement sccuessfully converted to Contract            
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
                                              <a style="color:#FFFFFF;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:20px;line-height:135%;" href="http://localhost:3000/dashboard/Contract" target="_blank">Click to Contractlist</a>
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
        res.status(500).send("Faild");
      } else {
        console.log("Email sent: " + info.response);
        res.status(400).send({ message: "xyz" });
      }
    });

    return res.send({
      message: `Agreement sccuessfully converted to Contract`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// export const contractlist = async (req, res,params) => {
//   // try {

//   //   const view =
//   //   await conn.execute(`select * from vidzfm where makecontract =1 AND disable =0 order by id DESC `)
//   //   return successResponse(req, res, view[0]);

//   //   }
//   // catch(err){
//   //   return res.status(500).send({ message: 'Internal server error' });

//   // }

// //   try {
// //     const token = req.headers['x-token'];
// //     const decoded = jwt.verify(token, "the-super-strong-secrect");
// //     console.log(decoded.userss.id,"a");
// //     console.log(decoded.userss.role,"b");
// //     // console.log(decoded.userss.signature,"signature-c");

// //      // const users = await Vidzfm.findAll();
// //     // return successResponse(req, res, users);
// //       if(decoded.userss.role==1 ){

// //         const rows = await conn.execute(`SELECT *
// //         FROM vidzfm where disable=0 AND makecontract= 1 order by id DESC`);
// //         return successResponse(req, res, rows[0]);
// //       }
// //       if(decoded.userss.role==3){
// //         const rows = await conn.execute(`SELECT * from vidzfm where disable=0 AND makecontract= 1 AND Role=3 AND generetedBy=${decoded.userss.id}`);
// //         return successResponse(req, res, rows[0]);
// //       }
// // }

// catch (err) {
//     console.log(err);
//   }

// }
export const contractlist = async (req, res, params) => {
  try {
    const token = req.headers["x-token"];
    const decoded = jwt.verify(token, "the-super-strong-secrect");

    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);
    const startIndex = (page - 1) * limit;

    let whereClause = {
      disable: 0,
      makecontract: 1,
    };

    if (decoded.userss.role == 1) {
      // Role 1 query
    } else if (decoded.userss.role == 3) {
      whereClause = {
        ...whereClause,
        Role: 3,
        generetedBy: decoded.userss.id,
      };
    }

    const { count, rows } = await Vidzfm.findAndCountAll({
      where: whereClause,
      order: [["id", "DESC"]],
      limit: limit,
      offset: startIndex,
    });

    const totalCount = count;
    const totalPages = Math.ceil(totalCount / limit);

    const results = {
      results: rows,
      page: page,
      limit: limit,
      totalRows: totalCount,
      totalPages: totalPages,
    };

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

export const checkcustomer = async (req, res) => {
  const { email, mobile } = req.body;
  try {
    if (!email && !mobile) {
      return res.status(200).json({ message: "Please provide email or phone" });
    }

    const condition = {};

    if (email) {
      condition.email = email;
    } else if (mobile) {
      condition.mobile = mobile;
    }

    const user = await customer_table.findOne({
      where: condition,
    });

    if (!user) {
      return res.status(200).json({ message: "No matching user found." });
    } else if (user.customerdelete === true) {
      return res.status(200).json({ message: "User's Mobile no / Email is disabled by admin" });
    } else {
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};






