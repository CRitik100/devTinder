const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router({ caseSensitive: true, strict: true });

// POST "sendConnection" API.
requestRouter.post("/sendConnection", userAuth, (req, res) => {
  res.send("Ruko JARA..");
});

module.exports = requestRouter;
