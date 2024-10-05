const mongoose = require('mongoose');

const breastCancerSchema = new mongoose.Schema({
  age: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A breast cancer record must have an age'],
  },
  have_relative: {
    type: String,
    enum: ['yes', 'no'],

    required: [true, 'A breast cancer record must have a relative field'],
  },
  unusual_change: {
    type: String,
    enum: ['yes', 'no'],

    required: [true, 'A breast cancer record must have an unusual change field'],
  },
  undergone_test: {
    type: String,
    enum: ['yes', 'no'],

    required: [true, 'A breast cancer record must have a test field'],
  },
  have_lump: {
    type: String,
    enum: ['yes', 'no'],

    required: [true, 'A breast cancer record must have a lump field'],
  },
  early_mens: {
    type: String,
    enum: ['yes', 'no'],

    required: [true, 'A breast cancer record must have an early menopause field'],
  },
  used_HRT: {
    type: String,
    enum: ['yes', 'no'],

    required: [true, 'A breast cancer record must have an HRT field'],
  },
  nipples_discharge: {
    type: String,
    enum: ['yes', 'no'],

    required: [true, 'A breast cancer record must have a nipple discharge field'],
  },
  overweight: {
    type: String,
    enum: ['yes', 'no'],

    required: [true, 'A breast cancer record must have an overweight field'],
  },
  freq_excercise: {
    type: String,
    enum: ['yes', 'no'],

    required: [true, 'A breast cancer record must have an exercise frequency field'],
  },
  result: {
    type: String,
    enum: ['HIGH', 'LOW', 'AVERAGE'],
    required: [true, 'A breast cancer record must have a result'],
  },
  assesment_type: {
    type: String,
    default: 'Breast Cancer',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A Pbreast cancer record must have a userId'],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const BreastCancer = mongoose.model('BreastCancer', breastCancerSchema);
module.exports = BreastCancer;
