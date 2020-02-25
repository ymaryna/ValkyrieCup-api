const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model')
const Team = require('../models/team.model')
const Tournament = require('../models/tournament.model')
const Bracket = require('../models/bracket.model')
const Groups = require('../models/groups.model')

module.exports.createTeam = (req, res, next) => {
    console.log(req.body)
    User.find({
            uplayNick: JSON.parse(req.body.members)
        })
        .populate('team')
        .then(users => {
            return users.map(user => {
                console.log('USER ID1 => ', user.id)
                return user.id
                // const team = user.team[0] || null
                // if(team) {
                //     console.log('TIENE EQUIPO')
                //     throw createError(404, `${user.uplayNick} ya tiene asignado un equipo`)
                // }
                // else {
                //     console.log('NO TIENE EQUIPO')
                //     return user.id
                // }
            })
        })
        .then(users => {
            console.log('USERS ID => ', users)
            const team = new Team({
                teamName: req.body.teamName,
                members: users,
                logo: req.body.logo
            })

            team.save()
                .then((team) => {
                    res.status(201).json(team)
                })
        })
        .catch(next)
};

module.exports.createInscription = (req, res, next) => {
    Team.findOneAndUpdate({ teamName: req.body.name, tournament: req.body.tournament }, { new: true })
        .populate('members tournament')
        .then(team => {
            console.log(team)
            res.json(team)
        })
        .catch(next)
};

module.exports.teams = (req, res, next) => {
    Team.find({
            tournament: req.body.tournamentId
        })
        .populate({
            path: 'members'
        })
        .populate('tournament')
        .then(teams => {
            if (teams) {
                res.json(teams)
            } else {
                throw createError(404, 'team not found');
            }
        })
        .catch(next)
        
};

module.exports.team = (req, res, next) => {
    Team.findOne({
            _id: req.params.id
        })
        .populate({
            path: 'members'
        })
        .populate('tournament')
        .then(team => {
            if (team) {
                res.json(team)
            } else {
                throw createError(404, 'team not found');
            }
        })
        .catch(next)
        
};

module.exports.updateTeam = (req, res, next) => {
    Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then((team) => {
            res.status(201).json(team)
        })
        .catch(next)
};

module.exports.tournament = (req, res, next) => {
    Tournament.findOne({
            _id: req.params.id
        })
        .then(tournament => {
            if (tournament) {
                res.json(tournament)
            } else {
                throw createError(404, 'tournament not found');
            }
        })
        .catch(next)
};

module.exports.createTournament = (req, res, next) => {
    const tournament = new Tournament({
        name: req.body.name,
        game: req.body.game,
        date: {
            start: {
                day: req.body.startDay,
                month: req.body.startMonth,
            },
            end: {
                day: req.body.endDay,
                month: req.body.endMonth,
            }
        }
    })

    tournament.save()
        .then(tournament => {
            res.status(201).json(tournament)
        })
};

module.exports.updateTournament = (req, res, next) => {
    console.log(req.body)
    Tournament.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then(tournament => {
            
            res.json(tournament)
        })
        .catch(next)
};

module.exports.createBracket = (req, res, next) => {
    const bracket = new Bracket({
        tournament: req.body.tournament,
        team1: req.body.team1,
        team2: req.body.team2,
        date: req.body.date,
        hour: req.body.hour
    })
    console.log(bracket)
    bracket.save()
        .then(bracket => {
            res.status(201).json(bracket)
        })
};

module.exports.bracket = (req, res, next) => {
    Bracket.findOne({
            _id: req.params.id
        })
        .populate('tournament team1 team2 winner')
        .then(bracket => {
            if (bracket) {
                res.json(bracket)
            } else {
                throw createError(404, 'bracket not found');
            }
        })
        .catch(next)
};

module.exports.updateBracket = (req, res, next) => {
    Bracket.findOneAndUpdate(req.params.id, req.body, {
        new: true
    })
    .then(bracket => {
        res.json(bracket)
    })
    .catch(next)
};





module.exports.createGroups = (req, res, next) => {
    const groups = new Groups({
        groupA: {
            team1: req.body.groupA.team1a,
            team2: req.body.groupA.team2a,
            team3: req.body.groupA.team3a,
            team4: req.body.groupA.team4a,
            team5: req.body.groupA.team5a,
        },
        groupB: {
            team1: req.body.groupB.team1b,
            team2: req.body.groupB.team2b,
            team3: req.body.groupB.team3b,
            team4: req.body.groupB.team4b,
            team5: req.body.groupB.team5b,
        },
        groupC: {
            team1: req.body.groupC.team1c,
            team2: req.body.groupC.team2c,
            team3: req.body.groupC.team3c,
            team4: req.body.groupC.team4c,
            team5: req.body.groupC.team5c,
        },
        groupD: {
            team1: req.body.groupD.team1d,
            team2: req.body.groupD.team2d,
            team3: req.body.groupD.team3d,
            team4: req.body.groupD.team4d,
            team5: req.body.groupD.team5d,
        },
        date: req.body.date,
        tournament: req.body.tournament
    })
    groups.save()
        .then(groups => {
            res.status(201).json(groups)
        })
};

module.exports.groups = (req, res, next) => {
    Groups.findOne({
            _id: req.params.id
        })
        .populate('tournament groupA.team1 groupA.team2 groupA.team3 groupA.team4 groupA.team5 groupB.team1 groupB.team2 groupB.team3 groupB.team4 groupB.team5 groupC.team1 groupC.team2 groupC.team3 groupC.team4 groupC.team5 groupD.team1 groupD.team2 groupD.team3 groupD.team4 groupD.team5')
        .then(groups => {
            if (groups) {
                res.json(groups)
            } else {
                throw createError(404, 'groups not found');
            }
        })
        .catch(next)
};

module.exports.updateGroups = (req, res, next) => {
    Groups.findOneAndUpdate(req.params.id, req.body, {
        new: true
    })
    .then(groups => {
        res.json(groups)
    })
    .catch(next)
};