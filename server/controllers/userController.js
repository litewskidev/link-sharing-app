import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

//  desc     Authorize user/set token
//  route    POST /api/users/auth
//  access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(user && await user.matchPassword(password)) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      displayEmail: user.displayEmail,
      image: user.image,
      links: user.links
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password.');
  }

  res.status(200).json( {message: 'User logged in.'} );
});

//  desc     Register a new user
//  route    POST /api/users
//  access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name, surname, displayEmail, image, links } = req.body;

  const userExists = await User.findOne({ email });

  if(userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  const user = await User.create({
    email,
    password,
    name,
    surname,
    displayEmail,
    image,
    links
  });

  if(user) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      displayEmail: user.email,
      image: user.image,
      links: user.links
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }

  res.status(200).json( {message: 'User registered.'} );
});

//  desc     Logout user
//  route    POST /api/users/logout
//  access   Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json( {message: 'User logged out.'} );
});

//  desc     Get user profile
//  route    GET /api/users/profile
//  access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    surname: req.user.surname,
    displayEmail: req.user.displayEmail,
    image: req.user.image,
    links: req.user.links
  };

  res.status(200).json(user);
});

//  desc     Update user profile
//  route    PUT /api/users/profile
//  access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if(user) {
    user.name = req.body.name || user.name;
    user.surname = req.body.surname || user.surname;
    user.displayEmail = req.body.displayEmail || user.displayEmail;
    user.links = req.body.links || user.links;

    if(req.file) {
      user.image = req.file.filename || user.image;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      id: user._id,
      email: user.email,
      name: updatedUser.name,
      surname: updatedUser.surname,
      displayEmail: updatedUser.displayEmail,
      image: updatedUser.image,
      links: updatedUser.links
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }

  res.status(200).json( {message: 'User profile updated.'} );
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile};
