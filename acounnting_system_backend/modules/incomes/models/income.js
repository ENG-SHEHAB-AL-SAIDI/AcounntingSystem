'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    static associate(models) {
      // Optional customer relationship
      Income.belongsTo(models.Customer, { foreignKey: 'customerId' });

      // Payment account (Cash, Bank, etc.)
      Income.belongsTo(models.Account, { foreignKey: 'paymentAccountId', as: 'paymentAccount' });

      // Revenue account (Sales, Service, etc.)
      Income.belongsTo(models.Account, { foreignKey: 'revenueAccountId', as: 'revenueAccount' });
    }
  }

  Income.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },

      date: { type: DataTypes.DATEONLY, allowNull: false },

      amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },

      source: { type: DataTypes.STRING, allowNull: true },

      customerId: { type: DataTypes.UUID, allowNull: true },

      paymentMethod: { type: DataTypes.STRING, allowNull: true },

      attachment: { type: DataTypes.STRING, allowNull: true },

      notes: { type: DataTypes.TEXT, allowNull: true },

      // References payment account (asset)
      paymentAccountId: {
        type: DataTypes.UUID,
        allowNull: false
      },

      // References revenue account
      revenueAccountId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Income',
      tableName: 'incomes'
    }
  );

  return Income;
};
