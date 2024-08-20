const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const Restaurant = require('./models/restaurantModel.js'); 

const app = express();

mongoose.connect(process.env.MONGODB_CONNECT_URI);

const PORT = process.env.PORT

app.get('/restaurants', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const skip = (page - 1) * limit;
    
    const restaurants = await Restaurant.find()
      .skip(skip)
      .limit(limit);
    
    const count = await Restaurant.countDocuments();
    const totalPages = Math.ceil(count / limit);
    
    res.json({
      page,
      totalPages,
      totalItems: count,
      data: restaurants
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
