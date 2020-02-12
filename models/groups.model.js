const mongoose = require('mongoose');

const groupsSchema = new mongoose.Schema({
    groupA: {
        team1: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team2: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team3: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team4: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team5: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        winnersA: {
            team1: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
            },
            team2: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
            }
        }
    },
    groupB: {
        team1: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team2: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team3: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team4: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team5: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        winnersB: {
            team1: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
            },
            team2: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
            }
        }
    },
    groupC: {
        team1: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team2: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team3: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team4: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team5: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        winnersC: {
            team1: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
            },
            team2: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
            }
        }
    },
    groupD: {
        team1: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team2: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team3: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team4: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        team5: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
        },
        winnersD: {
            team1: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
            },
            team2: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Team' 
            }
        }
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