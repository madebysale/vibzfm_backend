'use strict';
module.exports = (sequelize, DataTypes) => {
  const monday = sequelize.define('monday', {
    starttime: DataTypes.DATE,
    endtime: DataTypes.DATE,
    formid:DataTypes.STRING,
    role:DataTypes.STRING
  }, {});
  monday.associate = function(models) {
    // associations can be defined here
  };
  return monday;
};