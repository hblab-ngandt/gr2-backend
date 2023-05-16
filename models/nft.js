'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Nft.init(
    {
      nftId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull:true,
      },
      owner: {
        type: DataTypes.STRING,
        allowNull: false,
      }
  }, {
    sequelize,
    modelName: 'Nft',
    paranoid: true,
  });
  return Nft;
};