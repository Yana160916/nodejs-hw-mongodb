import { ContactsCollection } from '../db/models/Contact.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
} = {}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;

  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await ContactsCollection.find({ userId })
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID');
  }
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID');
  }
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};

export const updateContact = async ({ contactId, userId, photo }) => {
  const result = ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    { photo },
    {
      new: true,
    },
  );
  return result;
};
