const mongoose = require("mongoose");
const { User } = require("./user");
const { Schema } = mongoose;

const connectionSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    connectionStatus: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is not valid status",
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

connectionSchema.index({ fromUserId: 1, toUserId: 1 });

// this pre middleware will be called before saving the document ans save operation will happen once the promise is resolved.
connectionSchema.pre("save", async function () {
  const user = this;
  if (user.fromUserId.equals(user.toUserId)) {
    throw new Error("sending the req to yourself is not allowed.");
  }
});

module.exports = mongoose.model("Connection", connectionSchema);
