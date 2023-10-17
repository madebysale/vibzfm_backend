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
        type: Sequelize.DATE,
       
      },
      sales_rep: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      advertiser: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
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