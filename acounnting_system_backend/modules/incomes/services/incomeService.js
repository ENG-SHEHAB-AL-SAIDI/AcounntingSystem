'use strict';

const { Income } = require('../models/income.model');
const eventBus = require('../../core/helpers/eventBus');
const { Contact } = require('../../customer/models/contact.model');
const AppError = require('../../../utils/appError');

async function createIncome(data) {
  const { contactId } = data;

  if (contactId) {
    const contact = await Contact.findByPk(contactId);
    if (!contact || !contact.isCustomer) {
      throw new AppError({
        model: 'Income',
        action: 'create',
        statusCode: 400,
        message: 'Selected contact is not a customer'
      });
    }
  }

  try {
    const income = await Income.create(data);

    // Emit event for GL
    eventBus.emit('incomeCreated', income);

    return income;
  } catch (err) {
    throw new AppError({
      model: 'Income',
      action: 'create',
      statusCode: 400,
      message: 'Failed to create income',
      meta: err.errors || err.message
    });
  }
}

async function updateIncome(id, data) {
  const income = await Income.findByPk(id);
  if (!income) {
    throw new AppError({
      model: 'Income',
      action: 'update',
      statusCode: 404,
      message: 'Income not found'
    });
  }

  const oldIncome = { ...income.dataValues }; // copy for GL reversal

  try {
    await income.update(data);

    // Emit event for GL to handle reversal and new entry
    eventBus.emit('incomeUpdated', { oldIncome, newIncome: income });

    return income;
  } catch (err) {
    throw new AppError({
      model: 'Income',
      action: 'update',
      statusCode: 400,
      message: 'Failed to update income',
      meta: err.errors || err.message
    });
  }
}

async function deleteIncome(id) {
  const income = await Income.findByPk(id);
  if (!income) {
    throw new AppError({
      model: 'Income',
      action: 'delete',
      statusCode: 404,
      message: 'Income not found'
    });
  }

  try {
    // Emit event for GL to post reversing entry
    eventBus.emit('incomeDeleted', income);

    await income.destroy();
    return true;
  } catch (err) {
    throw new AppError({
      model: 'Income',
      action: 'delete',
      statusCode: 500,
      message: 'Failed to delete income',
      meta: err.errors || err.message
    });
  }
}

module.exports = {
  createIncome,
  updateIncome,
  deleteIncome
};
