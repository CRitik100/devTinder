require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter, profileRouter, requestRouter, userRouter);

connectDB()
  .then(() => {
    console.log("DB is connected..🚀");
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is Successfully listning to the PORT : ${process.env.PORT}`,
      );
    });
  })
  .catch((err) => {
    console.log(`DB connection is failed..🥶 ${err.message}`);
  });
