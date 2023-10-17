'use strict';

module.exports = {
  up:async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Invoices', 'jan', {
      type: Sequelize.DECIMAL(10, 2),
     
    });
    await queryInterface.addColumn('Invoices', 'feb', {
      type: Sequelize.DECIMAL(10, 2),
     
    });
    await queryInterface.addColumn('Invoices', 'mar', {
      type: Sequelize.DECIMAL(10, 2),
     
    });
    await queryInterface.addColumn('Invoices', 'april', {
      type: Sequelize.DECIMAL(10, 2),
     
    });
    await queryInterface.addColumn('Invoices', 'may', {
      type: Sequelize.DECIMAL(10, 2),
     
    });
    await queryInterface.addColumn('Invoices', 'june', {
      type: Sequelize.DECIMAL(10, 2),
     
    });
    await queryInterface.addColumn('Invoices', 'july', {
      type: Sequelize.DECIMAL(10, 2),
     
    });
    await queryInterface.addColumn('Invoices', 'aug', {
      type: Sequelize.DECIMAL(10, 2),
     
    });
    await queryInterface.addColumn('Invoices', 'sept', {
      type: Sequelize.DECIMAL(10, 2),
     
    });
    await queryInterface.addColumn('Invoices', 'oct', {
      type: Sequelize.DECIMAL(10, 2),
     
    });
    await queryInterface.addColumn('Invoices', 'nov', {
      type: Sequelize.DECIMAL(10, 2),
     
    });
    await queryInterface.addColumn('Invoices', 'dec', {
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
