'use strict';
const { Account } = require('../../gl/models/account.model');
const AppError = require('../../../utils/appError');

/**
 * Validate journal lines exist and debit = credit
 * @param {Array} lines
 */
function validateJournalLines(lines) {
  if (!lines || !Array.isArray(lines) || lines.length === 0) {
    throw new AppError({
      model: 'GL',
      action: 'validate',
      statusCode: 400,
      message: 'Journal lines are required'
    });
  }

  const totalDebit = lines.reduce((sum, l) => sum + parseFloat(l.debit || 0), 0);
  const totalCredit = lines.reduce((sum, l) => sum + parseFloat(l.credit || 0), 0);

  if (totalDebit !== totalCredit) {
    throw new AppError({
      model: 'GL',
      action: 'validate',
      statusCode: 400,
      message: 'Debits and credits must be equal'
    });
  }
}

/**
 * Validate that all accountIds exist and match expected types
 * @param {Array} lines - journal lines
 * @param {Array} expectedTypes - ['asset','revenue'] etc
 * @param {Object} transaction - sequelize transaction
 */
async function validateAccounts(lines, expectedTypes, transaction) {
  const accountIds = lines.map(l => l.accountId);
  const accounts = await Account.findAll({
    where: { id: accountIds },
    transaction
  });
  const accountMap = {};
  accounts.forEach(a => (accountMap[a.id] = a));

  for (const line of lines) {
    const acc = accountMap[line.accountId];
    if (!acc) {
      throw new AppError({
        model: 'GL',
        action: 'validate',
        statusCode: 400,
        message: `Invalid accountId ${line.accountId}`
      });
    }
    if (!expectedTypes.includes(acc.type)) {
      throw new AppError({
        model: 'GL',
        action: 'validate',
        statusCode: 400,
        message: `Account ${line.accountId} type mismatch`
      });
    }
  }
}

module.exports = {
  validateJournalLines,
  validateAccounts
};
