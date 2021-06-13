const express = require('express');
const {signUp} = require("../controllers/auth");
const {signIn} = require("../controllers/auth");
const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
