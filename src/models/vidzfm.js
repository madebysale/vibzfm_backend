'use strict';
const JsonField = require('sequelize-json');
const  DataTypes  = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  const Vidzfm = sequelize.define('Vidzfm', {

    contract_date: DataTypes.DATE,
    sales_rep: {
      type: DataTypes.STRING,
      allowNull: false, // Not allow null values
    },
    advertiser: {
      type: DataTypes.STRING,
      allowNull: false, // Not allow null values
    },
    name: { type:DataTypes.STRING,
      allowNull: false, // Not allow null values
    },
    event: { type:DataTypes.STRING,
      allowNull: false, // Not allow null values
    },
    phone: { type:DataTypes.STRING,
      allowNull: false, // Not allow null values
    },
    email: { type:DataTypes.STRING,
      allowNull: false, // Not allow null values
    },
    orderid: DataTypes.STRING,
    sign: DataTypes.TEXT('long'),
    disable:DataTypes.BOOLEAN,
    generetedBy:DataTypes.INTEGER,
    Role:DataTypes.STRING,
    paymentdue:DataTypes.STRING,
    fields: JsonField(sequelize, 'Vidzfm', 'fields'),
    makecontract:DataTypes.BOOLEAN,
    customerid:DataTypes.STRING,
    cost:DataTypes.DECIMAL(10, 2),
    trade:DataTypes.DECIMAL(10, 2),
    discountabst:DataTypes.DECIMAL(10, 2),
    abst:DataTypes.DECIMAL(10, 2),
    grandtotal:DataTypes.DECIMAL(10, 2),
    pdf:DataTypes.STRING,
    contractdate:DataTypes.DATE,
    signature:DataTypes.STRING,
    discountdropdown:DataTypes.STRING,
    task_id:DataTypes.STRING,
    contract_pdf:DataTypes.STRING,
    monthlydistribute:DataTypes.STRING,
    clickupdisable:DataTypes.BOOLEAN,
    
  }, {
freezeTableName:true,
    tableName: 'vidzfm'
 });
 Vidzfm.associate = function (models) {
  Vidzfm.belongsTo(models.customer_table, { foreignKey: 'customerid' });
};
  return Vidzfm;
};





