'use strict';

const { sequelize } = require('../../../models');
const { Income } = require('../models/income.model');
const { postJournalEntry } = require('../../gl/services/generalLedgerService');
const { validateIncomeFields, validateCustomer } = require('../helpers/incomeValidator');
const AppError = require('../../../utils/appError');

async function createIncome(context, data) {
  return await sequelize.transaction(async (t) => {
    // 1️⃣ Validate fields
    await validateIncomeFields(data, t);

    // 2️⃣ Validate customer/contact
    await validateCustomer(data.contactId, t);

    // 3️⃣ Create income
    let income;
    try {
      income = await Income.create(
        {
          ...data,
          businessId: context.businessId,
          createdByUserId: context.userId
        },
        { transaction: t }
      );
    } catch (err) {
      throw new AppError({
        model: 'Income',
        action: 'create',
        statusCode: 400,
        message: 'Failed to create income',
        meta: err.errors || err.message
      });
    }

    // 4️⃣ Post GL entry
    try {
      await postJournalEntry(
        {
          date: income.date,
          reference: `Income-${income.id}`,
          description: income.notes || 'Income entry',
          lines: [
            { accountId: income.paymentAccountId, debit: income.amount, credit: 0 },
            { accountId: income.revenueAccountId, debit: 0, credit: income.amount }
          ]
        },
        t
      );
    } catch (err) {
      throw new AppError({
        model: 'Income',
        action: 'create',
        statusCode: 500,
        message: 'Failed to post GL entry',
        meta: err.errors || err.message
      });
    }

    return income;
  });
}

async function updateIncome(context, id, data) {
  return await sequelize.transaction(async (t) => {
    const income = await Income.findByPk(id, { transaction: t });
    if (!income) {
      throw new AppError({
        model: 'Income',
        action: 'update',
        statusCode: 404,
        message: 'Income not found'
      });
    }

    // Validate updated fields
    await validateIncomeFields(data, t);

    // Validate customer/contact if changed
    if (data.contactId) {
      await validateCustomer(data.contactId, t);
    }

    const oldIncome = { ...income.dataValues };

    try {
      await income.update(
        {
          ...data,
          updatedByUserId: context.userId
        },
        { transaction: t }
      );
    } catch (err) {
      throw new AppError({
        model: 'Income',
        action: 'update',
        statusCode: 400,
        message: 'Failed to update income',
        meta: err.errors || err.message
      });
    }

    // Reverse old GL entry
    await postJournalEntry(
      {
        date: new Date(),
        reference: `Reversal-Income-${oldIncome.id}`,
        description: 'Reversal of previous income entry',
        lines: [
          { accountId: oldIncome.paymentAccountId, debit: 0, credit: oldIncome.amount },
          { accountId: oldIncome.revenueAccountId, debit: oldIncome.amount, credit: 0 }
        ]
      },
      t
    );

    // Post new GL entry
    await postJournalEntry(
      {
        date: income.date,
        reference: `Income-${income.id}`,
        description: income.notes || 'Income entry',
        lines: [
          { accountId: income.paymentAccountId, debit: income.amount, credit: 0 },
          { accountId: income.revenueAccountId, debit: 0, credit: income.amount }
        ]
      },
      t
    );

    return income;
  });
}

async function deleteIncome(context, id) {
  return await sequelize.transaction(async (t) => {
    const income = await Income.findByPk(id, { transaction: t });
    if (!income) {
      throw new AppError({
        model: 'Income',
        action: 'delete',
        statusCode: 404,
        message: 'Income not found'
      });
    }

    // Reverse GL entry
    await postJournalEntry(
      {
        date: new Date(),
        reference: `Reversal-Income-${income.id}`,
        description: 'Reversal of deleted income entry',
        lines: [
          { accountId: income.paymentAccountId, debit: 0, credit: income.amount },
          { accountId: income.revenueAccountId, debit: income.amount, credit: 0 }
        ]
      },
      t
    );

    try {
      await income.destroy({ transaction: t });
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
  });
}

// Optional: paginated list
async function getPaginatedIncomes({ businessId, page = 1, limit = 10, filters = {} }) {
  const offset = (page - 1) * limit;
  const result = await Income.findAndCountAll({
    where: { businessId, ...filters },
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });
  return result;
}

module.exports = {
  createIncome,
  updateIncome,
  deleteIncome,
  getPaginatedIncomes
};
