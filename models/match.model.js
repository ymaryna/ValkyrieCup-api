const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    tournament: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' 
    },
    team1: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
    },
    team2: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Team'
    },
    resultTeam1: { type: Number },
    resultTeam2: { type: Number },
    date: {
        type: String , 
        required: true,
    },
    hour: {
        type: String,
        required: true,
    }
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

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;