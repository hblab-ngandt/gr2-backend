const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
      },
      walletAddress: {
        unique: true,
        type: DataTypes.STRING,
      },
      profile: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.INTEGER,
      },
      birthday: {
        type: DataTypes.DATEONLY,
      },
      role: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
      paranoid: true,
    }
  );
  return User;
};