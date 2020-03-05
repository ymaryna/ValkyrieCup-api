const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const userController = require('../controllers/user.controller');
const tournamentController = require('../controllers/tournament.controller');
const apiR6Controller = require('../controllers/apiR6.controller');
const upload = require('./cloudinary.config');
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', controller.base);

router.post('/user', upload.single('avatar'), authMiddleware.isNotAuthenticated, userController.create); //Devuelve un status 201

router.post('/login', authMiddleware.isNotAuthenticated, userController.doLogin); //Devuelve json del usuario que se acaba de crear
router.post('/logout', authMiddleware.isAuthenticated, userController.logout); //Devuelve json del usuario que se acaba de crear

router.post('/users', userController.users); //Devuelve un json con la info del usuario
router.get('/user/:id', userController.user); //Devuelve un json con la info del usuario
router.patch('/user/:id', authMiddleware.isAuthenticated, userController.updateUser); //Devuelve un json con la info del usuario actualizada

router.get('/teams/tournament/:id', tournamentController.teams); //Devuelve un json con la info del equipo
router.post('/team', upload.single('logo'), authMiddleware.isAuthenticated, tournamentController.createTeam); //Devuelve un json con la info del equipo
router.get('/team/:id', tournamentController.team); //Devuelve un json con la info del equipo
router.patch('/team/:id', authMiddleware.isAuthenticated, tournamentController.updateTeam); //Devuelve un json con la info del equipo actualizada
router.delete('/team/:id', authMiddleware.isAuthenticated, tournamentController.deleteTeam); //Devuelve un json con la info del equipo actualizada

router.post('/inscription', authMiddleware.isAuthenticated, tournamentController.createInscription); //Devuelve un json con los detalles de la inscripcion

router.post('/tournament', authMiddleware.isAuthenticated, tournamentController.createTournament); //Crea el torneo y devuelve json con la info del torneo creado
router.get('/tournament/:id', tournamentController.tournament); //Devuelve un json con la info del torneo
router.patch('/tournament/:id', authMiddleware.isAuthenticated, tournamentController.updateTournament); //Devuelve un json con la info del torneo actualizado

router.post('/bracket', authMiddleware.isAuthenticated, tournamentController.createBracket); //Devuelve un status 201
router.get('/bracket/:id', tournamentController.bracket); //Devuelve un json con la info del bracket
router.patch('/bracket/:id', authMiddleware.isAuthenticated, tournamentController.updateBracket); //Devuelve un json con el bracket actualizado

router.post('/match', authMiddleware.isAuthenticated, tournamentController.createMatch); //Devuelve un status 201
router.get('/matches/tournament/:id', authMiddleware.isAuthenticated, tournamentController.matches); //Devuelve un status 201
router.get('/match/:id', tournamentController.match); //Devuelve un json con la info del match
router.delete('/match/:id', tournamentController.deleteMatch); //Devuelve un json con la info del match
router.patch('/match/:id', authMiddleware.isAuthenticated, tournamentController.updateMatch);

router.post('/groups', authMiddleware.isAuthenticated, tournamentController.createGroups); //Devuelve un status 201
router.get('/groups/:id', tournamentController.groups); //Devuelve un json con la info del group
router.patch('/groups/:id', authMiddleware.isAuthenticated, tournamentController.updateGroups); //Devuelve un json con el group actualizado


//Rutas a la api de R6
router.get(`/user/api/player/:id`, authMiddleware.isAuthenticated, apiR6Controller.getUserStats);
router.get(`/user/api/:platform/:username`, authMiddleware.isAuthenticated, apiR6Controller.getUserInfo);

module.exports = router;