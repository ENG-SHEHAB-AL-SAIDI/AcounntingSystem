'use strict';
const { Income } = require('../models/income.model');
const eventBus = require('../../core/helpers/eventBus');
const customerService = require('../../customer/services/customerService');

async function createIncome(data) {
  if (data.customerId) {
    const exists = await customerService.validateCustomer(data.customerId);
    if (!exists) throw new Error('Customer not found');
  }

  const income = await Income.create(data);

  // Emit event for GL to listen
  eventBus.emit('incomeCreated', income);

  return income;
}

async function updateIncome(id, data) {
  const income = await Income.findByPk(id);
  if (!income) throw new Error('Income not found');

  const oldIncome = { ...income.dataValues }; // copy for GL reversal
  await income.update(data);

  // Emit event for GL to handle reversal and new entry
  eventBus.emit('incomeUpdated', { oldIncome, newIncome: income });

  return income;
}

async function deleteIncome(id) {
  const income = await Income.findByPk(id);
  if (!income) throw new Error('Income not found');

  // Emit event for GL to post reversing entry
  eventBus.emit('incomeDeleted', income);

  await income.destroy();
  return true;
}

module.exports = {
  createIncome,
  updateIncome,
  deleteIncome
};
