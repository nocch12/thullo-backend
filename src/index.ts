import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { errorHandler } from './exceptions/HttpException';
import { NotFoundException } from './exceptions/NotFoundException';

import indexRouter from './routes/index';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  throw new NotFoundException;
});

// error handler
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server start on ${PORT}`);
});