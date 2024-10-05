const User = require('./../models/userModel');
const Pregnancy = require('./../models/pregnancyModel');
const { riskAssessmentResultAlgorithsm } = require('../utils/index');
const { PREGNANCY_RISKMAPPING } = require('../constants/index');

exports.createPregnancyAssessment = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new Error('User not found');
    }

    const result = riskAssessmentResultAlgorithsm(req.body, PREGNANCY_RISKMAPPING);

    const newRecord = await Pregnancy.create({
      ...req.body,
      user: req.user._id,
      result,
    });

    res.status(201).json({
      status: 'success',
      message: 'Pregnancy assessment submitted',
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
