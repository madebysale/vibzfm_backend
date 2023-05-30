const jwt = require('jsonwebtoken');
import crypto from "crypto";
import axios from "axios";
// import apiAuth from "../../middleware/apiAuth";
import { Vidzfm, Invoice,  sequelize } from "../../models";
import { successResponse,successResponse1, errorResponse, uniqueId } from "../../helpers";
import vidzfm from "../../models/vidzfm";
// import vidzfm from '../../models/vidzfm';
const { Op } = require("sequelize");

const conn = require("../../config/conn").promise();

// import QueryTypes from 'sequelize'
// const moment = require("moment");

export const createvibzfmUser = async (req, res) => {
  // const token = req.headers['x-token'];
  // const decoded = jwt.verify(token, "the-super-strong-secrect");
  // console.log(decoded);


  try {
    const token = req.headers['x-token'];
    const decoded = jwt.verify(token, "the-super-strong-secrect");
 


    const result = await Vidzfm.create({
       
      // contract_date: req.body.contract_date,
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
      paymentdue:req.body.paymentdue,

      // createdAt: req.body.contract_date,
      // updatedAt: req.body.contract_date,
    }
    )
    if(result){
      var productitem = req.body.fields[0]
    for(let i=0;i< productitem.length;i++){
      console.log(result.id,'hhhh');
      await Invoice.create({
        
        product_type:productitem[i].product_type,
     start_date:productitem[i].start_date,
        end_date: productitem[i].end_date,
        starttime:productitem[i].starttime,
        endtime:productitem[i].endtime,
        sunday:productitem[i].sunday,
        monday:productitem[i].monday,
        tuesday:productitem[i].tuesday,
        wednesday:productitem[i].wednesday,
        thursday:productitem[i].thursday,
        friday:productitem[i].friday,
        saturday:productitem[i].saturday,
        rate: productitem[i].rate,
        discount:productitem[i].discount,
        cost:productitem[i].cost,
        discounted_cost:productitem[i].discounted_cost,
        cost_tax:productitem[i].cost_tax,
        total:productitem[i].total,
        formid:result.id,
        createdAt: req.body.contract_date,
        updatedAt: req.body.contract_date,


      
      }
      
      )
      

    }
  }
 
     


   
    // console.log("result", result, Vidzfm);

    return successResponse1(req,res, result );
    // return (res.status(200).send({ message: 'succesfully created' }))

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
    console.log(decoded.userss.signature,"signature-c");

     // const users = await Vidzfm.findAll();
    // return successResponse(req, res, users);
      if(decoded.userss.role==1 ){

        const rows = await conn.execute(`SELECT *
        FROM vidzfm where disable=0 AND makecontract= 0 order by id DESC`);
        return successResponse(req, res, rows[0]);
      }
      if(decoded.userss.role==3){
        const rows = await conn.execute(`SELECT * from vidzfm where disable=0 AND makecontract= 0 AND Role=3 AND generetedBy=${decoded.userss.id}`);
        return successResponse(req, res, rows[0]);
      }
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
    // console.log(decoded.userss.signature,"sign")
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


export const joinvidzfmanduser = async (req, res, next) =>{

  const join = await conn.execute(`SELECT Vidzfm *,FROM Vidzfm LEFT OUTER JOIN Users ON Vidzfm.id = users.id AND users.Isadmin = 0`)

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

export const updatevibzfmagrrement = async (req, res) => {
  

  
 
      try {
        const myid = req.params.id;
        
        const updatedRows = await Vidzfm.update(req.body, {
          where: { id: myid },
        });
        
        if (updatedRows[0] === 0) {
          // If no rows were updated, the entity was not found
          return res.status(404).json({ message: 'Entity not found' });
        }
    
        return res.status(200).json({ message: 'Entity updated successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
 


export const agreementlist = async(req, res) => {
  try{
    const id = req.body.id;
    const invoicedetails = await Vidzfm.findAll({where:{id:id}})
  
    const invoiceitemlist =await Invoice.findAll({where:{formid:id}})

    const minStartDate = await Invoice.min('start_date',{where:{formid:id}});
const maxEndDate = await Invoice.max('end_date',{where:{formid:id}});
const orderedamount = await Invoice.sum('discounted_cost',{where:{formid:id}})
    const finaldata={
      details:invoicedetails,
      itemlist: invoiceitemlist,
      minStartDate: minStartDate,
      maxEndDate: maxEndDate,
      orderedamount:orderedamount,
    }
 
      
       return successResponse(req, res, finaldata);
}
  catch(err){
    console.log(err)
  }
}

export const totalcustomer = async (req, res, next) => {

 

  try {

   
      const result = 
      await conn.execute(`SELECT
      SUM(CASE WHEN disable = 0 THEN 1 ELSE 0 END) AS total_agreement
  FROM
      vidzfm where makecontract=0`
    )
 
    const totalcontract = 
    await conn.execute(`SELECT
    SUM(CASE WHEN makecontract = 1 THEN 1 ELSE 0 END) AS total_contract
FROM vidzfm where disable = 0`
  )

    const finaldata={
      totalagreement:result[0],
      totalcontract: totalcontract[0],
      
    }

    return successResponse(req, res,finaldata);
 
  

   
  
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
     
      return res.status(404).json({ message: 'Entity not found' });
    }

    return res.status(200).json({ message: 'Entity updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }


}




export const updatetableform = async (req, res) => {

  try {
    const myid = req.params.id;
    
    const updatedRows = await Vidzfm.update(req.body, {
      where: { id: myid },
    });
    
    if (updatedRows[0] === 0) {
    
      return res.status(404).json({ message: 'Entity not found' });
    }

    return res.status(200).json({ message: 'Entity updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const makecontract = async (req, res) => {
 
  try {
    const userId = req.params.id;

 
      
        const users = await Vidzfm.findOne({ where: { id: userId } });
        if (!users) {
          return res.status(404).send({ message: `User with id ${userId} not found` });
        }
    
        const newStatus = !Vidzfm.status; // toggle the status
        await Vidzfm.update({ makecontract: newStatus }, { where: { id: userId } });
    
        return res.send({ message:`Agreement sccuessfully converted to Contract`});
      } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Internal server error' });
      }

  
  
}


export const contractlist = async (req, res) => {
  // try {

  //   const view =
  //   await conn.execute(`select * from vidzfm where makecontract =1 AND disable =0 order by id DESC `)
  //   return successResponse(req, res, view[0]);
 
  //   }
  // catch(err){
  //   return res.status(500).send({ message: 'Internal server error' });

  // }

  try {
    const token = req.headers['x-token'];
    const decoded = jwt.verify(token, "the-super-strong-secrect");
    console.log(decoded.userss.id,"a");
    console.log(decoded.userss.role,"b");
    console.log(decoded.userss.signature,"signature-c");

     // const users = await Vidzfm.findAll();
    // return successResponse(req, res, users);
      if(decoded.userss.role==1 ){

        const rows = await conn.execute(`SELECT *
        FROM vidzfm where disable=0 AND makecontract= 1 order by id DESC`);
        return successResponse(req, res, rows[0]);
      }
      if(decoded.userss.role==3){
        const rows = await conn.execute(`SELECT * from vidzfm where disable=0 AND makecontract= 1 AND Role=3 AND generetedBy=${decoded.userss.id}`);
        return successResponse(req, res, rows[0]);
      }
} catch (err) {
    console.log(err);
  }


}

export const checkcustomer = async (req, res) => {
  const { email, phone } = req.body;
  try {
    const users = await Vidzfm.findAll({
      where: {
        email: email,
        phone: phone,
      },
    });
  
    if (users.length === 0) {
      // No users found with the provided email and phone
      return res.status(200).json({ message: 'No matching users found.' });
    }
  
    // Users found with the provided email and phone
    return res.status(200).json(users);
  }
  catch(err){
    return res.status(500).send({ message: 'Internal server error' });
  }
}
export const salesdropdown  = async (req, res) => {
  const { email, phone } = req.body;
  try {
    
    Vidzfm.findAll({
      attributes: ['sales_rep']
    })
      .then((results) => {
        // Process the results
        results.forEach((row) => {
          console.log(row.sales_rep);
        });
      })

  }
  catch(err){
    return res.status(500).send({ message: 'Internal server error' });
  }
}