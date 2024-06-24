import { ContactsCollection } from '../db/models/Contact.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page, perPage } = {}) => {
  const limit = perPage || 10;
  const skip = (page - 1) * limit || 0;

  const contactsQuery = ContactsCollection.find();

  const [contacts, contactsCount] = await Promise.all([
    contactsQuery.skip(skip).limit(limit).exec(),
    ContactsCollection.countDocuments(),
  ]);

  const paginationData = calculatePaginationData(
    contactsCount,
    limit,
    page || 1,
  );

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Contact not found');
  }
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Contact not found');
  }
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      ...options,
    },
  );

  if (!rawResult) return null;

  return {
    contact: rawResult,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
