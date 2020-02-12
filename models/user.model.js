const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    minlength: [3, 'El nombre requiere al menos 4 caracteres'],
    trim: true
  },
  surname: {
    type: String,
    required: [true, 'El apellido es requerido'],
    minlength: [3, 'El apellido requiere al menos 3 caracteres'],
    trim: true
  },
  username: {
    type: String,
    required: [true, 'El Nombre de usuario es requerido'],
    unique: true,
    trim: true,
  },
  uplayNick: {
    type: String,
    required: [true, 'El nick de Uplay es requerido'],
    unique: true,
    trim: true,
  },
  discordNick: {
    type: String,
    required: [true, 'El nick de discord es requerido'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [EMAIL_PATTERN, 'El email no es válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [8, 'La contraseña necesita al menos 8 caracteres']
  },
  avatar: {
    type: String,
  },
  dni: {
    type: String,
    required: [true, 'El DNI es requerido'],
    unique: true,
    trim: true,
    max: [8, 'Máximo 8 caracteres']
  },
  age: {
    type: Number,
    required: [true, 'La edad es requerida'],
    min: 16,
    trim: true,
  },
  // team: {
  //   type: mongoose.Schema.Types.ObjectId, ref: 'Team'
  // },
  validated: {
    type: Boolean,
    default: true
  },
  social: {
    google: String,
    facebook: String,
    slack: String
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
})

userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash;
            next();
          });
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

userSchema.virtual('team', {
  ref: 'Team',
  localField: '_id',
  foreignField: 'members',
  justOne: false,
});

const User = mongoose.model('User', userSchema);

module.exports = User;