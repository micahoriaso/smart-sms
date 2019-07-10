import User from '../models/user.model';
import Contact from '../models/contact.model';

export const isPhoneNumberUnique = async (phoneNumber) => {
  const user = await User.find({ phoneNumber }).exec();
  return user.length <= 0
}

export const isUserExisting = async (toId) => {
  const user = await User.find({ phoneNumber: toId }).exec();
  return user.length > 0
}
