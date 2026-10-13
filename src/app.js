require("dotenv").config();
require("./utils/services/email/cronjob");
const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cors = require("cors");
const http = require("http");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter, profileRouter, requestRouter, userRouter);

const server = http.createServer(app);

connectDB()
  .then(() => {
    console.log("DB is connected..🚀");
    server.listen(process.env.PORT, () => {
      console.log(
        `Server is Successfully listning to the PORT : ${process.env.PORT}`,
      );
    });
  })
  .catch((err) => {
    console.log(`DB connection is failed..🥶 ${err.message}`);
  });
