import Contact from '../models/contact.model';
import Message from '../models/message.model';
import User from '../models/user.model';

export const create = async (req, res, next) => {
  const {phoneNumber, name} = req.body;

  if (phoneNumber === req.user.phoneNumber)
    return res.status(400).send({message : 'You cannot save yourself as a contact'});

  const _contact = await Contact.findOne({ phoneNumber, myId:req.user.phoneNumber }).exec();
  if (_contact)
    return res.status(400).send({message : 'Contact already exists'});

  const user = await User.findOne({ phoneNumber }).exec();
  let contactName = user.name;

  if (name){
    contactName = name;
  }

  let contact = new Contact({
    myId: req.user.phoneNumber,
    name: contactName,
    phoneNumber: user.phoneNumber
  })

  contact.save(function (err) {
    if (err) {
        return next(err);
    }
    res.status(201).send({message : 'Contact saved successfully'});
  })
}

export const getAll = async (req, res, next) => {
  const {phoneNumber} = req.user;
  const contacts =  await Contact.find({myId: phoneNumber}).exec();

  if (contacts.length < 0)
    return res.status(404).send({message: 'You have no contacts'})

  res.status(200).send({contacts : contacts});
}


export const getOne = async (req, res, next) => {
  const {phoneNumber} = req.user;
  const contact =  await Contact.findOne({
    phoneNumber: req.params.phoneNumber,
    myId: phoneNumber,
    }).exec();

  if (!contact)
    return res.status(404).send({message: 'Contact does not exist'})

  res.status(200).send({contact : contact});
}

export const updateOne = async (req, res, next) => {
  const {phoneNumber} = req.user;
  const contact =  await Contact.findOne({
    phoneNumber: req.params.phoneNumber,
    myId: phoneNumber,
    }).exec();

  if (!contact)
    return res.status(404).send({message: 'Contact does not exist'})

  contact.name = req.body.name;

  await contact.save();

  res.status(200).send({message : 'Contact updated'});
}

export const deleteOne = async (req, res, next) => {
  const {phoneNumber} = req.user;
  const contact =  await Contact.findOne({
    phoneNumber: req.params.phoneNumber,
    myId: phoneNumber,
     }).exec();
  if (!contact)
    return res.status(404).send({message: 'Contact does not exist'})

  await Message.deleteMany({toId: phoneNumber, fromId: req.params.phoneNumber });

  await Contact.deleteOne({_id: contact._id});

  res.status(200).send({message : 'Contact deleted'});
}
