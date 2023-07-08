const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const User = require('../model/user')

exports.getUsers = (req, res, next) => {
    User.find().then(users => {
        res.status(200).json({
            message: "Users fetched successfully",
            users: users
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
      .collection("user")
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

exports.postUser = async (req, res, next) => {
    const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    birthday: req.body.birthday,
    address: req.body.address,
    interest: req.body.interest,
    occupation: {
        jobTitle: req.body.jobTitle,
        responsibilities: req.body.responsibilities,
        education: req.body.education,
        expertise: req.body.expertise,
        skills: req.body.skills,
        salary: req.body.salary
    }, 
    emergencyContact: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address
    }
    })
    user.save().then(user => {
        res.status(201).json({
            message: "User created successfully",
            userId: user._id
        })
    }).catch(err => {
        console.log(err)
    })
}

exports.updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to find a user.');
    }
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      birthday: req.body.birthday,
      address: req.body.address,
      interest: req.body.interest,
      occupation: {
          jobTitle: req.body.jobTitle,
          responsibilities: req.body.responsibilities,
          education: req.body.education,
          expertise: req.body.expertise,
          skills: req.body.skills,
          salary: req.body.salary
      }, 
      emergencyContact: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          address: req.body.address
      }
  };
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("taskmaster")
      .collection("user")
      .replaceOne({ _id: userId }, user);
      
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Unable to update user.');
      }
    }


exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to find a user.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("taskmaster")
      .collection("user")
      .deleteOne( { "_id" : userId} );
      if (response.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(500).json(response.error || 'Unable to delete user.');
      }
  };
