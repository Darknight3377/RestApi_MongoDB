const express = require("express");
const {
  getAllusers,
  getuserById,
  registerUser,
  loginUser,
  changePassword
} = require("../controllers/auth-controller");
const authMiddleware = require("../middleware/auth-middleware");

//create router
const router = express.Router();

router.get("/get", getAllusers);
router.get("/get/:id", getuserById);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;
