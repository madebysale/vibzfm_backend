'use strict';

const { STRING } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_type:{
        type:Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      starttime: {
        type: Sequelize.STRING,
        
      },
      endtime: {
        type: Sequelize.STRING,
    
      },
       sunday: {
        type: Sequelize.STRING,
        defaultValue:0,

  
      },
      monday: {
        type: Sequelize.STRING,
        defaultValue:0,
      },
      tuesday: {
        type: Sequelize.STRING,
   
      },
      wednesday: {
        type: Sequelize.STRING,
      
      },
      thursday: {
        type: Sequelize.STRING
      },
    friday: {
        type: Sequelize.STRING,
    
      },
      saturday: {
        type: Sequelize.STRING
      },
      rate: {
        type: Sequelize.STRING,
       
      },
      discount: {
        type: Sequelize.STRING,
       
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2),
      },
      discounted_cost: {
        type: Sequelize.DECIMAL(10, 2),
      },
      cost_tax: {
        type: Sequelize.DECIMAL(10, 2),
      },
      formid: {
        type: Sequelize.STRING
      },
       createdAt: {
       
        type: Sequelize.DATE
      },
      updatedAt: {
      type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Invoices');
  }
};