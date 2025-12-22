'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contacts', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },

      businessId: {
  type: Sequelize.UUID,
  allowNull: false
},


      name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },

      phone: {
        type: Sequelize.STRING(50),
        allowNull: true
      },

      email: {
        type: Sequelize.STRING(150),
        allowNull: true
      },

      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      isCustomer: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      isSupplier: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
    await queryInterface.addIndex("contacts", ["businessId"]);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('contacts');
  }
};
