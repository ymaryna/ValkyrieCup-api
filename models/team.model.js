const mongoose = require('mongoose');

function arrayLimit(val) {
    return val.length >= 4 && val.length <= 6
  }

const teamSchema = new mongoose.Schema({
    members: {
        type: [{
          type: mongoose.Schema.Types.ObjectId, ref: 'User',
        }],
        validate: [arrayLimit, 'El número de jugadores debe ser entre 4 y 6']  
    },
    teamName: {
        type: String,
        required: [true, 'El nombre del equipo es requerido'],
        minlength: [3, 'El nombre del equipo requiere al menos 3 caracteres'],
        trim: true
    },
    tournament: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Tournament'
    }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;