'use strict';

const { journalEntry, journalLine, sequelize } = require('../models');
const AppError = require('../../../utils/appError');

async function postJournalEntry({ date, reference, description, lines }) {
  if (!lines || !Array.isArray(lines) || lines.length === 0) {
    throw new AppError({
      model: 'GeneralLedger',
      action: 'postJournalEntry',
      statusCode: 400,
      message: 'Journal lines required'
    });
  }

  // Validate total debit == total credit
  const totalDebit = lines.reduce((sum, l) => sum + parseFloat(l.debit || 0), 0);
  const totalCredit = lines.reduce((sum, l) => sum + parseFloat(l.credit || 0), 0);
  if (totalDebit !== totalCredit) {
    throw new AppError({
      model: 'GeneralLedger',
      action: 'postJournalEntry',
      statusCode: 400,
      message: 'Debits and credits must be equal',
      meta: { totalDebit, totalCredit }
    });
  }

  // Use transaction for atomicity
  const transaction = await sequelize.transaction();
  try {
    const entry = await journalEntry.create(
      { date, reference, description },
      { transaction }
    );

    for (const line of lines) {
      await journalLine.create(
        {
          journalEntryId: entry.id,
          accountId: line.accountId,
          debit: line.debit || 0,
          credit: line.credit || 0,
          notes: line.notes || null
        },
        { transaction }
      );
    }

    await transaction.commit();
    return entry;
  } catch (err) {
    await transaction.rollback();
    throw new AppError({
      model: 'GeneralLedger',
      action: 'postJournalEntry',
      statusCode: 500,
      message: 'Failed to post journal entry',
      meta: err.errors || err.message
    });
  }
}

module.exports = {
  postJournalEntry
};
