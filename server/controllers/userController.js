import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

//  desc     Authorize user/set token
//  route    POST /api/users/auth
//  access   Public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json( {message: 'Authorize user'} )
});

//  desc     Register a new user
//  route    POST /api/users
//  access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if(userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    email,
    password
  });

  if(user) {
    res.status(201).json({
      _id: user._id,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }

  res.status(200).json( {message: 'Register user'} )
});

//  desc     Logout user
//  route    POST /api/users/logout
//  access   Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json( {message: 'Logout user'} )
});

//  desc     Get user profile
//  route    GET /api/users/profile
//  access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json( {message: 'User profile'} )
});

//  desc     Update user profile
//  route    PUT /api/users/profile
//  access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json( {message: 'Update user profile'} )
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile};
