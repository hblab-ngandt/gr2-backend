const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      txHash: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      amout: {
        allowNull: true,
        type: DataTypes.FLOAT,
      },
      type: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      sender: {
        type: DataTypes.STRING,
      },
      receiver: {
       type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  return Transaction;
};
