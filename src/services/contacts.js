import { ContactsCollection } from '../db/models/Contact.js';
import createHttpError from 'http-errors';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (id) => {
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
  const deletedContact = await ContactsCollection.findByIdAndDelete(contactId);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  return deletedContact;
};

export const updateContact = async (contactId, payload) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    { new: true },
  );

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  return updatedContact;
};
