const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema({
  Make: {
    type: String,
  },
  Model: {
    type: String,
  }, 
  Year: {
    type: String,
  }, 
  Trim: {
    type: String,
  },
  Engine: {
    type: String,
  }, 
  Status: {
    type: String,
  },
  Notes: {
    type: String,
  },
  
});



const Cars = mongoose.model('Cars', carsSchema);
module.exports = Cars;
