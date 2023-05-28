const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const protect = require('../middlewares/protect');

const router = express.Router();

// router.use(protect); //  protect all router which are comming after this middleware

router
  .route('/me')
  .get(userController.getMe, userController.getUser)
  .patch(userController.getMe, userController.updateUser);

router.patch('/updatePassword', authController.updatePassword);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
