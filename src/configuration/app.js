const passport = require('./passport');
const body = require('body-parser');
const express = require('express');
const app = new express();
app.use(passport.initialize());

app.use(body.json());
app.use(
  body.urlencoded({
    extended: true,
  }),
);

module.exports = app;