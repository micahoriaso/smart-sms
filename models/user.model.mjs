import mongoose from 'mongoose';
import checkAPIs from 'express-validator';
import {isPhoneNumberUnique} from '../helpers/validators'

const Schema = mongoose.Schema;
const {check} = checkAPIs;

export const validations =
{
  register:
  [
    // Name input
    check('name', 'Invalid name')
    .isString()
    .withMessage('Must be a string')
    .isLength({ min: 5 })
    .withMessage('Must be at least 5 characters long'),

    // Phone input
    check('phoneNumber', 'Invalid phone number')
    .custom((value) => (typeof value === 'string'))
    .custom(value => (!isNaN(Number(value))))
    .custom( async value => {
      if (! await isPhoneNumberUnique(value)) {
        return Promise.reject('Phone number must be unique')
      }
    })
    .isLength({min: 10, max: 10}),

    // password input
    check('password', 'Password must be more than 8 characters long')
    .custom((value) => (typeof value === 'string'))
    .withMessage('Password must be a string')
    .isLength({ min: 8 })
  ],
  login:
  [
    // Phone input
    check('phoneNumber', 'Invalid login credentials')
    .isString(),

    // password input
    check('password', 'Invalid login credentials')
    .isString()
  ]
};


let UserSchema = new Schema({
    name: {type: String, required: true, max: 100},
    phoneNumber: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});


export default mongoose.model('User', UserSchema);