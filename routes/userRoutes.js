const userControllers = require('./../controllers/userController');
const authControllers = require('./../controllers/authController');

const express = require('express');

const router = express.Router();

router
  .route('/me')
  .get(authControllers.protect, userControllers.getMe, userControllers.getUser);

router.route('/').get(userControllers.getUsers);

router
  .route('/:id')
  .patch(authControllers.protect, userControllers.updateUser)
  .delete(userControllers.deleteUser)
  .get(userControllers.getUser);
module.exports = router;
