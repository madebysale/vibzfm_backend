'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    superadmin: DataTypes.STRING,
    subadmin: DataTypes.STRING,
    salesrep: DataTypes.STRING
  }, {});
  roles.associate = function(models) {
    // associations can be defined here
  };
  return roles;
};