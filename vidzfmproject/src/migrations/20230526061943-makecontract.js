'use strict';

module.exports = {
  up:async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('vidzfm', 'makecontract', {
      type: Sequelize.STRING,
      defaultValue:false,
     
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
