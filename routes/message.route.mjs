import express from 'express';
import {validations} from '../models/message.model';
import {checkValidationResult} from '../middlewares/checkValidationResult'
import {
  create,
  getAll,
  getOne,
  readOne,
  deleteOne,
  getAllUnread} from '../controllers/message.controller';


const router = express.Router();

router.post('/', validations.create);
router.post('/', checkValidationResult);
router.post('/', create);

router.get('/', getAll);

router.get('/unread', getAllUnread);

router.get('/:id', getOne);

router.post('/read/:id', readOne);

router.delete('/:id', deleteOne);

export default router;
