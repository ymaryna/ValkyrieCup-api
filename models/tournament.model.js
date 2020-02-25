
const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido'],
        minlength: [3, 'El nombre requiere al menos 4 caracteres'],
        trim: true
    },
    game: {
        type: String,
        required: [true, 'El juego es requerido'],
        minlength: [3, 'El juego requiere al menos 4 caracteres'],
        trim: true
    },
    date: {
      start: {
        day: { type: String },
        month: { type: String }
      },
      end: {
        day: { type: String },
        month: { type: String }
      }
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

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;