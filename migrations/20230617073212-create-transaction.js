const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Nfts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      txHash: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      amout: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      type: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      sender: {
        type: Sequelize.STRING,
      },
      receiver: {
       type: Sequelize.STRING,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Nfts');
  }
};
