'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    lastname:DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    password: DataTypes.STRING,
    signature:DataTypes.STRING,
    role:DataTypes.STRING,
    status:DataTypes.BOOLEAN,
    otp:DataTypes.STRING,
    canvasSignature:DataTypes.TEXT('long'),
    clickup_code:{ type:DataTypes.STRING,
      allowNull: true, // Not allow null values
    },
    access_token:{ type:DataTypes.STRING,
      allowNull: true, // Not allow null values
    },
    team_id:{ type:DataTypes.STRING,
      allowNull: true, // Not allow null values
    },
  }, {
    tableName:"users"
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};