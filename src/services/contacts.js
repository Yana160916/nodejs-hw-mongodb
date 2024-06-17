import { ContactsCollection } from '../db/models/Contact.js';

export const createContact = async (contactData) => {
  const newContact = await ContactsCollection.create(contactData);
  return newContact;
};

export const updateContact = async (contactId, payload) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    { $set: payload },
    { new: true },
  );
  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const deletedContact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return deletedContact;
};
