const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router({ caseSensitive: true, strict: true });
const Connection = require("../models/connection");
const { User } = require("../models/user");

const USER_SAFE_DATA = "firstName lastName photo about";

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

// GET - feed to the loggedIn user.
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 7;
    limit = limit > 50 ? 50 : limit;
    let skip = (page - 1) * limit;

    let alreadyContacted = await Connection.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });

    alreadyContacted = alreadyContacted.map((row) =>
      row.fromUserId._id.equals(loggedInUser._id)
        ? { _id: row.toUserId._id }
        : { _id: row.fromUserId._id },
    );
    alreadyContacted.push({ _id: loggedInUser._id });

    let feedData = await User.find(
      {
        $nor: alreadyContacted,
      },
      USER_SAFE_DATA,
    )
      .skip(skip)
      .limit(limit);

    if (!feedData) {
      return res.json({ message: "You have good no of connection." });
    } else {
      res.json({
        message: `Here is you feed ${loggedInUser.firstName},`,
        feedData,
      });
    }
  } catch (error) {
    res.status(400).send("Error => " + error.message);
  }
});

module.exports = userRouter;
