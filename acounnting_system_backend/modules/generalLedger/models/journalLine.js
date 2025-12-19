'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class journalLine extends Model {
    static associate(models) {
      journalLine.belongsTo(models.journalEntry, { foreignKey: 'journalEntryId' });
      journalLine.belongsTo(models.account, { foreignKey: 'accountId' });
    }
  }

  journalLine.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      journalEntryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'journalEntries',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      accountId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      },
      debit: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      credit: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'journalLine',
      tableName: 'journalLines',
      timestamps: true
    }
  );

  return journalLine;
};
