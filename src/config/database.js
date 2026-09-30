const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "String to connect to the MongoDB database",
  );
};

module.exports = {connectDB} ;
