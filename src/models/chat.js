const mongoose = require("mongoose");

const mssgSchema = new mongoose.Schema(
  {
    fromUserId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    enteredMessage: { type: String, required: true },
  },
  { timestamps: true },
);

const chatSchema = new mongoose.Schema(
  {
    participants: {
      type: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      ],
    },
    messages: {
      type: [mssgSchema],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Chat", chatSchema);
