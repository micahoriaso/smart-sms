import YAML from 'yamljs';
import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {checkJWT} from './middlewares/auth.middleware';
import swaggerUi from 'swagger-ui-express';
import authRouter  from './routes/auth.route';
import messagesRouter  from './routes/message.route';
import contactsRouter  from './routes/contact.route';
import {resourceNotFoundException} from './middlewares/error.middleware';


const swaggerDocument = YAML.load('./swagger.yaml');

dotenv.config();
mongoose.connect("mongodb://localhost/smartsms");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRouter);
app.use('/messages', checkJWT, messagesRouter);
app.use('/contacts', checkJWT, contactsRouter);

app.use(resourceNotFoundException);

export default app;
