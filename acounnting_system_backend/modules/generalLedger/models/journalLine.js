'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JournalLine extends Model {
    static associate(models) {
      // Each line belongs to a journal entry
      JournalLine.belongsTo(models.JournalEntry, {
        foreignKey: 'journalEntryId',
      });

      // Each line belongs to an account (payment or revenue)
      JournalLine.belongsTo(models.Account, {
        foreignKey: 'accountId',
      });

      // Multi-tenant support
      JournalLine.belongsTo(models.Business, {
        foreignKey: 'businessId',
      });
    }
  }

  JournalLine.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      businessId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      journalEntryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      accountId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      debit: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },

      credit: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
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
      modelName: 'JournalLine',
    }
  );

  return JournalLine;
};
