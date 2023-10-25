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
    cost:DataTypes.DECIMAL(10, 2),
    discounted_cost:DataTypes.DECIMAL(10, 2),
    cost_tax:DataTypes.DECIMAL(10, 2),
    formid:DataTypes.STRING,
    total:DataTypes.STRING,
    jan:DataTypes.DECIMAL(10, 2),
    feb:DataTypes.DECIMAL(10, 2),
    mar:DataTypes.DECIMAL(10, 2),
    april:DataTypes.DECIMAL(10, 2),
     may:DataTypes.DECIMAL(10, 2),
    june:DataTypes.DECIMAL(10, 2),
    july:DataTypes.DECIMAL(10, 2),
    aug:DataTypes.DECIMAL(10, 2),
    sept:DataTypes.DECIMAL(10, 2),
    oct:DataTypes.DECIMAL(10, 2),
    nov:DataTypes.DECIMAL(10, 2),
    dec:DataTypes.DECIMAL(10, 2),
    disableproduct:DataTypes.BOOLEAN,
   
  
    qty:DataTypes.STRING,
  }, {
    tableName: 'Invoices'
 });
  Invoice.associate = function(models) {
   
  };
  return Invoice;
};