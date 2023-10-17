'use strict';

module.exports = {
  up:async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('customer_tables','address', {
      type: Sequelize.STRING,
      allowNull: false,
    
     
    });   
    await queryInterface.addColumn('customer_tables', 'company_name', {
      type: Sequelize.STRING,
      allowNull: false,
     
    });
  },

  async down (queryInterface, Sequelize) {
  
  }
};
