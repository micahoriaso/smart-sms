import mongoose from 'mongoose';
import checkAPIs from 'express-validator';
import {isUserExisting} from '../helpers/validators'


const Schema = mongoose.Schema;
const {check} = checkAPIs;

export const validations =
{
  create:
  [
    // text input
    check('text', 'Invalid message')
    .isString()
    .withMessage('Must be a string')
    .custom( async value => {
      if (value.trim() === '') {
        return Promise.reject('Message must be a string')
      }
    })
    .isLength({ min: 1, max: 256 })
    .withMessage('Must be between 1 - 256 characters long'),

    // toId input
    check('toId', 'Invalid recepient')
    .isString()
    .custom( async value => {
      if (! await isUserExisting(value)) {
        return Promise.reject('Recepient does not exist')
      }
    })
  ],
};

let MessageSchema = new Schema({
    text: {type: String, required: true, max: 255},
    fromId: {type: String, required: true},
    toId: {type: String, required: true},
    sentAt: {type: Date},
    readAt: {type: Date},
}, { timestamps: { createdAt: 'sentAt' } });


export default mongoose.model('Message', MessageSchema);