'use strict';
const eventBus = require('../../core/helpers/eventBus');
const generalLedgerService = require('../services/generalLedgerService');

// Income created
eventBus.on('incomeCreated', async (income) => {
  await generalLedgerService.postJournalEntry({
    date: income.date,
    reference: `Income-${income.id}`,
    description: income.notes || 'Income entry',
    lines: [
      { accountId: income.paymentAccountId, debit: income.amount, credit: 0 },
      { accountId: income.revenueAccountId, debit: 0, credit: income.amount }
    ]
  });
});

// Income updated
eventBus.on('incomeUpdated', async ({ oldIncome, newIncome }) => {
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
});

// Income deleted
eventBus.on('incomeDeleted', async (income) => {
  await generalLedgerService.postJournalEntry({
    date: new Date(),
    reference: `Reversal-Income-${income.id}`,
    description: 'Reversal of deleted income entry',
    lines: [
      { accountId: income.paymentAccountId, debit: 0, credit: income.amount },
      { accountId: income.revenueAccountId, debit: income.amount, credit: 0 }
    ]
  });
});
