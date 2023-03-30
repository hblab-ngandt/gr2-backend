module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID
      },
      username: {
        type: Sequelize.STRING
      },
      walletAddress: {
        type: Sequelize.STRING
      },
      profile: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      birthday: {
        type: Sequelize.DATEONLY
      },
      role: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};