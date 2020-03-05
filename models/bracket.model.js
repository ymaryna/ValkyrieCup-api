
const mongoose = require('mongoose');

const bracketSchema = new mongoose.Schema({
    tournament: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' 
    },
    eighths: {
        type: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Match',
          }],
    },
    quarters: {
        type: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Match',
          }],
    },
    semis: {
        type: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Match',
          }],
    },
    final: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Match',
    },
    //fecha y hora y con eso relacionamos partidos
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

const Bracket = mongoose.model('Bracket', bracketSchema);

module.exports = Bracket;