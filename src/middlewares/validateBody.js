import { createContactSchema } from '../validation/contacts.js';

export const validateCreateContact = (req, res, next) => {
  const { error } = createContactSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      status: 400,
      message: 'Validation Error',
      details: error.details.map((detail) => detail.message),
    });
  }
  next();
};
