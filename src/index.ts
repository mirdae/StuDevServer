import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes';
import './db';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

app.listen(PORT, () => console.log(`Listening on PORT  : ${PORT}`));
