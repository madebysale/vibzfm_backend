'use strict';

module.exports = {
  up:async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('vidzfm', 'clickupdisable`', {
      type:Sequelize.BOOLEAN,
      defaultValue:false,
     
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
