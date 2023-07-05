'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Marketplace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Marketplace.init({
    seller: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    buyer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nftId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    type: {
      type: DataTypes.INTEGER,
    },
    marketId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Marketplace',
  });
  return Marketplace;
};