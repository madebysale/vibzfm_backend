'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    
  }, {});
  customer.associate = function(models) {
    // associations can be defined here
  };
  return customer;
};