const mongoose = require('mongoose');
const bycrpt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'A User must have a firstname '],
    },
    lastName: {
      type: String,
      required: [true, 'A User must have a lastname'],
    },
    email: {
      type: String,
      required: [true, 'A User must have an email'],
      unique: true,
    },
    password: {
      type: String,
      select: false, // hidde in rest response
      required: [true, 'A User must have a Password'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },

    role: {
      type: String,
      default: 'user',
      required: [true, 'A User role must be specified'],
    },
  },
  //import to include for virtual fields to works
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('breastCancerResult', {
  ref: 'BreastCancer',
  localField: '_id',
  foreignField: 'user',
});

userSchema.virtual('cardiovascularResult', {
  ref: 'Cardiovascular',
  localField: '_id',
  foreignField: 'user',
});
userSchema.virtual('diabetesResult', {
  ref: 'Diabetes',
  localField: '_id',
  foreignField: 'user',
});
userSchema.virtual('pregnancyResult', {
  ref: 'Pregnancy',
  localField: '_id',
  foreignField: 'user',
});

//
//
//
// THis middleware only work on save and create method
userSchema.pre('save', async function (next) {
  // we only wanna encrpty once, if the field is updated or new created
  if (!this.isModified('password')) return next();

  this.password = await bycrpt.hash(this.password, 12);
  next();
});

// An instance method can be call on all documents instances

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  // compare the hashed password with the password from the request
  return await bycrpt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
