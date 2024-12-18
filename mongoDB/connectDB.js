const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
