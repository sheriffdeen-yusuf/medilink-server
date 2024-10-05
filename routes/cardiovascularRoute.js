const cardiovascularController = require('./../controllers/cardiovascularController');
const authControllers = require('./../controllers/authController');

const express = require('express');

const router = express.Router();

// router
//   .route('/me')
//   .get(authControllers.protect, bcController.getMe, bcController.getUser);

router
  .route('/')
  .post(
    authControllers.protect,
    cardiovascularController.createCardiovascularAssessment
  );

// router
//   .route('/:id')
//   .patch(authControllers.protect, bcController.updateUser)
//   .delete(bcController.deleteUser)
//   .get(bcController.getUser);
module.exports = router;
