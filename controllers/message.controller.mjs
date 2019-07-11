import Message from '../models/message.model';
import Contact from '../models/contact.model';


export const create = async (req, res, next) => {
  const {text, toId} = req.body;
  if (toId === req.user.phoneNumber)
    return res.status(400).send({message : 'Cannot send message to self'});

  const _contact = await Contact.findOne({ phoneNumber: toId, myId:req.user.phoneNumber }).exec();
  if (!_contact)
    return res.status(400).send({message : 'Recepient is not in your contact list'});

  let message = new Message({
    text: text,
    fromId: req.user.phoneNumber,
    toId: toId,
    readAt: null
  })

  message.save(function (err) {
    if (err) {
        return next(err);
    }
    res.status(201).send({message : 'Message sent successfully'});
  })
}

export const getAll = async (req, res, next) => {
  const {phoneNumber} = req.user;
  const messages =  await Message.find({
    $or:[
      {fromId: phoneNumber},
      {toId: phoneNumber}
    ] }).exec();

  if (messages.length < 0)
    return res.status(404).send({message: 'You have no messages'})

  res.status(200).send({messages : messages});
}

export const getAllUnread = async (req, res, next) => {
  const {phoneNumber} = req.user;
  const messages =  await Message.find({
    readAt: null,
    toId: phoneNumber}).exec();

  if (messages.length < 0)
    return res.status(404).send({message: 'You have no unread messages'})

  res.status(200).send({messages : messages});
}

export const getOne = async (req, res, next) => {
  const {phoneNumber} = req.user;
  const message =  await Message.findOne({
    _id: req.params.id,
    $or:[
      {fromId: phoneNumber},
      {toId: phoneNumber}
    ] }).exec();

  if (!message)
    return res.status(404).send({message: 'Message does not exist'})

  res.status(200).send({message : message});
}

export const readOne = async (req, res, next) => {
  const {phoneNumber} = req.user;
  const message =  await Message.findOne({
    _id: req.params.id,
    toId: phoneNumber }).exec();

  if (!message)
    return res.status(404).send({message: 'Message does not exist'})

  message.readAt = new Date();
  await message.save();

  res.status(200).send({message : 'Message marked as read'});
}

export const deleteOne = async (req, res, next) => {
  const {phoneNumber} = req.user;
  const message =  await Message.findOne({
    _id: req.params.id,
    fromId: phoneNumber }).exec();
  if (!message)
    return res.status(404).send({message: 'Message does not exist'})

  await Message.deleteOne({_id: message._id});

  res.status(200).send({message : 'Message deleted'});
}
