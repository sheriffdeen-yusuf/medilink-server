const mongoose = require('mongoose');

const pregnancySchema = new mongoose.Schema({
  age: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Pregnancy risk record must have an age'],
  },
  test_gestational: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Pregnancy risk record must have a gestational frequency'],
  },

  overweight: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Pregnancy risk record must have a overwight field '],
  },

  fam_history_hypertension: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Pregnancy risk record must have a family history'],
  },
  prev_highblood_pressure: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Pregnancy risk record must have an hbp field'],
  },

  fam_history_complication: {
    type: String,
    enum: ['yes', 'no'],
    required: [
      true,
      'A Pregnancy risk record must have a ffam_history_complication field',
    ],
  },

  have_swelling: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Pregnancy risk record must have an have_swelling field'],
  },
  prev_risk_pregnancy: {
    type: String,
    enum: ['yes', 'no'],
    required: [
      true,
      'A Pregnancy risk record must have a prev_risk_pregnancy field',
    ],
  },
  extreme_fatigue: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Pregnancy risk record must have a extreme_fatigue field'],
  },
  do_smoke: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Pregnancy risk record must have a do_smoke field'],
  },

  result: {
    type: String,
    enum: ['HIGH', 'LOW', 'AVERAGE'],
    required: [true, 'A Pregnancy risk record must have a result'],
  },
  assesment_type: {
    type: String,
    default: 'Pregnancy risk',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A Pregnancy risk record must have a userId'],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Pregnancy = mongoose.model('Pregnancy', pregnancySchema);
module.exports = Pregnancy;
