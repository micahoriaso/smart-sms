import mongoose from 'mongoose';
import checkAPIs from 'express-validator';
import {isUserExisting} from '../helpers/validators'

const Schema = mongoose.Schema;
const {check} = checkAPIs;

export const validations =
{
  create:
  [
    // Name input
    check('name', 'Invalid name')
    .optional()
    .isString()
    .withMessage('Must be a string')
    .custom( async value => {
      if (value.trim() === '') {
        return Promise.reject('Name must be a string')
      }
    })
    .isLength({ min: 2 })
    .withMessage('Must be at least 2 characters long'),

    // toId input
    check('phoneNumber', 'Invalid phone number')
    .isString()
    .custom( async value => {
      if (! await isUserExisting(value)) {
        return Promise.reject('User does not exist')
      }
    })
  ],
  update:
  [
    // Name input
    check('name', 'Invalid name')
    .isString()
    .withMessage('Must be a string')
    .custom( async value => {
      if (value.trim() === '') {
        return Promise.reject('Name must be a string')
      }
    })
    .isLength({ min: 2 })
    .withMessage('Must be at least 2 characters long'),
  ],
};

let ContactSchema = new Schema({
    myId: {type: String, required: true, max: 255},
    name: {type: String},
    phoneNumber: {type: String, required: true},
});


export default mongoose.model('Contact', ContactSchema);