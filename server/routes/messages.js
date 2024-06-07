const { addMessage, getMessages } = require("../controllers/messageController");
const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth");

router.post("/addmsg/", verifyToken, addMessage);
router.post("/getmsg/", verifyToken, getMessages);

module.exports = router;
