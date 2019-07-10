import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRouter  from './routes/auth.route';
import messagesRouter  from './routes/message.route';
import contactsRouter  from './routes/contact.route';
import {resourceNotFoundException} from './middlewares/error.middleware';
import dotenv from 'dotenv'

dotenv.config();
mongoose.connect("mongodb://localhost/smartsms");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/messages', messagesRouter);
app.use('/contacts', contactsRouter);

app.use(resourceNotFoundException);

export default app;
