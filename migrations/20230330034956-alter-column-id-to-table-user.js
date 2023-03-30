'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'id');

    await queryInterface.addColumn(
      'Users',
      'id',
      {
        type: Sequelize.UUID,
      },
    );
  },

  async down (queryInterface, Sequelize) {
  }
};
