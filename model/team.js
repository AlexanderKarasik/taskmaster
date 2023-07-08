const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    teamName: String,
    teamLeader: String,
    teamProfile: String,
    taskId: Number
})

module.exports = mongoose.model('Team', userSchema)