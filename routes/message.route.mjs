import express from 'express';
import {validations} from '../models/message.model';
import {checkValidationResult} from '../middlewares/checkValidationResult'
import {checkJWT} from '../middlewares/auth.middleware';
import {
  create,
  getAll,
  getOne,
  readOne,
  deleteOne,
  getAllUnread} from '../controllers/message.controller';


const router = express.Router();

router.post('/create', checkJWT);
router.post('/create', validations.create);
router.post('/create', checkValidationResult);
router.post('/create', create);

router.get('/get', checkJWT);
router.get('/get', getAll);

router.get('/unread', checkJWT);
router.get('/unread', getAllUnread);

router.get('/get/:id', checkJWT);
router.get('/get/:id', getOne);

router.post('/read/:id', checkJWT);
router.post('/read/:id', readOne);

router.delete('/delete/:id', checkJWT);
router.delete('/delete/:id', deleteOne);

export default router;
