module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Marketplaces',
      'marketId',
      {
        type: Sequelize.INTEGER,
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Marketplaces', 'marketId');
  },
};
