const express = require('express');
const router = express.Router();
const validation = require("../middleware/validation");
const auth = require("../middleware/auth")

const teamsController = require('../controllers/teams');

router.get('/', teamsController.getTeams)

// router.get('/teams', teamsController.getTeams);

router.get('/:id', teamsController.getSingle);

router.post('/',validation.newTeam, teamsController.postTeam);

router.put('/:id',validation.newTeam, teamsController.updateTeam);

router.delete('/:id', teamsController.deleteTeam); 

module.exports = router;