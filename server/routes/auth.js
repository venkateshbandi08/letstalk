const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth");

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", verifyToken, getAllUsers);
router.post("/setavatar/:id", verifyToken, setAvatar);
router.get("/logout/:id", verifyToken, logOut);

module.exports = router;
