const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router({ caseSensitive: true, strict: true });
const Connection = require("../models/connection");

const USER_SAFE_DATA = "firstName lastName photo";

// GET - all the pending request.
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    let data = await Connection.find({
      toUserId: loggedInUser._id,
      connectionStatus: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    if (data.length == 0) {
      return res.status(404).send("Pending connection not found.");
    } else {
      data = data.map((row) => row.fromUserId);
      res.json({
        message: `${loggedInUser.firstName}, below people are Interested.`,
        data,
      });
    }
  } catch (error) {
    res.status(400).send("Error => " + error.message);
  }
});

// GET - all the accepted connections.
userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    let data = await Connection.find({
      $or: [
        { fromUserId: loggedInUser._id, connectionStatus: "accepted" },
        { toUserId: loggedInUser._id, connectionStatus: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    if (!data.length) {
      return res.status(404).json({ message: "Pls make new friends." });
    } else {
      data = data.map((row) =>
        row.fromUserId._id.equals(loggedInUser._id)
          ? row.toUserId
          : row.fromUserId,
      );
      res.json({
        message: `${loggedInUser.firstName}, here is the list of Friends.`,
        data,
      });
    }
  } catch (error) {
    res.status(400).send("Error => " + error.message);
  }
});

module.exports = userRouter;
