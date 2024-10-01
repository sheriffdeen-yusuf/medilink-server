const User = require('../models/userModel');

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
    const user = await User.findById(req.params.id);

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

exports.createBooking = async (req, res) => {
  try {
    const { propertyId } = req.body;
    const userId = req.user._id;

    const existingBooking = await Booking.findOne({ propertyId, userId });
    const property = await Property.findById(propertyId);

    if (existingBooking) {
      return res.status(400).json({
        status: 'failed',
        message: 'You have already booked this property.',
      });
    }

    const booking = await Booking.create({
      property: propertyId,
      user: userId,
    });

    property.bookings.push(booking._id);
    await property.save();

    res.status(201).json({
      status: 'success',
      message: 'Booking created successfully',
      payload: {
        booking,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 'failed',
      message: 'Failed to create booking',
      errors: err?.errors,
    });
  }
};
