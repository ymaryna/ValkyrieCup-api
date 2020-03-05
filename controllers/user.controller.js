const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model')

module.exports.create = (req, res, next) => {
  console.log(req.body)
  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    uplayNick: req.body.uplayNick,
    discordNick: req.body.discordNick,
    email: req.body.email,
    password: req.body.password,
    avatar: req.file ? req.file.url : undefined,
    dni: req.body.dni,
    age: req.body.age,
  })

  user.save()
    .then((user) => res.status(201).json(user))
    .catch(next)
};

module.exports.doLogin = (req, res, next) => {
  const {
    email,
    password
  } = req.body

  if (!email || !password) {
    throw createError(400, 'Rellena todos los campos');
  }

  User.findOne({
      email: email
    })
    .then(user => {
      if (!user) {
        throw createError(404, 'email/contraseña no validos');
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              throw createError(400, 'email/contraseña no validos');
            } else {
              req.session.user = user;
              //res.cookie('foo', 'bar')
              res.json(user)
            }
          })
      }
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.status(204).json();
};

module.exports.users = (req, res, next) => {
  User.find()
    .populate('team')
    .then(users => {
      if (users) {
        
        const findAny = str =>
        users.filter(user => user.uplayNick.toLowerCase().includes(str.toLowerCase()))

        res.json(findAny(req.body.uplayNick))
        
      } else {
        throw createError(404, 'user not found');
      }
    })
    .catch(next)
};

module.exports.user = (req, res, next) => {
  User.findOne({
      _id: req.params.id
    })
    .populate({
      path : 'team',
      populate : {
        path : 'members'
      }
    })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        throw createError(404, 'user not found');
      }
    })
    .catch(next)
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    .then(user => {
      res.json(user)
    })
    .catch(next)
};