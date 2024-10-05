const User = require('./../models/userModel');
const Diabetes = require('./../models/diabetesModel');
const { riskAssessmentResultAlgorithsm } = require('../utils/index');
const { DIABETES_RISKMAPPING } = require('../constants/index');

exports.createDiabetesAssessment = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new Error('User not found');
    }

    const result = riskAssessmentResultAlgorithsm(req.body, DIABETES_RISKMAPPING);

    const newRecord = await Diabetes.create({
      ...req.body,
      user: req.user._id,
      result,
    });

    res.status(201).json({
      status: 'success',
      message: 'Diabetes assessment submitted',
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
