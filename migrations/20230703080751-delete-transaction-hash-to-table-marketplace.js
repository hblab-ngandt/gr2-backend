'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Marketplaces', 'txHash');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Marketplaces', 'txHash', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
