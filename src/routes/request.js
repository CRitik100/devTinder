const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Connection = require("../models/connection");
const {
  validateConnectionRequest,
  validateConnectionReview,
} = require("../utils/validation");
const sendEmail = require("../utils/services/email/sendEmail");
const connectionRequestEmail = require("../utils/services/email/templates/connectionRequest");

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
      if (connectionStatus == "interested") {
        const emailData = connectionRequestEmail({
          toName: req.toUser.firstName,
          fromName: req.user.firstName,
          fromAbout: req.user.about,
        });
        const email = await sendEmail.run({
          ...emailData,
          from: "devTinder <notifications@devtinder11.com>",
          to: req.toUser.emailId,
        });
        console.log(email);
      }
      res.json({
        message: `${req.user.firstName} your request has been sent successfuly to ${req.toUser.firstName}..🎉`,
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send("Error => " + error.message);
    }
  },
);

// reviewing the connection request.
requestRouter.post(
  "/request/review/:connectionStatus/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const { connectionStatus, toUserId } = req.params;

      validateConnectionReview(req, res);

      const data = await Connection.findOne({
        fromUserId: toUserId,
        toUserId: req.user._id,
        connectionStatus: "interested",
      });
      if (!data) {
        return res.status(404).json({ message: "Connection not found." });
      }
      data.connectionStatus = connectionStatus;
      await data.save();
      res.json({
        message: `${req.user.firstName}, you ${connectionStatus} the request.`,
        data,
      });
    } catch (error) {
      res.status(400).send("Error => " + error.message);
    }
  },
);

module.exports = requestRouter;
