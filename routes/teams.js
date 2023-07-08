const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teams');

router.get('/', teamsController.getTeams)

router.get('/teams', teamsController.getTeams);

router.get('/:id', teamsController.getSingle);

router.post('/teams', teamsController.postTeam);

router.put('/:id', teamsController.updateTeam);

router.delete('/:id', teamsController.deleteTeam); 

module.exports = router;