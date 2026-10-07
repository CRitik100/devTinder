const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://chaurasiyaritik50_db_user:fqF7mP8o5oESiA6U@namastenode.5bcxtcs.mongodb.net/devTinder",
  );
};

module.exports = {connectDB} ;
