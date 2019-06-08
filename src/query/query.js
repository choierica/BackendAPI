const dotenv = require('dotenv');
dotenv.config();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const knexdb = knex({client: 'pg', connection: 'postgres://localhost/tests'});

const signUser = (request, response) => {
  if (checkNullity(request)) {
    return response.status(401).send('Please enter the fields');
  }
  User.forge({email: request.body.email}).fetch().then(result => {
    if (result) {
      return response.status(400).send('The email already exists in the database');
    }
  }).catch(err => {
    return response.status(401).send({err: err});
  });
  const user = new User({
    email: request.body.email,
    password: request.body.password,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
  });

  user.save().then(() => {
    const payload = {id: user.id};
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    response.send({token: token});
  });
};

function checkNullity(request) {
  if (!request.body.email || !request.body.password || !request.body.firstName || !request.body.lastName) {
    return true;
  }
}
const loginUser = (request, response) => {
  if (!request.body.email || !request.body.password) {
    return response.status(401).send('Fields are not set');
  }
  User.forge({email: request.body.email}).fetch().then(result => {
    if (!result) {
      return response.status(400).send('User is not found');
    } else result.authenticate(request.body.password).then(user => {
      const payload = {id: user.id};
      const token = jwt.sign(payload, process.env.SECRET_KEY);
      response.send({token: token});
    }).catch(err => {
      return response.status(401).send({err: err});
    });
  });
};

const modifyUser = (request, response) => {
  if (!request.body.firstName || !request.body.lastName) {
    return response.status(401).send('Fields are not set');
  }
  knexdb('users').update({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
  }).then( () => {
    response.send('');
  });
};

module.exports = {
  signUser,
  loginUser,
  modifyUser,
};