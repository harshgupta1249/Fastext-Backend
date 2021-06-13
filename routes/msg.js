const express = require('express');

const {verifyToken} = require("../middlewares/auth");
const {getMsg, sendMsg, delMsg} = require("../controllers/msg");

const {msgIdParam} = require("../middlewares/msg");

const router = express.Router();

router.param("msgId", msgIdParam);

router.get("/get", verifyToken, getMsg);
router.post("/send", verifyToken, sendMsg);
router.delete("/del/:msgId", verifyToken, delMsg);

module.exports = router; 