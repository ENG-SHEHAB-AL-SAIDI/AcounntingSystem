'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JournalEntry extends Model {
    static associate(models) {
      // Each entry has many lines
      JournalEntry.hasMany(models.JournalLine, {
        foreignKey: 'journalEntryId',
        as: 'lines',
      });

      // Multi-tenant support
      JournalEntry.belongsTo(models.Business, {
        foreignKey: 'businessId',
      });
    }
  }

  JournalEntry.init(
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

      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      reference: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
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
      modelName: 'JournalEntry',
    }
  );

  return JournalEntry;
};
