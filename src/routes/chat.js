const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Chat = require("../models/chat");
const Connection = require("../models/connection");

const chatRouter = express.Router({ caseSensitive: true, strict: true });

chatRouter.get("/chat/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req?.user._id;
    const { toUserId } = req?.params;
    const participants = [fromUserId, toUserId];

    const isFriend = await Connection.findOne({
      $or: [
        {
          fromUserId: fromUserId,
          toUserId: toUserId,
          connectionStatus: "accepted",
        },
        {
          fromUserId: toUserId,
          toUserId: fromUserId,
          connectionStatus: "accepted",
        },
      ],
    });

    if (!isFriend) {
      throw new Error("You are not his friend.");
    }

    let chat = await Chat.findOne(
      {
        participants: { $all: participants, $size: 2 },
      },
      "messages.fromUserId messages.enteredMessage",
    ).populate("messages.fromUserId", "firstName");

    if (!chat) {
      chat = new Chat({ participants: participants, messages: [] });
      await chat.save();
    }

    res.json({ message: "Here is the past history", chat });
  } catch (error) {
    res.status(404).json("Error => " + error.message);
  }
});

module.exports = chatRouter;
