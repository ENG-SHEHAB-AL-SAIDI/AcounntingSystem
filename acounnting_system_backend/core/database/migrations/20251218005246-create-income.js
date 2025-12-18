'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("incomes", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },

      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },

      source: {
        type: Sequelize.STRING,
        allowNull: true
      },

      customerId: {
        type: Sequelize.UUID,
        allowNull: true
      },

      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: true
      },

      attachment: {
        type: Sequelize.STRING,
        allowNull: true
      },

      notes: {
        type: Sequelize.TEXT,
        allowNull: true
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
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("incomes");
  }
};

