const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const userController = require('../controllers/user.controller');
const tournamentController = require('../controllers/tournament.controller');

router.get('/', controller.base);

router.post('/user', userController.create); //Devuelve un status 201

router.post('/login', userController.doLogin); //Devuelve json del usuario que se acaba de crear
router.post('/logout', userController.logout); //Devuelve json del usuario que se acaba de crear

router.post('/users', userController.users); //Devuelve un json con la info del usuario
router.get('/user/:id', userController.user); //Devuelve un json con la info del usuario
router.patch('/user/:id', userController.updateUser); //Devuelve un json con la info del usuario actualizada

router.post('/teams', tournamentController.teams); //Devuelve un json con la info del equipo
router.get('/team/:id', tournamentController.team); //Devuelve un json con la info del equipo
router.patch('/team/:id', tournamentController.updateTeam); //Devuelve un json con la info del equipo actualizada

router.post('/inscription', tournamentController.createInscription); //Devuelve un json con los detalles de la inscripcion

router.post('/tournament', tournamentController.createTournament); //Crea el torneo y devuelve json con la info del torneo creado
router.get('/tournament/:id', tournamentController.tournament); //Devuelve un json con la info del torneo
router.patch('/tournament/:id', tournamentController.updateTournament); //Devuelve un json con la info del torneo actualizado

router.post('/bracket', tournamentController.createBracket); //Devuelve un status 201
router.get('/bracket/:id', tournamentController.bracket); //Devuelve un json con la info del bracket
router.patch('/bracket/:id', tournamentController.updateBracket); //Devuelve un json con el bracket actualizado

router.post('/groups', tournamentController.createGroups); //Devuelve un status 201
router.get('/groups/:id', tournamentController.groups); //Devuelve un json con la info del group
router.patch('/groups/:id', tournamentController.updateGroups); //Devuelve un json con el group actualizado

module.exports = router;