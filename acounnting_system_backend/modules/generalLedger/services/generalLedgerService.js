'use strict';

const { journalEntry, journalLine } = require('../models');
const { validateJournalLines, validateAccounts } = require('../helpers/glValidator');

async function postJournalEntry({ date, reference, description, lines }, transaction) {
  //  Validate lines exist and totals
  validateJournalLines(lines);
  
  const entry = await journalEntry.create(
    {
      date,
      reference,
      description,
      journalLines: lines.map(l => ({
        accountId: l.accountId,
        debit: l.debit || 0,
        credit: l.credit || 0,
        notes: l.notes || null
      }))
    },
    {
      include: [{ model: journalLine, as: 'journalLines' }],
      transaction
    }
  );

  return entry;
}

module.exports = {
  postJournalEntry
};



