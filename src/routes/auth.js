const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { validateSignupData } = require("../utils/validation");

const authRouter = express.Router({ caseSensitive: true, strict: true });

// POST "signup" API
authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    validateSignupData(req);

    const hashedPassword = await bcrypt.hash(password, 11);

    const userData = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: hashedPassword,
    });
    await userData.save();
    res.send("User has been added successfully..✔️");
  } catch (error) {
    res.send("Error => " + error.message);
  }
});

// POST "login" API.
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) throw new Error("Credentials are not valid");

    const match = await user.isPasswordValid(password);

    if (!match) throw new Error("Credentials are not valid");
    else {
      const token = user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("LoggedIn Succussfully..✔️");
    }
  } catch (error) {
    res.send("Error => " + error.message);
  }
});

module.exports = authRouter;
