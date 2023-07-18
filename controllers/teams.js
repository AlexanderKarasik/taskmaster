const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const Team = require('../model/team')

exports.getTeams = (req, res, next) => {
    Team.find().then(teams => {
        res.status(200).json({
            message: "Users fetched successfully",
            teams: teams
        })
    })
}


exports.getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to find a user.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db("taskmaster")
      .collection("team")
      .find({ _id: userId })
      .toArray((err) => {
        if (err) {
          res.status(400).json({ message: err });
        }
      })
      .then((lists) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists[0]);
      });
  };

exports.postTeam = async (req, res, next) => {
    const team = new Team({
        teamName: req.body.teamName,
        teamLeader: req.body.teamLeader,
        teamMembers: req.body.teamMembers,
        teamProfile: req.body.teamProfile,
        taskId: req.body.taskId,
        dateCreated: req.body.dateCreated
    })
    team.save().then(team => {
        res.status(201).json({
            message: "User created successfully",
            teamId: team._id
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.updateTeam = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid team id to find a team.');
    }
    const team = {
      teamName: req.body.teamName,
      teamLeader: {
        oid: req.body.oid
      },
      teamMembers: {
        oid: req.body.iod
      },
      teamProfile: req.body.teamProfile,
      taskId: req.body.taskId,
      dateCreated: req.body.dateCreated
  };
    const teamId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("taskmaster")
      .collection("team")
      .replaceOne({ _id: teamId }, team);
      
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Unable to update team.');
      }
    }
    exports.deleteTeam = async (req, res) => {
      if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid team id to find a team.');
      }
      const teamId = new ObjectId(req.params.id);
      const response = await mongodb
        .getDb()
        .db("taskmaster")
        .collection("team")
        .deleteOne( { "_id" : teamId} );
        if (response.deletedCount > 0) {
          res.status(200).send();
        } else {
          res.status(500).json(response.error || 'Unable to delete team.');
        }
    };
