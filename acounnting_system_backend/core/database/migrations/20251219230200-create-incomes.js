'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('incomes', {
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

      contactId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'contacts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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

      paymentAccountId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'accounts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      revenueAccountId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'accounts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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

    // Optional indexes
    await queryInterface.addIndex('incomes', ['date']);
    await queryInterface.addIndex('incomes', ['customerId']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('incomes');
  }
};
