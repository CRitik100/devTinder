const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateUpdateProfileData } = require("../utils/validation");

const profileRouter = express.Router({ caseSensitive: true, strict: true });

// GET "profile" API.
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user);
});

profileRouter.patch("/profile/update", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const data = req.body;
    validateUpdateProfileData(req);
    Object.keys(data).every((value) => (loggedInUser[value] = data[value]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, data is updated successfully.`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("Error => " + error.message);
  }
});

module.exports = profileRouter;
