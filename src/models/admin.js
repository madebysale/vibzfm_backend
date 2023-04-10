'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define('admin', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    tableName:"admins"
  });
  admin.associate = function(models) {
    // associations can be defined here
  };
  return admin;
};