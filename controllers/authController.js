const User = require('../models/userModel');
// const Lister = require("../models/listerModel");
// const Admin = require("../models/adminModel");

const jwt = require('jsonwebtoken');

const roles = {
  user: User,
  // lister: Lister,
  // admin: Admin,
};

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = async (req, res) => {
  try {
    if (!req.body.role) throw new Error('A role must be specified');

    const Model = roles[req.body.role];
    if (!Model) throw new Error('Invalid Role');

    const user = await Model.create(req.body);
    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      message: `${req.body.role} created successfully`,
      payload: {
        user,
        createdAt: req.requestedAt,
        token,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      status: 'failed',
      message: err.message || 'Failed to create user',
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role)
      throw new Error('Provide email,password and role');
    // const user = await User.findOne({ email }).select("+password"); //+ to included already hidden filed

    const Model = roles[role];
    if (!Model) throw new Error('Invalid role');

    const user = await Model.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error('Invalid email or password');
    }
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      message: 'Logged In Successfully',
      payload: {
        user,
        token,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      status: 'failed',
      message: err.message || 'Unable to Login',
      error: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    // 1. check if token exit
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    // console.log(token);
    if (!token) throw new Error('You are not logged in! login again.');

    // 2. verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      //   console.log(decoded);
    } catch (err) {
      if (err) {
        return res.status(400).json({
          status: 'failed',
          message: 'Invalid token. Please log in again.',
        });
      }
    }

    //3. check if user exist for listers or admin
    let currentUser = await User.findById(decoded.id);

    // if (!currentUser) {
    //   currentUser = await Lister.findById(decoded.id);
    // }

    // if (!currentUser) {
    //   currentUser = await Admin.findById(decoded.id);
    // }

    if (!currentUser) {
      throw new Error('User does not exist.');
    }

    // 4. grant access
    req.user = currentUser;
    req.token = token;

    next();
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      status: 'failed',
      message: err.message || 'UnAuthorized, Please Login ',
      error: err,
    });
  }
};

exports.restrictTo = (...roles) => {
  //by the time the middleware is called req.user already have data of the logged in user
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'failed',
        message: 'You are not authorized to perform this action.',
      });
    }
    next();
  };
};

exports.ping = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'Ping successful',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message || 'Unable to ping',
      error: err,
    });
  }
};
