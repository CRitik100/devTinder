const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://chaurasiyaritik50_db_user:9mtmYVtsJXY7hIhp@namastenode.5bcxtcs.mongodb.net/devTinder",
  );
};

module.exports = {connectDB} ;
