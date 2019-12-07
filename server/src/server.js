/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import '@babel/polyfill';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import errorHandler from 'errorhandler';
import Debug from 'debug';
import dotenv from 'dotenv';
import morgan from 'morgan';
import http from 'http';
import formData from 'express-form-data';
import path from 'path';

import routes from './routes';

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

// .env configuration with dotenv
dotenv.config();
const {
  NODE_ENV, DB_DEV, DB_PROD, PORT,
} = process.env;

// Setup debug
const debug = Debug('app:server');

// Configure isProduction variable
const isProduction = NODE_ENV === 'production';

// Initiate our app
const app = express();
const server = http.Server(app);

// Configure our app
app.use(cors());
app.use(formData.parse());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (!isProduction) {
  app.use(errorHandler());
  app.use(morgan('dev'));
}

// Configure Mongoose
mongoose.connect(isProduction ? DB_PROD : DB_DEV, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => debug('DB Connected'))
  .catch((err) => {
    debug(err);
    debug('DB Connection Failed');
  });

mongoose.set('debug', true);

// Serve static files from react app
app.use(express.static(path.join(__dirname, '../../client/build')));

// API Routes
app.use('/api/v1/', routes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.use((err, req, res, next) => {
  debug(err.stack);
  return res.status(500).send({
    data: null,
    message: err.message,
    error: true,
  });
});

const port = PORT || 3000;
server.listen(port, () => debug(`Server running on port ${port}`));
