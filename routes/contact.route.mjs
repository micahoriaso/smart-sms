import express from 'express';
import {validations} from '../models/contact.model';
import {checkValidationResult} from '../middlewares/checkValidationResult'
import {checkJWT} from '../middlewares/auth.middleware';
import {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne} from '../controllers/contact.controller';


const router = express.Router();

router.post('/create', checkJWT);
router.post('/create', validations.create);
router.post('/create', checkValidationResult);
router.post('/create', create);

router.get('/get', checkJWT);
router.get('/get', getAll);

router.get('/get/:phoneNumber', checkJWT);
router.get('/get/:phoneNumber', getOne);

router.put('/update/:phoneNumber', checkJWT);
router.put('/update/:phoneNumber', validations.update);
router.put('/update/:phoneNumber', checkValidationResult);
router.put('/update/:phoneNumber', updateOne);

router.delete('/delete/:phoneNumber', checkJWT);
router.delete('/delete/:phoneNumber', deleteOne);

export default router;
