'use strict';

const { Contact } = require('../../../models');
const AppError = require('../../../utils/appError');

class ContactService {
  async createContact(data) {
    try {
      return await Contact.create(data);
    } catch (err) {
      throw new AppError({
        model: 'Contact',
        action: 'create',
        statusCode: 400,
        message: 'Failed to create contact',
        meta: err.errors || err.message
      });
    }
  }

  async getContacts({ page = 1, limit = 10, filters = {} }) {
    try {
      const offset = (page - 1) * limit;

      return await Contact.findAndCountAll({
        where: filters,
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      });
    } catch (err) {
      throw new AppError({
        model: 'Contact',
        action: 'list',
        statusCode: 500,
        message: 'Failed to list contacts',
        meta: err.errors || err.message
      });
    }
  }

  async getContactById(id) {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      throw new AppError({
        model: 'Contact',
        action: 'read',
        statusCode: 404,
        message: 'Contact not found'
      });
    }
    return contact;
  }

  async updateContact(id, data) {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      throw new AppError({
        model: 'Contact',
        action: 'update',
        statusCode: 404,
        message: 'Contact not found'
      });
    }

    try {
      return await contact.update(data);
    } catch (err) {
      throw new AppError({
        model: 'Contact',
        action: 'update',
        statusCode: 400,
        message: 'Failed to update contact',
        meta: err.errors || err.message
      });
    }
  }

  async deleteContact(id) {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      throw new AppError({
        model: 'Contact',
        action: 'delete',
        statusCode: 404,
        message: 'Contact not found'
      });
    }

    try {
      return await contact.destroy();
    } catch (err) {
      throw new AppError({
        model: 'Contact',
        action: 'delete',
        statusCode: 500,
        message: 'Failed to delete contact',
        meta: err.errors || err.message
      });
    }
  }
}

module.exports = new ContactService();
