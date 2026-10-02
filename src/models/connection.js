const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      required: true,
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
