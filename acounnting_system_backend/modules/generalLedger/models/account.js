'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    static associate(models) {
      account.hasMany(models.journalLine, { foreignKey: 'accountId' });
    }
  }

  account.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      type: {
        type: DataTypes.ENUM('Asset', 'Liability', 'Equity', 'Revenue', 'Expense'),
        allowNull: false
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'account',
      tableName: 'accounts',
      timestamps: true
    }
  );

  return account;
};
