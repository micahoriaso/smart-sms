import express from 'express';
import {validations} from '../models/contact.model';
import {checkValidationResult} from '../middlewares/checkValidationResult'
import {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne} from '../controllers/contact.controller';


const router = express.Router();

router.post('/', validations.create);
router.post('/', checkValidationResult);
router.post('/', create);

router.get('/', getAll);

router.get('/:phoneNumber', getOne);

router.put('/:phoneNumber', validations.update);
router.put('/:phoneNumber', checkValidationResult);
router.put('/:phoneNumber', updateOne);

router.delete('/:phoneNumber', deleteOne);

export default router;
