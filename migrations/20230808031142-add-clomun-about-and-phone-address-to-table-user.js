module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Users',
      'about',
      {
        allowNull: true,
        type: Sequelize.TEXT,
      },
    );
    await queryInterface.addColumn(
      'Users',
      'phone',
      {
        allowNull: true,
        type: Sequelize.STRING,
      },
    );
    await queryInterface.addColumn(
      'Users',
      'address',
      {
        allowNull: true,
        type: Sequelize.TEXT,
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'about');
    await queryInterface.removeColumn('Users', 'phone');
    await queryInterface.removeColumn('Users', 'address');
  }
};
