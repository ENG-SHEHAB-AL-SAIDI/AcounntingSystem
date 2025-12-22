'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('journal_entries', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      businessId: {
  type: Sequelize.UUID,
  allowNull: false
},

      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
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
    await queryInterface.addIndex("journal_entries", ["businessId"]);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('journal_entries');
  }
};
