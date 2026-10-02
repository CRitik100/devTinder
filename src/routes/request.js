const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Connection = require("../models/connection");
const { validateConnectionRequest } = require("../utils/validation");

const requestRouter = express.Router({ caseSensitive: true, strict: true });

// sending connection req to another.
requestRouter.post(
  "/request/send/:connectionStatus/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const connectionStatus = req.params.connectionStatus;

      await validateConnectionRequest(req);

      const newReq = new Connection({
        fromUserId,
        toUserId,
        connectionStatus,
      });

      const data = await newReq.save();
      res.json({
        message: `${req.user.firstName} your request has been sent successfuly to ${req.toUser.firstName}..🎉`,
        data,
      });
    } catch (error) {
      res.status(400).send("Error => " + error.message);
    }
  },
);

module.exports = requestRouter;
