'use strict';

const eventBus = require('../../core/helpers/eventBus');
const generalLedgerService = require('../services/generalLedgerService');
const AppError = require('../../../utils/appError');

// Income created
eventBus.on('incomeCreated', async (income) => {
  try {
    await generalLedgerService.postJournalEntry({
      date: income.date,
      reference: `Income-${income.id}`,
      description: income.notes || 'Income entry',
      lines: [
        { accountId: income.paymentAccountId, debit: income.amount, credit: 0 },
        { accountId: income.revenueAccountId, debit: 0, credit: income.amount }
      ]
    });
  } catch (err) {
    console.error(
      new AppError({
        model: 'GeneralLedger',
        action: 'postJournalEntry',
        statusCode: 500,
        message: `Failed to post incomeCreated for Income-${income.id}`,
        meta: err.errors || err.message
      })
    );
  }
});

// Income updated
eventBus.on('incomeUpdated', async ({ oldIncome, newIncome }) => {
  try {
    // Reverse old entry
    await generalLedgerService.postJournalEntry({
      date: new Date(),
      reference: `Reversal-Income-${oldIncome.id}`,
      description: 'Reversal of previous income entry',
      lines: [
        { accountId: oldIncome.paymentAccountId, debit: 0, credit: oldIncome.amount },
        { accountId: oldIncome.revenueAccountId, debit: oldIncome.amount, credit: 0 }
      ]
    });

    // Post new entry
    await generalLedgerService.postJournalEntry({
      date: newIncome.date,
      reference: `Income-${newIncome.id}`,
      description: newIncome.notes || 'Income entry',
      lines: [
        { accountId: newIncome.paymentAccountId, debit: newIncome.amount, credit: 0 },
        { accountId: newIncome.revenueAccountId, debit: 0, credit: newIncome.amount }
      ]
    });
  } catch (err) {
    console.error(
      new AppError({
        model: 'GeneralLedger',
        action: 'postJournalEntry',
        statusCode: 500,
        message: `Failed to post incomeUpdated for Income-${newIncome.id}`,
        meta: err.errors || err.message
      })
    );
  }
});

// Income deleted
eventBus.on('incomeDeleted', async (income) => {
  try {
    await generalLedgerService.postJournalEntry({
      date: new Date(),
      reference: `Reversal-Income-${income.id}`,
      description: 'Reversal of deleted income entry',
      lines: [
        { accountId: income.paymentAccountId, debit: 0, credit: income.amount },
        { accountId: income.revenueAccountId, debit: income.amount, credit: 0 }
      ]
    });
  } catch (err) {
    console.error(
      new AppError({
        model: 'GeneralLedger',
        action: 'postJournalEntry',
        statusCode: 500,
        message: `Failed to post incomeDeleted for Income-${income.id}`,
        meta: err.errors || err.message
      })
    );
  }
});
