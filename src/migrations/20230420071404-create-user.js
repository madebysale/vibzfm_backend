'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      signature: {
        type: Sequelize.STRING
      },
      Status:{
        type:Sequelize.BOOLEAN,
        defaultValue: false,
      },
      role:{
        type:Sequelize.STRING,
        defaultValue: 3,
      },
      canvasSignature:{
       type:Sequelize.TEXT('long')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};