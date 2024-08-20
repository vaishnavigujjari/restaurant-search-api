const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  date: Date,
  grade: String,
  score: Number
});

const addressSchema = new mongoose.Schema({
  building: String,
  street: String
});

const restaurantSchema = new mongoose.Schema({
  address: addressSchema,
  cuisine: String,
  grades: [gradeSchema],
  name: String,
  restaurant_id: Number
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;