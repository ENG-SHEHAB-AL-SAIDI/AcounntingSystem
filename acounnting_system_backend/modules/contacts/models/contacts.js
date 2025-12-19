'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Income relationship (customer)
      Contact.hasMany(models.Income, {
        foreignKey: 'contactId'
      });

      // Expense relationship (supplier) – later
      // Contact.hasMany(models.Expense, { foreignKey: 'contactId' });
    }
  }

  Contact.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },

      name: {
        type: DataTypes.STRING(150),
        allowNull: false
      },

      phone: {
        type: DataTypes.STRING(50),
        allowNull: true
      },

      email: {
        type: DataTypes.STRING(150),
        allowNull: true
      },

      address: {
        type: DataTypes.TEXT,
        allowNull: true
      },

      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },

      isCustomer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      isSupplier: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'Contact',
      tableName: 'contacts'
    }
  );

  return Contact;
};
