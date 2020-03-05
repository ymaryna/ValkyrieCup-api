const mongoose = require('mongoose');

const groupsSchema = new mongoose.Schema({
    groupA: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
    ],
    groupB: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
    ],
    groupC: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
    ],
    groupD: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
    ],
    winnerA_team1: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
    },
    winnerA_team2: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
    },
    winnerB_team1: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
    },
    winnerB_team2: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
    },
    winnerC_team1: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
    },
    winnerC_team2: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
    },
    winnerD_team1: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
    },
    winnerD_team2: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
    },
    date: {
        type: String
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

const Groups = mongoose.model('Groups', groupsSchema);

module.exports = Groups;