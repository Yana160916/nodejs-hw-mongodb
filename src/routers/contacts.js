import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import createContactController from '../controllers/contacts.js';
import patchContactController from '../controllers/contacts.js';
import deleteContactController from '../controllers/contacts.js';

const router = Router();

router.post('/contacts', ctrlWrapper(createContactController));
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
