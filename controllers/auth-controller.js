const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
require('dotenv').config();

const getAllusers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      success: true,
      message: "users fetched successfully",
      data: users,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching users",
      error: e.message,
    });
  }
};

const getuserById = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Validate if it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid user ID format",
      });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "No User found in database with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "User fetched successfully",
      data: {
        username: user.username,
        email: user.email,
        id: user._id
      },
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching this user",
      error: e.message,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const {username, password, email, role} = req.body;
    //check if user exists with same email or username
    const checkExistingUser = await User.findOne({$or: [{username}, {email}]});
    if(checkExistingUser){
      return res.status(400).send({
        success: false,
        message: "User already exist with same email or username"
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newlyCreateduser = await User.create({
        username,
        email,
        password: hashedPassword,
        role
    });
    res.status(201).send({
      success: true,
      message: "User created successfully",
      data: newlyCreateduser,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Something went wrong while creating user",
      error: e,
    });
  }
};

const loginUser = async (req, res) => {
  try{
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user){
      return res.status(400).send({
        success: false,
        message: "User does not exist with this username"
      });
    }

    if(!bcrypt.compareSync(password, user.password)){
      return res.status(500).send({
        success: false,
        message: "Invalid credentials!!"
      });
    }else {
      //create jwt token with username email
      const accessToken = jwt.sign({
        userId: user._id,
        username: user.username,
        role: user.role,
        email: user.email
      }, process.env.JWT_SECRET_KEY, {
        expiresIn: '10m'
      })
      res.status(200).json({
        sucess: true,
        username: user.username,
        accessToken: accessToken
      })
    }
  } catch (e)
  {
    res.status(500).send({
      success: false,
      message: "Something went wrong while creating user",
      error: e,
    });
  }
}

const changePassword = async (req,res) => {
  try {
    const userId = req.userInfo.userId;
    const {oldPassword, newPassword} = req.body;
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if(!isPasswordMatch){
      return res.status(404).json({
        success: false,
        message: 'Incorrect old password'
      })
    }
    const salt = await bcrypt.genSalt(10);
    const hashNwPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashNwPassword;
    await user.save();
    return res.status(200).json({
        success: true,
        message: 'Password changed'
      })
  } catch(e) {

  }
}

module.exports = {
  getAllusers,
  getuserById,
  registerUser,
  loginUser,
  changePassword
};
