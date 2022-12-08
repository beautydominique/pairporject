'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CashFlow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CashFlow.belongsTo(models.Profile)
    }
  }
  CashFlow.init({
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    dateOfTransaction: DataTypes.STRING,
    typeOfTransaction: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CashFlow',
  });
  return CashFlow;
};