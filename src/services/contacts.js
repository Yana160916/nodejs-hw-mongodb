import { ContactsCollection } from '../db/models/Contact.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (id) => {
  if (!isValidObjectId(id)) {
    throw createHttpError(400, 'Invalid contact ID');
  }

  const contact = await ContactsCollection.findById(id);
  return contact;
};

export const createContact = async (payload) => {
  const { name, phoneNumber, email, isFavourite, contactType } = payload;

  if (!name || !phoneNumber) {
    throw createHttpError(400, 'Name and phone number are required');
  }

  const contact = new ContactsCollection({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  await contact.save();
  return contact;
};

export const deleteContact = async (contactId) => {
  if (!isValidObjectId(contactId)) {
    throw createHttpError(400, 'Invalid contact ID');
  }

  const deletedContact = await ContactsCollection.findByIdAndDelete(contactId);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  return deletedContact;
};

export const updateContact = async (contactId, payload) => {
  if (!isValidObjectId(contactId)) {
    throw createHttpError(400, 'Invalid contact ID');
  }

  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    { new: true, includeResultMetadata: true },
  );

  if (!rawResult || !rawResult.value) {
    throw createHttpError(404, 'Contact not found');
  }

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
