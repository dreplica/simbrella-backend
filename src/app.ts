import createError, { HttpError } from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';

import routes from './routes';

var app = express();
// const corsOptions = {
//   origin: 'http://localhost:3000', // Change this to your frontend's URL
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, PREFLIGHT',
//   allowedHeaders: ['Content-Type', 'Authorization'], // Add any custom headers you expect

//   credentials: true, // Allows sending cookies if needed
// };
// view engine setup
app.use(cors({origin: '*'}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', routes);

app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
