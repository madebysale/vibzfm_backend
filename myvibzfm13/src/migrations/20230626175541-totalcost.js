'use strict';
module.exports = {
  up:async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('vidzfm', 'cost', {
      type: Sequelize.DECIMAL(10, 2),
     
    });
    await queryInterface.addColumn('vidzfm', 'trade', {
      type: Sequelize.DECIMAL(10, 2),
     
    });
    await queryInterface.addColumn('vidzfm', 'discountabst', {
      type: Sequelize.DECIMAL(10, 2),
     
    });
    await queryInterface.addColumn('vidzfm', 'abst', {
      type: Sequelize.DECIMAL(10, 2),
     
    });
    await queryInterface.addColumn('vidzfm', 'grandtotal', {
      type: Sequelize.DECIMAL(10, 2),
     
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
