const express = require("express");
//const auth = require("../middleware/auth")
const router = express.Router();



router.use('/', require('./swagger'))

module.exports = router;
