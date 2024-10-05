const mongoose = require('mongoose');

const cardiovascularSchema = new mongoose.Schema({
  age: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Cardiovascular disease record must have an age'],
  },
  family_history: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Cardiovascular disease record must have a family history'],
  },
  obesity: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Cardiovascular disease record must have an obesity field'],
  },
  freq_smoking: {
    type: String,
    enum: ['yes', 'no'],
    required: [
      true,
      'A Cardiovascular disease record must have a smoking frequency',
    ],
  },
  test_cholesterol: {
    type: String,
    enum: ['yes', 'no'],
    required: [
      true,
      'A Cardiovascular disease record must have a test for cholesterol',
    ],
  },
  high_blood_pressure: {
    type: String,
    enum: ['yes', 'no'],
    required: [
      true,
      'A Cardiovascular disease record must have a high blood pressure field',
    ],
  },
  freq_excercise: {
    type: String,
    enum: ['yes', 'no'],
    required: [
      true,
      'A Cardiovascular disease record must have an exercise frequency',
    ],
  },
  rapid_heartbeat: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Cardiovascular disease record must have a rapid heartbeat'],
  },
  fatty_meal: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Cardiovascular disease record must have a fatty meal'],
  },
  test_diabetes: {
    type: String,
    enum: ['yes', 'no'],
    required: [
      true,
      'A Cardiovascular disease record must have a test for diabetes',
    ],
  },

  result: {
    type: String,
    enum: ['HIGH', 'LOW', 'AVERAGE'],
    required: [true, 'A Cardiovascular disease record must have a result'],
  },
  assesment_type: {
    type: String,
    default: 'Cardiovascular Disease',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A Cardiovascular disease record must have a userId'],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Cardiovascular = mongoose.model('Cardiovascular', cardiovascularSchema);
module.exports = Cardiovascular;
