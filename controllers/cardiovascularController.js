const User = require('./../models/userModel');
const Cardiovascular = require('./../models/cardiovascularModel');
const { riskAssessmentResultAlgorithsm } = require('../utils/index');
const { CARDIOVASCULAR_RISKMAPPING } = require('../constants/index');

exports.createCardiovascularAssessment = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new Error('User not found');
    }

    const result = riskAssessmentResultAlgorithsm(
      req.body,
      CARDIOVASCULAR_RISKMAPPING
    );

    const newRecord = await Cardiovascular.create({
      ...req.body,
      user: req.user._id,
      result,
    });

    res.status(201).json({
      status: 'success',
      message: 'Cardiovascular assessment submitted',
      result,
      payload: {
        newRecord,
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
