const { Account } = require('../../gl/models/account.model');
const { Contact } = require('../../customer/models/contact.model');
const AppError = require('../../../utils/appError');

async function validateIncomeFields(data, transaction) {
  if (!data.date || isNaN(Date.parse(data.date))) {
    throw new AppError({ model: 'Income', action: 'validate', statusCode: 400, message: 'Invalid or missing date' });
  }

  if (data.amount == null || isNaN(data.amount) || Number(data.amount) <= 0) {
    throw new AppError({ model: 'Income', action: 'validate', statusCode: 400, message: 'Invalid or missing amount' });
  }

  const accountIds = [data.paymentAccountId, data.revenueAccountId];
  const accounts = await Account.findAll({ where: { id: accountIds }, transaction });
  const accountMap = {};
  accounts.forEach(a => (accountMap[a.id] = a));

  if (!accountMap[data.paymentAccountId] || accountMap[data.paymentAccountId].type !== 'asset') {
    throw new AppError({ model: 'Income', action: 'validate', statusCode: 400, message: 'Invalid payment account' });
  }

  if (!accountMap[data.revenueAccountId] || accountMap[data.revenueAccountId].type !== 'revenue') {
    throw new AppError({ model: 'Income', action: 'validate', statusCode: 400, message: 'Invalid revenue account' });
  }
}

async function validateCustomer(contactId, transaction) {
  if (!contactId) return;
  const contact = await Contact.findByPk(contactId, { transaction });
  if (!contact || !contact.isCustomer) {
    throw new AppError({
      model: 'Income',
      action: 'validate',
      statusCode: 400,
      message: 'Selected contact is not a customer'
    });
  }
}

module.exports = {
  validateIncomeFields,
  validateCustomer
};
