const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model')
const Team = require('../models/team.model')
const Tournament = require('../models/tournament.model')
const Bracket = require('../models/bracket.model')
const Groups = require('../models/groups.model')
const Match = require('../models/match.model')

module.exports.createTeam = (req, res, next) => {
    console.log(req.body)
    User.find({
            uplayNick: JSON.parse(req.body.members)
        })
        .populate('team')
        .then(users => {
            return users.map(user => {
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
                tournament: '5e415fa22438ab04dba2c3e9',
                logo: req.file ? req.file.url : undefined,
            })

            team.save()
                .then((team) => {
                    res.status(201).json(team)
                })
                .catch(error =>
                    console.info('Some error happens => ', error.message) ||
                    res.status(400).json({message: error.message}))
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
            tournament: req.params.id
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

module.exports.deleteTeam = (req, res, next) => {
    Team.deleteMany({
            _id: req.params.id
        })
        .then(deleted => {
            console.log(deleted)
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

module.exports.createMatch = (req, res, next) => {
    const match = new Match({
        tournament: req.body.tournament,
        team1: req.body.team1,
        team2: req.body.team2,
        date: req.body.date,
        hour: req.body.hour
    })
    console.log(match)
    match.save()
        .then(match => {
            res.status(201).json(match)
        })
};

module.exports.match = (req, res, next) => {
    Match.findOne({
            _id: req.params.id
        })
        .populate('tournament team1 team2 winner')
        .then(match => {
            if (match) {
                res.json(match)
            } else {
                throw createError(404, 'match not found');
            }
        })
        .catch(next)
};

module.exports.deleteMatch = (req, res, next) => {
    Match.deleteMany({
            _id: req.params.id
        })
        .then(deleted => {
            console.log(deleted)
        })
        .catch(next)
};

module.exports.matches = (req, res, next) => {
    Match.find({
            tournament: req.params.id
        })
        .populate('tournament team1 team2 winner')
        .then(match => {
            if (match) {
                res.json(match)
            } else {
                throw createError(404, 'match not found');
            }
        })
        .catch(next)
};

module.exports.updateMatch = (req, res, next) => {
    Match.findOneAndUpdate(req.params.id, req.body, {
        new: true
    })
    .then(match => {
        res.json(match)
    })
    .catch(next)
};

module.exports.createBracket = (req, res, next) => {
    const bracket = new Bracket({
        tournament: req.body.tournament,
        eighths: req.body.eighths,
        quarters: req.body.quarters,
        semis: req.body.semis,
        final: req.body.final
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
        .populate({
            path: 'eighths tournament quarters semis final',
            populate: {
                path: 'team1 team2'
            }
        })
        // .populate('tournament eighths quarters semis final')
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
        groupA: req.body.groupA,
        groupB: req.body.groupB,
        groupC: req.body.groupC,
        groupD: req.body.groupD,
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
        .populate('tournament groupA groupB groupC groupD')
        .then(groups => {
            if (groups) {
                const { groupA, groupB, groupC, groupD, date, tournament } = groups
                res.json({
                    groups: [
                        groupA, groupB, groupC, groupD
                    ],
                    tournament, date
                })
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