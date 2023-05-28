const express = require('express');
const carsController = require('../controllers/carsController');


const router = express.Router();


router
  .route('/')
  .get(carsController.getAllCars)
router
  .route('/update-notes')
  .post(carsController.updateNotes)
  



module.exports = router;
