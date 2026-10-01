const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter, profileRouter, requestRouter);

connectDB()
  .then(() => {
    console.log("DB is connected..🚀");
    app.listen(3333, () => {
      console.log("Server is Successfully listning to the PORT : 1111");
    });
  })
  .catch((err) => {
    console.log(`DB connection is failed..🥶 ${err.message}`);
  });
