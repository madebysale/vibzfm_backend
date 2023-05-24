'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
       product_type:DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    starttime:DataTypes.STRING,
    endtime:DataTypes.STRING,
    sunday:DataTypes.STRING,
    monday:DataTypes.STRING,
    tuesday:DataTypes.STRING,
    wednesday:DataTypes.STRING,
    thursday:DataTypes.STRING,
    friday:DataTypes.STRING,
    saturday:DataTypes.STRING,
    rate:DataTypes.STRING,
    discount:DataTypes.STRING,
    cost:DataTypes.STRING,
    discounted_cost:DataTypes.STRING,
    cost_tax:DataTypes.STRING,
    formid:DataTypes.STRING,
    total:DataTypes.STRING,
  }, {
    tableName: 'Invoices'
 });
  Invoice.associate = function(models) {
   
  };
  return Invoice;
};