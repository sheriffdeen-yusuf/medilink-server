const mongoose = require('mongoose');

const diabetesSchema = new mongoose.Schema({
  age: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Diabetes disease record must have an age'],
  },
  family_history: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Diabetes disease record must have a family history'],
  },
  obesity: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Diabetes disease record must have an obesity field'],
  },
  test_gestational: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Diabetes disease record must have a gestational frequency'],
  },
  freq_thirst: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Diabetes disease record must have a freq_thirst field'],
  },
  high_blood_pressure: {
    type: String,
    enum: ['yes', 'no'],
    required: [
      true,
      'A Diabetes disease record must have a high blood pressure field',
    ],
  },
  freq_excercise: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Diabetes disease record must have an exercise frequency'],
  },
  test_prediabetes: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Diabetes disease record must have a prediabetes field'],
  },
  consume_sugary: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Diabetes disease record must have a consume_sugary field'],
  },
  test_low_HDL: {
    type: String,
    enum: ['yes', 'no'],
    required: [true, 'A Diabetes disease record must have a test_low_HDL field'],
  },

  result: {
    type: String,
    enum: ['HIGH', 'LOW', 'AVERAGE'],
    required: [true, 'A Diabetes disease record must have a result'],
  },
  assesment_type: {
    type: String,
    default: 'Diabetes Disease',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A Diabetes disease record must have a userId'],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Diabetes = mongoose.model('Diabetes', diabetesSchema);
module.exports = Diabetes;
