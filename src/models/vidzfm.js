'use strict';
const JsonField = require('sequelize-json');

module.exports = (sequelize, DataTypes) => {
  const Vidzfm = sequelize.define('Vidzfm', {

    contract_date: DataTypes.DATE,
    sales_rep: DataTypes.STRING,
    advertiser: DataTypes.STRING,
    name: DataTypes.STRING,
    event: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    orderid: DataTypes.STRING,
    sign: DataTypes.TEXT('long'),
    disable:DataTypes.BOOLEAN,
    generetedBy:DataTypes.INTEGER,
    Role:DataTypes.STRING,
    paymentdue:DataTypes.STRING,
    fields: JsonField(sequelize, 'Vidzfm', 'fields')
    // }
  }, {
freezeTableName:true,
    tableName: 'vidzfm'
 });
  Vidzfm.associate = function (models) {
    // associations can be defined here
  };
  return Vidzfm;
};




// contract_date: {
//   type: Sequelize.DATE
// },
// contract_date: {
//   type: Sequelize.STRING
// },
// advertiser: {
//   type: Sequelize.STRING,
//   defaultValue: true,
// },
// name: {
//   allowNull: false,
//   type: Sequelize.STRING
// },
// event: {
//   allowNull: false,
//   type: Sequelize.STRING
// },
// phone: {
//   allowNull: false,
//   type: Sequelize.STRING
// },
// email: {
//   allowNull: false,
//   type: Sequelize.STRING
// },
// orderid: {
//   allowNull: false,
//   type: Sequelize.STRING
// },
// sign: {
//   allowNull: false,
//   type: Sequelize.LONGTEXT
// },
// fields: {
//   allowNull: false,
//   type: Sequelize.STRING
// }
