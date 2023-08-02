'use strict';

module.exports = {
  up:async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'clickup_code', {
      type: Sequelize.STRING,
      allowNull: true,
     
    });
    await queryInterface.addColumn('users', 'access_token', {
      type: Sequelize.STRING,
      allowNull: true,
     
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
