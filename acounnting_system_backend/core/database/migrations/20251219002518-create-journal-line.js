'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('journal_lines', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      journalEntryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'journal_entries', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      accountId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'accounts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      debit: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
      },
      credit: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0
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
  async down(queryInterface) {
    await queryInterface.dropTable('journal_lines');
  }
};
