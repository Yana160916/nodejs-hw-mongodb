import { ContactsCollection } from '../db/models/Contact.js';

export const createNewContact = async ({
  name,
  phoneNumber,
  email,
  isFavourite,
  contactType,
}) => {
  const newContact = new ContactsCollection({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });
  await newContact.save();
  return newContact;
};

export const updateExistingContact = async (
  id,
  { name, phoneNumber, email, isFavourite, contactType },
) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    id,
    { name, phoneNumber, email, isFavourite, contactType },
    { new: true },
  );
  return updatedContact;
};

export const deleteExistingContact = async (id) => {
  const deletedContact = await ContactsCollection.findByIdAndDelete(id);
  return deletedContact;
};
