import { DataTypes } from 'sequelize/types';

const Joi = require('joi');

export const getOtherUserProfile = {
  body: {
    userId: Joi.number().required(),
  },
};

// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const Invoice = sequelize.define('Invoice', {
      //  product_type:DataTypes.STRING,
//     start_date: DataTypes.DATE,
//     end_date: DataTypes.DATE,
//     starttime:DataTypes.STRING,
//     endtime:DataTypes.STRING,
//     sunday:DataTypes.STRING,
//     monday:DataTypes.STRING,
//     tuesday:DataTypes.STRING,
//     wednesday:DataTypes.STRING,
//     thursday:DataTypes.STRING,
//     friday:DataTypes.STRING,
//     saturday:DataTypes.STRING,
//     rate:DataTypes.STRING,
//     discount:DataTypes.STRING,
//     cost:DataTypes.STRING,
//     discounted_cost:DataTypes.STRING,
//     cost_tax:DataTypes.STRING,
//     formid:DataTypes.STRING,
//   }, {
//     tableName: 'Invoice'
//  });
//   Invoice.associate = function(models) {
//     // associations can be defined here
//   };
//   return Invoice;
// };






// 'use strict';
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable('Invoices', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       start_date: {
//         type: Sequelize.DATE
//       },
//       end_date: {
//         type: Sequelize.DATE
//       },
//       starttime: {
//         type: Sequelize.STRING,
        
//       },
//       endtime: {
//         type: Sequelize.STRING,
    
//       },
//        sunday: {
//         type: Sequelize.STRING,
 
//       },
//       monday: {
//         type: Sequelize.STRING
//       },
//       tuesday: {
//         type: Sequelize.STRING,
   
//       },
//       wednesday: {
//         type: Sequelize.STRING,
      
//       },
//       thursday: {
//         type: Sequelize.STRING
//       },
//     friday: {
//         type: Sequelize.STRING,
    
//       },
//       saturday: {
//         type: Sequelize.STRING
//       },
//       rate: {
//         type: Sequelize.INTEGER,
       
//       },
//       discount: {
//         type: Sequelize.INTEGER,
       
//       },
//       cost: {
//         type: Sequelize.INTEGER,
//       },
//       discounted_cost: {
//         type: Sequelize.INTEGER,
//       },
//       cost_tax: {
//         type: Sequelize.INTEGER,
//       },
//       formid: {
//         type: Sequelize.STRING
//       },
//        createdAt: {
       
//         type: Sequelize.DATE
//       },
//       updatedAt: {
       
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.dropTable('Invoices');
//   }
// };