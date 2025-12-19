'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class journalEntry extends Model {
    static associate(models) {
      journalEntry.hasMany(models.journalLine, { foreignKey: 'journalEntryId' });
    }
  }

  journalEntry.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      reference: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'journalEntry',
      tableName: 'journalEntries',
      timestamps: true
    }
  );

  return journalEntry;
};
