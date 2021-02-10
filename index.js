import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import './db';

dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on PORT  : ${PORT}`));
