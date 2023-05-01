'use strict';
const JsonField = require('sequelize-json');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vidzfm', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contract_date: {
        type: Sequelize.DATE
      },
      sales_rep: {
        type: Sequelize.STRING
      },
      advertiser: {
        type: Sequelize.STRING,
     
      },
      name: {
       
        type: Sequelize.STRING
      },
      event: {
     
        type: Sequelize.STRING
      },
      phone: {

        type: Sequelize.STRING
      },
      email: {
      
        type: Sequelize.STRING
      },
      orderid: {
       
        type: Sequelize.STRING
      },
      sign: {
        
        type: Sequelize.TEXT('long')
      },
      disable:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
      },
      generetedBy:{
        type:Sequelize.INTEGER,
      },
      Role:{
        type:Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
   
        fields: JsonField(Sequelize, 'vidzfm', 'fields')
      // }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('vidzfm');
  }
};