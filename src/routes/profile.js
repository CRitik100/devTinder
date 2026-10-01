const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  validateUpdateProfileData,
  validateNewProfilePassword,
} = require("../utils/validation");

const profileRouter = express.Router({ caseSensitive: true, strict: true });

// get profile API.
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user);
});

// update profile API.
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

// update password API.
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    await validateNewProfilePassword(req);
    const hashedPassword = await loggedInUser.getHashedPassword(
      req.body.newPassword,
    );
    loggedInUser.password = hashedPassword;
    await loggedInUser.save();
    res.send("password is updated");
  } catch (error) {
    res.status(406).send("Error => " + error.message);
  }
});

module.exports = profileRouter;
