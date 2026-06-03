const express = require("express");
const {
  getAllusers,
  getuserById,
  registerUser,
  loginUser
} = require("../controllers/auth-controller");

//create router
const router = express.Router();

router.get("/get", getAllusers);
router.get("/get/:id", getuserById);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
