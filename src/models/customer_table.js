'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const customer_table = sequelize.define('customer_table', {
    name: DataTypes.STRING,
  
    email: {
      type: DataTypes.STRING,
       unique: true,
    },
    mobile: {
      type: DataTypes.STRING,
       unique: true,
    },
  customerdelete:DataTypes.BOOLEAN,
  address:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_name:{
    type: DataTypes.STRING,
    allowNull: false,
  }
   
    
  }, {
    tableName:"customer_tables"
  });
  customer_table.associate = function (models) {
    customer_table.hasMany(models.Vidzfm, { foreignKey: 'customerid' });
  };
  return customer_table;
};



