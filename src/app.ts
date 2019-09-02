import express from 'express';
import router from './routes';
import bodyParser from 'body-parser';

//express config
const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

export = app;
