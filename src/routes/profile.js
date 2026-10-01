const express = require("express");
const { userAuth } = require("../middlewares/auth");


const profileRouter = express.Router({ caseSensitive: true, strict: true });

// GET "profile" API.
profileRouter.get("/profile", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user);
});

module.exports = profileRouter;
