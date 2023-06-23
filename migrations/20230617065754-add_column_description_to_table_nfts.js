module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Nfts',
      'description',
      {
        type: Sequelize.STRING,
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Nfts', 'description');
  },
};
