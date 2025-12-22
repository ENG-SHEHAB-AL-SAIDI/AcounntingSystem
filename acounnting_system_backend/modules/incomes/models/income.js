'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    static associate(models) {
      // Income belongs to business
      Income.belongsTo(models.Business, {
        foreignKey: 'businessId',
      });

      // Income belongs to user (creator)
      Income.belongsTo(models.User, {
        foreignKey: 'createdByUserId',
      });
      
      // Income belongs to payment account (cash, bank, etc.)
      Income.belongsTo(models.Account, {
        foreignKey: 'paymentAccountId',
      });

      // Income belongs to revenue account
      Income.belongsTo(models.Account, {
        foreignKey: 'revenueAccountId',
      });

      // Income may belong to a customer/contact
      Income.belongsTo(models.Contact, {
        foreignKey: 'contactId',
        allowNull: true,
      });
    }
  }

  Income.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },

      businessId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      createdByUserId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      contactId: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },

      paymentAccountId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      revenueAccountId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      attachment: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Income',
    }
  );

  return Income;
};
