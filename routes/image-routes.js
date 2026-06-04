const express = require("express");
const { uploadImage, deleteImage } = require("../controllers/image-controller");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware");

//create router
const router = express.Router();

router.post("/upload", authMiddleware, adminMiddleware, uploadMiddleware.single('image'), uploadImage);
// router.get("/get/:id", getuserById);
// router.post("/register", registerUser);
// router.post("/login", loginUser);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteImage);

module.exports = router;
