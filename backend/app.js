const express = require('express');

const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const HttpError = require('./models/http-error');

const url = 'mongodb+srv://redmusketeer:r1a2s3a4@node-cluster.ran9r.mongodb.net/places?retryWrites=true&w=majority';

const app = express();

app.use(express.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route');
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000)
  })
  .catch(err => {
    console.log(err)
  });