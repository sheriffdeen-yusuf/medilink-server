const User = require('./../models/userModel');
const BreastCancer = require('./../models/breastCancerModel');
const { riskAssessmentResultAlgorithsm } = require('../utils/index');
const { BC_QUESTIONS_RISKMAPPING } = require('../constants/index');

exports.createBreastCancerAssessment = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new Error('User not found');
    }

    const result = riskAssessmentResultAlgorithsm(
      req.body,
      BC_QUESTIONS_RISKMAPPING
    );

    const newBCRecord = await BreastCancer.create({
      ...req.body,
      user: req.user._id,
      result,
    });

    res.status(201).json({
      status: 'success',
      message: 'Breast Cancer assessment submitted',
      result,
      payload: {
        newBCRecord,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'failed',
      message: 'Failed to submit assessment',
      errors: err?.errors,
    });
  }
};
