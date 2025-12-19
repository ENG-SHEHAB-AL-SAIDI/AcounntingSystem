'use strict';

const { journalEntry, journalLine } = require('../models');

async function postJournalEntry({ date, reference, description, lines }) {
  if (!lines || !Array.isArray(lines) || lines.length === 0) {
    throw new Error('Journal lines required');
  }

  // Validate total debit == total credit
  const totalDebit = lines.reduce((sum, l) => sum + parseFloat(l.debit || 0), 0);
  const totalCredit = lines.reduce((sum, l) => sum + parseFloat(l.credit || 0), 0);
  if (totalDebit !== totalCredit) throw new Error('Debits and credits must be equal');

  const entry = await journalEntry.create({ date, reference, description });

  for (const line of lines) {
    await journalLine.create({
      journalEntryId: entry.id,
      accountId: line.accountId,
      debit: line.debit || 0,
      credit: line.credit || 0,
      notes: line.notes || null
    });
  }

  return entry;
}

module.exports = {
  postJournalEntry
};
