const express = require('express');
const morgan = require('morgan');
// const qs = require('qs');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// Set a custom query parser using qs
// app.set('query parser', (str) => qs.parse(str));


// MIDDLEWERE

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));


//  mounting the routes
app.use(`/api/v1/tours`, tourRouter);
app.use(`/api/v1/users`, userRouter);

module.exports = app;
