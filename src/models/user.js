'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    password: DataTypes.STRING,
    signature:DataTypes.STRING,
    role:DataTypes.STRING,
    status:DataTypes.BOOLEAN,
    otp:DataTypes.STRING,
    canvasSignature:DataTypes.TEXT('long'),
    
  }, {
    tableName:"users"
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};