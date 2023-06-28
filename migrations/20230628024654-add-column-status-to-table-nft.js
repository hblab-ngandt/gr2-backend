module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Nfts',
      'status',
      {
        type: Sequelize.INTEGER,
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Nfts', 'status');
  },
};
