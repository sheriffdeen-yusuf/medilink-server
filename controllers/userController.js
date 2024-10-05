const User = require('../models/userModel');

const Pregnancy = require('./../models/pregnancyModel');
const Diabetes = require('./../models/diabetesModel');
const Cardiovascular = require('./../models/cardiovascularModel');
const BreastCancer = require('./../models/breastCancerModel');

const assessment = {
  pregnancy: Pregnancy,
  diabetes: Diabetes,
  cardiovascular: Cardiovascular,
  breastCancer: BreastCancer,
};

exports.getUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    result: users.length,
    message: 'sucessfully retrieved users',
    payload: {
      users,
    },
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: 'breastCancerResult',
        select: 'assesment_type createdAt result',
      })
      .populate({
        path: 'cardiovascularResult',
        select: 'assesment_type createdAt result',
      })
      .populate({
        path: 'diabetesResult',
        select: 'assesment_type createdAt result',
      })
      .populate({
        path: 'pregnancyResult',
        select: 'assesment_type createdAt result',
      });

    res.status(200).json({
      status: 'success',
      payload: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'User not found',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'sucess',
      message: 'User updated successfully',
      payload: {
        user,
        updatedAt: req.requestedAt,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'Update user failed',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: `User successfully deleted`,
      payload: null,
    });
  } catch (err) {
    res.status(204).json({
      status: 'Failed',
      message: 'Failed to get user ',
    });
  }
};

exports.deleteTakenAssessment = async (req, res) => {
  try {
    const { assessmentType, id } = req.params;

    const AssessmentModel = assessment[assessmentType];

    if (!AssessmentModel) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid assessment type',
      });
    }

    const deletedAssessment = await AssessmentModel.findByIdAndDelete(id);

    if (!deletedAssessment) {
      return res.status(404).json({
        status: 'fail',
        message: 'No assessment found with that ID',
      });
    }

    return res.status(204).json({
      status: 'success',
      data: null,
      message: `uccessfully deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Server error',
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      payload: {
        user,
        createdAt: req.requestedAt,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Failed to create user',
    });
  }
};
