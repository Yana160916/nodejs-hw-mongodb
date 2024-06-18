import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/Contact.js';

export const createContactController = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  try {
    const newContact = await ContactsCollection.create({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  try {
    const updatedContact = await ContactsCollection.findByIdAndUpdate(
      contactId,
      { name, phoneNumber, email, isFavourite, contactType },
      { new: true },
    );

    if (!updatedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const deletedContact = await ContactsCollection.findByIdAndDelete(
      contactId,
    );

    if (!deletedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
